import { writeFile, appendFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const writeToFile = async ({ name, price, totalSum }) => {
    const pathToFile = path.join(__dirname, '../files', 'report.txt');

    // if (!existsSync(pathToFile)) {
    //     await writeFile(pathToFile, '📃 Report\n\n');
    //     await appendFile(pathToFile, 'Name 🎓                                Money 💸       Total 💰   \n\n');
    // }

    name = (name + '                                       ').slice(0, 40);
    price = (price + '               ').slice(0, 15);
    totalSum = (totalSum + '          ').slice(0, 10);

    await appendFile(pathToFile, `${name}${price}${totalSum}\n`);
};

const writeToProcessFile = async ({ name, homework, mistakes, price, mistakeTask, homeworkAmount }) => {
    const pathToFile = path.join(__dirname, '../files', 'process.txt');

    // if (!existsSync(pathToFile)) {
    //     await writeFile(pathToFile, '💻 Process\n\n');
    // }

    if (mistakes) {
        await appendFile(pathToFile, `❌ ${name} ${price} - № ${mistakeTask}\n`);
    } else if (homework) {
        await appendFile(pathToFile, `📕 ${homework} - ${name}\n`);
    } else if (homeworkAmount) {
        await appendFile(pathToFile, `⭐ ${homeworkAmount}\n`);
    }

};

export { writeToFile, writeToProcessFile };