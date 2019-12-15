'use strict';

const CANVAS_WIDTH = 500; //default canvas width for desktop resolution
const CANVAS_HEIGHT = 500; //default canvas height for desktop resolution

//canvas variables:
var gCanvas;
var gCtx;
var gImg;
var gCanvasResizeFactor = 1;
var gXDiff;
var gYDiff;

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
    addListeners();
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

function onSaveCanvas() {
    //save the currently meme with all defintions (to enable future re-editing) and to display on the memes tab
    
}

function addListeners() {
    //mouse events:
    gCanvas.addEventListener("mousedown", onCanvasMouseClick, event);

    //touch events:
    gCanvas.addEventListener("touchstart", onTouchStart, event);
    // gCanvas.addEventListener("touchmove", onTouchMove, event);
    // gCanvas.addEventListener('touchend', onTouchEnd, event);
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
            setTextLineYValDiff(diff);
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
            setTextLineYValDiff(diff);
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
            setTextLineXValDiff(diff);
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
            setTextLineXValDiff(diff);
            renderCanvas();
        }
    }
}

//when user start-touches the canvas:
//check if the current x and y values of the touch belong to a text line (or icon) and if yes - return the text line Idx (or icon Idx). if not - return null
//if an Idx has been returned - mark the text line (or icon) with a rectangle around it 
//remember to remove all rectangle markings on every touch which is not at a text line area 
//also remove the rectangles when user presses the download btn, publish btn, save btn (future feature), gallery btn
function onTouchStart(ev) {
    //check if current touch coordinates are within any text line area
    console.log(ev);
    let LineIdx = getTextLineIdx(ev.touches[0].clientX - gCanvas.offsetLeft, ev.touches[0].clientY - gCanvas.offsetTop)
    if (LineIdx !== null) {
        renderCanvas();
        markLine(LineIdx);
        setSelectedTxtIdx(LineIdx);
        let offsetX = ev.touches[0].clientX - gCanvas.offsetLeft;
        let offsetY = ev.touches[0].clientY - gCanvas.offsetTop;
        gXDiff = offsetX;
        gYDiff = offsetY;
        gCanvas.addEventListener("touchmove", onCanvasTouchMove, event);
        gCanvas.addEventListener("touchend", onCanvasTouchEnd, event);
        gCanvas.addEventListener("touchcancel", onCanvasTouchEnd, event);
    }
    else {
        renderCanvas();
        gCanvas.removeEventListener("touchmove", onCanvasTouchMove);
        gCanvas.removeEventListener("touchend", onCanvasTouchEnd);
        gCanvas.removeEventListener("touchcancel", onCanvasTouchEnd);
    }
}

function onCanvasMouseClick(ev) {
    let idx = getTextLineIdx(ev.offsetX, ev.offsetY);
    if (idx !== null) {
        //if user pressed an existing text line - mark it with rectangle and start listening to mousemove events
        renderCanvas();
        markLine(idx);
        setSelectedTxtIdx(idx);
        gXDiff = ev.offsetX;
        gYDiff = ev.offsetY;
        gCanvas.addEventListener("mousemove", onCanvasMouseMove, event);
        gCanvas.addEventListener("mouseup", onCanvasMouseUp, event);
        gCanvas.addEventListener("mouseout", onCanvasMouseOut, event);
    }
    else {
        //otherwise - stop listening to mousemove and mouseout events and remove all rectangles
        renderCanvas();
        gCanvas.removeEventListener("mousemove", onCanvasMouseMove);
        gCanvas.removeEventListener("mouseup", onCanvasMouseUp);
        gCanvas.removeEventListener("mouseout", onCanvasMouseUp);
    }
}

function onCanvasTouchMove(ev) {
    event.preventDefault();
    if (!isOutOfBoundries(ev)) {
        gXDiff = (ev.touches[0].clientX - gCanvas.offsetLeft) - gXDiff;
        gYDiff = (ev.touches[0].clientY - gCanvas.offsetTop) - gYDiff;
        setTextLineXValDiff(gXDiff);
        setTextLineYValDiff(gYDiff);
        gXDiff = (ev.touches[0].clientX - gCanvas.offsetLeft);
        gYDiff = (ev.touches[0].clientY - gCanvas.offsetTop);
        renderCanvas();
        markLine(getCurrSelectedTxtIdx());
    } else {
        //remove the touchmove listeners
        gCanvas.removeEventListener("touchmove", onCanvasTouchMove);
        gCanvas.removeEventListener("touchend", onCanvasTouchEnd);
        gCanvas.removeEventListener("touchcancel", onCanvasTouchEnd);
    }
}

function onCanvasTouchEnd(ev) {
    gCanvas.removeEventListener("touchmove", onCanvasTouchMove);
    gCanvas.removeEventListener("touchend", onCanvasTouchEnd);
    gCanvas.removeEventListener("touchcancel", onCanvasTouchEnd);
}

function isOutOfBoundries(ev) {
    if (ev.touches[0].clientX - gCanvas.offsetLeft < 0 || ev.touches[0].clientX - gCanvas.offsetLeft > gCanvas.offsetWidth || ev.touches[0].clientY - gCanvas.offsetTop < 0 || ev.touches[0].clientY - gCanvas.offsetTop > gCanvas.offsetHeight) {
        return true
    } else return false;
}

function onCanvasMouseMove(ev) {
    //user moves the text line accross the canvas area
    //update the model with the current x and y values of the line
    //render the canvas
    //mark the line at the new current location
    gXDiff = ev.offsetX - gXDiff;
    gYDiff = ev.offsetY - gYDiff;
    setTextLineXValDiff(gXDiff);
    setTextLineYValDiff(gYDiff);
    gXDiff = ev.offsetX;
    gYDiff = ev.offsetY;
    renderCanvas();
    markLine(getCurrSelectedTxtIdx());
}

function onCanvasMouseUp(ev) {
    gCanvas.removeEventListener("mousemove", onCanvasMouseMove);
    gCanvas.removeEventListener("mouseup", onCanvasMouseUp);
    gCanvas.removeEventListener("mouseout", onCanvasMouseOut);
}

function markLine(idx) {
    //marks the text line of the given index with a rectangle around it
    let text = getTextByIdx(idx);
    // drawRect(text.x - 10, text.y - text.fontSize, text.width + 20, text.fontSize + 10); //unrounded rectangle
    drawRoundedRect(gCtx, text.x - 10, text.y - text.fontSize, text.width + 20, text.fontSize + 10, 5, 'grey');
}

function drawRect(x, y, width, height) {
    gCtx.save()
    gCtx.beginPath();
    gCtx.rect(x, y, width, height)
    gCtx.strokeStyle = 'grey'
    gCtx.stroke()
    gCtx.closePath()
    gCtx.restore()
}

function drawRoundedRect(ctx, x, y, width, height, radius, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();


    const radiansInCircle = 2 * Math.PI
    const halfRadians = (2 * Math.PI) / 2
    const quarterRadians = (2 * Math.PI) / 4

    // top left arc
    ctx.arc(radius + x, radius + y, radius, -quarterRadians, halfRadians, true)

    // line from top left to bottom left
    ctx.lineTo(x, y + height - radius)

    // bottom left arc  
    ctx.arc(radius + x, height - radius + y, radius, halfRadians, quarterRadians, true)

    // line from bottom left to bottom right
    ctx.lineTo(x + width - radius, y + height)

    // bottom right arc
    ctx.arc(x + width - radius, y + height - radius, radius, quarterRadians, 0, true)

    // line from bottom right to top right
    ctx.lineTo(x + width, y + radius)

    // top right arc
    ctx.arc(x + width - radius, y + radius, radius, 0, -quarterRadians, true)

    // line from top right to top left
    ctx.lineTo(x + radius, y)


    ctx.stroke();
    ctx.restore();
}


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

function onAlignLeft() {
    //get the curr selected text line and align it to the left (+10px maomeno)
    let textLine = getCurrTextLine();
    textLine.x = 10;
    renderCanvas();
}

function onAlignCenter() {
    //get the curr selected text line and align it to the left (+10px maomeno)
    let textLine = getCurrTextLine();
    textLine.x = gCanvas.offsetWidth / 2 - (textLine.width / 2);
    renderCanvas();
}

function onAlignRight() {
    //get the curr selected text line and align it to the left (+10px maomeno)
    let textLine = getCurrTextLine();
    textLine.x = gCanvas.offsetWidth - textLine.width;
    renderCanvas();
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
    gFontSize += fontSizeDiff;
    setDrawingValues();
    if (areThereAnyTextLines()) {
        setFontSize(fontSizeDiff);
        let textLine = getCurrTextLine().line;
        let width = gCtx.measureText(textLine).width
        setCurrTextWidth(width);
        renderCanvas();
    }
}

function onDecreaseFontSize() {
    //update the font size on the model for the current text line
    //set drawing new values on the canvas for this line and on
    //render the canvas
    let fontSizeDiff = -5;
    gFontSize += fontSizeDiff;
    setDrawingValues();
    if (areThereAnyTextLines()) {
        setFontSize(fontSizeDiff);
        let textLine = getCurrTextLine().line;
        let width = gCtx.measureText(textLine).width
        setCurrTextWidth(width);
        renderCanvas();
    }
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
