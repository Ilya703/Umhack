import puppeteer from 'puppeteer';

import login from './modules/login.js';
import closeHomework from './modules/closeHomework.js';

import { homeworks, samples, getRandomComment }  from './modules/homeworks.js';
import { writeToFile, writeToProcessFile } from './modules/writeToFile.js';

const runUmHack = async (pageEnd, positionEnd = 20, pageStart = 1, positionStart = 1) => {
    --pageStart;
    --positionStart;
    --pageEnd;
    --positionEnd;

    const browser = await puppeteer.launch({ headless: false });
    const page = await login(browser);
    let flagLastUntouchedHomework = 0;
    let totalSum = 0;

    try {
        for(let pages = pageStart; pages <= pageEnd; ++pages) {
            let i = pages === pageStart ? positionStart : 0;
            if (flagLastUntouchedHomework === 19) await page.goto('https://umschool.net/homework/pool');
            flagLastUntouchedHomework = 0;
            while(i != 20) {
                await page.waitForSelector('.um-page-nav');
                const arrows = await page.$$('.um-page-nav');
                for(let arrowClick = 0; arrowClick < pages; ++arrowClick) {
                    await arrows[1].evaluate(arrow => arrow.click());
                    await new Promise((resolve) => setTimeout(() => resolve(), 2000));
                }
                await page.waitForSelector('.clickable .row-4');
                const links = await page.$$('.clickable .row-4');
                await links[i].waitForSelector('.text');
                const info = await links[i].$$('.text');
                const name = await info[0].evaluate(text => text.textContent);
                const homeworkName = await info[1].evaluate(text => text.textContent);
                const price = await info[2].evaluate(text => text.textContent);
                await writeToProcessFile({ name });
    
                if (homeworks[homeworkName]) {
                    await links[i].evaluate(homework => homework.click());
                    await new Promise((resolve) => setTimeout(() => resolve(), 2000));
                    await page.click('.mt-3 .btn-orange');
                    await new Promise((resolve) => setTimeout(() => resolve(), 2000));
    
                    await page.waitForSelector('.mb-4 .mt-1 div .fr-box .fr-wrapper .fr-element');
                    let tasks = await page.$$('.mb-4 .mt-1 div .fr-box .fr-wrapper .fr-element');
                    let totalOK = true;
                    let emptyTasks = false;
    
                    if (tasks.length === 2 * homeworks[homeworkName]['tasks'].length) {
                        tasks = tasks.filter((item, index) => index % 2 === 0);
                    }
    
                    for(let task = 0; task < tasks.length; ++task) {
                        let ok = false;
    
                        const pText = await tasks[task].evaluate(text => text.textContent);
    
                        for(let answer = 0; answer < homeworks[homeworkName]['tasks'][task].length; ++answer) {
                            if(pText.includes(homeworks[homeworkName]['tasks'][task][answer])) {
                                ok = true;
                                break;
                            } else if (pText === '') {
                                emptyTasks = true;
                                ok = true;
                            }
                        }
    
                        if(!ok) {
                            totalOK = false;
                            break;
                        }
                    }
    
                    const sampleProperty = emptyTasks ? homeworks[homeworkName].sample : homeworks[homeworkName].sample100;
                    
                    if (totalOK) {
                        totalSum += +price;
                        await writeToFile({ name, price, totalSum });
                        let pointInputs = await page.$$('input[name=number_of_points]');
                        let commentButtons = await page.$$('button[aria-controls^=collapseAnswerComment]');
                        let commentInputs = await page.$$('div[id^=collapseAnswerComment] .fr-wrapper');
                        const sample = await page.$('#submission_form button.btn-orange-outline');
                        const submitButton = await page.$('button.pre_compute_points');
                        const sendButton = await page.$('#submit-button');
                        const usedComments = [];
    
                        if (homeworkName === 'Пробный вариант') {
                            pointInputs = pointInputs.filter((item, index) => index >= 23);
                            commentButtons = commentButtons.filter((item, index) => index >= 23);
                            commentInputs = commentInputs.filter((item, index) => index >= 23);
                        }
                        
                        for(let task = 0; task < tasks.length; ++task) {
                            const pText = await tasks[task].evaluate(text => text.textContent); 
                            if (pText !== '') {
                                await pointInputs[task].type('100');
                            }
                            await commentButtons[task].click();                       
                            await new Promise((resolve) => setTimeout(() => resolve(), 1000));
                            await commentInputs[task].click();
                            await commentInputs[task].type(pText === '' ? 'Нет решения :(' : getRandomComment(usedComments));
                            await new Promise((resolve) => setTimeout(() => resolve(), 2000));
                        }
    
                        await sample.click();
                        await new Promise((resolve) => setTimeout(() => resolve(), 4000));
                        const sampleList = await page.$$('.comments-template-item');
                        for(let sample = 0; sample <= samples; ++sample) {
                            const sampleTitle = await sampleList[sample].evaluate(title => title.textContent);
            
                            if (sampleTitle == sampleProperty) {
                                sampleList[sample].click();
                                await new Promise((resolve) => setTimeout(() => resolve(), 2000));
                                break;
                            }
                        }
    
                        await submitButton.click();
                        await new Promise((resolve) => setTimeout(() => resolve(), 1000));
                        await sendButton.click();
                        --i;
    
                    } else {
                        await closeHomework(page);
                    }
                } else {
                    flagLastUntouchedHomework = i;
                    await writeToProcessFile({ homeworkName });
                }
                if (pages === pageEnd && i === positionEnd) break;
                ++i;
            }
        }
    
        await browser.close();
    } catch (e) {
        console.log(e);
        await writeToFile({ name: '', price: '', totalSum });

        await browser.close();
    }
};

await runUmHack(4, 18, 4, 8);
// pageEnd positionEnd pageStart positionStart
// 17.12.22 20:58