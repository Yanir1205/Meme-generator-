'use strict';

function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
}

function loadFromStorage(key, defaultValue) {
    var str = localStorage.getItem(key);
    if (str) {
        if (str.length === 0 || str === '[]') {
            str = null;
        }
    }
    return (str) ? JSON.parse(str) : defaultValue
}