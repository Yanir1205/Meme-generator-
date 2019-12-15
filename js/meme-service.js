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

function getTextByIdx(idx) {
    return gMeme.txts[idx];
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
        strokeColor, //line color
        width: gCtx.measureText(line).width //line width (calculated using gCtx.measureText and the current font size as saved on the gCtx)
    };
    gMeme.txts.push(text);
}

function getTextLineIdx(offsetX, offsetY) {
    //checks if the given offsetX and offsetY represent an area belongs to any existing text line on the canvas
    //if yes - returns the text line Idx
    //otherwise - returns null
    let texts = getAllTextLines();
    for (let i = 0; i < texts.length; i++) {
        let text = texts[i];
        if (offsetX >= text.x && offsetX <= (text.x + text.width) && offsetY >= (text.y - text.fontSize) && (offsetY <= text.y)) {
            return i;
        }
    }
    return null;
}

function getCurrStrokeColor() {
    return gMeme.txts[gMeme.selectedTxtIdx].strokeColor;
}

function setCurrStrokeColor(newStrokeColor) {
    gMeme.txts[gMeme.selectedTxtIdx].strokeColor = newStrokeColor;
}

function getCurrTextWidth() {
    return gMeme.txts[gMeme.selectedTxtIdx].width;
}

function setCurrTextWidth(newWidth) {
    gMeme.txts[gMeme.selectedTxtIdx].width = newWidth;
}

function getFontSize() {
    return gMeme.txts[gMeme.selectedTxtIdx].fontSize;
}

function setFontSize(newFontSizeDiff) {
    gMeme.txts[gMeme.selectedTxtIdx].fontSize += newFontSizeDiff;
}

function getFillColor() {
    return gMeme.txts[gMeme.selectedTxtIdx].fillColor;
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

function setTextLineXVal(xVal) {
    gMeme.txts[gMeme.selectedTxtIdx].x = xVal;
}

function setTextLineYVal(yVal) {
    gMeme.txts[gMeme.selectedTxtIdx].y = yVal;
}

function setTextLineXValDiff(diff) {
    gMeme.txts[gMeme.selectedTxtIdx].x += diff;
}

function setTextLineYValDiff(diff) {
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

function setCurrTextFillColor(newColor) {
    gMeme.txts[gMeme.selectedTxtIdx].fillColor = newColor;
}