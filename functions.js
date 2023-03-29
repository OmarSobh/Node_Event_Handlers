const { appendFile, unlink, readFile, rename, mkdir, rm } = require('node:fs/promises');
const { existsSync } = require('node:fs');
const path = require('node:path');

async function DeleteFolder(folder) {
  try {
    if (existsSync(path.join(__dirname, folder)))
      await rm(path.join(__dirname, folder),{ recursive: true, force: true });

    console.log(`the folder ${folder} doesn't exists any more`);
  } catch (error) {
    console.error(error);
  }
}

async function Create(n, str) {
  try {
    if (!existsSync(path.join(__dirname, 'files')))
      await mkdir(path.join(__dirname, 'files'));

    await appendFile(path.join(__dirname, 'files', `file${n}.txt`), `${str}\n`);
    console.log(`file${n}.txt has been created/updated`);
  } catch (error) {
    console.error(error);
  }
}

async function Read(n) {
  try {
    let data = await readFile(path.join(__dirname, 'files', `file${n}.txt`));
    return data.toString();
  } catch (error) {
    console.error(error);
  }
}

function GetRandNumber() {
  const MAX = 5, MIN = 1;
  return Math.round(Math.random() * (MAX - MIN) + MIN);
}

async function ConcatFiles() {
  try {
    if (existsSync(path.join(__dirname, 'files', 'concatTextFile.txt')))
      await unlink(path.join(__dirname, 'files', 'concatTextFile.txt'));

    let n = GetRandNumber();

    for (let i = 1; i <= n; i++) {
      let txt = await Read(i);
      await appendFile(path.join(__dirname, 'files', 'stringtxt.txt'), txt);
    }

    //rename 
    await rename(path.join(__dirname, 'files', 'stringtxt.txt'), path.join(__dirname, 'files', 'concatTextFile.txt'));

    console.log(`we read all the files from file1.txt to file${n}.txt and created the concat txt file`);

  } catch (error) {
    console.error(error);
  }

}

module.exports = { DeleteFolder, Create, ConcatFiles, GetRandNumber, Read }