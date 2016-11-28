'use strict';

const express = require('express');
const cors = require('cors');

// In Memory
let app = express();

// Middleware
app.use(cors());

// Mock Routers

app.post('/api/auth/facebook/token', (req, res) => {
  res.json({
    name: 'Angelos',
    createdAt: new Date(),
    avatar: '/assets/img/male.png'
  });
});

app.get('/api/messages', (req, res) => setTimeout(() => res.json([{
  id: 1,
  name: 'Just My Luck',
  author: 'Angelos Alexopolous',
  likes: 32,
  contributors: 3
}, {
  id: 2,
  name: 'Duh Nuh. Duh Nuh. CHEWY',
  author: 'Carlos Galveias',
  likes: 239,
  contributors: 29
}, {
  id: 3,
  name: 'It\'s time to wake up!',
  author: 'Stephen Raghunath',
  likes: -1,
  contributors: 1
}]), 2000));

app.get('/api/message/:id', (req, res) => {
  setTimeout(() => {
    switch (parseInt(req.params.id)) {
      case 1:
        return res.json({
          name: 'Just My Luck',
          paragraphs: [{
            content: 'The research question being evaluated in this analysis is “For each year in age, how does it affect a person’s trust in government?”  The Null hypothesis for this research question, is that age does not have any correlation to trust in government.',
            author: { name: 'Angelos' }
          }, {
            content: 'To determine the correlation between 2 metric level variables, with also concluding with an ordinal value to say “how much” a variable influences the other, Laureate Education (2016) and Frankfort-Nachmias and Leon-Guerrero (2015) suggest a bivariate regression test design.  The independent variable for this study was Age (in years), as it was assumed through the research question, that each year has a measurable difference in the dependent variable: scale of trust in the government.',
            author: { name: 'Carlos' }
          }, {
            content: 'In performing the bivariate regression tests, the significance values found in the ANOVA and Coefficients analysis both show a p value of 0.00 which is much lower than the conventional 0.05 limit. This results in rejecting our null hypothesis, and can suggest that age does have an effect of level of trust in the government. The model summary reveals an R showing the level of impact on a scale from -1 to 1, that this while a factor, is not very strong, but statistically significant.  The coefficient analysis yields a B value of .027, which translates to, that for every year in age, the level of trust in government goes up by 0.027.',
            author: { name: 'Stephen' }
          }],
          author: { name: 'Angelos' }
        });
      default:
        return res.status(404).json({
          code: 'NotFound',
          message: 'Could not find that post'
        });
    }
  }, 2000);
});



app.listen(8989);
