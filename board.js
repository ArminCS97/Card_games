let Cards = function (ID) {
    this.ID = ID;
};

let gameCards = [];

function ArrayFiller() {
    let id = 0;
    let card;
    for (let i = 0; i < 8; i++) {
        card = new Cards(++id);
        gameCards.push(card);
        gameCards.push(card)
    }
}

ArrayFiller();
let counter = 0;


let button = document.getElementById('Button');
button.innerText = 'Take a Pair';

let card1 = document.getElementById('Card1');
card1.innerText = 'Card 1';

let card2 = document.getElementById('Card2');
card2.innerText = 'Card 2';

let result = document.getElementById('Result');
result.innerText = 'Number Of Steps So Far : ';

let result2 = document.getElementById('Result2');
result2.innerText = 'Cards Existing: ';

button.addEventListener("click", click, true);


function stop() {
    if (gameCards.length === 0){
        alert(" Game is DONE. Number Of Steps is " + '\n' + counter.toString());
        let answer = confirm("Do You Want To Restart The Game? ");
        if (answer){
            window.location.reload(true);
        }
    }
}

function removeElement(array , element) {
    let tempArr = [];
    for( let i = 0; i < array.length; i++){
        if ( array[i].ID !== element)
            tempArr.push(array[i])
    }
    array = tempArr;
    return array
}


function cardsPresentAtArray() {
    let string = '[ ';
    for (let i = 0; i < gameCards.length; i++) {
        string += gameCards[i].ID;
        if ( i !== gameCards.length-1)
            string += ', '
    }
    string += ' ]';
    return string
}


function click() {
    let i = Math.floor(Math.random() * gameCards.length ); // Card Selected by Player 1 at random
    let j = Math.floor(Math.random() * gameCards.length ); // Card Selected By Player 2 at random
    while (true){
        if (i !== j)
            break;
        j = Math.floor(Math.random() * gameCards.length );
    }

    counter++;

    let num1 = gameCards[i].ID;
    let num2 = gameCards[j].ID;

    if (num1 === num2){
        gameCards = removeElement(gameCards , num1);
    }

    card1.innerText = 'Card 1 ' + '\n' + num1.toString();
    card2.innerText = 'Card 2 '+ '\n' + num2.toString();
    result.innerText = 'Number Of Steps So Far : ' + '\n' + counter.toString();
    result2.innerText = 'Cards Existing: ' + '\n' + cardsPresentAtArray();
    stop();
}





