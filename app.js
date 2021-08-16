'use strict'

const wrap = document.querySelector('.wrap');
let blocks = document.querySelectorAll('.block');
let scores = 0;
const introScreen = document.querySelector('.intro');
const buttonGetUserName = document.querySelector('#get-user-name');
const inputUserName = document.querySelector('#input-user-name');
const rulesScreen = document.querySelector('.rules');
const gamestart = document.querySelector('#gamestart');
let result = {};
let user;
let players = {
};
let choosedColorArray = [];
let counterOfX2Combos = 0;
let counterOfX3Combos = 0;
//
let colum1 = document.querySelector('.colum-1');
let colum2 = document.querySelector('.colum-2');
let colum3 = document.querySelector('.colum-3');
let colum4 = document.querySelector('.colum-4');
//
let column1Blocks = colum1.children;
console.log(column1Blocks)
let column2Blocks = colum2.children;
let column3Blocks = colum3.children;
let column4Blocks = colum4.children;
//
let newColumn1Blocks = [];
let newColumn2Blocks = [];
let newColumn3Blocks = [];
let newColumn4Blocks = [];

for (let key of column1Blocks) {
    newColumn1Blocks.push(key)
}
for (let key of column2Blocks) {
    newColumn2Blocks.push(key)
}
for (let key of column3Blocks) {
    newColumn3Blocks.push(key)
}
for (let key of column4Blocks) {
    newColumn4Blocks.push(key)
}
//
newColumn1Blocks.reverse();
newColumn2Blocks.reverse();
newColumn3Blocks.reverse();
newColumn4Blocks.reverse();

let objofColums= {
    column1: newColumn1Blocks,
    column2: newColumn2Blocks,
    column3: newColumn3Blocks,
    column4: newColumn4Blocks,
}
console.log(objofColums)
let arrColor = ['green', 'red', 'coral', 'violet', 'purple', 'blue', 'aqua', 'gold'];
//
//количество очков за блоки по цветам

let colorCost = {
    green: 6,
    red: 5,
    coral: 8,
    violet: 6,
    purple: 7,
    blue: 4,
    aqua: 5,
    gold: 15,
};

let colorCostX2 = {
    green: 12,
    red: 10,
    coral: 16,
    violet: 12,
    purple: 14,
    blue: 8,
    aqua: 10,
    gold: 30,
};


let colorCostX3 = {
    green: 24,
    red: 20,
    coral: 26,
    violet: 24,
    purple: 28,
    blue: 16,
    aqua: 20,
    gold: 45,
};
//

let positionXofArray = {
    0: newColumn1Blocks,
    100: newColumn2Blocks,
    200: newColumn3Blocks,
    300: newColumn4Blocks,
}

let arrColor2 = arrColor.concat(arrColor);


blocks.forEach((item, index) => {
    let rand = Math.floor(Math.random() * 15);
    item.style.backgroundColor = `${arrColor2[index]}`;
});

//

let color1 = '';
let color2 = '';
let target1 = 0, target2 = 0;
let arrTargets = [];


const select = document.querySelector('.select');
let topSelect = select.offsetTop;
let leftSelect = select.offsetLeft;
///search-targets

let tar1, tar2;

buttonGetUserName.addEventListener('click', () =>{
    if (inputUserName.value !== ''){
        user = inputUserName.value;
        introScreen.style.display = 'none';
    } else {
        inputUserName.value = '';
    }
})

gamestart.addEventListener('click', () => {
    rulesScreen.style.display = 'none';
    startGame();
})
let timerId;
let sec = 60;
let globalPlayers;

function startGame(){
    timerId = setTimeout(function timer() {
        --sec;
        document.querySelector('#timerOut').textContent = sec;
        if(sec == 0){
            clearTimeout(timerId);
            document.removeEventListener('keydown', gamePlay);

            document.querySelector('.game-ended').style.display = 'flex';
            result.nickname = user;
            result.scores = scores;
            document.querySelector('.nick-name-out').textContent = user;
            document.querySelector('.scores-out').textContent = scores;
            document.querySelector('.amount-of-pairs-out').textContent = choosedColorArray.length;
            document.querySelector('.amount-of-combosx2-out').textContent = counterOfX2Combos;
            document.querySelector('.amount-of-combosx3-out').textContent = counterOfX3Combos;
            players.result = result;
            console.log(players);
            localStorage.setItem ("players", JSON.stringify("players"));
            globalPlayers = JSON.parse (localStorage.getItem ("players"));
            console.log(players)

        }
        timerId = setTimeout(timer, 1000); // (*)
    }, 1000);
    //
    document.addEventListener('keydown', gamePlay)
}

function gamePlay(event) {
    if(event.code == 'KeyD'){
        if(leftSelect < 300){
            leftSelect += 100;
            select.style.left = leftSelect +'px';
            console.log(`${topSelect}: y; ${leftSelect}: x;`)
        } else {
            leftSelect = 300;
            select.style.left = leftSelect +'px';
            console.log(`${topSelect}: y; ${leftSelect}: x;`)
        }
    }

    if(event.code == 'KeyA'){
        if(leftSelect > 0) {
            leftSelect -= 100;
            select.style.left = leftSelect +'px';
            console.log(`${topSelect}: y; ${leftSelect}: x;`)
        } else {
            leftSelect = 0;
            select.style.left = leftSelect +'px';
            console.log(`${topSelect}: y; ${leftSelect}: x;`)
        }
    }

    if(event.code == 'KeyW'){
        if(topSelect > 0){
            topSelect -= 100;
            select.style.top = topSelect +'px';
            console.log(`${topSelect}: y; ${leftSelect}: x;`)
        } else {
            topSelect = 0;
            select.style.top = topSelect +'px';
            console.log(`${topSelect}: y; ${leftSelect}: x;`)
        }
    }

    if(event.code == 'KeyS'){
        if(topSelect < 300) {
            topSelect += 100;
            select.style.top = topSelect +'px';
            console.log(`${topSelect}: y; ${leftSelect}: x;`)
        } else {
            topSelect = 0;
            select.style.top = topSelect +'px';
            console.log(`${topSelect}: y; ${leftSelect}: x;`)
        }
    }

    ////

    if(event.code == 'Enter'){
        console.dir(event)
        //перебираем коллекцию блоков

        
        if (arrTargets.length === 0) {

            update()
            positionXofArray[leftSelect].forEach(item => {
                if(topSelect == item.offsetTop){
                    tar1 = item
                }
            });

            console.log(tar1)
            arrTargets.push(tar1)
            color1 = tar1.style.backgroundColor;
            console.log(color1)
            
            //
            let divInd = document.createElement('div');
            divInd.classList.add('div-block-ind');
            divInd.style.backgroundColor = color1;
            document.querySelector('.indicator-out').append(divInd);
            //
        } else {
            //опять перебираем коллекцию
            update()
            positionXofArray[leftSelect].forEach(item => {
                if(topSelect == item.offsetTop){
                    tar2 = item
                }
            });
            console.log(tar2);
            color2 = tar2.style.backgroundColor;
            console.log(color2)
            if(arrTargets.includes(tar2)){
                tar2 = undefined;
                color2 = '';
            } else{
                arrTargets.push(tar2)
                // document.querySelector('.tar2').style.backgroundColor = color2;
                console.log(arrTargets)

                //
                let divInd = document.createElement('div');
                divInd.classList.add('div-block-ind');
                divInd.style.backgroundColor = color2;
                document.querySelector('.indicator-out').append(divInd);
                //
            }

        }

        if(arrTargets.length == 2){
            if(color1 == color2){
                setTimeout( () => {
                
                
                //
                spliceTarget(arrTargets[0], arrTargets[1]);
                arrTargets[0].classList.add('opacity');
                arrTargets[1].classList.add('opacity');
                arrTargets[0].remove()
                arrTargets[1].remove()


                update()
                console.log(objofColums)
                
                arrTargets = [];
                console.log(`${arrTargets.length} столько элементов в массиве мы его почистили`)
                document.querySelectorAll('.div-block-ind').forEach(item => {
                    item.remove();
                })

                if(choosedColorArray.length > 1) {
                    if(choosedColorArray.length > 2 && choosedColorArray[choosedColorArray.length-1] == color1 && choosedColorArray[choosedColorArray.length-2] == color1){
                        choosedColorArray.push(color1)
                        console.log('X3')
                        
                        counterOfX3Combos++;
                        scores += colorCostX3[color1];
    
                        let span = document.createElement('span');
                        span.classList.add('scores');
                        document.querySelector('.scores').append(span);
                        span.innerHTML = `+${colorCostX3[color1]}X3`;
                        console.log(choosedColorArray)
                        setTimeout( () => {
                            span.remove();
                        }, 500)
                    } else {
                        if(choosedColorArray[choosedColorArray.length-1] == color1){
                            console.log('x2')
                            choosedColorArray.push(color1)
                            
    
                            scores += colorCostX2[color1];
                            counterOfX2Combos++;
                            let span = document.createElement('span');
                            span.classList.add('scores');
                            document.querySelector('.scores').append(span);
                            span.innerHTML = `+${colorCostX2[color1]}X2`;
                            console.log(choosedColorArray)
                            setTimeout( () => {
                                span.remove();
                            }, 500)
                        } else {
                            
                            choosedColorArray.push(color1)
                            scores += colorCost[color1];
                            let span = document.createElement('span');
                            span.classList.add('scores');
                            document.querySelector('.scores').append(span);
                            span.innerHTML = `+${colorCost[color1]}`;
                            console.log(choosedColorArray)
                            setTimeout( () => {
                                span.remove();
                            }, 500)
                        }
                    }
                    
                    
                } else {
                    choosedColorArray.push(color1)
        
                    scores += colorCost[color1];
                    let span = document.createElement('span');
                    span.classList.add('scores');
                    document.querySelector('.scores').append(span);
                    span.innerHTML = `+${colorCost[color1]}`;
                    console.log(choosedColorArray)
                    setTimeout( () => {
                        span.remove();
                    }, 500)
                }
                
                createBlocks()

                
                console.log(colorCost[color1])
                document.querySelector('#scores').textContent = scores;
                },300)
            }
            else {

                setTimeout( () => {
                    arrTargets = [];
                    console.log(`${arrTargets.length} столько элементов в массиве мы его почистили`)
    
                    //
    
                    document.querySelectorAll('.div-block-ind').forEach(item => {
                        item.remove();
                    })
                },300)
            }
        }

    }

}

function spliceTarget(targetOne, targetTwo){
    let arr = findTarget(targetOne);
    console.log(arr)
    let arr2 = findTarget(targetTwo);
    console.log(arr2)
    let removed = arr.splice(arr.indexOf(targetOne), 0);
    let removed2 = arr2.splice(arr2.indexOf(targetTwo), 0);
    console.log(`${removed}${removed2} эти элементы удалены`)
}

function findTarget (target) {
    if(newColumn1Blocks.includes(target)){
        return newColumn1Blocks;
    }
    if(newColumn2Blocks.includes(target)){
        return newColumn2Blocks;
    }
    if(newColumn3Blocks.includes(target)){
        return newColumn3Blocks;
    }
    if(newColumn4Blocks.includes(target)){
        return newColumn4Blocks;
    }
}


function createBlocks(){
    let arrTemp = [];
    for (let key in objofColums){
        if(objofColums[key].length < 4){
            createBlock(objofColums[key], objofColums[key].length, key)
        }
    }

}

function createBlock(arr, num, key){
    let curr = 4 - num;

    for (let i = 0; i < curr; i++){

        let div = document.createElement('div');
        div.classList.add('block');
        let rand = Math.floor(Math.random() * 8);

        div.style.backgroundColor = `${arrColor[rand]}`;
        if(key == 'column1') {
            document.querySelector('.colum-1').prepend(div)
        }


        if(key == 'column2') {
            document.querySelector('.colum-2').prepend(div)
        }
        if(key == 'column3') {
            document.querySelector('.colum-3').prepend(div)
        }
        if(key == 'column4') {
            document.querySelector('.colum-4').prepend(div)
        }
        
    }

    update()
}



function update() {
    colum1 = document.querySelector('.colum-1');
    colum2 = document.querySelector('.colum-2');
    colum3 = document.querySelector('.colum-3');
    colum4 = document.querySelector('.colum-4');
    //
    column1Blocks = colum1.children;
    column2Blocks = colum2.children;
    column3Blocks = colum3.children;
    column4Blocks = colum4.children;
    //
    newColumn1Blocks = [];
    newColumn2Blocks = [];
    newColumn3Blocks = [];
    newColumn4Blocks = [];

    for (let key of column1Blocks) {
        newColumn1Blocks.push(key)
    }
    for (let key of column2Blocks) {
        newColumn2Blocks.push(key)
    }
    for (let key of column3Blocks) {
        newColumn3Blocks.push(key)
    }
    for (let key of column4Blocks) {
        newColumn4Blocks.push(key)
    }
    //
    newColumn1Blocks.reverse();
    newColumn2Blocks.reverse();
    newColumn3Blocks.reverse();
    newColumn4Blocks.reverse();

    objofColums = {
        column1: newColumn1Blocks,
        column2: newColumn2Blocks,
        column3: newColumn3Blocks,
        column4: newColumn4Blocks,
    }

    blocks = document.querySelectorAll('.block');
    
    positionXofArray = {
        0: newColumn1Blocks,
        100: newColumn2Blocks,
        200: newColumn3Blocks,
        300: newColumn4Blocks,
    }
};
