import { registerChatGPT } from "./gpt/chatgpt.js";


// commandMappings is a mapping of command names to function which returns the command object.

const commandMappings = {
    chatgpt: registerChatGPT,
};

export { commandMappings };
