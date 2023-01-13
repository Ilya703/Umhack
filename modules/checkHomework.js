import { homeworks }  from '../files/homeworks.js';

const checkHomework = async (tasks, homeworkName) => {
    let totalOK = true;
    let mistakes = 0;
    let emptyTasks = false;
    let mistakeTask = 0;

    for(let task = 0; task < tasks.length; ++task) {
        let ok = false;

        let pText = await tasks[task].evaluate(text => text.textContent);
        pText = pText.split(' ').join('');

        if(pText.includes(homeworks[homeworkName]['tasks'][task])) {
            ok = true;
        } else if (pText === '') {
            emptyTasks = true;
            ok = true;
        }

        if(!ok) {
            totalOK = false;
            ++mistakes;
            mistakeTask = task + 1;

            if (mistakes > 1) break;
        }
    }

    const sampleProperty = emptyTasks ? homeworks[homeworkName].sample : homeworks[homeworkName].sample100;

    return { totalOK, mistakes, mistakeTask, sampleProperty };
}

export default checkHomework;