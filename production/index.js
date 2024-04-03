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
var express = require("express");
var tokens_1 = require("./secrets/tokens");
var discord_url_1 = require("./generators/discord.url");
var coockieParser = require("cookie-parser");
var token_1 = require("./oauth/token");
var getMe_1 = require("./oauth/getMe");
var stores_1 = require("./cache/stores");
var updateMetadata_1 = require("./oauth/updateMetadata");
var miauth_url_1 = require("./generators/miauth.url");
var app = express();
app.use(coockieParser(tokens_1.COOKIE_SECRET));
app.listen(tokens_1.PORT, function () { console.log("Server is running on port " + tokens_1.PORT); });
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("Hello World");
        return [2 /*return*/];
    });
}); });
app.get("/link", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, state, url;
    return __generator(this, function (_b) {
        _a = (0, discord_url_1.getOauthUrl)(), state = _a.state, url = _a.url;
        res.cookie('clientState', state, { maxAge: 1000 * 60 * 5, signed: true });
        res.redirect(url);
        return [2 /*return*/];
    });
}); });
app.get('/callback', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, discordSate, clientState, tokens, user, _a, uuid, url, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                code = req.query.code;
                discordSate = req.query.state;
                clientState = req.signedCookies.clientState;
                if (clientState !== discordSate)
                    return [2 /*return*/, res.status(403).send("invaild state")];
                return [4 /*yield*/, (0, token_1.getOauthToken)(code)];
            case 1:
                tokens = _b.sent();
                return [4 /*yield*/, (0, getMe_1.getUserData)(tokens)];
            case 2:
                user = _b.sent();
                return [4 /*yield*/, (0, stores_1.storeDiscordTokens)(user.id, {
                        access_token: tokens.access_token,
                        refresh_token: tokens.refresh_token,
                        expires_at: Date.now() + tokens.expires_in * 1000
                    })];
            case 3:
                _b.sent();
                return [4 /*yield*/, (0, miauth_url_1.MiAuthGenerator)()];
            case 4:
                _a = _b.sent(), uuid = _a.uuid, url = _a.url;
                res.cookie('misskeyclientState', JSON.stringify({ session: uuid, userId: user.id }), { maxAge: 1000 * 60 * 5, signed: true });
                res.redirect(url);
                return [3 /*break*/, 6];
            case 5:
                e_1 = _b.sent();
                console.error(e_1);
                return [2 /*return*/, res.status(500).send("Internal Server Error")];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.get('/micallback', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var session, _clientState, clientState, tokens, data, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                session = req.query.session;
                _clientState = req.signedCookies.misskeyclientState;
                clientState = JSON.parse(_clientState);
                if (clientState.session !== session)
                    return [2 /*return*/, res.status(403).send("invaild state")];
                return [4 /*yield*/, fetch(tokens_1.MISSKEY_HOST_URL + "/api/miauth/" + session + "/check", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + tokens_1.MISSKEY_ACCESS_TOKEN
                        }
                    })];
            case 1:
                tokens = _a.sent();
                return [4 /*yield*/, tokens.json()];
            case 2:
                data = _a.sent();
                return [4 /*yield*/, (0, updateMetadata_1.updateMetadata)(clientState.userId)];
            case 3:
                _a.sent();
                res.status(200).send("Successfully linked your account. DiscordId : " + clientState.userId);
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                console.error(e_2);
                return [2 /*return*/, res.status(500).send("Internal Server Error")];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post('/update-metadata', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.body.userId;
                return [4 /*yield*/, (0, updateMetadata_1.updateMetadata)(userId)];
            case 1:
                _a.sent();
                res.sendStatus(204);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
