'use strict';

var gCurrLang = 'en';



var gTrans = {
    'document-title': {
        en: 'The Book Shop',
        es: 'La Libreria',
        he: 'הספריה'
    },
    'title': {
        en: 'Welcome to the Book Shop',
        es: 'Bienvenido A La Libreria',
        he: 'ברוכים הבאים לספריה הממוחשבת'
    },
    'table-title': {
        en: 'Title',
        es: 'Nombre del libro',
        he: 'שם הספר'
    },
    'table-price': {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר',
    },
    'table-rate': {
        en: 'Rate',
        es: 'Tarifa',
        he: 'דירוג'
    },
    'table-actions': {
        en: 'Actions',
        es: 'Actiones',
        he: 'פעולות',
    },
    'table-read': {
        en: 'Read',
        es: 'Leer',
        he: 'קריאה',
    },
    'table-update': {
        en: 'Update',
        es: 'Actualizar',
        he: 'עדכן',
    },
    'table-delete': {
        en: 'Delete',
        es: 'Borrar',
        he: 'מחק',
    },
    'add-book-button': {
        en: 'Add',
        es: 'Agregar',
        he: 'הוסף'
    },
    'currency-symbol': {
        en: '$',
        es: '€',
        he: '₪'
    },
    'modal-update-title': {
        en: 'Update Book Price',
        es: 'Actualizar el precio del libro',
        he: 'עדכון מחיר הספר' 
    },
    'modal-update-price-message': {
        en: 'Update price for: ',
        es: 'Actualize precio para: ',
        he: 'עדכן מחיר עבור '
    },
    'modal-update-close-btn': {
        en: 'Close',
        es: 'Cerrar',
        he: 'סגור'
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