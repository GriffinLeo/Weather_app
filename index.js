import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

const apiKey = 'e6fb142d26ce21e99b5744d454ee5844';  // Replace with your actual API key

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.render('index', { weather: null, error: 'Please enter a city' });
    }
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const weather = response.data;
        const weatherText = `It's ${weather.main.temp} degrees Celsius with ${weather.weather[0].description} in ${weather.name}, ${weather.sys.country}.`;
        res.render('index', { weather: weatherText, error: null });
    } catch (error) {
        res.render('index', { weather: null, error: 'City not found, please try again.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
