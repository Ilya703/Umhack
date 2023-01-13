const openHomework = async (links, page) => {
    await links.evaluate(homework => homework.click());
    await new Promise((resolve) => setTimeout(() => resolve(), 1200));
    await page.click('.mt-3 .btn-orange');
    await new Promise((resolve) => setTimeout(() => resolve(), 800));
}

export default openHomework;