'use strict';

const CANVAS_WIDTH = 500; //default canvas width for desktop resolution
const CANVAS_HEIGHT = 500; //default canvas height for desktop resolution

//canvas variables:
var gCanvas;
var gCtx;
var gImg;
var gCanvasResizeFactor = 1;

//drawing values:
var gFontSize = 40;
var gX; //X value for the text line to be added
var gY; //Y value for the text line to be added
var gStrokeColor = '#000000';
var gFillColor = '#ffffff';

function initEditor() {
    gCanvas = document.querySelector('.my-canvas');
    gCtx = gCanvas.getContext('2d');
    gImg = undefined;
    drawImg();
    setSelectedTxtIdx(0);
    setDrawingValues();
    renderCanvas();
    ////// PART 8 //////
    // resizeCanvas()

    // ////// PART 8.1 //////
    // window.addEventListener('resize',
    //     function () {
    //         gCanvas.width = window.innerWidth - 50
    //         gCanvas.height = window.innerHeight - 100;
    //         drawImg()
    //         drawLine(10, 10, 200, 500)
    //     })
}

function setTextCoordinates(text) {
    //sets the x and y values for the line to be added
    //according to the text width, the canvas sizes and the number of text lines already added
    //x values are always the same - middle of the canvas depending on the text width (font size * text length)
    gX = gCanvas.offsetWidth / 2 - ((text.length / 2) * gFontSize);
    // gCtx.textAlign = "center";
    // let currNumOfTextLines = getNumOfTextLines();
    let currNumOfTextLines = getNumOfTextLines();
    if (!currNumOfTextLines || currNumOfTextLines === 0) {
        //if this is the first text line - add to the top
        gY = gFontSize * 2;
    } else if (currNumOfTextLines === 1) {
        //if this is the second text line - add to the bottom
        gY = gCanvas.height - (gFontSize * 2);

        // gOffsetY = gCanvas.offsetHeight - gFontSize * 2;
    } else {
        //if this is the third or more text line - add to the centers
        gY = gCanvas.offsetHeight / 2 - (gFontSize / 2);
    }
}

function drawImg() {
    if (gImg)
        gCtx.drawImage(gImg, 0, 0);
    else {
        gImg = new Image()
        gImg.onload = () => {
            gCtx.drawImage(gImg, 0, 0);
        };
        gImg.src = (getEditorImg()).url;
    }
    // NOTE: the proportion of the image - should be as the canvas,
    // otherwise the image gets distorted
}

function drawText(txt, x, y) { //gets the text line to be added and the coordinates of where to put it on the canvas
    gCtx.strokeText(txt, x, y);
    gCtx.fillText(txt, x, y);
}

function onSetStrokeColor(ev) {
    let elColor = document.querySelector('.stroke-color-picker');
    gStrokeColor = elColor.value;
    setDrawingValues();
    if (areThereAnyTextLines()) {
        setCurrStrokeColor(elColor.value);
        renderCanvas();
    }
}

function onMoveRowUp() {
    if (areThereAnyTextLines()) { //only enable movement if there are text lines. otherwise - do nothing
        //update the model with the new y values. increased by 10 at a time
        //render the canvas
        let diff = -10;
        if (!isExceedingCanvasHeight(diff)) {
            setTextLineYVal(diff);
            renderCanvas();
        }
    }
}

function onMoveRowDown() {
    if (areThereAnyTextLines()) { //only enable movement if there are text lines. otherwise - do nothing
        //update the model with the new y values. increased by 10 at a time
        //render the canvas
        let diff = 10;
        if (!isExceedingCanvasHeight(diff)) {
            setTextLineYVal(diff);
            renderCanvas();
        }
    }
}

function onMoveRowLeft() {
    if (areThereAnyTextLines()) { //only enable movement if there are text lines. otherwise - do nothing
        //update the model with the new y values. increased by 10 at a time
        //render the canvas
        let diff = -10;
        if (!isExceedingCanvasWidth(diff)) {
            setTextLineXVal(diff);
            renderCanvas();
        }
    }
}

function onMoveRowRight() {
    if (areThereAnyTextLines()) { //only enable movement if there are text lines. otherwise - do nothing
        //update the model with the new y values. increased by 10 at a time
        //render the canvas
        let diff = 10;
        if (!isExceedingCanvasWidth(diff)) {
            setTextLineXVal(diff);
            renderCanvas();
        }
    }
}

// function isExceedingCanvasWidthV1(xDiff) {
//     debugger;
//     let currX = getCurrTxtXVal();
//     //if (font-size * text length + current x values + xDiff) is bigger than the canvas width - it exceeds
//     if ((getCurrTextLine().line.length * getCurrTextLine().fontSize + getCurrTxtXVal() + xDiff + currX) > gCanvas.offsetWidth) {
//         return true;
//     } else if ((currX + xDiff) <= 0) {
//         return true;
//     } else return false;
// }

function isExceedingCanvasWidth(xDiff) {
    let textLine = getCurrTextLine().line;
    if (gCanvas.offsetWidth < CANVAS_WIDTH) gCanvasResizeFactor = 0.5;
    else gCanvasResizeFactor = 1;
    if ((getCurrTxtXVal() + xDiff) <= 0) return true;
    else if (((gCtx.measureText(textLine).width * gCanvasResizeFactor) + xDiff + (gCanvasResizeFactor * getCurrTxtXVal())) > gCanvas.offsetWidth) return true;
    else return false;
}

function isExceedingCanvasHeight(yDiff) {
    if (gCanvas.offsetHeight < CANVAS_HEIGHT) gCanvasResizeFactor = 0.5;
    else gCanvasResizeFactor = 1;
    let currY = getCurrTxtYVal() * gCanvasResizeFactor;
    if ((currY + yDiff) > gCanvas.offsetHeight) {
        //if text reached the bottom of the canvas
        return true;
    }
    else if ((currY + yDiff) < ((getCurrTextLine().fontSize * gCanvasResizeFactor) + 5 * gCanvasResizeFactor)) {
        //if text reached the top of the canvas
        return true
    }
    else return false;
}

function onSetFillColor(ev) {
    let elColor = document.querySelector('.fill-color-picker');
    gFillColor = elColor.value;
    setDrawingValues();

    //if there is a current text line - repaint it with the chosen color (update model + DOM)
    if (areThereAnyTextLines()) {
        setCurrTextFillColor(elColor.value);
        renderCanvas()
    }
}

function onSetFontSize(ev) {

}

function onChangeRow() {
    //user presses the arrows button - meaning he wants to change the current row for editing
    //set the selected row to the next (or previous) row
    //make sure the input box contains the value of the current text line for editing:
    // get the text from the current selected text index and place it into the input box value
    if (areThereAnyTextLines()) {
        changeTextLine(1);

        //set the tools (displayed fill color input, stroke color, text input) according to the current text line
        renderTools();
    }
}

function renderTools() {
    //changing the text input value
    //changing the fill color value
    //changing the stroke color value
    let txt = getCurrTextLine();
    let elInput = document.querySelector('.text-line');
    elInput.value = txt.line;
    let elFillColor = document.querySelector('.fill-color-picker');
    elFillColor.value = txt.fillColor;
    let elStrokeColor = document.querySelector('.stroke-color-picker');
    elStrokeColor.value = txt.strokeColor;
}

function onDeleteTextLine() {
    //delete the current text line from the model
    //reset the input box value to empty string
    deleteCurrTextLine();
    clearInputVal();
    renderCanvas();
    //move on to the next line
    onChangeRow();
}

function onIncreaseFontSize() {
    //update the font size on the model for the current text line
    //set drawing new values on the canvas for this line and on
    //render the canvas
    let fontSizeDiff = 5;
    setFontSize(fontSizeDiff);
    gFontSize += fontSizeDiff;
    setDrawingValues();
    let textLine = getCurrTextLine().line;
    let width = gCtx.measureText(textLine).width
    setCurrTextWidth(width);
    renderCanvas();
}

function onDecreaseFontSize() {
    //update the font size on the model for the current text line
    //set drawing new values on the canvas for this line and on
    //render the canvas
    let fontSizeDiff = -5;
    setFontSize(fontSizeDiff);
    gFontSize += fontSizeDiff;
    setDrawingValues();
    let textLine = getCurrTextLine().line;
    let width = gCtx.measureText(textLine).width
    setCurrTextWidth(width);
    renderCanvas();
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth - 100
    gCanvas.height = elContainer.offsetHeight - 100

    // TODO: redraw..
}

function renderCanvas() {
    //render the image
    //render all the text lines on top of that image
    //render all the icons on top of that image
    drawImg();
    let texts = getAllTextLines();
    let tempStrokeColor = gStrokeColor;
    let tempFillColor = gFillColor;
    let tempFontSize = gFontSize;
    texts.forEach(function (txt) {
        gStrokeColor = txt.strokeColor;
        gFillColor = txt.fillColor;
        gFontSize = txt.fontSize;
        setDrawingValues();
        drawText(txt.line, txt.x, txt.y);
    });
    gStrokeColor = tempStrokeColor;
    gFillColor = tempFillColor;
    gFontSize = tempFontSize;
    //drawIcons();
}

function onAddTextLine() {
    //sets the selected text idx to the next line on the model
    //clear the input box value
    let currTextLineIdx = getCurrSelectedTxtIdx();
    setSelectedTxtIdx(currTextLineIdx + 1);
    let elInput = document.querySelector('.text-line');
    elInput.value = '';
}

function onTextLineKeyUp() {
    //update the model with the current input value - get the input value from the input box and asign it to the text line model
    //render the canvas
    let elInput = document.querySelector('.text-line');
    let res = editCurrentTextLine(elInput.value);
    if (res === false) { //if this is a new text line added
        setTextCoordinates(elInput.value);
        addTextLine(elInput.value, gFontSize, gX, gY, gFillColor, gStrokeColor);
    }
    //set the new text line width in the model

    let width = gCtx.measureText(elInput.value).width
    setCurrTextWidth(width);
    renderCanvas();
}


function setDrawingValues() {
    //sets all the values before drawing the text on the canvas
    gCtx.font = `${gFontSize}px IMPACT`; //font IMPACT + font size
    gCtx.strokeStyle = gStrokeColor; //text stroke color
    gCtx.fillStyle = gFillColor;
    gCtx.save();
}

function clearInputVal() {
    let elInput = document.querySelector('.text-line');
    elInput.value = '';
}

function onDownloadCanvas(elLink) {
    const data = gCanvas.toDataURL('image/png');
    elLink.href = data;
}
