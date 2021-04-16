<img align="right" width="100" height="100" src="https://discord.com/assets/41484d92c876f76b20c7f746221e8151.svg">

# DiscordID
[![Maintainability](https://img.shields.io/codeclimate/maintainability/Jinzulen/DiscordID?style=for-the-badge)](https://codeclimate.com/github/Jinzulen/DiscordID/maintainability) [![CodeFactor](https://www.codefactor.io/repository/github/jinzulen/discordid/badge?style=for-the-badge)](https://www.codefactor.io/repository/github/jinzulen/discordid) ![NPM Weekly Downloads](https://img.shields.io/npm/dm/discord-id.svg?style=for-the-badge)
#### A very simple tool for fetching a Discord user profile.

### Errors
These are the possible errors you could run into.

| # | Code | Message | Meaning
--- | --- | --- | ---
1 | 0 | 401: Unauthorized | You didn't enter a valid bot token.
2 | 10013 | Unknown User | The user ID you submitted doesn't match anyone.

### Usage Example
```js
const { Discord } = require("discord-id");

// A bot token is required for authorization.
const Client = new Discord("BOT_TOKEN");

// Despite the Discord user ID being an integer, when you
// input it here, make sure it's a string otherwise you risk
// receiving an error.
Client.grabProfile("236123737525583872").then(User =>
{
    console.log(User);

    /**
     * OUTPUT
     * 
     * { id: '236123737525583872',
     * username: 'Jin',
     * avatar: 'c0b547d5a6c43dc60bbdb3b2a5cfd872',
     * discriminator: '8303',
     * public_flags: 768 }
     *
     * HOW TO USE THE AVATAR HASH: https://cdn.discordapp.com/avatars/ID/AVATAR.png?size=1024
     */
}).catch(Error => {
    /**
     * ERROR HANDLING LOGIC HERE
     */
});
```

### License
This software is released as-is, for free and open-source under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html) license.

```
Copyright 2021 Khalil G.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```