
import { words, toggleSettings } from '@/schema/schema'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import postgres from 'postgres'
import { Client, Pool } from 'pg';
import { toggleSettings as answerData } from '@/lib/questiondata';
import serverflag from '@/utils/ld-server/flaggetter';
import { getServerClient } from '@/utils/ld-server';
import { LDContext } from 'launchdarkly-node-server-sdk';

export const dynamic = 'force-dynamic'

export async function POST(req: Request, res: Response) {

    const context: LDContext = {
        kind: 'user',
        key: Math.random().toString(36).substring(2, 7),
        name: Math.random().toString(36).substring(2, 7),
    }

    const client = await getServerClient(process.env.LAUNCHDARKLY_SDK_KEY!);

    const wordsdb = await serverflag(client, 'advanced-word-database', context, false);
    const bugFixFlag = await serverflag(client, 'bigBugFix', context, false);

    const data = await req.json()
    console.log(data)

    const connectionString = process.env.DATABASE_URL

    try {
        const t1 = Date.now();
        if (wordsdb === true) {
            if (!connectionString) {
                throw new Error('DATABASE_URL is not set')
            }
            const pool = new Pool({
                connectionString: connectionString,
            });

            const db = drizzle(pool);
            if (bugFixFlag) {
                const t2 = Date.now();
                const latency = t2 - t1
                console.log("The latency is "+latency)
                await client.track("latency", context, null, latency)
                await client.flush()
                const allAnswers = await db.select().from(toggleSettings).where(eq(toggleSettings.phrase, data.phrase));
                return Response.json({ allAnswers })
            } else {
                // Introduce a delay between 200-400ms

                await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 200));
                // Throw an error 40% of the time
                if (Math.random() < 0.7) {
                    await client.track("errors", context)
                    const t2 = Date.now();
                    const latency = t2 - t1
                    console.log("The latency is "+latency)
                    await client.track("latency", context, null, latency)
                    await client.flush()
                    throw new Error('Simulated error');
                } else {
                    const t2 = Date.now();
                    const latency = t2 - t1
                    await client.track("latency", context, null, latency)
                    await client.flush()
                    const allAnswers = await db.select().from(toggleSettings).where(eq(toggleSettings.phrase, data.phrase));
                    return Response.json({ allAnswers })
                }
            }
        }
        else {
            const t2 = Date.now();
            const latency = t2 - t1
            console.log("The latency is "+latency)
            await client.track("latency", context, null, 15)
            const allAnswers = answerData
            return Response.json({ allAnswers })
        }
    } catch (error) {
        console.error(error)
        await client.track("errors", context)
        await client.flush()
        return Response.error()
    }


}