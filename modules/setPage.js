import getRightPage from './getRightPage.js';

const setPage = async (page, pages, flagUntouchedHomework, i) => {
    if (flagUntouchedHomework && i == 0) await getRightPage(page, 1);
    else if (!flagUntouchedHomework) await getRightPage(page, pages);
    
    return false;
}

export default setPage;