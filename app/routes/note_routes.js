/**
 * Функция позволяет получить приветствие для навбара  
 * @returns строку, содержащую приветствие
 */
function getCurrentGreeting() {
    const currentTime = new Date();
    if (currentTime.getHours() >= 21 || currentTime.getHours() <= 6) return "Доброй ночи, {USERNAME}!";
    if (currentTime.getHours() >= 17) return "Доброго вечера, {USERNAME}!";
    if (currentTime.getHours() >= 12) return "Доброго дня, {USERNAME}!";
    
    return "Доброго утра, {USERNAME}!";
}

module.exports = function(app, db) {
    // Общая кипа информации для рендера страниц
    const renderInfo = {
        greeting: getCurrentGreeting()
    };

    let user = null;

    app.get('*', (req, res, next) => {
        // TODO: Авторизация пользователя из базы данных
        const {sessionID} = req.cookies;
        // ...
        user = {username: "TestUsername", authorized: false};
        renderInfo.greeting = renderInfo.greeting.replace("{USERNAME}", user.username);
        renderInfo.user = user;

        next();
    });
    
    // Главная страница
    app.get('/', (req, res) => {
        res.render('frontpage.html', renderInfo);
    });
};