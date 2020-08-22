/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, previousScores, previousScore,winningScore;

init();


//document.querySelector('#score-0').textContent = 0;
//document.querySelector('#score-1').textContent = 0;
// document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice+'</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);



document.querySelector('.btn-roll').addEventListener('click',function() {

    if(gamePlaying){
        //1. Random No
        var dice = Math.floor(Math.random()*6)+1;
        var dice2 = Math.floor(Math.random()*6)+1;


        //2. Display Result
        //var diceDom = 
        document.getElementById('dice-1').style.display='block';
        document.getElementById('dice-2').style.display='block';

        // diceDom.style.display = 'block';
        document.getElementById('dice-1').src = 'dice-'+dice+'.png';
        document.getElementById('dice-2').src = 'dice-'+dice2+'.png';
        //3. Update record if number is not 1
        if(dice===6 && previousScore===6){
            scores[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
            nextPlayer();

            
        }else if (dice!==1 && dice2!==1) {
            //Add score
            roundScore+=dice+dice2;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
            previousScore = dice;
        } else {
            //Next Player
            
            nextPlayer();
    
        }
        

    }
    

});

document.querySelector('.btn-hold').addEventListener('click',function() {
    if (gamePlaying){
        //Add Current Score to Global Score
        scores[activePlayer]+= roundScore;
        //Update the UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        //Allow only non-zero valid values
        if(input){
            winningScore = input;

        } else {
            winningScore = 100;
        }
    

        //Check if the player has won the game

        if (scores[activePlayer]>=winningScore){
        //Player activePlayer Won
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER!';
            // document.querySelector('.dice').style.display = 'none';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
            


        }else{
            nextPlayer();
        }

    }
    

    
});

function nextPlayer(){
    //Next Player
    activePlayer === 1 ? activePlayer = 0: activePlayer = 1;
    roundScore = 0;
    document.getElementById('current-0').textContent=0;
    document.getElementById('current-1').textContent=0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}


function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousScore = 0;
    gamePlaying = true;

    // document.querySelector('.dice').style.display = 'none';

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.final-score').value = 100;

}
document.querySelector('.btn-new').addEventListener('click',init);






