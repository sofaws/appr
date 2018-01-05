import fs from 'fs';

export function readPackageJSON() {
  return JSON.parse(fs.readFileSync('./package.json'));
}

export function writePackageJSON(content) {
  fs.writeFileSync('./package.json', JSON.stringify(content, null, 2));
}

export function readAppJSON() {
  return JSON.parse(fs.readFileSync('./app.json'));
}

export function writeAppJSON(content) {
  fs.writeFileSync('./app.json', JSON.stringify(content, null, 2));
}
