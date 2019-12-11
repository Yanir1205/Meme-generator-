'use strict';

const gMeme = {
    selectedImgId: null, //the image selected from the image gallery page
    selectedTxtIdx: null, //the text line currently selected on the editor page
    txts: []
}

function setSelectedImgId(imageId) {
    gMeme.selectedImgId = imageId;
}

function setSelectedTxtIdx(idx) {
    gMeme.selectedTxtIdx = idx;
}

function getNumOfTextLines() {
    return gMeme.txts.length;
}

function addTextLine(line, size, align, color) {
    let text = {
        line, //the text itself
        size, //font size
        align, //distance from the left edge of the canvas
        color //stroke color
    };
    gMeme.txts.push(text);
}

function getFontSize() {
    return gMeme.txts[gMeme.selectedTxtIdx].size;
}

function getAlign() {
    return gMeme.txts[gMeme.selectedTxtIdx].align;
}

function getFontColor() {
    return gMeme.txts[gMeme.selectedTxtIdx].color;
}

function getEditorImg() {
    return findImgById(gMeme.selectedImgId);
}

function getCurrTextLine() {
    return gMeme.txts[gMeme.selectedTxtIdx];
}

function deleteCurrTextLine() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1);
}

function changeTextLine(diff) {
    if ((gMeme.selectedTxtIdx + diff) < 0) {
        gMeme.selectedTxtIdx = gMeme.txts.length - 1;
    } else if ((gMeme.selectedTxtIdx + diff) > (gMeme.txts.length - 1)) {
        gMeme.selectedTxtIdx = 0;
    }
    else gMeme.selectedTxtIdx += diff;
}

function editCurrentTextLine(newLine) {
    gMeme.txts[gMeme.selectedTxtIdx].line = newLine;
}

function changeCurrTextColor(newColor) {
    gMeme.txts[gMeme.selectedTxtIdx].color = newColor;
}

function changeCurrTextAlign(newAlign) {
    gMeme.txts[gMeme.selectedTxtIdx].align = newAlign;
}

function changeCurrTextSize(newSize) {
    gMeme.txts[gMeme.selectedTxtIdx].size = newSize;
}