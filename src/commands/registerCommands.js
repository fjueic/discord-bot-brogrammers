import { REST, Routes } from "discord.js";
import { commandMappings } from "./commandMapping.js";
// commandMappings is a mapping of command names to function which returns the command object.
async function getRegisteredCommands(CLIENT_ID, GUILD_ID, BOT_TOKEN) {
    const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);
    try {
        const commands = await rest.get(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
        );
        console.log(commands);
        return commands;
    } catch (error) {
        console.error(
            "Error getting registered commands...\nTrying to register everything..."
        );
    }
    return [];
}

async function registerApplicationCommand(CLIENT_ID, GUILD_ID, BOT_TOKEN) {
    let applicationCommands = await getRegisteredCommands(
        CLIENT_ID,
        GUILD_ID,
        BOT_TOKEN
    );
    let commandsToRegister = [];
    for (const [commandName, commandFunction] of Object.entries(
        commandMappings
    )) {
        let command = applicationCommands.find(
            (command) => command.name === commandName
        );
        if (!command) {
            commandsToRegister.push(commandFunction());
        }
    }
    const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);
    try {
        if (commandsToRegister.length === 0){
            console.log("No new commands to register.");
            return;
        }
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commandsToRegister,
        });
        console.log("Successfully registered application commands.");
    } catch (error) {
        console.error("Error registering application commands.", error);
    }
}

export { registerApplicationCommand };
