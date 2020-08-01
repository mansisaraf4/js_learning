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
    var amount,currentIncome,currentExpense,updatedIncome,updatedExpense;
    currentIncome = document.querySelector('.budget__income--value').textContent;
    currentExpense = document.querySelector('.budget__expenses--value').textContent;

    var record = getInput();
    if(record.type==="inc" && record.value>0){
        amount = parseFloat(currentIncome.split(" ")[1].split(",").join(""))+parseFloat(record.value);
        document.querySelector('.budget__income--value').textContent = Intl.NumberFormat('en-IN').format(amount);
    } else if(record.type==="inc" && record.value>0){
        amount = parseFloat(currentIncome.split(" ")[1].split(",").join(""))-parseFloat(record.value);
        document.querySelector('.budget__expenses--value').textContent = Intl.NumberFormat('en-IN').format(amount);
    }
    //Code to add items in the list
    // Update the amounts
}

var getInput = function(){    
    var inputData = {
        type: document.querySelector('.add__type').value,
        description:document.querySelector('.add__description').value,
        value:document.querySelector('.add__value').value
    }
    return inputData;
}