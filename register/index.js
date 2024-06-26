const { ApplicationRoleConnectionMetadataType } = require("discord-api-types/v10")
const { DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID } = require("../production/secrets/tokens");

( async () => {
    const url = `https://discord.com/api/v10/applications/${DISCORD_CLIENT_ID}/role-connections/metadata`;

    const body = [
        {
            type : ApplicationRoleConnectionMetadataType.IntegerGreaterThanOrEqual,
            name : "misskey-role",
            description : "Misskeyと連携してるのかな（笑）",
            key : "misskeyauthrization"
        }
    ]

    const response = await fetch(url, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bot ${DISCORD_BOT_TOKEN}`
        },
        body : JSON.stringify(body)
    })

    if( response.ok ){
        console.log("Success");
        const json = await response.json();
        console.log(json);
    }
    else {
        console.error("Failed");
        console.error(response.statusText);
        console.error(await response.text());
    }
})();