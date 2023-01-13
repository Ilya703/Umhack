const login = async (browser) => {
    const page = await browser.newPage();

    await page.setViewport({ width: 1350, height: 600 });
  
    await page.goto('https://umschool.net/accounts/login/', { waitUntil: 'load'});
  
    await page.type('#check1', 'ilya.skobelev04@mail.ru');
    await page.type('#pswd', 'enotenot');
    await page.click('.btn-lg');

    await page.waitForSelector('.mb-2');
    await page.goto('https://umschool.net/homework/pool', { waitUntil: 'load'});

    return page;
}

export default login;