// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/



//Function Constructor to create questions

var Question = function(question, choice,ans){
    this.question = question;
    this.choice = choice;
    this.ans = ans;
}

var countryName = new Question("In which country do you live?",["1.Africa","2.USA","3.India"],"3");
var occupation = new Question("What is your occupation?",["1.Doctor","2.Engineer","3.Mechanic"],"2");
var winner = new Question("Who will win the Premier League this year?",["1.Manchester United","2.LiverPool","3.Chelsea"],"2");


var quesArr = [countryName,occupation,winner];
var score,totalQues;
score = 0;
totalQues = 0;
//Function to display the question and options

function selectQuestion(arr,fn){

    totalQues+=1;
    var quesNo = Math.floor(Math.random()*arr.length);

    var currentQues = arr[quesNo];
    for (var i=0;i<currentQues.choice.length;i++){
        console.log(currentQues.choice[i]);
    }
    fn(prompt(currentQues.question),currentQues,arr);

}

//Function to check the answers

function checkAns(userAns,currentQues,arr){
    if(userAns!=="exit"){
        if(userAns === currentQues.ans){
            console.log("Hurray! You have selected the right answer!!!");
            score+=1;
        } else {
            console.log("Ooops! This was wrong. Please try again!!!!!");
        }
    displayResult(score,totalQues);
    selectQuestion(arr,checkAns);
    }
    
    
}

//Function to display the result
function displayResult(score,total){
    console.log("Your score is "+score+" out of "+total);
    console.log("=================");
    console.log(" ");

}
 selectQuestion(quesArr,checkAns);










