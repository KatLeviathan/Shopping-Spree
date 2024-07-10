require('dotenv').config({ path: '.env' });
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./routes'); // Import the routes from routes/index.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // Middleware to parse JSON request bodies

app.use(routes);  // Use routes defined in routes/index.js

app.use((err, req, res, next) => {  // Error handling middleware
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});
