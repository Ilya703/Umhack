import { getRandomComment }  from '../files/homeworks.js';

const typeComments = async (tasks, pointInputs, commentButtons, commentInputs) => {
    const usedComments = [];
    
    for(let task = 0; task < tasks.length; ++task) {
        const pText = await tasks[task].evaluate(text => text.textContent); 

        if (pText !== '') {
            await pointInputs[task].type('100');
        }

        await commentButtons[task].click();                       
        await new Promise((resolve) => setTimeout(() => resolve(), 1000));
        await commentInputs[task].click();
        await commentInputs[task].type(pText === '' ? 'Нет решения :(' : getRandomComment(usedComments));
        await new Promise((resolve) => setTimeout(() => resolve(), 1600));
    }
}

export default typeComments;