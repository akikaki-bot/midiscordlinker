"use strict";
exports.__esModule = true;
exports.MiAuthGenerator = void 0;
var tokens_1 = require("../secrets/tokens");
var crypto_1 = require("crypto");
function MiAuthGenerator() {
    var uuid = (0, crypto_1.randomUUID)();
    return {
        uuid: uuid,
        url: "https://" + tokens_1.MISSKEY_HOST_URL + "/miauth/" + uuid + "?name=MisskeyRoleConnection&callback=" + tokens_1.MISSKEY_REDIRECT_URI + "&permission=read:account"
    };
}
exports.MiAuthGenerator = MiAuthGenerator;
