'use strict';

const MIN_ID = 100;
const MAX_ID = 1000;

var gImgs = [];

function createImg(url, keywords) {
    //creates a single img object and pushes it to the gimgs array
    let img = {
        id: getRandomNumWithoutRepeats(MIN_ID, MAX_ID + 1),
        url,
        keywords
    };
    gImgs.push(img);
}

function createImages() {
    //creates the images hard coded according to the existing picture stock in the folder
    createImg('imgs/001.jpg', ['happy', 'toy', 'story', 'toy-story', 'buz', 'cartoon']);
    createImg('imgs/002.jpg', ['sarcastic', 'putin', 'politics', 'funny']);
    createImg('imgs/003.jpg', ['sarcastic', 'trump', 'politics', 'funny', 'angry']);
    createImg('imgs/004.jpg', ['cute', 'puppies', 'happy']);
    createImg('imgs/005.jpg', ['happy', 'baby', 'puppy', 'adorable', 'friends']);
    return gImgs;
}

function loadImgsFromLocalStorage() {
    //checks if there are any images in the local storage
    //if not - creates the hard coded images
    //also updates the gIDs array (utils) to include all already taken IDs !!!
    loadFromStorage('images', createImages());
}

function getImagesToRender() {
    //filters the images according to the current filter / search text line
    return gImgs;
}

function findImgById(imageId) {
    return gImgs.find(function (img) {
        return img.id === imageId;
    });
}

function findImgIndexById(imageId) {
    return gImgs.findIndex(function (img) {
        return img.id === imageId;
    });
}