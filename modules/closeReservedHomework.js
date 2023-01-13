import closeHomework from "./closeHomework.js";

const closeReservedHomework = async (page) => {
    try {
        const btn = await page.$('.btn-orange-outline');

        btn.click();
        await closeHomework(page);

    } catch (e) {}
}

export default closeReservedHomework;