const { Create, ConcatFiles, DeleteFolder } = require('./functions');
const eventEmitter = require('./utils/EventHandler');

async function Main() {
  await DeleteFolder('files');

  for (let i = 1; i <= 5; i++) {
    await Create(i, `text${i}text${i}text${i}`);
  }

  await ConcatFiles();

  eventEmitter.on('fileProcessed', () => {
    eventEmitter.emit('readFile');
  });

  eventEmitter.emit('readFile');
}

eventEmitter.on('endProgram', () => {
  console.log('All files processed.');
});

Main();
