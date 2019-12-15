'use strict';

var gCurrLang = 'en';



var gTrans = {
    'title': {
        en: 'Meme generator',
        es: 'Generador de memes',
        he: 'מחולל המימים'
    },
    'gallery-btn': {
        en: 'Gallery',
        es: 'Galeria',
        he: 'גלריה'
    },
    'memes-btn': {
        en: 'Memes',
        es: 'Memes',
        he: 'מימים'
    },
    'about-btn': {
        en: 'About',
        es: 'Nosotros',
        he: 'אודותינו',
    },
    'canvas-text': {
        en: 'Update your browser to enjoy canvas!',
        es: 'Actualiza tu nevegador para disfrutar al canvas',
        he: 'עדכן את הדפדפן כדי להנות מקנבס'
    },
    'placeholder-btn': {
        en: 'Text line',
        es: 'Linea de texto',
        he: 'שורת חיפוש',
    },
    'download-btn': {
        en: 'Download',
        es: 'Descargar',
        he: 'הורד',
    },
    'publish-btn': {
        en: 'Publish',
        es: 'Publicar',
        he: 'פרסם',
    },
    'all-rights-reserved': {
        en: 'All rights reserved 2019',
        es: 'Todos los derechos reservados 2019',
        he: 'כל הזכויות שמורות 2019',
    },
    'search-input': {
        en: 'Search',
        es: 'Busca',
        he: 'חיפוש',
    },
    'save-btn': {
        en: 'Save',
        es: 'Guardar',
        he: 'שמור'
    }
}


function doTrans() {//<option value="all" data-trans="filter-all">All</option>
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(function (element) {
        var transKey = element.dataset.trans;
        var translation = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (element.nodeName === 'INPUT') {
            element.setAttribute('placeholder', translation);
        } else {
            element.innerText = translation;
        }
    });
}


function getTrans(transKey) {
    return gTrans[transKey][gCurrLang];
}

function getConfirmMessage() {
    var str='';
    switch (gCurrLang) {
        case 'en':
           str='are you sure?';
           break;
        case 'es':
            str='estas seguro?';
            break;
        case 'he':
            str='האם אתה בטוח?';
    }
    return str;
}


function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(date) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(date);
}


function kmToMiles(km) {
    return km / 1.609;
}

function getCurrencySymbol(){
    switch (gCurrLang) {
        case 'es':
            return '€';
        case 'he':
            return '₪';
        default :
            return '$';
    }
}

function getCurrentLang() {
    return gCurrLang;
}