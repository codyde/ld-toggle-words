const { Client } = require('pg');

// Database connection configuration using a connection string
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString: connectionString,
});

// Data to be inserted
const data = [
  {
    phrase: "goth_setting",
    clue: "What is a goth's favorite setting?",
    answer: "Dark Mode",
    option1: "Brightness",
    option2: "High Contrast",
    option3: "Power Saving",
  },
  {
    phrase: "programmer_drink",
    clue: "What is a programmer's favorite drink?",
    answer: "Java",
    option1: "Hot",
    option2: "Imported",
    option3: "Strong",
  },
  {
    phrase: "java_engineer",
    clue: "What did the Java engineer get after one year at the company?",
    answer: "Arrays",
    option1: "Order Importance",
    option2: "Index Accessible",
    option3: "Dynamic Size",
  },
  {
    phrase: "nature_dislike",
    clue: "Why do programmers hate nature?",
    answer: "Bugs",
    option1: "Plant-based",
    option2: "Predatory",
    option3: "Many-legged",
  },
  {
    phrase: "relationship_start",
    clue: "How do engineers start a relationship?",
    answer: "Commit",
    option1: "Change storage",
    option2: "Navigate history",
    option3: "Remote interaction",
  },
  {
    phrase: "scariest_data_type",
    clue: "What's the scariest data type?",
    answer: "BOOlean",
    option1: "Binary",
    option2: "Numerical",
    option3: "Decimal Support",
  },
  {
    phrase: "aquarium_users",
    clue: "What do you call the first users of an aquarium?",
    answer: "Bettas",
    option1: "Freshwater",
    option2: "Territorial",
    option3: "Colorful",
  },
  {
    phrase: "house_flipper_experiment",
    clue: "What kind of experiment did the house flipper run?",
    answer: "Painted Door",
    option1: "Visual",
    option2: "User Interaction",
    option3: "Multiple Variables",
  },
  {
    phrase: "bookworm_on_call",
    clue: "Why did the bookworm like being on call?",
    answer: "Pages",
    option1: "Scheduled",
    option2: "Customer facing",
    option3: "Immediate Attention",
  },
  {
    phrase: "best_dj",
    clue: "Who is the best DJ?",
    answer: "DJ Toggle",
    option1: "Electronic",
    option2: "Decade: 1990s",
    option3: "Pop Collaborations",
  }
];

// Function to insert data
async function insertData() {
  await client.connect();

  try {
    for (let item of data) {
      await client.query(
        `INSERT INTO togglewords (phrase, clue, answer, option1, option2, option3)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [item.phrase, item.clue, item.answer, item.option1, item.option2, item.option3]
      );
    }
    console.log('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await client.end();
  }
}

// Call the function to insert data
insertData();
