"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
function formatMessage(user, msg) {
    return {
        user,
        msg,
        time: moment_1.default().format("h:mm a")
    };
}
exports.default = formatMessage;
