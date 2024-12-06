"use client"
import app from "@/config/firebaseConfig";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

export const convertImage = async (imageUrl: string) => {
    try {
        const response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
        });
        const base64Image = Buffer.from(response.data, "binary").toString(
            "base64"
        );
        const contentType = response.headers["content-type"];
        return `data:${contentType};base64,${base64Image}`
    } catch (e: any) {
        console.log("Error coverting base 64 image");
        throw new Error(`An error occurred: ${e.message || e}`); // 抛出异常

    }
};

export const imageToBase64 = async ({ imageUlr = "", fileNmae = "", imageType = "jpg" }: any) => {
    try {
        const storage = getStorage(app);
        const base64Image: any = await convertImage(imageUlr);
        const fileName = `/${fileNmae}/` + Date.now() + "." + imageType;
        const imageRef = ref(storage, fileName);
        await uploadString(imageRef, base64Image, "data_url")
        const downloaderUrl = await getDownloadURL(imageRef);
        return downloaderUrl
    } catch (error) {
        return ''
    }
}