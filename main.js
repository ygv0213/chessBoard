class player{
    constructor(name, color){
        this.name = name;
        this.color = color;
        this.pieces = [];

        if(this.color === "black"){
            this.src = "assetes/icons/black/";
            this.i = 0;
        }else if(this.color === "white"){
            this.src = "assetes/icons/white/";
            this.i = 15;
        }
        
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
    let divtable = document.createElement('div');
    let backcolor = document.createElement('div');
    let body = document.getElementsByTagName('body')[0];
    let table = document.createElement('table');

    let tr = document.createElement('tr');
    let td = document.createElement('td');

    let player1 = new player("one", "white");
    let player2 = new player("two", "black");

    divtable.id = "divtable";
    backcolor.id = "backcolor";

    body.appendChild(divtable);
    divtable.appendChild(backcolor);

    table.addEventListener('click',(e)=>{
        e.target.style.outline = "2px solid red";
    });

    for(let i = 0;i < 8;i++){
        tr = document.createElement('tr');
        for(let j = 0; j< 8;j++){
            td = document.createElement('td');
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