/**
 * @author Jinzulen
 * @license Apache 2.0
 * @copyright Copyright 2021 Khalil G. <https://github.com/Jinzulen>
 */

import * as Fetch from "node-fetch";

interface Profile
{
    id: string;
    avatar: string;
    username: string;
    public_flags: number;
    discriminator: string;
}

export default class DiscordAPI
{
    /**
     * @param Headers object
     * 
     * Request Headers.
     */
    private Headers: {} = {
        "User-Agent": "Jinzulen/DiscordID"
    };

    /**
     * @param Gateway string
     * 
     * Discord API Endpoint.
     */
    private readonly Gateway: string = "https://discord.com/api/users";

    constructor(botKey: string)
    {
        this.Headers["Authorization"] = `Bot ${botKey}`;
    }

    grabProfile(userId: string): Promise<Profile>
    {
        try
        {
            return new Promise((resolve, reject) =>
            {
                Fetch(`${this.Gateway}/${userId}`, {
                    method: "GET",
                    headers: this.Headers
                }).then(Data => Data.json()).then(JSON => {
                    if (JSON.code)
                    {
                        reject(JSON);
                    }

                    /**
                     * Grab account creation timestamp.
                     * 
                     * USER ID (SNOWFLAKE) / 2 ^ 22 + DISCORD EPOCH
                     * SNOWFLAKES REFERENCE: https://discord.com/developers/docs/reference#snowflakes
                     */
                    JSON["creation_stamp"] = JSON.id / 4194304 + 1420070400000;

                    resolve(JSON);
                });
            });
        } catch (Exception) {
            throw (Exception as Error).message;
        }
    }
};