import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }
  return table;
}

const crcTable = createCRC32Table();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function generatePng(width, height, isMaskable = false) {
  // Raw scanlines: each row starts with filter byte 0
  const rowBytes = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowBytes);

  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = width * 0.46;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background gradient (deep emerald #064e3b to fresh emerald #059669)
      const gradT = (x + y) / (width + height);
      let r = Math.round(6 * (1 - gradT) + 5 * gradT);
      let g = Math.round(78 * (1 - gradT) + 150 * gradT);
      let b = Math.round(59 * (1 - gradT) + 105 * gradT);
      let a = 255;

      // Rounded squircle clipping for non-maskable icons
      if (!isMaskable) {
        // Squircle formula (x/r)^4 + (y/r)^4 <= 1
        const cornerR = width * 0.44;
        const sqDist = Math.pow(Math.abs(dx) / cornerR, 3.8) + Math.pow(Math.abs(dy) / cornerR, 3.8);
        if (sqDist > 1.0) {
          a = 0; // transparent outside rounded corner
        }
      }

      // Draw agricultural elements inside safe zone
      const relY = (y - cy) / height;
      const relX = (x - cx) / width;

      // Central Sprout & Plant stem
      if (Math.abs(relX) < 0.025 && relY > -0.25 && relY < 0.28) {
        // Golden green stem
        r = 234; g = 179; b = 8;
      }

      // Left leaf (tear shape)
      const lLeafDx = relX + 0.14;
      const lLeafDy = relY - 0.05;
      if (Math.sqrt(lLeafDx * lLeafDx * 1.8 + lLeafDy * lLeafDy) < 0.12 && relX < 0) {
        r = 52; g = 211; b = 153; // bright emerald leaf
      }

      // Right leaf
      const rLeafDx = relX - 0.14;
      const rLeafDy = relY + 0.04;
      if (Math.sqrt(rLeafDx * rLeafDx * 1.8 + rLeafDy * rLeafDy) < 0.12 && relX > 0) {
        r = 74; g = 222; b = 128; // green leaf
      }

      // Upper golden rice grain cluster
      const grainDx = relX - 0.08;
      const grainDy = relY + 0.22;
      if (Math.sqrt(grainDx * grainDx + grainDy * grainDy * 2) < 0.1) {
        r = 250; g = 204; b = 21; // golden harvest yellow
      }

      const grain2Dx = relX + 0.08;
      const grain2Dy = relY + 0.18;
      if (Math.sqrt(grain2Dx * grain2Dx + grain2Dy * grain2Dy * 2) < 0.09) {
        r = 254; g = 240; b = 138; // pale gold grain
      }

      // Bottom furrow / soil base
      if (relY > 0.28 && relY < 0.38 && Math.abs(relX) < 0.32) {
        r = 20; g = 83; b = 45; // deep soil green
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = createChunk('IHDR', ihdr);

  // IDAT (Deflated raw scanlines)
  const compressed = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);

  // IEND
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write PWA Android & iOS Icons
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generatePng(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generatePng(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generatePng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePng(180, 180, false));

console.log('Successfully generated PWA PNG icons in /public:');
console.log('- pwa-192x192.png');
console.log('- pwa-512x512.png');
console.log('- pwa-maskable-512x512.png');
console.log('- apple-touch-icon.png');
