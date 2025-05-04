const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Simuler ton injectPath
let injectPath = path.join(__dirname, 'inject-test.js');

// Vérifie que inject-test.js existe
if (!fs.existsSync(injectPath)) {
  fs.writeFileSync(injectPath, 'console.log("Injected script running");');
}

// Normaliser le chemin
injectPath = path.normalize(injectPath);

// Construire la commande entière
const command = `node -r "${injectPath}" -e "console.log('Hello from main script')"`;

// spawn avec une string complète
const child = spawn(command, {
  shell: true
});

// Ecouter les sorties
child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});