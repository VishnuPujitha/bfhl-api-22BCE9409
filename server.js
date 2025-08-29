const express = require("express");
const app = express();
app.use(express.json());

// === YOUR DETAILS ===
const FULL_NAME = "b_vishnu_poojitha";   // lowercase, underscores
const DOB_DDMMYYYY = "22092003";         // <-- replace with your real DOB in ddmmyyyy
const EMAIL = "22bce9409@vitstudent.ac.in";
const ROLL_NUMBER = "22BCE9409";
// ====================

const isNumeric = (s) => /^[0-9]+$/.test(s);
const isAlpha = (s) => /^[A-Za-z]+$/.test(s);

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body?.data;
    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: "",
        error: "Invalid input. 'data' must be an array"
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let alphaChars = [];

    for (const t of data) {
      const s = String(t);
      if (isNumeric(s)) {
        const v = parseInt(s, 10);
        sum += v;
        (v % 2 === 0 ? even_numbers : odd_numbers).push(s);
      } else if (isAlpha(s)) {
        alphabets.push(s.toUpperCase());
        for (const ch of s) alphaChars.push(ch);
      } else {
        special_characters.push(s);
      }
    }

    // Build concat_string (reverse + alternating caps)
    alphaChars.reverse();
    const concat_string = alphaChars
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });
  } catch {
    return res.status(200).json({
      is_success: false,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: "Server error"
    });
  }
});

app.get("/", (_req, res) => res.status(200).send("OK"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
