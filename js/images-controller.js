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

function toggleMenu() {
    let mainMenu = document.querySelector('.nav-buttons');
    mainMenu.classList.toggle('open');
    let elToggleScreen = document.querySelector('.toggle-menu-screen');
    elToggleScreen.classList.toggle('open');
}

function onGalleryBtnClick() {
    openGalleryMode();
    let elPublishBtn = document.querySelector('.publish-btn');
    elPublishBtn.style.display = 'block';
    let elShareContainer = document.querySelector('.share-container');
    elShareContainer.innerHTML = '';
}

function openEditorMode() {
    let elGalleryDiv = document.querySelector('.image-gallery');
    let elEditorDiv = document.querySelector('.editor');
    elGalleryDiv.hidden = true;
    elEditorDiv.hidden = false;
    //make gallery button inactive - so that user can press it to go back to the images gallery
    let elGalleryBtn = document.querySelector('.gallery');
    elGalleryBtn.classList.remove("active");
}

function openGalleryMode() {
    let elGalleryDiv = document.querySelector('.image-gallery');
    let elEditorDiv = document.querySelector('.editor');
    elGalleryDiv.hidden = false;
    elEditorDiv.hidden = true;
    //make gallery button active again
    let elGalleryBtn = document.querySelector('.gallery');
    elGalleryBtn.classList.add("active");
}

function renderImages() {
    let images = getImagesToRender();
    renderSearchBar();
    let strHTML = '';
    images.forEach(function (img, imgIdx) {
        strHTML += `<li class="image">\n
        \t<img onclick="onImgGalleryClick(${img.id})" src="${img.url}">\n
    </li>\n`;
    });
    let elImgsList = document.querySelector('.images-list');
    elImgsList.innerHTML = strHTML;
}

function renderSearchBar() {
    let searches = getSearches();
    let sortedSearcehs = sortSearches(searches);
    let maxIdx = Math.min(4, sortedSearcehs.length); //we wish to display only the 4 top searches
    let elKeywordsDiv = document.querySelector('.keywords-search');
    let strHTML = '';
    for (let i = 0; i < maxIdx; i++) {
        strHTML += `<div class="keyword" onclick="onKeywordClick(this)">${sortedSearcehs[i].key}</div>\n`
    }
    elKeywordsDiv.innerHTML = strHTML;
}

function onSearchImg() {
    //filter the images according to their keywords
    //make input value to lower case (all keywords are lowercase) and use includes
    let elSearchInput = document.querySelector('.search-img-input');
    filterImages(elSearchInput.value);
    renderImages();
}

function onKeywordClick(elKeyword) {
    filterImages(elKeyword.innerText);
    renderImages();
}