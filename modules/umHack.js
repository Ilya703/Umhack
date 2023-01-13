import puppeteer from 'puppeteer';

import { homeworks }  from '../files/homeworks.js';
import { writeToProcessFile } from './writeToFile.js';

import login from './login.js';
import openHomework from './openHomework.js';
import checkHomework from './checkHomework.js';
import getTasks from './getTasks.js';
import getInfo from './getInfo.js';
import getCurrentHomework from './getCurrentHomework.js';
import setPage from './setPage.js';
import finishHomeworkCheck from './finishHomeworkCheck.js';

const umHack = async (pageStart, positionStart, pageEnd, positionEnd, showMode) => {
    const browser = await puppeteer.launch({ headless: !showMode });
    const page = await login(browser);
    let flagUntouchedHomework = false;
    let totalSum = 0;
    let homeworkAmount = 0;

    try {
        for(let pages = pageStart; pages <= pageEnd; ++pages) {
            let i = pages === pageStart ? positionStart : 0;

            while(i != 20) {
                flagUntouchedHomework = await setPage(page, pages, flagUntouchedHomework, i);

                const currentHomework = await getCurrentHomework(page, i);
                ++homeworkAmount;

                const { name, homeworkName, price } = await getInfo(currentHomework);
    
                if (homeworks[homeworkName]) {
                    await openHomework(currentHomework, page);
    
                    const tasks = await getTasks(page, homeworkName);

                    const { totalOK, mistakes, mistakeTask, sampleProperty } = await checkHomework(tasks, homeworkName);

                    const homeworkCheckResult = await finishHomeworkCheck(page, totalSum, totalOK, mistakes, mistakeTask, sampleProperty, name, price, homeworkName, tasks);

                    totalSum = homeworkCheckResult.totalSum;
                    i -= homeworkCheckResult.i;
                } else {
                    flagUntouchedHomework = true;

                    await writeToProcessFile({ homework: homeworkName, name });
                }

                if (pages === pageEnd && i === positionEnd) break;
                ++i;
            }
        }
        await writeToProcessFile({ homework: `homeworkAmount: ${homeworkAmount}` });

        await browser.close();
    } catch (e) {
        await writeToProcessFile({ homeworkAmount: homeworkAmount });

        await browser.close();
    }
};

export default umHack;