const closeHomework = async (page) => {
    await page.waitForSelector('.switcher');

    await page.click('.btn-orange-outline');
}

export default closeHomework;