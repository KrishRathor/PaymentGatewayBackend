import { PublicKey } from "@solana/web3.js";
import fs from "fs";

const appendToFile = (filePath: string, content: string): boolean => {
    try {
        fs.appendFileSync(filePath, content, 'utf-8');
        console.log("Written to file successfully");
        return true;
    }
    catch (error) {
        console.log("An Error occured ", error);
        return false;
    }
}

const merchantOnboarding = (
    merchantName: string, 
    marchantPublickey: string,
    merchantEmail: string,
    merchantContactNumber: number
    ) => {

        const info = {
            name: merchantName,
            publicKey: marchantPublickey,
            email: merchantEmail,
            contact: merchantContactNumber
        }

        const writeToFile = appendToFile("./demo.txt", JSON.stringify(info));

}