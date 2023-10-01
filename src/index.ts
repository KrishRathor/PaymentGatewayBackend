import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import * as qr from "qrcode";

const prisma = new PrismaClient();

const generateRandomHex = (): string => {
    const randomBuffer = randomBytes(Math.ceil(8));
    const hexString = randomBuffer.toString('hex').slice(0, length);
    return hexString;
} 

const merchantOnboarding = async (
    merchantName: string, 
    marchantPublickey: string,
    merchantEmail: string,
    merchantContactNumber: number
    ) => {

        try {

            const randomHex = generateRandomHex()

            await prisma.merchant.create({
                data: {
                    name: merchantName,
                    publicKey: marchantPublickey,
                    email: merchantEmail,
                    contact: merchantContactNumber,
                    apiKey: randomHex,
                    verified: false
                }
            })
            console.log("Merchant successfully onboarded!");
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }

}

interface QRData {
    id: string,
    amount: number,
    unit: string
}

const generateQRCode = async (data: QRData): Promise<string> => {
    const qrText = JSON.stringify(data);
    const qrCodeBuffer = await qr.toBuffer(qrText);
    const base64Image = qrCodeBuffer.toString('base64');
    return `data:image/png;base64,${base64Image}`;
}

module.exports = { generateQRCode };