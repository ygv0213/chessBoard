class piece {
    constructor(row, col, type, playerColor) {
        // type => "wall"/"solider"/"bishop" ...
        this.row = row;
        this.col = col;
        this.type = type;
        this.playerColor = playerColor;
        this.img = "assetes/icons/" + this.playerColor + "/" + this.type + ".ico";
    }

    visual(cell) {
        //help to visual the piece on the board
        let img = document.createElement("img");
        img.setAttribute('src', this.img);
        cell.appendChild(img);
    }

    move(piece) {
        piece = this;
    }
}

function posibleMoves(event, table, moves, turn) {
    //this function tack the index of the clicked solider and definde what is the option to move on the board
    //moves => array to store all posible moves to use later
    if (event.target.tagName === "IMG") {
        let row = event.target.parentElement.parentElement.rowIndex;
        let cell = event.target.parentElement.cellIndex;
        if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/solider.ico") {
            if (turn === "white") {
                table.rows[row + 1].cells[cell].classList.add("moves");
                moves[1].push(table.rows[row + 1].cells[cell]);
            } else {
                table.rows[row - 1].cells[cell].classList.add("moves");
                moves[1].push(table.rows[row - 1].cells[cell]);
            }
        }
        if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/king.ico") {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if ((i === 0 && j === 0)) {
                        continue;
                    } else {
                        if (row + i < 8 && row + i > -1 && cell + j < 8 && cell + j > -1) {
                            if (!table.rows[row + i].cells[cell + j].hasChildNodes()) {
                                table.rows[row + i].cells[cell + j].classList.add("moves");
                                moves[1].push(table.rows[row + i].cells[cell + j]);
                            }
                        }
                    }

                }
            }
        }
        if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/hores.ico") {
            //here i am
            try {
                table.rows[row + 1].cells[cell + 2].classList.add("moves");
                moves[1].push(table.rows[row + 1].cells[cell + 2]);
            } catch (error) {

            }
            try {
                table.rows[row - 1].cells[cell - 2].classList.add("moves");
                moves[1].push(table.rows[row - 1].cells[cell - 2]);
            } catch (error) {

            }
            try {
                table.rows[row + 2].cells[cell - 1].classList.add("moves");
                moves[1].push(table.rows[row + 2].cells[cell - 1]);
            } catch (error) {

            }
            try {
                table.rows[row - 2].cells[cell + 1].classList.add("moves");
                moves[1].push(table.rows[row - 2].cells[cell + 1]);
            } catch (error) {

            }
            try {
                table.rows[row - 2].cells[cell - 1].classList.add("moves");
                moves[1].push(table.rows[row - 2].cells[cell - 1]);
            } catch (error) {

            }
            try {
                table.rows[row - 1].cells[cell + 2].classList.add("moves");
                moves[1].push(table.rows[row - 1].cells[cell + 2]);
            } catch (error) {

            }
            try {
                table.rows[row + 1].cells[cell - 2].classList.add("moves");
                moves[1].push(table.rows[row + 1].cells[cell - 2]);
            } catch (error) {

            }
            try {
                table.rows[row + 2].cells[cell + 1].classList.add("moves");
                moves[1].push(table.rows[row + 2].cells[cell + 1]);
            } catch (error) {

            }
        }
        if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/bishop.ico") {
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row + j].cells[cell + j].classList.add("moves");
                    moves[1].push(table.rows[row + j].cells[cell + j]);
                } catch (error) {
                }
            }
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row - j].cells[cell - j].classList.add("moves");
                    moves[1].push(table.rows[row - j].cells[cell - j]);
                } catch (error) {
                }
            }
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row + j].cells[cell - j].classList.add("moves");
                    moves[1].push(table.rows[row + j].cells[cell - j]);
                } catch (error) {
                }
            }
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row - j].cells[cell + j].classList.add("moves");
                    moves[1].push(table.rows[row - j].cells[cell + j]);
                } catch (error) {
                }
            }
        } if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/wall.ico") {
            for (let j = -7; j < 8; j++) {
                if (cell + j < 8 && cell + j > -1 && (j !== 0)) {
                    table.rows[row].cells[cell + j].classList.add("moves");
                    moves[1].push(table.rows[row].cells[cell + j]);
                }
            }
            for (let j = -7; j < 8; j++) {
                if (row - j > -1 && row - j < 8 && (j !== 0)) {
                    table.rows[row - j].cells[cell].classList.add("moves");
                    moves[1].push(table.rows[row - j].cells[cell]);
                }
            }
        }
        if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/quinn.ico") {
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row + j].cells[cell + j].classList.add("moves");
                    moves[1].push(table.rows[row + j].cells[cell + j]);
                } catch (error) {
                }
            }
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row - j].cells[cell - j].classList.add("moves");
                    moves[1].push(table.rows[row - j].cells[cell - j]);
                } catch (error) {
                }
            }
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row + j].cells[cell - j].classList.add("moves");
                    moves[1].push(table.rows[row + j].cells[cell - j]);
                } catch (error) {
                }
            }
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row - j].cells[cell + j].classList.add("moves");
                    moves[1].push(table.rows[row - j].cells[cell + j]);
                } catch (error) {
                }
            }
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row - j].cells[cell].classList.add("moves");
                    moves[1].push(table.rows[row - j].cells[cell]);
                } catch (error) {
                }
            }
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row + j].cells[cell].classList.add("moves");
                    moves[1].push(table.rows[row + j].cells[cell]);
                } catch (error) {
                }
            }
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row].cells[cell + j].classList.add("moves");
                    moves[1].push(table.rows[row].cells[cell + j]);
                } catch (error) {
                }
            }
            for (let j = 0; j < 8; j++) {
                try {
                    table.rows[row].cells[cell - j].classList.add("moves");
                    moves[1].push(table.rows[row].cells[cell - j]);
                } catch (error) {
                }
            }
        }
    }
}

function newPiece(i, j, type, color, td) {
    //this add new piece to the board and visual it
    let tmp = new piece(i, j, type, color);
    tmp.visual(td);
}

window.addEventListener('load', (e) => {
    let divtable = document.createElement('div');
    let backcolor = document.createElement('div');
    let body = document.getElementsByTagName('body')[0];
    let table = document.createElement('table');

    let tr = document.createElement('tr');
    let td = document.createElement('td');

    let arrCount = []; //help to handle selected items on the board

    let moves = [[], []]; // the array help me to track where is the posible moves in moves[1] and save in moves[0] the privuse posible moves
    let clickes = [];
    let turn = "white";

    const WHITE_PLAYER = "white";
    const BLACK_PLAYER = "black";

    divtable.id = "divtable";
    backcolor.id = "backcolor";

    body.appendChild(divtable);
    divtable.appendChild(backcolor);

    table.addEventListener('click', (event) => {
        //this here help to track who need to stay in class moves and who is not 
        //when you click on anather player the moves update to the new selected player
        if (moves[1].length > 0) {
            moves[0] = moves[1];
            for (let i = 0; i < moves[1].length; i++) {
                moves[1][i].classList.remove("moves");
            }
            moves[1] = [];
        }

        if (event.target.tagName === "TD" || "IMG") {
            //this help me to track after the clickes save the element we clicked on and add him to selected class
            arrCount.push(event.target);
            if (arrCount.length === 1) {
                arrCount[0].classList.add("selected");
                //function here
            } else if (arrCount.length === 2) {
                arrCount[1].classList.add("selected");
                arrCount[0].classList.remove("selected");
                //function here
                arrCount.shift();
            }
        }

        posibleMoves(event, table, moves, turn);//shows the posible moves to evry click

        if (event.target.tagName === "TD" || "IMG" && event.target.src.toString().split('/')[5] === turn) {
            /*
            here we going to save the current click and privus click
            if privus click is img and current click is in posible moves so move the piece
            */
            if (event.target.tagName === "IMG") {
                clickes = [];
                clickes.push(event.target);
            } else if (clickes.length === 1 && event.target.tagName === "TD") {
                clickes.push(event.target);
            }
            if (clickes.length === 2 && moves[0].indexOf(clickes[1]) !== -1) {
                clickes[1].appendChild(clickes[0]);
                clickes = [];
                if (turn === "white") {
                    turn = "black";
                } else if (turn === "black") {
                    turn = "white";
                }
            } else if (clickes.length === 2 && moves[0].indexOf(clickes[1]) === -1 && event.target.src.toString().split('/')[5] !== turn) {
                clickes = [];
            }

        }
    });

    for (let i = 0; i < 8; i++) {
        //this loop draw the pieces to the board and make the board
        tr = document.createElement('tr');
        for (let j = 0; j < 8; j++) {
            td = document.createElement('td');
            if (i === 0) {
                if (j === 0 || j == 7) {
                    newPiece(i, j, "wall", WHITE_PLAYER, td);
                } else if (j === 1 || j == 6) {
                    newPiece(i, j, "hores", WHITE_PLAYER, td);
                } else if (j === 2 || j == 5) {
                    newPiece(i, j, "bishop", WHITE_PLAYER, td);
                } else if (j === 3) {
                    newPiece(i, j, "quinn", WHITE_PLAYER, td);
                } else if (j === 4) {
                    newPiece(i, j, "king", WHITE_PLAYER, td);
                }
            } else if (i === 1) {
                newPiece(i, j, "solider", WHITE_PLAYER, td);
            } else if (i === 6) {
                newPiece(i, j, "solider", BLACK_PLAYER, td);
            } else if (i === 7) {
                if (j === 0 || j == 7) {
                    newPiece(i, j, "wall", BLACK_PLAYER, td);
                } else if (j === 1 || j == 6) {
                    newPiece(i, j, "hores", BLACK_PLAYER, td);
                } else if (j === 2 || j == 5) {
                    newPiece(i, j, "bishop", BLACK_PLAYER, td);
                } else if (j === 3) {
                    newPiece(i, j, "quinn", BLACK_PLAYER, td);
                } else if (j === 4) {
                    newPiece(i, j, "king", BLACK_PLAYER, td);
                }
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);

    }
    backcolor.appendChild(table);

});