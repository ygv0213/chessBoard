window.addEventListener('load', (e) => {
    let divtable = document.createElement('div');
    let backcolor = document.createElement('div');
    let visualTurn = document.createElement('p');

    let divWhiteEats = document.createElement("div");
    let divBlackEats = document.createElement("div");

    let body = document.getElementsByTagName('body')[0];
    let table = document.createElement('table');
    let choseColor = document.getElementById("choseColor1");
    let color = document.getElementsByName("color");

    let tr = document.createElement('tr');
    let td = document.createElement('td');

    let arrCount = []; //help to handle selected items on the board
    let turn = ""; //this varible get the color from user and save it as turn
    let reverseTurn = undefined;
    //here i save the reverse player from the current turn to be used later
    if (turn === "white") {
        reverseTurn = "black";
    } else {
        reverseTurn = "white";
    }

    choseColor.addEventListener('click', (event) => {
        //this function chenges the turn varible when the player click on the start game button
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

    showWinning.addEventListener('click', () => {
        //this reload the web-page if you clicked on play again button
        window.location.reload();
    });

    let moves = [[], []]; // the array help me to track where is the ::posible moves in moves[1] and privuse posible moves in moves[0] 
    let eats = [[], []]; //this save the options to eat for evry click on solider
    let clickes = []; //this here save my clickes to know where i was clicked the last time

    let whiteEats = [];
    let blackEats = [];

    let tmp = false;

    const WHITE_PLAYER = "white";
    const BLACK_PLAYER = "black";

    divtable.id = "divtable";
    backcolor.id = "backcolor";

    divWhiteEats.classList.add("divVisualEats");
    divBlackEats.classList.add("divVisualEats");

    body.appendChild(divtable);
    divtable.appendChild(visualTurn);
    divtable.appendChild(backcolor);

    table.addEventListener('click', (event) => {
        //this here help to track who need to stay in class moves and who is not 
        //when you click on anather player the moves update to the new selected player

        clearMovesAndEatsArrays(moves, eats);

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
                
                clearMovesAndEatsArrays(moves, eats);
                //here i am
                if (event.target.src.toString().split('/').find((e) => e === "solider.ico")) {
                    if (event.target.src.toString().split('/').find((e) => e === "white") === "white") {
                        if (event.target.parentElement.rowIndex === 7) {
                            console.log('quinn')
                        }
                    } else if (event.target.src.toString().split('/').find((e) => e === "black") === "black") {
                        if (event.target.parentElement.rowIndex === 0) {
                            console.log('quinn')
                        }
                    }
                }
            }
        }

        posibleMoves(event, table, moves, eats, turn);//shows the posible moves to evry click
        if (event.target.tagName === "TD" || "IMG") {
            /*
            here we going to save the current click and privus click
            if privus click is img and current click is in posible moves so move the piece
            */
            
            if (clickes.length === 1 && event.target.tagName === "IMG" && event.target.src.toString().split('/').find((e) => e === turn)) {
                clickes = [];
            }
            if (event.target.tagName === "IMG" && event.target.src.toString().split('/').find((e) => e === turn)) {
                clickes = [];
                clickes.push(event.target);
            } else if (clickes.length === 1 && event.target.tagName === "TD") {
                clickes.push(event.target);
            } else if (event.target.tagName === "IMG" && event.target.src.toString().split('/').find((e) => e === reverseTurn) && clickes.length === 1) {
                /*  if the player press on piece and the piece == the other player and the privuse click was valid click
                    check if the piece in eats array if yes eat the pice if not skip
                    if the piece is the other player king end the game  */

                let index = eats[0].indexOf(event.target.parentElement);

                if (index !== -1) {
                    if (clickes[0].src.toString().split('/').find((e) => e === "white")) {
                        let visualWhiteEats = document.createElement("img");
                        visualWhiteEats.alt = "X";
                        visualWhiteEats.src = eats[0][index].getElementsByTagName("img")[0].src;
                        visualWhiteEats.classList.add('eatenPieces');
                        divWhiteEats.appendChild(visualWhiteEats);
                    } else if (clickes[0].src.toString().split('/').find((e) => e === "black")) {
                        let visualBlackEats = document.createElement("img");
                        visualBlackEats.alt = "X";
                        visualBlackEats.src = eats[0][index].getElementsByTagName("img")[0].src;
                        visualBlackEats.classList.add('eatenPieces');
                        divBlackEats.appendChild(visualBlackEats);
                    }
                    eats[0][index].appendChild(clickes[0]);
                    eats[0][index].removeChild(eats[0][index].getElementsByTagName("img")[0]);
                    tmp = true;
                }
                if (index !== -1 && event.target.src.toString().split('/').find((e) => e === "king.ico")) {
                    // here i break the game and show who is winning if some king was eating
                    divtable.style.display = "none";
                    let showWinning = document.getElementById("showWinning");
                    let p = document.createElement("p");
                    let input = document.createElement("input");
                    input.type = "button";
                    input.id = "playAgain";
                    input.value = "Press to play again";
                    p.innerText = turn.toUpperCase() + " YOU ARE THE WINNER";
                    showWinning.style.display = "flex";
                    showWinning.appendChild(p);
                    showWinning.appendChild(input);
                }

                index = eats[1].indexOf(event.target.parentElement);

                if (index !== -1) {
                    if (clickes[0].src.toString().split('/').find((e) => e === "white")) {
                        whiteEats.push(eats[1][index].getElementsByTagName("img")[0]);
                    } else if (clickes[0].src.toString().split('/').find((e) => e === "black")) {
                        blackEats.push(eats[1][index].getElementsByTagName("img")[0]);
                    }
                    eats[1][index].appendChild(clickes[0]);
                    eats[1][index].removeChild(eats[1][index].getElementsByTagName("img")[0]);
                    tmp = true;
                }
                if (index !== -1 && event.target.src.toString().split('/').find((e) => e === "king.ico")) {
                    // here i break the game and show who is winning if some king was eating
                    divtable.style.display = "none";
                    let showWinning = document.getElementById("showWinning");
                    let p = document.createElement("p");
                    let input = document.createElement("input");
                    input.type = "button";
                    input.id = "playAgain";
                    input.value = "Press to play again";
                    p.innerText = turn.toUpperCase() + " YOU ARE THE WINNER";
                    showWinning.style.display = "flex";
                    showWinning.appendChild(p);
                    showWinning.appendChild(input);
                }
                clickes.push(event.target);
            }
            if (clickes.length === 2 && moves[0].indexOf(clickes[1]) !== -1) {
                //this is here changes the turn between players
                clickes[1].appendChild(clickes[0]);
                clickes = [];
                if (turn === "white") {
                    reverseTurn = turn;
                    turn = "black";
                } else if (turn === "black") {
                    reverseTurn = turn;
                    turn = "white";
                }
                visualTurn.textContent = "This is " + turn + " turn now";
                clickes = [];
            } else if (clickes.length === 2 && event.target.src.toString().split('/').find((e) => e === turn)) {
                clickes = [];
            } else if (clickes.length > 1 && tmp === true && eats.length > 0) {
                // here i chacks if solider was eating if true switch turn else do noting
                tmp = false;
                for (let i = 0; i < eats.length; i++) {
                    for (let j = 0; j < eats[i].length; j++) {
                        if (clickes[1] === event.target || clickes[0] === event.target) {
                            //this is here changes the turn between players
                            if (turn === "white") {
                                reverseTurn = turn;
                                turn = "black";
                            } else if (turn === "black") {
                                reverseTurn = turn;
                                turn = "white";
                            }
                            visualTurn.textContent = "This is " + turn + " turn now";
                            clickes = [];    
                            break;
                        }
                    }
                }
            }
        }
    });

    for (let i = 0; i < 8; i++) {
        //this loop make the board
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

    backcolor.appendChild(divBlackEats);
    backcolor.appendChild(table);
    backcolor.appendChild(divWhiteEats);
});