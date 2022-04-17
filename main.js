class piece{
    constructor(){
        this.pos = [];
        this.name = "";
        this.color = "";
        this.icon = "assetes/icons/" + color + "/" + this.name + ".ico";
    }
    constractor(x , y, name, color){
        this.pos = [x, y];
        this.name = name;
        this.color = color;
        this.icon = "assetes/icons/" + color + "/" + this.name + ".ico";
    }
}

class player{
    //this class creat a player black/white
    constructor(name, color, piece){
        this.name = name;
        this.color = color;
        this.pieces = [];

        //this is to help my orgenize the icons on the screen
        if(this.color === "black"){
            this.src = "assetes/icons/black/";
            this.i = 0;
        }else if(this.color === "white"){
            this.src = "assetes/icons/white/";
            this.i = 15;
        }
        
        //this is to add icons to the arr to order the pices on the board
        for(let i = 0;i<16;i++){
            switch(i){
                case 8:
                case 15:
                    this.pieces.push('wall.ico');
                    break;

                case 9:
                case 14:
                    this.pieces.push('hores.ico');
                    break;
                    
                case 10:
                case 13:
                    this.pieces.push('bishop.ico');
                    break;

                case 11:
                    this.pieces.push('king.ico');
                    break;

                case 12:
                    this.pieces.push('quinn.ico');
                    break;

                default:
                    this.pieces.push('solider.ico')
            }
        }
        
    }

    //this function help my to take img from the arry and visual it
    visual(cell){
        let img = document.createElement("img");
        img.setAttribute('src', this.src + this.pieces[this.i]);
        cell.appendChild(img);
        if(this.color === "black"){
            this.i ++;
        }else if(this.color === "white"){
            this.i --;
        }
    }
}

window.addEventListener('load', (e)=>{
    //all of this code will run only when the DOM is fully loaded

    let divtable = document.createElement('div');
    let backcolor = document.createElement('div');
    let body = document.getElementsByTagName('body')[0];
    let table = document.createElement('table');

    let tr = document.createElement('tr');
    let td = document.createElement('td');

    let player1 = new player("one", "white");//create player 1 || white
    let player2 = new player("two", "black");//create player 1 || white

    let arrClickEvents = [];//arr to help me to remove the lest selected item
    let BOARD_SIZE = 8;//board size

    //boat divs only for better looking
    divtable.id = "divtable";
    backcolor.id = "backcolor";

    //add all to the DOM
    body.appendChild(divtable);
    divtable.appendChild(backcolor);

    table.addEventListener('click',(e)=>{
        /* this event listen to cliks on table
        if you clicked on td || img the cell will change is border
        */
        console.log(e.target)
        if(e.target.tagName === "TD" || "IMG" ){
            arrClickEvents.push(e.target);
            if(arrClickEvents.length < 2){
                arrClickEvents[0].style.outline = "2px solid red";
            }else{
                arrClickEvents[0].style.outline = "none";
                arrClickEvents[1].style.outline = "2px solid red";
                arrClickEvents.shift();
            }
        }
    });

    //this loop draws the board
    for(let i = 0;i < BOARD_SIZE;i++){
        tr = document.createElement('tr');
        for(let j = 0; j< BOARD_SIZE;j++){
            td = document.createElement('td');

            //this if draws the pieces on the board
            if(i < 2){
                player1.visual(td);
            }
            if(i > 5){
                player2.visual(td);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    backcolor.appendChild(table);

});
