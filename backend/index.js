const express = require("express");
const getConnection = require("./connections/connection.js");
const cors = require("cors");
const Auth = require('./routes/auth.routes.js');
const Error = require('./middleware/error.middleware.js');
const { Telegraf } = require('telegraf');
const User = require('./models/user.model');
const { getWeather } = require('./controllers/bot.controller');
const cron = require('node-cron');

const app = express();
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
getConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Telegram bot
bot.start((ctx) => ctx.reply('Welcome! Use /subscribe <city> for weather updates.'));
bot.command('subscribe', async (ctx) => {
    const [_, city] = ctx.message.text.split(' ');
    if (!city) return ctx.reply('Please provide a city: /subscribe <city>');
    try {
        await User.findOneAndUpdate(
            { telegramId: ctx.from.id.toString() },
            { telegramId: ctx.from.id.toString(), city, subscribed: true },
            { upsert: true }
        );
        ctx.reply(`Subscribed to ${city} weather updates!`);
    } catch (error) {
        console.error('Subscribe error:', error);
        ctx.reply('Failed to subscribe. Please try again.');
    }
});
bot.command('unsubscribe', async (ctx) => {
    try {
        await User.findOneAndUpdate(
            { telegramId: ctx.from.id.toString() },
            { subscribed: false },
            { new: true }
        );
        ctx.reply('Unsubscribed from weather updates.');
    } catch (error) {
        console.error('Unsubscribe error:', error);
        ctx.reply('Failed to unsubscribe. Please try again.');
    }
});
bot.launch();

// Schedule daily updates
cron.schedule('0 8 * * *', async () => {
    const users = await User.find({ subscribed: true, isBlocked: false });
    users.forEach(async (user) => {
        const weather = await getWeather(user.city);
        bot.telegram.sendMessage(user.telegramId, weather);
    });
});

// API routes
app.use('/auth', Auth);
app.use('/admin', require('./routes/admin.routes.js'));

// Error middleware
app.use(Error);

app.get("/", (req, res) => {
    res.send("API IS WORKING")
});

app.get("*", (req, res) => {
    res.status(404).send("API IS NOT FOUND");
});

app.listen(process.env.PORT || 4050, () => {
    console.log(`Listening on port ${process.env.PORT || 4050}`);
});