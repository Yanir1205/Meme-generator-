'use strict';

//canvas variables:
var gCanvas;
var gCtx;
var gImg;

//coordinates for the next text line to be added
var gOffsetX;
var gOffsetY;

//drawing values:
var gFontSize = 35;
var gAlign;
var gStrokeColor = 'blue';
var gFillColor = 'white';

function initEditor() {
    gCanvas = document.querySelector('.my-canvas');
    gCtx = gCanvas.getContext('2d');
    drawImg()
    renderEditor();
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
    gOffsetX = gCanvas.offsetWidth / 2 - ((text.length / 2) * gFontSize);
    // gCtx.textAlign = "center";
    // let currNumOfTextLines = getNumOfTextLines();
    let currNumOfTextLines = getNumOfTextLines();
    if (!currNumOfTextLines || currNumOfTextLines === 0) {
        //if this is the first text line
        gOffsetY = gFontSize * 2;
    } else if (currNumOfTextLines === 1) {
        //if this is the second text line
        gOffsetY = gCanvas.height - (gFontSize * 2);

        // gOffsetY = gCanvas.offsetHeight - gFontSize * 2;
    } else {
        //if this is the third or more text line
        gOffsetY = gCanvas.offsetHeight / 2 - (gFontSize / 2);
    }
    gAlign = gOffsetX;
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

}

function onSetFillColor(ev) {

}

function onSetFontSize(ev) {

}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth - 100
    gCanvas.height = elContainer.offsetHeight - 100

    // TODO: redraw..
}

function renderEditor() {

}

function onAddTextLine() {
    //grab the input text value.
    //if there is no value do nothing (or display message - make input required and prevent the default of refreshing the page)
    //if there is a value - add it to the model
    //render the canvas
    event.preventDefault();
    let elInput = document.querySelector('.text-line');
    if (elInput.value) {
        setTextCoordinates(elInput.value);
        addTextLine(elInput.value, gFontSize, gAlign, gStrokeColor);
        setDrawingValues();
        drawText(elInput.value, gOffsetX, gOffsetY);
        clearInputVal();
    }
}


function setDrawingValues() {
    //sets all the values before drawing the text on the canvas
    gCtx.font = `${gFontSize}px IMPACT`; //font IMPACT + font size
    gCtx.strokeStyle = gStrokeColor; //text stroke color
    gCtx.fillStyle = 'white'
    gCtx.save();
}

function clearInputVal() {
    let elInput = document.querySelector('.text-line');
    elInput.value = '';
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.png'
}