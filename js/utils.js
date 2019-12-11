'use strict';

var gIds = [];

function getRandomNumWithoutRepeats(min, max) { //returns random numbers without repeating them
    var indicator = true;
    while (indicator) {
        var num = getRandomInt(min, max + 1);
        if (!gIds.includes(num)) { //if the number does not exists in the array - meaning it wasn't chosen yet - add it to the array and return it
            gIds.push(num); //removes the num from the array
            indicator = false;
            return num;
        }
    }
}

function getRandomInt(min, max) { //generates a random number between min (inclusive) and max (exclusive)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getWord() { //returns a single 3-5 random letters word 
    var words = 'abcdefghijklmnopqrstuvwxyz' //representing all the English letters
    var word = '';
    var wordLength = getRandomInt(3, 6); //getting a random int between 3 and 5 (all inclusive)
    for (var i = 0; i < wordLength; i++) {
        var randLetter = words[getRandomInt(0, words.length)]; // guess one index for a letter
        word += randLetter;
    }
    return word;
}

function getLoremIpsum(wordsCount) { //calls the getWord function in a loop to create a sentence
    var sentence = '';
    for (var i = 0; i < wordsCount; i++) {
        sentence += getWord() + ' ';
    }
    return sentence;
}