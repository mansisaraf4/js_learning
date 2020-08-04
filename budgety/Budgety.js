//BUDGET CONTROLLER
//Keeps track of all income, expense, budget 
var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(curr){
            sum = sum + curr.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget : 0,
        // For non existent -1 is set
        percentage : -1
    };
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            // Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            } else {
                ID = 0;
            }  
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // Push it into our datastructure
            data.allItems[type].push(newItem);
            // return new element
            return newItem;
        },
        deleteItem : function(type, id){
            var ids, index;
            ids = data.allItems[type].map(function(current){
                return current.id;
            });
            index =  ids.indexOf(id);
            if (index !== -1){
                data.allItems[type].splice(index,1);
            }
        },
        calculateBudget: function(){
        // Calculate total income & expense
            calculateTotal('exp');
            calculateTotal('inc');

        // Calcualte total budget
            data.budget = data.totals.inc - data.totals.exp;           

        // Calculate the %age of spent amount
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },
        calculatePercentage: function(){

        },
        getBudget: function(){
            return {
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                perc : data.percentage
            }
        },
        testing: function(){
            console.log(data);
        }
    }
})();

//UICONTROLLER
var UIController = (function() {
    var DOMStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer : '.income__list',
        expensesContainer : '.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expensesLabel : '.budget__expenses--value',
        percentageLabel : '.budget__expenses--percentage',
        container : '.container'
    };
    // console.log(DOMStrings);
    return {
        getInput: function(){
            return{
                type : document.querySelector(DOMStrings.inputType).value,
                description : document.querySelector(DOMStrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
            // Create HTML string with placeholders
            if (type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = `<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div>
                <div class="right clearfix"> <div class="item__value">+ %value%</div> <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div> </div>`
            } else if(type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div> <div class="right clearfix">
                <div class="item__value">- %value%</div> <div class="item__percentage">21%</div> <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>`
            }
            // Replace the placeholder  text with daata
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            // Insert HTML into DOM
            // Using InsertAdjacentHTML function
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },
        deleteListItem : function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },
        displayBudget : function(obj){
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMStrings.percentageLabel).textContent = obj.perc + '%';
            if(obj.perc > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.perc + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '-----';
            }
        },
        clearFields: function(){
            var fields, fieldsArray;
            DOMStrings.inputType.value = 'inc';
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue); 
            //querySelectorAll returns a list of the fields not array --- to convert it into array we will use slice method 
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function(cur, i, arr) {
                cur.value = "";
            });
            fieldsArray[0].focus();
        },
        getDOMStrings: function(){
            return DOMStrings;
        }
    };
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl,UICtrl){
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress',function(event){
            if(event.key === "Enter"){
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    }

    var updateBudget = function(){
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);

    }

    var updatePercentages = function(){
        // Calculate percentage

        // Read from budget ctr

        // update UI

    }

    var ctrlAddItem = function() {
        var input, newItem;
        // 1. Get the field input data
        input = UICtrl.getInput();
        // Check for blank description and not a number fields
        if (input.description !=="" && !isNaN(input.value) && input.value > 0){
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. Add the item to the UI
            UICtrl.addListItem(newItem,input.type);
            // 4. Clear fields
            UICtrl.clearFields();
            // 5. Calculate and Update budget
            updateBudget();
            // 6. Calculate and update percentage
            updatePercentages();
        }
    }

    var ctrlDeleteItem = function(event) {
        var itemID,type, ID;
        // event delegation---event bubbling
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            // Remove the  obj from data
            budgetCtrl.deleteItem(type,ID);
            // Remove the obj from UI
            UICtrl.deleteListItem(itemID);
            // Update and show the new budget
            updateBudget();
            // Calculate and update percentage
            updatePercentages();
        }
    }
    return{
        init : function(){
            console.log("Application Started!");
            UICtrl.displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                perc : -1
            });
            setupEventListeners();
        }
    }

})(budgetController,UIController);

controller.init();