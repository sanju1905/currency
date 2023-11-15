// index.js

const express = require('express');
const mongoose = require('mongoose');
const CurrencyRate = require('./Currencyrate');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://sanjay:sanjay@cluster0.fjcbkym.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.get('/api/currency-rates', async (req, res) => {
    try {
      const rates = await CurrencyRate.find();
      res.json(rates);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.post("/add", async (req,res)=>
  {
    const {currencyCode,rate}=req.body;
    try {
        let newCurrency = new CurrencyRate({
           currencyCode,
           rate
          });
          await newCurrency.save();
          return res.status(200).send("Added Successfully");
    } catch (error) {
      console.log(error);  
    }
  })
  app.post('/api/convert', async (req, res) => {
    const { from, to, amount } = req.body;
  
    try {
      // Validate input (e.g., check if 'from', 'to', and 'amount' are present and valid)
      if (!from || !to || !amount || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
      }
  
      const fromRate = await CurrencyRate.findOne({ currencyCode: from });
      const toRate = await CurrencyRate.findOne({ currencyCode: to });
  
      if (!fromRate || !toRate) {
        return res.status(404).json({ error: 'Currency not found' });
      }
  
      const result = (amount / fromRate.rate) * toRate.rate;
      res.json({ result });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });