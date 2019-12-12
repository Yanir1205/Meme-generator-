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

function getCurrSelectedTxtIdx() {
    return gMeme.selectedTxtIdx;
}

function getNumOfTextLines() {
    return gMeme.txts.length;
}

function getAllTextLines() {
    return gMeme.txts;
}

function addTextLine(line, fontSize, x, y, fillColor, strokeColor) {
    let text = {
        line, //the text itself
        fontSize, //font size
        x, //distance from the left edge of the canvas
        y, //distance from the top edge of the canvas
        fillColor, //font fill color
        strokeColor //line color
    };
    gMeme.txts.push(text);
}

function getFontSize() {
    return gMeme.txts[gMeme.selectedTxtIdx].size;
}

function setFontSize(newFontSizeDiff) {
    gMeme.txts[gMeme.selectedTxtIdx].fontSize += newFontSizeDiff;
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

function areThereAnyTextLines() {
    return (gMeme.txts.length > 0)
}

function setTextLineXVal(diff) {
    gMeme.txts[gMeme.selectedTxtIdx].x += diff;
}

function setTextLineYVal(diff) {
    gMeme.txts[gMeme.selectedTxtIdx].y += diff;
}

function getCurrTxtXVal() {
    return gMeme.txts[gMeme.selectedTxtIdx].x;
}

function getCurrTxtYVal() {
    return gMeme.txts[gMeme.selectedTxtIdx].y;
}

function deleteCurrTextLine() {
    if (gMeme.selectedTxtIdx <= gMeme.txts.length - 1)
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
    if (gMeme.txts.length === 0) {
        //this is the first line
        return false;
    } else if (gMeme.txts.length <= gMeme.selectedTxtIdx) {
        //there are text lines but this line is a new line to be added
        return false
    } else {
        gMeme.txts[gMeme.selectedTxtIdx].line = newLine;
        return true;
    }
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