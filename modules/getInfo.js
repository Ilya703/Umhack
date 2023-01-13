const getInfo = async (links) => {
    const info = await links.$$('.text');
    const name = await info[0].evaluate(text => text.textContent);
    const homeworkName = await info[1].evaluate(text => text.textContent);
    const price = await info[2].evaluate(text => text.textContent);
    console.log(name);

    return { name, homeworkName, price };
}

export default getInfo;