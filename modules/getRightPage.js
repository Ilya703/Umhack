import closeReservedHomework from './closeReservedHomework.js';

const getRightPage = async (page, pages) => {
    await page.waitForSelector('.um-page-nav');
    await closeReservedHomework(page);
    const arrows = await page.$$('.um-page-nav');

    for(let arrowClick = 0; arrowClick < pages; ++arrowClick) {
        await arrows[1].evaluate(arrow => arrow.click());
        await new Promise((resolve) => setTimeout(() => resolve(), 600));
    }
    
    if (pages !== 0) await new Promise((resolve) => setTimeout(() => resolve(), 1500));
}

export default getRightPage;