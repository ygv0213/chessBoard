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
    /*  :: this function take the index of the clicked solider and definde what is the options to move on the board
        :: moves => array to store all posible moves to use later 
        :: to any type of solider i did anather condition to calculate the posible moves and make the changes on the board*/
    if (event.target.tagName === "IMG") {
        let row = event.target.parentElement.parentElement.rowIndex;
        let cell = event.target.parentElement.cellIndex;
        clearMovesAndEatsArrays(moves, eats);
        if (event.target.getAttribute("src") === "assetes/icons/" + turn + "/solider.ico") {
            //here i save the reverse turn
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

function clearMovesAndEatsArrays(moves, eats){
    //this function clear bote arrays
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
}
