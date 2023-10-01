import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const merchantOnboarding = async (
    merchantName: string, 
    marchantPublickey: string,
    merchantEmail: string,
    merchantContactNumber: number
    ) => {

        try {
            await prisma.merchant.create({
                data: {
                    name: merchantName,
                    publicKey: marchantPublickey,
                    email: merchantEmail,
                    contact: merchantContactNumber,
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

merchantOnboarding("newname", "key", "email", 123)
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })

module.exports = { merchantOnboarding };