let Cards = function (ID, width, height, color, left ,top, sign, selected) {
    this.ID = ID;
    this.width = width;
    this.height = height;
    this.color = color;
    this.top = top;
    this.left = left;
    this.sign_on_card = sign;
    this.selected = selected;
    this.draw = drawTheCards
};

let counter = 0;

let theLastTwoCards = [];

function drawTheCards() {
    const element = document.createElement('div');
    element.id = this.ID;
    document.body.appendChild(element);
    const style = element.style;
    style.left = this.left+ 'px';
    style.top = this.top+ 'px';
    style.backgroundColor = this.color;
    style.height = this.height + 'px';
    style.width = this.width + 'px';
    style.position = 'absolute';
    style.borderStyle = 'solid';
    element.innerText = this.sign_on_card;
    style.fontSize = 'xxx-large';
    style.textAlign = 'center';
    if (this.selected === false) {
        element.addEventListener('click', selectTheCard);

        function selectTheCard() {
            this.selected = true;
            style.borderStyle = 'outset';
            style.borderWidth = 10 + 'px';
            style.borderColor = 'red';
            counter++;
            CheckTheSelectedCards(this.ID)
        }
    }

}



let cardsArray = [];

let createTheCards = ()=>{
    let width = 150;
    let height = 250;
    let x1 = 20;
    let x2 = 20;
    let y = 0;
    let card;
    let id = 1;
    for (let i = 0; i < 16; i++) {
        if ( i <= 7) {
            card = new Cards(id++, width , height, 'yellow', x1, y, 'ss', false);
            x1 += width;
            x1 += 40;
        }
        else {
            y = height+ 40;
            card = new Cards(id++, width, height, 'yellow', x2, y, 'ss', false);
            x2 += width;
            x2 += 40;
        }
        cardsArray.push(card);
    }
};



let runTheCards = () =>{
    createTheCards();
    let t = 0;
    for (let i = 0; i < 16; i++) {
        setTimeout(function () {
            cardsArray[i].draw()
        }, t);
        t += 300;
    }
};

runTheCards();

let disappear =(last2Cards)=>{
    //removeFromTheDeck(last2Cards);
    for (let i = 0; i < last2Cards.length; i++) {
        last2Cards[i].draw();
    }
};

let returnBack =(last2Cards)=>{
    //removeFromTheDeck(last2Cards);
    for (let i = 0; i < last2Cards.length; i++) {
        last2Cards[i].width = 0;
        last2Cards[i].height = 0;
    }
};



function CheckTheSelectedCards(id) {
    let card = cardsArray[id-1];
    if ( card.selected )
        theLastTwoCards.push(card);
    if (counter === 2) { // 2 cards are selected now
      //  if (theLastTwoCards[0].sign_on_card === theLastTwoCards[1].sign_on_card) {
            disappear(theLastTwoCards)
      //  } else
           // returnBack(theLastTwoCards);

    }
}






