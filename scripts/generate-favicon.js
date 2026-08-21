import fs from 'fs';

const imgBase64 = fs.readFileSync('src/assets/images/brandlogo.png').toString('base64');

// Standard prominent brand favicon sizing (filling ~94% of the square bounding box)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${imgBase64}" x="12" y="12" width="488" height="488" preserveAspectRatio="xMidYMid meet" />
</svg>`;

if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

fs.writeFileSync('public/favicon.svg', svg);
fs.writeFileSync('src/assets/images/favicon.svg', svg);
console.log('Prominent Favicon created successfully!');
