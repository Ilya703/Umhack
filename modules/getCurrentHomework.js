const getCurrentHomework = async (page, i) => {
    await page.waitForSelector('.clickable .row-4');
    const links = await page.$$('.clickable .row-4');
    await links[i].waitForSelector('.text');

    return links[i];
}

export default getCurrentHomework;