
for (let i = 1; i < 17; i++) {
    let element;
    element = document.createElement('div');
    element.id = i.toString();
    document.body.appendChild(element);
}


let counter = 0;


// Cards Object
let Cards = function (ID, width, height, color, left ,top, sign, selected) {
    this.ID = ID;
    this.width = width;
    this.height = height;
    this.color = color;
    this.top = top;
    this.left = left;
    this.sign_on_card = sign;
    this.selected = selected;
    this.element = document.getElementById(this.ID.toString());
    this.draw = createTheCards;
};

let IDsOfLast2CardsSelected = [];

function createTheCards() {
    const style = this.element.style;
    style.left = this.left+ 'px';
    style.top = this.top+ 'px';
    style.backgroundColor = this.color;
    style.height = this.height + 'px';
    style.width = this.width + 'px';
    style.position = 'absolute';
    style.borderStyle = 'solid';
    this.element.innerText = this.sign_on_card;
    //'Card' +'\n' + this.ID.toString()
    style.fontSize = 'xxx-large';
    style.textAlign = 'center';
    let id = this.ID;
    this.element.addEventListener('click', selectTheCard);
    function selectTheCard() {
        this.selected = true;
        style.backgroundColor = 'red';
        if (!IDsOfLast2CardsSelected.includes(Number(id)))
            IDsOfLast2CardsSelected.push(Number(id));
        counter++;
        setTimeout(function () {
            checkTheGameStatus();
        }, 100);
    }
}


let cardsArray = []; // array in which 16 cards are stored

let signs = ['♣','♦','♥','♠','☀','🔥','🏘️','⛰','♣','♦','♥','♠','☀','🔥','🏘️','⛰'];

function createARandomSign(){
    let i;
    let sign;
    while (true){
        i = Math.floor(Math.random() * signs.length);
        sign = signs[i];
        if (sign !== 'N') {
            signs[i] = 'N';
            return sign;
        }
    }
}

let fillTheArray= ()=>{
    let width = 150;
    let height = 250;
    let x1 = 20;
    let x2 = 20;
    let y = 0;
    let card;
    let id = 1;
    let sign_on_card ;
    for (let i = 0; i < 16; i++) {
        sign_on_card = createARandomSign();
        if ( i <= 7) {
            card = new Cards(id++, width , height, 'yellow', x1, y, sign_on_card, false);
            x1 += width;
            x1 += 40;
        }
        else {
            y = height+ 40;
            card = new Cards(id++, width, height, 'yellow', x2, y, sign_on_card, false);
            x2 += width;
            x2 += 40;
        }
        cardsArray.push(card)
    }
};

let runTheCards = () =>{
    fillTheArray();
    let t = 0;
    for (let i = 0; i < 16; i++) {
        setTimeout(function () {
            cardsArray[i].draw()
        }, t);
        t += 300;
    }
};

runTheCards();

function checkTheGameStatus(){
    if (counter >= 2){
        let id1 = Number(IDsOfLast2CardsSelected[0]);
        let id2 = Number(IDsOfLast2CardsSelected[1]);
        let i1 = id1 - 1;
        let i2 = id2 - 1;
        if (cardsArray[i1].sign_on_card === cardsArray[i2].sign_on_card){
            disappear(id1 , id2)
        }
        else {
            returnBack(id1 , id2)
        }
        counter = 0;
        IDsOfLast2CardsSelected = []
    }
}


function disappear(id1 , id2) {
    id1--; id2--;
    cardsArray[id1].width = 0;
    cardsArray[id1].height = 0;
    cardsArray[id1].sign_on_card = '';
    cardsArray[id2].sign_on_card = '';
    cardsArray[id2].width = 0;
    cardsArray[id2].height = 0;
    cardsArray[id1].top= 0;
    cardsArray[id2].top = 0;
    cardsArray[id1].left= 0;
    cardsArray[id2].left = 0;
    cardsArray[id1].draw();
    cardsArray[id2].draw();
}

function returnBack(id1 , id2) {
    id1--; id2--;
    cardsArray[id1].selected = false;
    cardsArray[id1].backgroundColor = 'yellow';
    cardsArray[id2].selected = false;
    cardsArray[id2].backgroundColor = 'yellow';
    cardsArray[id1].draw();
    cardsArray[id2].draw();
}
