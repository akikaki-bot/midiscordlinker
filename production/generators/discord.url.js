"use strict";
exports.__esModule = true;
exports.getOauthUrl = void 0;
var tokens_1 = require("../secrets/tokens");
function getOauthUrl() {
    var state = crypto.randomUUID();
    var url = new URL('https://discord.com/api/oauth2/authorize');
    url.searchParams.set('client_id', tokens_1.DISCORD_CLIENT_ID);
    url.searchParams.set('redirect_uri', tokens_1.DISCORD_REDIRECT_URI);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('state', state);
    url.searchParams.set('scope', 'role_connections.write identify');
    url.searchParams.set('prompt', 'consent');
    return { state: state, url: url.toString() };
}
exports.getOauthUrl = getOauthUrl;
