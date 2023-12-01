function registerChatGPT() {
    return {
        name: "chatgpt",
        description: "Chat with GPT-3.",
        options: [
            {
                name: "message",
                type: 3,
                description: "The message to send to GPT-3.",
                required: true,
            },
        ],
    };
}

export { registerChatGPT };
