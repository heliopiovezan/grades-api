import { promises as fs } from 'fs';
const { readFile } = fs;

let variavel = null;
const isLocal = async () => {
  try {
    variavel = await readFile('d:/file.txt', 'utf-8');
    if (variavel === 'Senha') {
      // db.url =
      //   'mongodb+srv://heliopiovezan:pi130307@heliopiovezan.oua6g.mongodb.net/desafio2?retryWrites=true&w=majority';
      console.log('local');
    }
  } catch (error) {
    console.log('erro' + error);
  }
};
isLocal();

console.log(variavel);
export { isLocal };
