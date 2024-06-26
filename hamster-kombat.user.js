// ==UserScript==
// @name         Hamster Kombat Web
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Запуск Hamster Kombat в браузере
// @author       mudachyo
// @match        *://*.hamsterkombat.io/*
// @grant        none
// @icon         https://hamsterkombat.io/images/icons/hamster-coin.png
// @downloadURL  https://github.com/js_rep/raw/main/hamster-kombat.user.js
// @updateURL    https://github.com/js_rep/raw/main/hamster-kombat.user.js
// @homepage     https://github.com/js_rep/
// ==/UserScript==

(function() {
    'use strict';

    // Функция для замены URL скрипта
    function replaceScriptUrl() {
        // Список URL-адресов для замены
        const urlsToReplace = [
            'https://hamsterkombat.io/js/telegram-web-app.js',
            'https://app.hamsterkombat.io/js/telegram-web-app.js'
        ];
        const newUrl = 'https://github.com/hudoznik/js_rep/raw/main/webTelegtamm.js';

        // Получаем все теги <script> на странице
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            // Проверяем, содержит ли src один из URL-адресов для замены
            if (urlsToReplace.includes(script.src)) {
                // Создаем новый тег <script> с новым URL
                const newScript = document.createElement('script');
                newScript.src = newUrl;
                newScript.type = 'text/javascript';

                // Заменяем старый тег на новый
                script.parentNode.replaceChild(newScript, script);
                console.log('Script URL replaced:', newScript.src);
            }
        }
    }

    // Наблюдатель за изменениями в DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                replaceScriptUrl();
            }
        });
    });

    // Настройки наблюдателя
    const config = {
        childList: true,
        subtree: true
    };

    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, config);

    // Первоначальный запуск замены URL
    replaceScriptUrl();
})();
