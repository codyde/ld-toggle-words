import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const words = pgTable('togglewords', {
    id: serial('id').primaryKey(),
    phrase: text('phrase'),
    clue: text('clue'),
    answer: text('answer'),
    option1: text('option1'),
    option2: text('option2'),
    option3: text('option3'),
});

export const toggleSettings = pgTable('togglesettings', {
    id: serial('id').primaryKey(),
    phrase: text('phrase'),
    setting: text('setting'),
    value: text('value'),
});