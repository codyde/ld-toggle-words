const toggleSettings = [
  {
    "phrase": "best_dj",
    "setting": "true,false,false",
    "value": "DJ Toggle"
  },
  {
    "phrase": "best_dj",
    "setting": "true,true,true",
    "value": "Tiesto"
  },
  {
    "phrase": "best_dj",
    "setting": "true,true,false",
    "value": "Carl Cox"
  },
  {
    "phrase": "best_dj",
    "setting": "true,false,true",
    "value": "Avicii"
  },
  {
    "phrase": "best_dj",
    "setting": "false,true,true",
    "value": "David Guetta"
  },
  {
    "phrase": "best_dj",
    "setting": "false,true,false",
    "value": "Skrillex"
  },
  {
    "phrase": "best_dj",
    "setting": "false,false,true",
    "value": "Deadmau5"
  },
  {
    "phrase": "best_dj",
    "setting": "false,false,false",
    "value": "Daft Punk"
  }
];

const data = [
  // {
  //   phrase: "goth_setting",
  //   clue: "What is a goth's favorite setting?",
  //   answer: "Dark Mode",
  //   option1: "Brightness",
  //   option2: "High Contrast",
  //   option3: "Power Saving",
  // },

  // {
  //   phrase: "programmer_drink",
  //   clue: "What is a programmer's favorite drink?",
  //   answer: "Java",
  //   option1: "Hot",
  //   option2: "Imported",
  //   option3: "Strong",
  // },

  // {
  //   phrase: "java_engineer",
  //   clue: "What did the Java engineer get after one year at the company?",
  //   answer: "Arrays",
  //   option1: "Order Importance",
  //   option2: "Index Accessible",
  //   option3: "Dynamic Size",
  // },

  // {
  //   phrase: "nature_dislike",
  //   clue: "Why do programmers hate nature?",
  //   answer: "Bugs",
  //   option1: "Plant-based",
  //   option2: "Predatory",
  //   option3: "Many-legged",
  // },

  // {
  //   phrase: "relationship_start",
  //   clue: "How do engineers start a relationship?",
  //   answer: "Commit",
  //   option1: "Change storage",
  //   option2: "Navigate history",
  //   option3: "Remote interaction",
  // },

  // {
  //   phrase: "scariest_data_type",
  //   clue: "What's the scariest data type?",
  //   answer: "BOOlean",
  //   option1: "Binary",
  //   option2: "Numerical",
  //   option3: "Decimal Support",
  // },

  // {
  //   phrase: "aquarium_users",
  //   clue: "What do you call the first users of an aquarium?",
  //   answer: "Bettas",
  //   option1: "Freshwater",
  //   option2: "Territorial",
  //   option3: "Colorful",
  // },

  // {
  //   phrase: "house_flipper_experiment",
  //   clue: "What kind of experiment did the house flipper run?",
  //   answer: "Painted Door",
  //   option1: "Visual",
  //   option2: "User Interaction",
  //   option3: "Multiple Variables",
  // },

  // {
  //   phrase: "bookworm_on_call",
  //   clue: "Why did the bookworm like being on call?",
  //   answer: "Pages",
  //   option1: "Scheduled",
  //   option2: "Customer facing",
  //   option3: "Immediate Attention",
  // },

  {
    phrase: "best_dj",
    clue: "Who is the best DJ?",
    answer: "DJ Toggle",
    option1: "Electronic",
    option2: "Decade: 1990s",
    option3: "Pop Collaborations",
  }

];

// const toggleSettings = {
//   "goth_setting": {
//     "true,true,true": "Full Feature",
//     "true,true,false": "Vivid Display",
//     "true,false,true": "Eco Bright Mode",
//     "true,false,false": "Bright Mode",
//     "false,true,true": "Dark Mode", // Correct answer
//     "false,true,false": "Contrast Mode",
//     "false,false,true": "Battery Saving",
//     "false,false,false": "Basic Mode"
//   },

//   "programmer_drink": {
//     "true,true,true": "Java", // Correct answer
//     "true,true,false": "Tea",
//     "true,false,true": "Local Drip Coffee",
//     "true,false,false": "Hot Chocolate",
//     "false,true,true": "Frappé",
//     "false,true,false": "Iced Tea",
//     "false,false,true": "Red Bull",
//     "false,false,false": "Lemonade"
//   },

//   "java_engineer": {
//     "true,true,true": "ArrayLists",
//     "true,true,false": "Arrays", // Correct answer
//     "true,false,true": "LinkedLists",
//     "true,false,false": "Stacks",
//     "false,true,true": "HashMaps",
//     "false,true,false": "HashSets",
//     "false,false,true": "Queues",
//     "false,false,false": "Immutable Lists"
//   },

//   "nature_dislike": {
//     "false,false,true": "Bugs", // Correct answer
//     "true,false,false": "Pollen",
//     "true,false,true": "Mandrake",
//     "false,true,false": "Sharks",
//     "false,true,true": "Bears",
//     "false,false,false": "Fish",
//     "true,true,false": "Carnivorous Plants",
//     "true,true,true": "Undiscovered Carnivorous Plant"
//   },

//   "relationship_start": {
//     "true,false,false": "Commit", // Correct answer
//     "true,false,true": "Push",
//     "false,true,true": "Pull",
//     "false,true,false": "Log",
//     "true,true,false": "Rebase",
//     "false,false,true": "Fetch",
//     "true,true,true": "Merge",
//     "false,false,false": "Status"
//   },

//   "scariest_data_type": {
//     "true,false,false": "BOOlean", // Correct answer
//     "false,true,false": "Integer",
//     "false,true,true": "Float",
//     "false,false,false": "String",
//     "false,false,true": "Decimal",
//     "true,true,false": "Bit",
//     "true,true,true": "Double",
//     "true,false,true": "Invalid"
//   },
//   "aquarium_users": {
//     "true,true,true": "Bettas", // Correct answer
//     "true,true,false": "Oscars",
//     "true,false,true": "Guppies",
//     "true,false,false": "Tetras",
//     "false,true,true": "Damselfish",
//     "false,true,false": "Triggerfish",
//     "false,false,true": "Angelfish",
//     "false,false,false": "Flounder"
//   },

//   "house_flipper_experiment": {
//     "true,true,false": "Painted Door", // Correct answer
//     "true,false,false": "Existence Test",
//     "false,true,false": "Discovery Test",
//     "false,false,true": "Multivariate Test",
//     "true,true,true": "A/B/n Test",
//     "false,true,true": "Bandit Test",
//     "true,false,true": "Quasi Experiment",
//     "false,false,false": "Non-inferiority Test"
//   },

//   "bookworm_on_call": {
//     "false,false,true": "Pages", // Correct answer
//     "false,false,false": "System Monitoring",
//     "true,true,false": "Support Requests Backlog Grooming",
//     "true,false,false": "Routine Maintenance",
//     "false,true,false": "Customer Queries",
//     "true,false,true": "Scheduled System Upgrades",
//     "false,true,true": "Outages",
//     "true,true,true": "Scheduled Downtime"
//   },

//   "best_dj": {
//     "true,false,false": "DJ Toggle", // Correct answer
//     "true,true,true": "Tiesto",
//     "true,true,false": "Carl Cox",
//     "true,false,true": "Avicii",
//     "false,true,true": "David Guetta",
//     "false,true,false": "Skrillex",
//     "false,false,true": "Deadmau5",
//     "false,false,false": "Daft Punk"
//   }
// };


export { toggleSettings, data };