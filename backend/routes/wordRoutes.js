const express = require("express");
const axios = require("axios");
const Word = require("../models/Word");
const router = express.Router();

// Fetching Oxford API and save to databse
router.post("/add", async (req, res) => {
  const { word } = req.body;

  try {
    // Check the word if it is already exists in the database
    let wordFind = await Word.findOne({ word });
    if (wordFind) {
      return res.status(200).json(wordFind);
    }

    // Fetching details of word from Oxford API
    const apiResponse = await axios.get(
      `https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-gb/${word}`,
      {
        headers: {
          app_id: process.env.OXFORD_APP_ID,
          app_key: process.env.OXFORD_APP_KEY,
        },
      }
    );

    const dataOfOxford = apiResponse.data;
    console.log(dataOfOxford)
    
    const lexicalCategory =
      dataOfOxford.results[0].lexicalEntries[0].lexicalCategory.text;
    const definitions =
      dataOfOxford.results[0].lexicalEntries[0].entries[0].senses.map(
        (sense) => sense.definitions[0]
      );
      
    const phoneticSpelling =
      dataOfOxford.results[0].lexicalEntries[0].entries[0].pronunciations[0]
        .phoneticSpelling;
    // Save the new word in the database
    const newWord = new Word({   /// 
      word,
      lexicalCategory,
      definitions,
      phoneticSpelling,
    });

    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    
    res.status(500).json({ message: "Error fetching word from Oxford API" });
  }
});

// find all words from database
router.get("/", async (req, res) => {
  try {
    const words = await Word.find();
    res.status(200).json(words);
  } catch (error) {
    
    res.status(500).json({ message: "Error fetching words" });
  }
});

module.exports = router;
