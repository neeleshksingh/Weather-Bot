const axios = require('axios');
const getWeather = async (city) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
    return `Weather in ${city}: ${response.data.main.temp}°C, ${response.data.weather[0].description}`;
};
module.exports = { getWeather };