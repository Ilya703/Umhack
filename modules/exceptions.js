const exceptions = async (homeworkName, page) => {
    let pointInputs = await page.$$('input[name=number_of_points]');
    let commentButtons = await page.$$('button[aria-controls^=collapseAnswerComment]');
    let commentInputs = await page.$$('div[id^=collapseAnswerComment] .fr-wrapper');

    switch(homeworkName) {
        case 'Пробный вариант':
            pointInputs = pointInputs.filter((item, index) => index >= 23);
            commentButtons = commentButtons.filter((item, index) => index >= 23);
            commentInputs = commentInputs.filter((item, index) => index >= 23);
            break;
        case '№10 | Работа в электронных таблицах и программирование (повторение). Решение заданий №3, 9, 17 КИМ | Задания основного уровня':
            pointInputs = pointInputs.filter((item, index) => index === 0 || index === 2);
            commentButtons = commentButtons.filter((item, index) => index === 0 || index === 2);
            commentInputs = commentInputs.filter((item, index) => index === 0 || index === 2);
            break;
        case 'Программирование | Списки | Задание №17 часть 1. | Задания основного уровня сложности':
            pointInputs = pointInputs.filter((item, index) => index === 0 || index === 2);
            commentButtons = commentButtons.filter((item, index) => index === 0 || index === 2);
            commentInputs = commentInputs.filter((item, index) => index === 0 || index === 2);
            break;
        case 'Программирование | Списки | Задание №17 часть 2. | Задания основного уровня сложности':
            pointInputs = pointInputs.filter((item, index) => index >= 4);
            commentButtons = commentButtons.filter((item, index) => index >= 4);
            commentInputs = commentInputs.filter((item, index) => index >= 4);
            break;
        case 'Основы программирования. Часть 3 | Cтроки':
            pointInputs = pointInputs.filter((item, index) => index === 4);
            commentButtons = commentButtons.filter((item, index) => index === 4);
            commentInputs = commentInputs.filter((item, index) => index === 4);
            break;
        case 'Программирование | Рекурсия | Задание №16 часть 1. | Задания основного уровня сложности':
            pointInputs = pointInputs.filter((item, index) => index >= 6);
            commentButtons = commentButtons.filter((item, index) => index >= 6);
            commentInputs = commentInputs.filter((item, index) => index >= 6);
            break;
        case 'Программирование | Рекурсия | Задание №16 часть 2. | Задания основного уровня сложности':
            pointInputs = pointInputs.filter((item, index) => index === 1 || index === 2 || index === 9 || index === 10 || index === 11);
            commentButtons = commentButtons.filter((item, index) => index === 1 || index === 2 || index === 9 || index === 10 || index === 11);
            commentInputs = commentInputs.filter((item, index) => index === 1 || index === 2 || index === 9 || index === 10 || index === 11);
            break;
        case 'Комбинаторика № 8 Часть 1 | Задания повышенной сложности':
            pointInputs = pointInputs.filter((item, index) => index === 0);
            commentButtons = commentButtons.filter((item, index) => index === 0);
            commentInputs = commentInputs.filter((item, index) => index === 0);
            break;
        case 'Комбинаторика № 8 Часть 2 | Задания повышенной сложности':
            pointInputs = pointInputs.filter((item, index) => index > 0);
            commentButtons = commentButtons.filter((item, index) => index > 0);
            commentInputs = commentInputs.filter((item, index) => index > 0);
            break;
        case 'Алгоритмы Чертежник и Робот / Задание №12':
            pointInputs = pointInputs.filter((item, index) => index >= 10);
            commentButtons = commentButtons.filter((item, index) => index >= 10);
            commentInputs = commentInputs.filter((item, index) => index >= 10);
            break;
        case 'Итоги месяца / Закрепление тем':
            pointInputs = pointInputs.filter((item, index) => index >= 8);
            commentButtons = commentButtons.filter((item, index) => index >= 8);
            commentInputs = commentInputs.filter((item, index) => index >= 8);
            break;
    }

    return { pointInputs, commentButtons, commentInputs };
}

export default exceptions;