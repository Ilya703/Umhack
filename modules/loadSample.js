import { samples }  from '../files/homeworks.js';

const loadSample = async (page, sampleProperty) => {
    const sample = await page.$('#submission_form button.btn-orange-outline');

    await sample.click();
    await new Promise((resolve) => setTimeout(() => resolve(), 2000));

    const listContainer = await page.$('.list-container');
    await listContainer.evaluate(container => container.scrollBy(0, 2000));
    await new Promise((resolve) => setTimeout(() => resolve(), 2000));

    const sampleList = await page.$$('.comments-template-item');

    for(let sample = 0; sample <= samples; ++sample) {
        const sampleTitle = await sampleList[sample].evaluate(title => title.textContent);

        if (sampleTitle === sampleProperty) {
            sampleList[sample].click();
            await new Promise((resolve) => setTimeout(() => resolve(), 2000));
            break;
        }
    }
}

export default loadSample;