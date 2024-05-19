const { Client } = require('pg');

// Database connection configuration using a connection string
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString: connectionString,
});

// Data to be inserted
const toggleSettings = {
  "goth_setting": {
    "true,true,true": "Full Feature",
    "true,true,false": "Vivid Display",
    "true,false,true": "Eco Bright Mode",
    "true,false,false": "Bright Mode",
    "false,true,true": "Dark Mode", // Correct answer
    "false,true,false": "Contrast Mode",
    "false,false,true": "Battery Saving",
    "false,false,false": "Basic Mode"
  },

  "programmer_drink": {
    "true,true,true": "Java", // Correct answer
    "true,true,false": "Tea",
    "true,false,true": "Local Drip Coffee",
    "true,false,false": "Hot Chocolate",
    "false,true,true": "Frappé",
    "false,true,false": "Iced Tea",
    "false,false,true": "Red Bull",
    "false,false,false": "Lemonade"
  },

  "java_engineer": {
    "true,true,true": "ArrayLists",
    "true,true,false": "Arrays", // Correct answer
    "true,false,true": "LinkedLists",
    "true,false,false": "Stacks",
    "false,true,true": "HashMaps",
    "false,true,false": "HashSets",
    "false,false,true": "Queues",
    "false,false,false": "Immutable Lists"
  },

  "nature_dislike": {
    "false,false,true": "Bugs", // Correct answer
    "true,false,false": "Pollen",
    "true,false,true": "Mandrake",
    "false,true,false": "Sharks",
    "false,true,true": "Bears",
    "false,false,false": "Fish",
    "true,true,false": "Carnivorous Plants",
    "true,true,true": "Undiscovered Carnivorous Plant"
  },

  "relationship_start": {
    "true,false,false": "Commit", // Correct answer
    "true,false,true": "Push",
    "false,true,true": "Pull",
    "false,true,false": "Log",
    "true,true,false": "Rebase",
    "false,false,true": "Fetch",
    "true,true,true": "Merge",
    "false,false,false": "Status"
  },

  "scariest_data_type": {
    "true,false,false": "BOOlean", // Correct answer
    "false,true,false": "Integer",
    "false,true,true": "Float",
    "false,false,false": "String",
    "false,false,true": "Decimal",
    "true,true,false": "Bit",
    "true,true,true": "Double",
    "true,false,true": "Invalid"
  },
  "aquarium_users": {
    "true,true,true": "Bettas", // Correct answer
    "true,true,false": "Oscars",
    "true,false,true": "Guppies",
    "true,false,false": "Tetras",
    "false,true,true": "Damselfish",
    "false,true,false": "Triggerfish",
    "false,false,true": "Angelfish",
    "false,false,false": "Flounder"
  },

  "house_flipper_experiment": {
    "true,true,false": "Painted Door", // Correct answer
    "true,false,false": "Existence Test",
    "false,true,false": "Discovery Test",
    "false,false,true": "Multivariate Test",
    "true,true,true": "A/B/n Test",
    "false,true,true": "Bandit Test",
    "true,false,true": "Quasi Experiment",
    "false,false,false": "Non-inferiority Test"
  },

  "bookworm_on_call": {
    "false,false,true": "Pages", // Correct answer
    "false,false,false": "System Monitoring",
    "true,true,false": "Support Requests Backlog Grooming",
    "true,false,false": "Routine Maintenance",
    "false,true,false": "Customer Queries",
    "true,false,true": "Scheduled System Upgrades",
    "false,true,true": "Outages",
    "true,true,true": "Scheduled Downtime"
  },

  "best_dj": {
    "true,false,false": "DJ Toggle", // Correct answer
    "true,true,true": "Tiesto",
    "true,true,false": "Carl Cox",
    "true,false,true": "Avicii",
    "false,true,true": "David Guetta",
    "false,true,false": "Skrillex",
    "false,false,true": "Deadmau5",
    "false,false,false": "Daft Punk"
  }
};

// Function to insert data
async function insertData() {
  await client.connect();

  try {
    for (let phrase in toggleSettings) {
      for (let setting in toggleSettings[phrase]) {
        let value = toggleSettings[phrase][setting];
        await client.query(
          `INSERT INTO togglesettings (phrase, setting, value)
           VALUES ($1, $2, $3)`,
          [phrase, setting, value]
        );
      }
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
