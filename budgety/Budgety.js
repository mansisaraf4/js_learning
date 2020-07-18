var totalIncome, totalExpense,currentIncome,currentExpense, count, incomeCookieString, expenseCookieString;
// incomeCookieString = "";
// currentIncome = document.querySelector('.budget__income--value').textContent;
// currentExpense = document.querySelector('.budget__expenses--value').textContent;
// totalIncome = parseFloat(currentIncome.split(" ")[1].split(",").join(""));
// totalExpense = parseFloat(currentExpense.split(" ")[1].split(",").join(""));

// totalIncome = getCookie("total_income");
// totalExpense = getCookie("total_expense");
count = 0;

// setCookie("total_income",totalIncome);
// setCookie("total_expenses",totalExpense);

var init = function(){
    var incomeCookie = getCookie("total_income");
    var expenseCookie = getCookie("total_expenses");
    console.log("incomeCookie -" + incomeCookie);
    console.log("expensCookie -" + expenseCookie);
    if(incomeCookie > 0) {
        totalIncome = incomeCookie;
        console.log("income cookie > 0");
        document.querySelector('.budget__income--value').textContent = "+ "+Intl.NumberFormat().format(totalIncome);
    } else {
        totalIncome = 0.00;
    }
    if(expenseCookie > 0){
        totalExpense = expenseCookie;
        console.log("expense cookie > 0");
        document.querySelector('.budget__expenses--value').textContent = "- "+ Intl.NumberFormat().format(totalExpense);
    } else {
        totalExpense = 0.00;
    }
    var incomeStringArray = getCookie("income_array").split("-");
    if (incomeStringArray !== ""){
        // display the income list
        console.log("incomeArray" + incomeStringArray);
        for(var i = 0; i<incomeStringArray.length ; i++){
            // addRecord();
            console.log("try to print objects:" + incomeStringArray[i]);
        }
    }
    var expenseStringArray = getCookie("expenses_array").split("-");
    if (expenseStringArray !== ""){
        // display the expense list
        console.log("expenseArray" + expenseStringArray);
    }

}
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
        totalIncome = totalIncome + parseFloat(record.value);
        console.log("From addItem_ total Income = " + totalIncome );
        setCookie("total_income",totalIncome);
        if(incomeCookieString !== undefined) {
            incomeCookieString = incomeCookieString + "-" + record;
        }else {
            incomeCookieString = record;
        }
        console.log("IncomeCookieString" + incomeCookieString);
        setCookie("income_array",incomeCookieString);
        document.querySelector('.budget__income--value').textContent = "+ "+Intl.NumberFormat().format(totalIncome);
    } else if(record.type==="exp" && record.value>0){
        totalExpense = totalExpense+parseFloat(record.value);
        setCookie("total_expenses",totalExpense);
        if(incomeCookieString !== undefined) {
            expenseCookieString = expenseCookieString + "-" + record.description + ":" + record.value;
        }else {
            expenseCookieString = record.description + ":" + record.value;
        }
        console.log(expenseCookieString);
        setCookie("expenses_array",expenseCookieString)
        document.querySelector('.budget__expenses--value').textContent = "- "+ Intl.NumberFormat().format(totalExpense);
    }
    addRecord(record);
    calcBudgetAndExpensePercent(totalIncome,totalExpense);
    console.log("Total_Income" + getCookie("total_income"));
    console.log("income_array" + getCookie("income_array"));
    console.log("Total_Expense" + getCookie("total_expenses"));
    console.log("expense_total" + getCookie("expenses_array"));
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


/*
// Add a record using appendChild
var createRecord = function(record){
    var classSelector; 
    record.type === "inc" ? classSelector = ".income__list": classSelector = ".expenses__list";
    // main div
    var container = document.createElement("div");
    container.classList.add("item");
    container.classList.add("clearfix");
    // Item Description
    var itemDescription = document.createElement("div");
    itemDescription.classList.add(".item__description");
    // Right Div 
    var right = document.createElement("div");
    right.classList.add(".right");
    right.classList.add("clearfix");
    // ItemValue
    var itemValue = document.createElement("div");
    itemValue.classList.add(".item__value");

    container.appendChild(itemDescription);
    var t = document.createTextNode(record.description);
    itemDescription.appendChild(t);
    document.querySelector(classSelector).appendChild(container);

}
*/

var setCookie = function(name,value){
    document.cookie = name + "=" + value + ";" + ";path=/";
    // console.log("Set Cookie called");
    // console.log(document.cookie);
}

var getCookie = function(cookieName){
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

var checkCookie = function(){
    init();
    var totalInc = getCookie("total_income");
    var totalExp = getCookie("total_expense");
    var incArray = getCookie("income_array");
    var expArray = getCookie("expenses_array");
}

var addRecord = function(record){
    var classSelector, HTMLSelector,expensHTMLStructure, incomeHTMLStructure, expensHTMLStructure; 
    record.type === "inc" ? classSelector = ".income__list": classSelector = ".expenses__list";    
    var expensHTMLStructure = `
    <div class="item clearfix" id="expense-" + ${count}>
        <div class="item__description">${record.description}</div>
        <div class="right clearfix">
            <div class="item__value">- ${record.value}</div>
            <div class="item__percentage">21%</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>
    `
    var incomeHTMLStructure = `
    <div class="item clearfix" id="income-"++ ${count}>
        <div class="item__description">${record.description}</div>
        <div class="right clearfix">
            <div class="item__value">+ ${record.value}</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>
    `
    record.type === "inc" ? HTMLSelector = incomeHTMLStructure: HTMLSelector = expensHTMLStructure;
    var div = document.querySelector(classSelector);
    div.innerHTML = div.innerHTML + HTMLSelector;
    count+=1;
    // getCookie("income");
}
// Functionality for delete button
document.querySelector('.item__delete--btn').addEventListener('click',function(){
    // Delete a row
});