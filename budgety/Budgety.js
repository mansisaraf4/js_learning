//BUDGET CONTROLLER
var budgetController = (function(){


})();

//UI CONTROLLER
var uIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn'
    };

    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        getDomstrings: function(){
            return DOMstrings;
        }
    }

})();

//Interface between budget controller and UI Controller
var controller = (function(budgetCtrl,UICtrl){
    var DOM = UICtrl.getDomstrings();
    var ctrlAddItem = function(){
        // 1. Get Fields Input Data
        var input = UICtrl.getInput();
        console.log(input);

        // 2. Add Item to budget Controller

        // Add Item to UI

        // Calculate the budget

        // Display budget on screen

    }
    
    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem)
    document.addEventListener('keypress',function(event){
        if (event.key==="Enter"){
            ctrlAddItem();
        }
    })

})(budgetController,uIController);