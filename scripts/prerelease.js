const fs = require('fs-extra');

const filenames = ['android/src',
                  'android/libs',
                  'android/@ihealth_ihealthlibrary-react-native.iml',
                  'android/build.gradle',
                  'android/proguard-rules.pro',
                  'module',
                  'index.js',
                  'package.json'];

const srcPath = 'node_modules/@ihealth/ihealthlibrary-react-native/';
const destPath = '../../';

async function task(filename) {
  try {
    const exists = await fs.pathExists(destPath + filename)
    console.log(`${filename} is exists ${exists}`);
    if (exists) {
      await fs.remove(destPath + filename)
    }
    const result = await fs.copy(srcPath + filename, destPath + filename);
    console.log(`${filename} copied!`);
  } catch (err) {
    console.error(err)
  }
}

filenames.forEach((filename) => {
  task(filename);
})
