window.addEventListener('load', (e)=>{
    let divtable = document.createElement('div');
    let backcolor = document.createElement('div');
    let body = document.getElementsByTagName('body')[0];
    let table = document.createElement('table');

    divtable.id = "divtable";
    backcolor.id = "backcolor";

    body.appendChild(divtable);
    divtable.appendChild(backcolor);

    for(let i = 0;i < 8;i++){
        let tr = document.createElement('tr');
        for(let j = 0; j< 8;j++){
            let td = document.createElement('td');
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    backcolor.appendChild(table);
});