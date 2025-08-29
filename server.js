const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("BFHL API is running. Use POST /bfhl");
});

app.post("/bfhl", (req, res) => {
  const data = req.body.data;

  let oddNumbers = [];
  let evenNumbers = [];
  let alphabets = [];
  let specialChars = [];
  let sum = 0;

  data.forEach(item => {
    if (!isNaN(item)) {
      let num = parseInt(item);
      sum += num;
      if (num % 2 === 0) {
        evenNumbers.push(item);
      } else {
        oddNumbers.push(item);
      }
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
    } else {
      specialChars.push(item);
    }
  });

  let concatString = alphabets.join("");
  concatString = concatString.split("").reverse()
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");

  res.json({
    is_success: true,
    user_id: "b_vishnu_poojitha_22092003",
    email: "22bce9409@vitstudent.ac.in",
    roll_number: "22BCE9409",
    odd_numbers: oddNumbers,
    even_numbers: evenNumbers,
    alphabets: alphabets,
    special_characters: specialChars,
    sum: sum.toString(),
    concat_string: concatString
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
