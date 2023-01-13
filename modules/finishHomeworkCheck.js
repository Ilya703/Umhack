import { writeToFile, writeToProcessFile } from './writeToFile.js';
import closeHomework from './closeHomework.js';
import loadSample from './loadSample.js';
import submitHomework from './submitHomework.js';
import exceptions from './exceptions.js';
import typeComments from './typeComments.js';

const finishHomeworkCheck = async (page, totalSum, totalOK, mistakes, mistakeTask, sampleProperty, name, price, homeworkName, tasks) => {
    let i = 0;
    
    if (totalOK) {
        totalSum += +price;

        await writeToFile({ name, price, totalSum });

        const varsAfterExceptions = await exceptions(homeworkName, page);

        const pointInputs = varsAfterExceptions.pointInputs;
        const commentButtons = varsAfterExceptions.commentButtons;
        const commentInputs = varsAfterExceptions.commentInputs;

        await typeComments(tasks, pointInputs, commentButtons, commentInputs);

        await loadSample(page, sampleProperty);

        await submitHomework(page);

        ++i;

    } else {
        if (mistakes === 1 && price >= 20) {
            await writeToProcessFile({ name, mistakes, price, mistakeTask });
        }
        
        await closeHomework(page);
    }

    return { totalSum, i} ;
}

export default finishHomeworkCheck;