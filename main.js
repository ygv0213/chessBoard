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
    let reverseTurn = undefined;
    if (turn === "white") {
        reverseTurn = "black";
    } else {
        reverseTurn = "white";
    }

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

    showWinning.addEventListener('click', ()=>{
        window.location.reload();
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
            }else if(event.target.tagName === "IMG" && event.target.src.toString().split('/').find((e) => e === reverseTurn) && clickes.length === 1){
                let index = eats[0].indexOf(event.target.parentElement);
                if(index !== -1){
                    eats[0][index].appendChild(clickes[0]);
                    eats[0][index].removeChild(eats[0][index].getElementsByTagName("img")[0]);
                }
                index = eats[1].indexOf(event.target.parentElement);
                if(index !== -1){
                    eats[0][index].appendChild(clickes[0]);
                    eats[0][index].removeChild(eats[0][index].getElementsByTagName("img")[0]);
                }
                eats = [[],[]];
                clickes = [];
                if(event.target.src.toString().split('/').find((e) => e === "king.ico")){
                    //here i breake the game and show who is winning if king was eating
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