/**
 * @author Jinzulen
 * @license Apache 2.0
 * @copyright Copyright 2021 Khalil G. <https://github.com/Jinzulen>
 */

interface Badge
{
    id: number;
    name: string;
};

export class Flags
{
    /**
     * @param Flags object
     *
     * Discord's public flags' definitions.
     *
     * REFERENCE: https://discord.com/developers/docs/resources/user#user-object-user-flags
     */
    private readonly Flags: {} = {
        "Discord Employee"             : 1 << 0,
        "Partnered Server Owner"       : 1 << 1,
        "HypeSquad Events"             : 1 << 2,
        "Bug Hunter Level 1"           : 1 << 3,
        "House Bravery"                : 1 << 6,
        "House Brilliance"             : 1 << 7,
        "House Balance"                : 1 << 8,
        "Early Supporter"              : 1 << 9,
        "Team User"                    : 1 << 10,
        "Bug Hunter Level 2"           : 1 << 14,
        "Verified Bot"                 : 1 << 16,
        "Early Verified Bot Developer" : 1 << 17
    };

    /**
     * @param Badges object
     *
     * User badges store.
     */
    private Badges: Array<Badge> = [];
    
    /**
     * @param publicFlags number
     *
     * Grab the user's profile badges.
     *
     * @returns Array
     */
    deconstructFlags(publicFlags: number): Array<Badge>
    {
        /**
         * This user has no badges
         * so return "none".
         */
        if (publicFlags == 0)
        {
            this.Badges.push({
                "id": 0,
                "name": "None"
            });
        }

        /**
         * Sort through the available
         * flag options and perform a
         * bitwise AND operation to check
         * whether the submitted user flags
         * match any of them.
         * 
         * If any of them match, insert
         * them into the temp store
         * and serve them.
         */
        for (var Flag in this.Flags)
        {
            if (publicFlags & this.Flags[Flag])
            {
                this.Badges.push({
                    "id": this.Flags[Flag],
                    "name": Flag
                });
            }
        }

        return this.Badges;
    }
};