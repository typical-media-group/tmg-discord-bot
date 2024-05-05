//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//


import { DiscordBot } from "./common/client";
import config from './utilities/config/config';

//--------------------------------------------------------------------//

import path from "node:path";
import fs from "node:fs";

//--------------------------------------------------------------------//

import readyEventHandler from "./common/bot/setup/bot";

//--------------------------------------------------------------------//

export const client = new DiscordBot(config.token);

//--------------------------------------------------------------------//

const eventsPath = path.join(__dirname, "common", "bot", "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args: any) => event.execute(...args));
  } else {
    client.on(event.name, (...args: any) => event.execute(...args));
  }
}


//--------------------------------------------------------------------//

// Specifically handle the 'ready' event.
client.once("ready", () => {
  // Ensure the ready event handler is properly imported or defined.
  readyEventHandler.execute(client);
});