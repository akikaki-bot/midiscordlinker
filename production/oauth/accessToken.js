"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getAccessToken = void 0;
var tokens_1 = require("../secrets/tokens");
var stores_1 = require("../cache/stores");
function getAccessToken(userId, tokens) {
    return __awaiter(this, void 0, void 0, function () {
        var url, body, response, tokens_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(Date.now() > tokens.expires_at)) return [3 /*break*/, 5];
                    url = 'https://discord.com/api/v10/oauth2/token';
                    body = new URLSearchParams({
                        client_id: tokens_1.DISCORD_CLIENT_ID,
                        client_secret: tokens_1.DISCORD_CLIENT_SECRET,
                        grant_type: 'refresh_token',
                        refresh_token: tokens.refresh_token
                    });
                    return [4 /*yield*/, fetch(url, {
                            body: body,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 2:
                    tokens_2 = _a.sent();
                    tokens_2.expires_at = Date.now() + tokens_2.expires_in * 1000;
                    return [4 /*yield*/, (0, stores_1.storeDiscordTokens)(userId, tokens_2)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, tokens_2.access_token];
                case 4: throw new Error("Error refreshing access token: [" + response.status + "] " + response.statusText);
                case 5: return [2 /*return*/, tokens.access_token];
            }
        });
    });
}
exports.getAccessToken = getAccessToken;
