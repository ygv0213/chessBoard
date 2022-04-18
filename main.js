class piece {
    constructor(row, col, type, player) {
      this.row = row;
      this.col = col;
      this.type = type;
      this.player = player;
      this.img = "assetes/icons/" + this.player + "/" + this.type + ".ico";
    }

    visual(cell){
        let img = document.createElement("img");
        img.setAttribute('src', this.img);
        cell.appendChild(img);
    }

    getIndex(){
        return [this.row, this.col];
    }
}

window.addEventListener('load', (e)=>{
    let divtable = document.createElement('div');
    let backcolor = document.createElement('div');
    let body = document.getElementsByTagName('body')[0];
    let table = document.createElement('table');

    let tr = document.createElement('tr');
    let td = document.createElement('td');

    let arrCount = [];

    let whitePieces = [];
    let blackPieces = [];

    let moves = [[],[]];

    const WHITE_PLAYER = "white";
    const BLACK_PLAYER = "black";

    divtable.id = "divtable";
    backcolor.id = "backcolor";

    body.appendChild(divtable);
    divtable.appendChild(backcolor);

    table.addEventListener('click',(e)=>{
        if(moves[1].length > 0){
            moves[0] = moves[1];
            for(let i=0;i<moves[1].length;i++){
                moves[1][i].classList.remove("moves");
            }
            moves[1] = [];
        }
        
        if(e.target.tagName === "TD" || "IMG"){
            arrCount.push(e.target);
            if(arrCount.length === 1){
                arrCount[0].classList.add("selected");
            }else if(arrCount.length === 2){
                arrCount[1].classList.add("selected");
                arrCount[0].classList.remove("selected");
                arrCount.shift();
            }
        }
        if(e.target.tagName === "IMG"){
            let row = e.target.parentElement.parentElement.rowIndex;
            let cell = e.target.parentElement.cellIndex;
            if(e.target.getAttribute("src") === "assetes/icons/white/solider.ico" || e.target.getAttribute("src") === "assetes/icons/black/solider.ico"){
                for(let i= -1 ;i < 2;i++){
                    for(let j=-1;j < 2;j++){
                        try{
                            table.rows[row + i].cells[cell + j].classList.add("moves");
                            moves[1].push(table.rows[row + i].cells[cell + j]);
                        }catch(e){

                        }
                    }
                }
            }
            if(e.target.getAttribute("src") === "assetes/icons/white/wall.ico" || e.target.getAttribute("src") === "assetes/icons/black/wall.ico"){
                for(let i= 0 ;i < 8;i++){
                    try{
                        //here i am






                        
                        table.rows[row].cells[cell - i].classList.add("moves");
                        moves[1].push(table.rows[row - i].cells[cell]);
                    }catch(e){

                    }
                }
                console.log(moves)
            }
        }
    });

    for(let i = 0;i < 8;i++){
        tr = document.createElement('tr');
        for(let j = 0; j< 8;j++){
            td = document.createElement('td');
            if(i === 0){
                if(j === 0 || j == 7){
                    let tmp = new piece(i, j, "wall", WHITE_PLAYER);
                    tmp.visual(td);
                    whitePieces.push(tmp);
                }else if(j === 1 || j == 6){
                    let tmp = new piece(i, j, "hores", WHITE_PLAYER);
                    tmp.visual(td);
                    whitePieces.push(tmp);
                }else if(j === 2 || j == 5){
                    let tmp = new piece(i, j, "bishop", WHITE_PLAYER);
                    tmp.visual(td);
                    whitePieces.push(tmp);
                }else if(j === 3){
                    let tmp = new piece(i, j, "quinn", WHITE_PLAYER);
                    tmp.visual(td);
                    whitePieces.push(tmp);
                }else if(j === 4){
                    let tmp = new piece(i, j, "king", WHITE_PLAYER);
                    tmp.visual(td);
                    whitePieces.push(tmp);
                }
            }else if(i === 1){
                let tmp = new piece(i, j, "solider", WHITE_PLAYER);
                tmp.visual(td);
                whitePieces.push(tmp);
            }else if(i === 6){
                let tmp = new piece(i, j, "solider", BLACK_PLAYER);
                tmp.visual(td);
                blackPieces.push(tmp);
            }else if(i === 7){
                if(j === 0 || j == 7){
                    let tmp = new piece(i, j, "wall", BLACK_PLAYER);
                    tmp.visual(td);
                    blackPieces.push(tmp);
                }else if(j === 1 || j == 6){
                    let tmp = new piece(i, j, "hores", BLACK_PLAYER);
                    tmp.visual(td);
                    blackPieces.push(tmp);
                }else if(j === 2 || j == 5){
                    let tmp = new piece(i, j, "bishop", BLACK_PLAYER);
                    tmp.visual(td);
                    blackPieces.push(tmp);
                }else if(j === 3){
                    let tmp = new piece(i, j, "quinn", BLACK_PLAYER);
                    tmp.visual(td);
                    blackPieces.push(tmp);
                }else if(j === 4){
                    let tmp = new piece(i, j, "king", BLACK_PLAYER);
                    tmp.visual(td);
                    blackPieces.push(tmp);
                }
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
        
    }
    backcolor.appendChild(table);
});