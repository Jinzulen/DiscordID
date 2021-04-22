/**
 * @author Jinzulen
 * @license Apache 2.0
 * @copyright Copyright 2021 Khalil G. <https://github.com/Jinzulen>
 */

import fetch  from "node-fetch";
import { Flags } from "./Flags";

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
     * @param Flags
     *
     * Flags instance.
     */
    private Flags;

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
        /**
         * Instantiate Flags.
         */
        this.Flags = new Flags;

        /**
         * Add the bot token to
         * the authorization header.
         *
         * AUTHENTICATION REFERENCE: https://discord.com/developers/docs/reference#authentication
         */
        this.Headers["Authorization"] = `Bot ${botKey}`;
    }

    /**
     * Grab the user's profile.
     * 
     * @param userId string
     * 
     * @returns Promise
     */
    grabProfile(userId: string): Promise<Profile>
    {
        try
        {
            return new Promise((resolve, reject) =>
            {
                fetch(`${this.Gateway}/${userId}`, {
                    method: "GET",
                    headers: this.Headers
                }).then(Data => Data.json()).then(JSON => {
                    if (JSON.code)
                    {
                        return reject(JSON);
                    }

                    JSON["creation_stamp"] = this.grabUnix(JSON.id);
                    JSON["avatar"] = this.grabAvatar(JSON.id, JSON.avatar);
                    JSON["badges"] = this.Flags.deconstructFlags(JSON.public_flags);

                    return resolve(JSON);
                });
            });
        } catch (Exception) {
            throw (Exception as Error).message;
        }
    }

    /**
     * Grab account
     * creation timestamp.
     * 
     * USER ID (SNOWFLAKE) / 2 ^ 22 + DISCORD EPOCH
     * SNOWFLAKES REFERENCE: https://discord.com/developers/docs/reference#snowflakes
     *
     * @param userId 
     *
     * @returns number
     */
    grabUnix(userId: string): number
    {
        return Number(userId) / 4194304 + 1420070400000;
    }
    
    /**
     * Add to the raw
     * avatar data.
     *
     * @param userID string
     * @param avatarHash string
     *
     * @returns object
     */
    grabAvatar(userId: string, avatarHash: string): object
    {
        let Format = avatarHash.startsWith("a_") ? "gif" : "png";

        return {
            "hash"   : avatarHash,
            "format" : Format,
            "url"    : `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${Format}?size=1024`
        };
    }
};