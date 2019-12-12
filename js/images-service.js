'use strict';

const MIN_ID = 100;
const MAX_ID = 1000;

var gImgs = [];
var gSearchWord;
var gSearches = [
    {
        key: 'happy',
        count: 0
    },
    {
        key: 'cute',
        count: 0
    },
    {
        key: 'funny',
        count: 0
    }
];

function createImg(url, keywords) {
    //creates a single img object and pushes it to the gimgs array
    let img = {
        id: getRandomNumWithoutRepeats(MIN_ID, MAX_ID + 1),
        url,
        keywords
    };
    gImgs.push(img);
}

function sortSearches(searches) {
    return searches.sort(sortByOccurance)
}

function sortByOccurance(search1, search2) {
    if (search1.count > search2.count) return 1;
    else if (search1.count < search2.count) return -1;
    else return 0;
}

function getSearches() {
    return gSearches;
}

function createImages() {
    //creates the images hard coded according to the existing picture stock in the folder
    createImg('imgs/001.jpg', ['happy', 'toy', 'story', 'toy-story', 'buz', 'cartoon']);
    createImg('imgs/002.jpg', ['sarcastic', 'putin', 'politics', 'funny']);
    createImg('imgs/003.jpg', ['sarcastic', 'trump', 'politics', 'funny', 'angry']);
    createImg('imgs/004.jpg', ['cute', 'puppies', 'happy']);
    createImg('imgs/005.jpg', ['happy', 'baby', 'puppy', 'adorable', 'friends']);
    createImg('imgs/006.jpg', ['cat', 'cute', 'evil', 'sleep']);
    createImg('imgs/007.jpg', ['baby', 'success', 'happy', 'victory']);
    createImg('imgs/008.jpg', ['think', 'sarcastic', 'funny']);
    createImg('imgs/009.jpg', ['baby', 'funny', 'sarcastic', 'adorable', 'evil']);
    createImg('imgs/010.jpg', ['fool', 'funny', 'sarcastic', 'famous', 'israel']);
    createImg('imgs/011.jpg', ['science', 'conspiracy', 'alien', 'weird']);
    createImg('imgs/012.jpg', ['baby', 'black', 'cute', 'friends']);
    createImg('imgs/013.jpg', ['obama', 'politics', 'funny', 'sarcastic']);
    createImg('imgs/014.jpg', ['wrestle', 'angry', 'enemy', 'evil', 'friends']);
    createImg('imgs/015.jpg', ['leo', 'dicaprio', 'movie', 'success', 'victory', 'cheers']);
    createImg('imgs/016.jpg', ['matrix', 'weird', 'science', 'glasses']);
    createImg('imgs/017.jpg', ['exactly', 'movie']);
    createImg('imgs/018.jpg', ['funny', 'sarcastic', 'science', 'star', 'wars', 'movie']);
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
    if (!isFiltered()) return gImgs;
    else return filter();
}

function filterImages(searchWord) {
    gSearchWord = searchWord.toLowerCase();
}

function filter() {
    //go through all the images
    //for each image go through its keywords array and see if it includes the gSerachWord.
    //if yes - return this image
    let filtereImgs = gImgs.filter(function (img, imgIdx) {
        for (let i = 0; i < img.keywords.length; i++) {
            if (img.keywords[i].includes(gSearchWord)) return img
        }
    });
    if (filtereImgs.length > 0) {
        //add this keyword to the searches array (successfull search) 
        //render the keywords bar (controller)
        addSearch(gSearchWord);
    }
    return filtereImgs;
}

function addSearch(keyword) {
    //if the searches array is empty - simply add the new keyword with counter=0
    //if the searches array is not empty but it doesnt contain the current keyword - simply add it with counter=0
    //if the seraches array is not empty and the keyword already exists - increase its counter
    let res = gSearches.filter(function (search) {
        return search.key.includes(keyword);
    });
    if (gSearches.length === 0 || res.length === 0) {
        let newSearch = {
            key: keyword,
            count: 0
        }
        gSearches.push(newSearch);
    } else {
        res.forEach(function (search) {
            search.count += 1;
        });
    }
}

function isFiltered() {
    if (!gSearchWord) return false;
    else return (gSearchWord.length >= 3);
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