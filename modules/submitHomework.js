const submitHomework = async (page) => {
    const submitButton = await page.$('button.pre_compute_points');
    const sendButton = await page.$('#submit-button');
        
    await submitButton.click();

    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    await sendButton.click();
};

export default submitHomework;