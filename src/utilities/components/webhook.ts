//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

import { WebhookClient } from 'discord.js';

/**
 * A helper class to manage Discord webhooks.
 */
class WebhookHelper {
    /**
     * Creates a webhook client and sends a message to the webhook URL.
     * 
     * @param {string} wID - The ID of the webhook.
     * @param {string} wToken - The token associated with the webhook.
     * @param {string} [msg] - Optional message content to send.
     * @param {Array<any>} [embed] - Optional array of embed objects to send with the message.
     * @param {Array<any>} [file] - Optional array of files to send with the message.
     */
    async createWebhookClient(wID, wToken, msg, embed, file) {
        // Initialize a new WebhookClient instance with provided ID and token.
        const webhookClient = new WebhookClient({
            id: wID,
            token: wToken,
        });

        // Send a message using the webhook client with optional content, embeds, and files.
        await webhookClient.send({
            content: msg,
            embeds: embed,
            files: file,
        });
    }
}

// Export an instance of WebhookHelper for use elsewhere in the application.
module.exports = new WebhookHelper();