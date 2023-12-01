import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import {registerApplicationCommand} from "./commands/registerCommands.js";
config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
const BOT_TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

async function main() {
    client.login(BOT_TOKEN);
    await registerApplicationCommand(CLIENT_ID, GUILD_ID, BOT_TOKEN);
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
}

main();
