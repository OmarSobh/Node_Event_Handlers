const { EventEmitter } = require('node:events');
const { readdir, readFile } = require('node:fs/promises');
const path = require('node:path');
const { Read, GetRandNumber } = require('../functions');

const eventEmitter = new EventEmitter();

eventEmitter.on('readFile', async (fileCount = 0) => {
  let n = GetRandNumber();
  let fileContent = await Read(n);
  console.log(`Content of file${n}.txt:`);
  console.log(fileContent);

  if (fileCount === 4) {
    eventEmitter.emit('endProgram');
  } else {
    eventEmitter.emit('readFile', fileCount + 1);
  }
});

eventEmitter.on('endProgram', async () => {
  try {
    let files = await readdir(path.join(__dirname, 'files'));
    for (let i = 0; i < files.length; i++) {
      let data = await readFile(path.join(__dirname, 'files', files[i]));
      console.log(`********************`);
      console.log(data.toString());
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = eventEmitter;
