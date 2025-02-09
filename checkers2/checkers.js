const board = document.querySelector("#board");
const player = document.querySelector("#player");
let turn = "red";
const turn_display = document.querySelector("#turn");
let redLives = 12;
let blackLives = 12;
let gameEnd = false;
const winner_display = document.querySelector("#turn");

const startPositions = [
    '', blackPiece, '', blackPiece, '', blackPiece, '', blackPiece, 
    blackPiece, '', blackPiece, '', blackPiece, '', blackPiece, '', 
    '', blackPiece, '', blackPiece, '', blackPiece, '', blackPiece,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    redPiece, '', redPiece, '', redPiece, '', redPiece, '',
    '', redPiece, '', redPiece, '', redPiece, '', redPiece,
    redPiece, '', redPiece, '', redPiece, '', redPiece, ''
]

function setUpBoard(){
    startPositions.forEach((position, i) => {
        // Setting up squares
        const square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("square-id", i);

        // Setting the correct color for each square
        const row = Math.floor(i / 8) + 1;
        const col = (i % 8) + 1;
        if(row % 2 === 1){
            if(col % 2 === 1){
                square.classList.add("whiteSquare");
            }
            else{
                square.classList.add("graySquare");
            }
        }
        else{
            if(col % 2 === 1){
                square.classList.add("graySquare");
            }
            else{
                square.classList.add("whiteSquare");
            }
        }

        // Setting the condition draggable to each square with a piece in it along with the image
        square.innerHTML = position;
        square.firstChild?.setAttribute("draggable", true);
        if(row < 4){
            square.firstChild?.classList.add("black");
        }
        else{
            square.firstChild?.classList.add("red");
        }

        board.append(square);
    })

    turn_display.textContent = turn;
}

setUpBoard();

const allSpaces = document.querySelectorAll("#board .square");

allSpaces.forEach(square => {
    if(!gameEnd){
        square.addEventListener("dragstart", dragStart);
        square.addEventListener("dragover", dragOver);
        square.addEventListener("drop", dragDrop);
    }
})

let draggedObject;
let startPosition;
let pieceColor;

function dragStart(e){
    draggedObject = e.target.parentNode;
    startPosition = e.target.parentNode.parentNode.getAttribute("square-id");
    pieceColor = e.target.parentNode.classList[1];
}

function dragOver(e){
    e.preventDefault();
}

function dragDrop(e){
    e.stopPropagation();

    if(canMove(e)){
        e.target.append(draggedObject);
        if(turn === "red"){
            turn = "black";
        }
        else{
            turn = "red";
        }
    }
    turn_display.textContent = turn;
    checkWin();
}

function canMove(e){
    if(pieceColor != turn || gameEnd === true){
        return false;
    }

    const isEmpty = e.target.classList.contains("graySquare"); // Attempted move is empty gray square
    const nextPosition = e.target.getAttribute("square-id"); // Index of attempted move

    // Valid Red Move
    if(isEmpty && pieceColor === "red"){
        if(startPosition - nextPosition === 9 || startPosition - nextPosition === 7){ // Normal move
            return true;
        }
        else{ // Take move
            const moveDistance = startPosition - nextPosition;
            if(moveDistance === 14){
                const playerSpace = document.querySelector("#board").getElementsByClassName("square")[startPosition - 7];
                if(playerSpace.hasChildNodes()){
                    playerSpace.firstChild.remove();
                    blackLives--;
                    return true;
                }
            }
            else if(moveDistance === 18){
                const playerSpace = document.querySelector("#board").getElementsByClassName("square")[startPosition - 9];
                if(playerSpace.hasChildNodes()){
                    playerSpace.firstChild.remove();
                    blackLives--;
                    return true;
                }
            }
        }
    }
    else if(isEmpty && pieceColor ==="black"){ // Valid Black Move
        if(startPosition - nextPosition === -9 || startPosition - nextPosition === -7){ // Normal move
            return true;
        }
        else{ // Take move
            const moveDistance = startPosition - nextPosition;
            if(moveDistance === -14){
                const playerSpace = document.querySelector("#board").getElementsByClassName("square")[Number(startPosition) + 7];
                if(playerSpace.hasChildNodes()){
                    playerSpace.firstChild.remove();
                    redLives--;
                    return true;
                }
            }
            else if(moveDistance === -18){
                const playerSpace = document.querySelector("#board").getElementsByClassName("square")[Number(startPosition) + 9];
                if(playerSpace.hasChildNodes()){
                    playerSpace.firstChild.remove();
                    redLives--;
                    return true;
                }
            }
        }
    }
}

function checkWin(){
    if(blackLives < 1){
        gameEnd = true;
        winner_display.textContent = "Black Wins!";
    }
    if(redLives < 1){
        gameEnd = true;
        winner_display.textContent = "Red Wins!";
    }
}