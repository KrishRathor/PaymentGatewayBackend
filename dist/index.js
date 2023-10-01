"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const qr = __importStar(require("qrcode"));
const prisma = new client_1.PrismaClient();
const generateRandomHex = () => {
    const randomBuffer = (0, crypto_1.randomBytes)(Math.ceil(8));
    const hexString = randomBuffer.toString('hex').slice(0, length);
    return hexString;
};
const merchantOnboarding = (merchantName, marchantPublickey, merchantEmail, merchantContactNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomHex = generateRandomHex();
        yield prisma.merchant.create({
            data: {
                name: merchantName,
                publicKey: marchantPublickey,
                email: merchantEmail,
                contact: merchantContactNumber,
                apiKey: randomHex,
                verified: false
            }
        });
        console.log("Merchant successfully onboarded!");
    }
    catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
const generateQRCode = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const qrText = JSON.stringify(data);
    const qrCodeBuffer = yield qr.toBuffer(qrText);
    const base64Image = qrCodeBuffer.toString('base64');
    return `data:image/png;base64,${base64Image}`;
});
module.exports = { generateQRCode };
