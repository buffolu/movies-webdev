const express = require('express');
const fs = require('fs');
const path = require('path');
const favoritesRoutes = require('./routes/favoritesRoutes');
const authRoutes = require('./routes/authRoutes');
const linkRoutes = require('./routes/linkRoutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();



const bodyParser = require('body-parser');

// Connect to MongoDB




const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(favoritesRoutes);
app.use(linkRoutes);
app.use( authRoutes);

//

app.use(express.static(path.join(__dirname, 'client')));
const mongoUrl = process.env.MONGO_URI;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));



// Movies Pages
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.get('/favorites', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/favorites.html'));
});

app.get('/details', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/details.html'));
});

// Update Favorites
app.post('/favorites', (req, res) => {
  const { email, imdbKey, action } = req.body; // `action` is "add" or "remove"

  const favoritesPath = path.join(__dirname, 'data/userFavorites.json');
  const favorites = JSON.parse(fs.readFileSync(favoritesPath, 'utf8'));

  if (!favorites[email]) favorites[email] = [];

  if (action === 'add') {
    if (!favorites[email].includes(imdbKey)) {
      favorites[email].push(imdbKey);
    }
  } else if (action === 'remove') {
    favorites[email] = favorites[email].filter((key) => key !== imdbKey);
  }

  fs.writeFileSync(favoritesPath, JSON.stringify(favorites, null, 2));
  res.send('Favorites updated successfully!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
