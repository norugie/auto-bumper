const { Client } = require('discord.js-selfbot-v13');

const client = new Client();

const CHANNEL = process.env.CHANNEL_ID; // Replace with your channel ID
const BUMPER = process.env.BUMPER_ID; // Replace with the ID of the user who will send the bump command
const BUMP_COMMAND = '/bump'; // The command to send
const TOKEN = process.env.DISCORD_TOKEN; // Replace with your bot token

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);

    // Function to send the /bump command
    const sendBumpCommand = async () => {
        const channel = client.channels.cache.get(CHANNEL);
        if (channel) {
            await channel.sendSlash(BUMPER, BUMP_COMMAND);
            console.log('Bump command sent!');
        } else {
            console.log('Channel not found!');
        }

        // Calculate next interval with 2h + (1-3 random minutes)
        const nextInterval = 7200000 + (Math.floor(Math.random() * 3) + 1) * 60000;
        setTimeout(sendBumpCommand, nextInterval);
    };

    // Send the first bump command
    sendBumpCommand();
});
// Login to Discord with your app's token
client.login(TOKEN).catch(err => {
    console.error('Failed to login:', err);
});