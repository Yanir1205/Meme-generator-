'use strict';

function init() {
    loadImgsFromLocalStorage(); //also updates the gIds to include all already taken IDs (in order to not repeat them)
    openGalleryMode();
    renderImages();
}

function onImgGalleryClick(imageId) {
    //set the current image id in the meme service
    //close the gallery div
    //open the editor div
    setSelectedImgId(imageId);
    openEditorMode();
    initEditor();
}

function openEditorMode() {
    let elGalleryDiv = document.querySelector('.image-gallery');
    let elEditorDiv = document.querySelector('.editor');
    elGalleryDiv.hidden = true;
    elEditorDiv.hidden = false;
}

function openGalleryMode() {
    let elGalleryDiv = document.querySelector('.image-gallery');
    let elEditorDiv = document.querySelector('.editor');
    elGalleryDiv.hidden = false;
    elEditorDiv.hidden = true;
}

function renderImages() {
    let images = getImagesToRender();
    let strHTML = '';
    images.forEach(function (img, imgIdx) {
        strHTML += `<li class="image">\n
        \t<img onclick="onImgGalleryClick(${img.id})" src="${img.url}">\n
    </li>\n`;
    });
    let elImgsList = document.querySelector('.images-list');
    elImgsList.innerHTML = strHTML;
}

/*
function renderBooks() {
    var strHTML = '';
    var books = getBooksToRender();
    books.forEach(function (book, bookIdx) {
        strHTML += `<tr class="${book.bookID}">\n\t<th scope="row">${bookIdx + 1}</th>\n\t`;
        strHTML += `<td>${book.title}</td>\n`;
        strHTML += `<td>${book.price}<span data-trans="currency-symbol"></span></td>\n`;
        strHTML += `<td>${book.rate}</td>\n`;
        strHTML += `<td><button type="button" class="btn btn-primary read-button-${bookIdx + 1}" data-toggle="modal" data-target="#exampleModalRead" data-trans="table-read" onclick="onRead(${book.bookID})">Read</button></td>\n`;
        strHTML += `<td><button type="button" class="btn btn-primary update-button-${bookIdx + 1}" data-toggle="modal" data-target="#exampleModalUpdate" data-trans="table-update" onclick="onUpdate(${book.bookID})">Update</button></td>\n`;
        strHTML += `<td><button type="button" class="btn btn-primary update-button-${bookIdx + 1}" data-toggle="modal" data-target="#exampleModal" data-trans="table-delete" onclick="onDelete(${book.bookID})">Delete</button></td>\n</tr>`;
    });
    var elTable = document.querySelector('.table-body');
    elTable.innerHTML = strHTML;
    doTrans();
    addHammerOnTable();
}
*/