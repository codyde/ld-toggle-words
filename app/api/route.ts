
import { words } from '@/schema/schema'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg';
import { data } from '@/lib/questiondata';
import getServerClient from '@/utils/ld-server/serverClient';
import serverflag from '@/utils/ld-server/flaggetter';
import { LDContext } from 'launchdarkly-node-server-sdk';

export const dynamic = 'force-dynamic'

export async function GET() {

    const context: LDContext = {
        kind: 'user',
        key: Math.random().toString(36).substring(2, 7),
        name: Math.random().toString(36).substring(2, 7),
    }

    const client = await getServerClient(process.env.LAUNCHDARKLY_SDK_KEY!);

    const wordsdb = await serverflag(client, 'advanced-word-database', context, false);

    const connectionString = process.env.DATABASE_URL
    if (wordsdb === true) {
    try {
        if (!connectionString) {
            throw new Error('DATABASE_URL is not set')
        }
        // const client = postgres(connectionString)
        const pool = new Pool({
            connectionString: connectionString,
          });
        
        const db = drizzle(pool);
        const allwords = await db.select().from(words)

        return Response.json({ allwords })
    } catch (error) {
        return Response.error()
    }
    } else {

        const allwords = data
        return Response.json({ allwords })
    }
}