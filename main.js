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

function posibleMoves(event, table, moves, eats, turn) {
    //this function take the index of the clicked solider and definde what is the option to move on the board
    //moves => array to store all posible moves to use later
    if (event.target.tagName === "IMG") {
        let row = event.target.parentElement.parentElement.rowIndex;
        let cell = event.target.parentElement.cellIndex;
        if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/solider.ico") {
            let reverseTurn = "";
            if (turn === "white") {
                reverseTurn = "black";
            } else if (turn === "black") {
                reverseTurn = "white";
            }

            let tmp = table.rows[row].cells[cell].getElementsByTagName("img")[0].src.toString().split('/').find((e) => e === reverseTurn);
            let options = [];
            if (turn === "white" && row === 1 && !table.rows[row + 1].cells[cell].hasChildNodes()) {
                options = [1, 2];
            } else if (turn === "white" && row > 1) {
                options = [1];
            } else if (turn === "black" && row === 6 && !table.rows[row - 1].cells[cell].hasChildNodes()) {
                options = [-1, -2];
            } else if (turn === "black" && row < 6) {
                options = [-1];
            }

            for (let i = 0; i < options.length; i++) {
                if (!table.rows[row + options[i]].cells[cell].hasChildNodes()) {
                    table.rows[row + options[i]].cells[cell].classList.add("moves");
                    moves[1].push(table.rows[row + options[i]].cells[cell]);
                }
                if (options[i] === 1) {
                    if (cell + 1 < 8 && row + 1 < 8) {
                        if (table.rows[row + 1].cells[cell + 1].hasChildNodes()) {
                            tmp = table.rows[row + 1].cells[cell + 1].getElementsByTagName("img")[0].src.toString().split('/').find((e) => e === reverseTurn);
                            if (tmp === reverseTurn) {
                                table.rows[row + 1].cells[cell + 1].classList.add("eats");
                                eats[1].push(table.rows[row + 1].cells[cell + 1]);
                            }
                        }
                    }
                    if (cell - 1 > -1 && row + 1 < 8) {
                        if (table.rows[row + 1].cells[cell - 1].hasChildNodes()) {
                            tmp = table.rows[row + 1].cells[cell - 1].getElementsByTagName("img")[0].src.toString().split('/').find((e) => e === reverseTurn);
                            if (tmp === reverseTurn) {
                                table.rows[row + 1].cells[cell - 1].classList.add("eats");
                                eats[1].push(table.rows[row + 1].cells[cell - 1]);
                            }
                        }
                    }
                } else if (options[i] === -1) {
                    if (cell + 1 < 8 && row - 1 > -1) {
                        if (table.rows[row - 1].cells[cell + 1].hasChildNodes()) {
                            tmp = table.rows[row - 1].cells[cell + 1].getElementsByTagName("img")[0].src.toString().split('/').find((e) => e === reverseTurn);
                            if (tmp === reverseTurn) {
                                table.rows[row - 1].cells[cell + 1].classList.add("eats");
                                eats[1].push(table.rows[row - 1].cells[cell + 1]);
                            }
                        }
                    }
                    if (cell - 1 > -1 && row - 1 > -1) {
                        if (table.rows[row - 1].cells[cell - 1].hasChildNodes()) {
                            tmp = table.rows[row - 1].cells[cell - 1].getElementsByTagName("img")[0].src.toString().split('/').find((e) => e === reverseTurn);
                            if (tmp === reverseTurn) {
                                table.rows[row - 1].cells[cell - 1].classList.add("eats");
                                eats[1].push(table.rows[row - 1].cells[cell - 1]);
                            }
                        }
                    }
                }
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
                            } else {
                                let tmp = table.rows[row + i].cells[cell + j].getElementsByTagName("img")[0].src.toString().split('/').find((e) => e === turn);
                                if (tmp !== turn) {
                                    table.rows[row + i].cells[cell + j].classList.add("eats");
                                    eats[1].push(table.rows[row + i].cells[cell + j]);
                                }
                            }
                        }
                    }

                }
            }
        }
        if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/hores.ico") {
            //here i am
            let options = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];
            options.forEach((option) => {
                if (row + option[0] < 8 && row + option[0] > -1 && cell + option[1] < 8 && cell + option[1] > -1) {
                    if (!table.rows[row + option[0]].cells[cell + option[1]].hasChildNodes()) {
                        table.rows[row + option[0]].cells[cell + option[1]].classList.add("moves");
                        moves[1].push(table.rows[row + option[0]].cells[cell + option[1]]);
                    } else {
                        let tmp = table.rows[row + option[0]].cells[cell + option[1]].getElementsByTagName("img")[0].src.toString().split('/').find((e) => e === turn);
                        if (tmp !== turn) {
                            table.rows[row + option[0]].cells[cell + option[1]].classList.add("eats");
                            eats[1].push(table.rows[row + option[0]].cells[cell + option[1]]);
                        }
                    }
                }
            });
        }
        if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/bishop.ico") {
            let options = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
            let tmp = 8;

            for (let i = 0; i < options.length; i++) {
                for (let j = 0; j < tmp; j++) {
                    tmp = 8;
                    if (cell + (j * options[i][1]) < 8 && cell + (j * options[i][1]) > -1 && row + (j * options[i][0]) < 8 && row + (j * options[i][0]) > -1 && j !== 0) {
                        if (table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].hasChildNodes()) {
                            let isMy = table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].getElementsByTagName("img")[0].src.toString().split('/').find((e) => e === turn);
                            if (isMy !== turn) {
                                table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].classList.add("eats");
                                eats[1].push(table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])]);
                            }
                            tmp = j;
                        } else {
                            table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].classList.add("moves");
                            moves[1].push(table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])]);
                        }
                    }
                }
            }
        }
        if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/wall.ico") {
            let options = [[0, 1], [0, -1], [1, 0], [-1, 0]];
            let tmp = 8;

            for (let i = 0; i < options.length; i++) {
                for (let j = 0; j < tmp; j++) {
                    tmp = 8;
                    if (cell + (j * options[i][1]) < 8 && cell + (j * options[i][1]) > -1 && row + (j * options[i][0]) < 8 && row + (j * options[i][0]) > -1 && j !== 0) {
                        if (table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].hasChildNodes()) {
                            let isMy = table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].getElementsByTagName("img")[0].src.toString().split('/').find((e) => e === turn);
                            if (isMy !== turn) {
                                table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].classList.add("eats");
                                eats[1].push(table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])]);
                            }
                            tmp = j;
                        } else {
                            table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].classList.add("moves");
                            moves[1].push(table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])]);
                        }
                    }
                }
            }
        }
        if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/quinn.ico") {
            let options = [[0, 1], [0, -1], [1, 0], [-1, 0]];
            let tmp = 8;

            for (let i = 0; i < options.length; i++) {
                for (let j = 0; j < tmp; j++) {
                    tmp = 8;
                    if (cell + (j * options[i][1]) < 8 && cell + (j * options[i][1]) > -1 && row + (j * options[i][0]) < 8 && row + (j * options[i][0]) > -1 && j !== 0) {
                        if (table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].hasChildNodes()) {
                            let isMy = table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].getElementsByTagName("img")[0].src.toString().split('/').find((e) => e === turn);
                            if (isMy !== turn) {
                                table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].classList.add("eats");
                                eats[1].push(table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])]);
                            }
                            tmp = j;
                        } else {
                            table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].classList.add("moves");
                            moves[1].push(table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])]);
                        }
                    }
                }
            }
            options = [[1, 1], [-1, -1], [1, -1], [-1, 1]];

            for (let i = 0; i < options.length; i++) {
                for (let j = 0; j < tmp; j++) {
                    tmp = 8;
                    if (cell + (j * options[i][1]) < 8 && cell + (j * options[i][1]) > -1 && row + (j * options[i][0]) < 8 && row + (j * options[i][0]) > -1 && j !== 0) {
                        if (table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].hasChildNodes()) {
                            let isMy = table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].getElementsByTagName("img")[0].src.toString().split('/').find((e) => e === turn);
                            if (isMy !== turn) {
                                table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].classList.add("eats");
                                eats[1].push(table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])]);
                            }
                            tmp = j;
                        } else {
                            table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])].classList.add("moves");
                            moves[1].push(table.rows[row + (j * options[i][0])].cells[cell + (j * options[i][1])]);
                        }
                    }
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
    let visualTurn = document.createElement('p');
    let body = document.getElementsByTagName('body')[0];
    let table = document.createElement('table');
    let choseColor = document.getElementById("choseColor1");
    let color = document.getElementsByName("color");

    let tr = document.createElement('tr');
    let td = document.createElement('td');

    let arrCount = []; //help to handle selected items on the board
    let turn = ""; //this varible get the color from user

    choseColor.addEventListener('click', (event) => {
        //this function chenges the turn varible to the selected color
        if (event.target.id === "sendBtn") {
            if (color[0].checked === true) {
                turn = color[0].value;
            } else {
                turn = color[1].value;
            }
            choseColor.style.display = "none";
            visualTurn.textContent = "This is " + turn + " turn now";
            visualTurn.id = "visualTurn";
            divtable.style.display = "flex";
        }
    });

    let moves = [[], []]; // the array help me to track where is the posible moves in moves[1] and save in moves[0] the privuse posible moves
    let eats = [[], []]; //this save the options to eat for evry click on solider
    let clickes = [];

    const WHITE_PLAYER = "white";
    const BLACK_PLAYER = "black";

    divtable.id = "divtable";
    backcolor.id = "backcolor";

    divtable.appendChild(visualTurn);
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

        if (eats[1].length > 0) {
            eats[0] = eats[1];
            for (let i = 0; i < eats[1].length; i++) {
                eats[1][i].classList.remove("eats");
            }
            eats[1] = [];
        }

        if (event.target.tagName === "TD" || "IMG") {
            //this help me to track after the clickes save the element we clicked on and add him to selected class
            arrCount.push(event.target);
            if (arrCount.length === 1) {
                arrCount[0].classList.add("selected");
            } else if (arrCount.length === 2) {
                arrCount[1].classList.add("selected");
                arrCount[0].classList.remove("selected");
                arrCount.shift();
            }
            if (event.target.tagName === "IMG") {
                moves = [[], []];
            }
        }

        posibleMoves(event, table, moves, eats, turn);//shows the posible moves to evry click

        if (event.target.tagName === "TD" || "IMG") {
            /*
            here we going to save the current click and privus click
            if privus click is img and current click is in posible moves so move the piece
            */
            if (event.target.tagName === "IMG" && event.target.src.toString().split('/').find((e) => e === turn)) {
                clickes = [];
                clickes.push(event.target);
            } else if (clickes.length === 1 && event.target.tagName === "TD") {
                clickes.push(event.target);
            }
            if (clickes.length === 2 && (moves[0].indexOf(clickes[1]) !== -1 || eats[1].indexOf(event.target) !== -1)) {
                //this is here changes the turn between players
                clickes[1].appendChild(clickes[0]);
                clickes = [];
                if (turn === "white") {
                    turn = "black";
                } else if (turn === "black") {
                    turn = "white";
                }
                visualTurn.textContent = "This is " + turn + " turn now";
            } else if (clickes.length === 2 && event.target.src.toString().split('/').find((e) => e === turn)) {
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