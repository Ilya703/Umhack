import { homeworks }  from '../files/homeworks.js';

const getTasks = async (page, homeworkName) => {
    await page.waitForSelector('.mb-4 .mt-1 div .fr-box .fr-wrapper .fr-element');
    let tasks = await page.$$('.mb-4 .mt-1 div .fr-box .fr-wrapper .fr-element');

    if (tasks.length === 2 * homeworks[homeworkName]['tasks'].length) {
        tasks = tasks.filter((item, index) => index % 2 === 0);
    }

    return tasks;
}

export default getTasks;