import QRCode from "qrcode";

export default async function generateQRCode(text: string) {
  try {
    return await QRCode.toDataURL(text, {
      scale: 6,
      margin: 2,
      type: "image/webp",
      color: { dark: "#ff254fff" },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }
  }
}
