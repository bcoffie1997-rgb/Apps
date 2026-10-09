// Makes QR codes for door-to-door cards. Run: node scripts/make-qr.mjs
import QRCode from "qrcode";
import { writeFileSync } from "node:fs";

const codes = {
  "hi-en": "https://www.missedcallpros.com/hi",
  "hi-es": "https://www.missedcallpros.com/es/hi",
};
const opts = { margin: 2, color: { dark: "#0B0D12", light: "#FFFFFF" }, errorCorrectionLevel: "M" };
for (const [name, url] of Object.entries(codes)) {
  writeFileSync(`public/qr/${name}.svg`, await QRCode.toString(url, { ...opts, type: "svg" }));
  await QRCode.toFile(`public/qr/${name}.png`, url, { ...opts, width: 1200 });
  console.log(`public/qr/${name}.{svg,png} → ${url}`);
}
