var totalIncome, totalExpense,currentIncome,currentExpense;
currentIncome = document.querySelector('.budget__income--value').textContent;
currentExpense = document.querySelector('.budget__expenses--value').textContent;
totalIncome = parseFloat(currentIncome.split(" ")[1].split(",").join(""));
totalExpense = parseFloat(currentExpense.split(" ")[1].split(",").join(""));


// Button to add items
document.querySelector('.add__btn').addEventListener('click',function(){
    addItem();
});
// On Keypress add items
document.addEventListener('keypress',function(event){
    if(event.key==="Enter"){
        addItem();
    }
})

var addItem = function(){
    var record = getInput();
    if(record.type==="inc" && record.value>0){
        totalIncome = totalIncome+parseFloat(record.value);
        document.querySelector('.budget__income--value').textContent = "+ "+Intl.NumberFormat().format(totalIncome);
    } else if(record.type==="exp" && record.value>0){
        totalExpense = totalExpense+parseFloat(record.value);
        document.querySelector('.budget__expenses--value').textContent = "- "+ Intl.NumberFormat().format(totalExpense);
    }
    calcBudgetAndExpensePercent(totalIncome,totalExpense);

    //Code to add items in the list
    // Update the amounts
}
var calcBudgetAndExpensePercent = function(income,expense){
    var budget = income - expense;
    document.querySelector('.budget__value').textContent = Intl.NumberFormat().format(budget);
    var expPercent = (expense/income)*100;
    document.querySelector('.budget__expenses--percentage').textContent = Intl.NumberFormat().format(expPercent.toFixed())+"%";
}

var getInput = function(){    
    var inputData = {
        type: document.querySelector('.add__type').value,
        description:document.querySelector('.add__description').value,
        value:document.querySelector('.add__value').value
    }
    return inputData;
}