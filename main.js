import umHack from "./modules/umHack.js";

const runUmHack = async (pageStart, positionStart, pageEnd, positionEnd, showMode) => {
    await umHack(pageStart - 1, positionStart - 1, pageEnd - 1, positionEnd - 1, showMode);
};

await runUmHack(1, 11, 100, 20, true);
// pageStart positionStart pageEnd positionEnd showMode
// 12.01.23 16:00