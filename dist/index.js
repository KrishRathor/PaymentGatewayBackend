"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const appendToFile = (filePath, content) => {
    try {
        fs_1.default.appendFileSync(filePath, content, 'utf-8');
        console.log("Written to file successfully");
        return true;
    }
    catch (error) {
        console.log("An Error occured ", error);
        return false;
    }
};
const merchantOnboarding = (merchantName, marchantPublickey, merchantEmail, merchantContactNumber) => {
    const info = {
        name: merchantName,
        publicKey: marchantPublickey,
        email: merchantEmail,
        contact: merchantContactNumber
    };
    const writeToFile = appendToFile("./demo.txt", JSON.stringify(info));
};
merchantOnboarding("krish", "dfdfdf", "addg", 12324);
