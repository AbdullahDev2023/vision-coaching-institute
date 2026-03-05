const sharp = require("sharp");
const fs    = require("fs");

async function run() {
  const orig = fs.statSync("public/logo.png").size;
  console.log("Original PNG:", (orig / 1024).toFixed(1), "KB");

  // WebP — best compression, modern browsers
  const webpInfo = await sharp("public/logo.png")
    .resize(192, 192, { fit: "contain", background: { r:0,g:0,b:0,alpha:0 } })
    .webp({ quality: 85 })
    .toFile("public/logo.webp");
  console.log("logo.webp :", (webpInfo.size / 1024).toFixed(1), "KB");

  // Optimised PNG fallback
  const pngInfo = await sharp("public/logo.png")
    .resize(192, 192, { fit: "contain", background: { r:0,g:0,b:0,alpha:0 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile("public/logo-opt.png");
  console.log("logo-opt.png:", (pngInfo.size / 1024).toFixed(1), "KB");

  console.log("Done.");
}

run().catch(console.error);
