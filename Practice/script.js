// Function Constructor ----Class

//Function Constructor always with capital

/*var Person = function(name,yearOfBirth,job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    // this.calculateAge = function(){
        // console.log(2020-this.yearOfBirth);
    // }
}

Person.prototype.calculateAge = function() {
    console.log(2020-this.yearOfBirth);
};

var john = new Person("John",1990,"Teacher"); //Instantiation
console.log(john);
// john.calculateAge();

var mansi = new Person("Mansi",1995,"Developer");
mansi.calculateAge();*/

/*

//Object.create

//First create a simple object

var personProto = {
    calculateAge: function() {
        console.log(2020-this.yearOfBirth);
    }
};

var gina = Object.create(personProto);



///Passing function as argument

var years = [1990,1995,1890,2015,2000];

function arrayCalculator(arr,fn){
    var res = [];
    for(var i=0;i<arr.length;i++){
        res.push(fn(arr[i]));
    }
    return res;
}

function ageCalc(year){
    return 2020-year;
}

var ageArray = arrayCalculator(years,ageCalc);
console.log(ageArray);

///Marks of students

var mathMarks = [30,25,45,50,13];
function percCalc(marks){
    return marks*100/50;
}

var perArr = arrayCalculator(mathMarks,percCalc);
console.log(perArr);

//Function returning function

function ingredientsRequired(dish){
    switch (dish){
        case "Momos": 
            return function(name){
            console.log("Hi!"+name+", to make momos you will need maida, cabbage and carrot");
            }

        case "Roti":
            return function(name){
                console.log("Hi!"+name+", to make rotis, you will need wheat flour, water and a pinch of salt.");
            }

        default:
            return function(name){
                console.logs("Which dish ingredients would you like to know,"+name+" ?");
            }

    } 
}

ingredientsRequired("Roti")("Mansi");*/

/*
//IIFE - hide a variabe from outside
//Immediately invoked function expression
//

(function () {
    var score = Math.random()*10;
    console.log(score>=5);
})(); //calling the anonymous fucntion

//if we call score here it will not work
// console.log(score);

(function (goodluck) {
    var score = Math.random()*10;
    console.log(score>=5-goodluck);
})(5);

//IIFE can be only created once
//Obtain data privacy like we did for score here
*/

//Closures
/*
function retirement(retirementAge){
    var a = ' years  left until retirement';
    return function(yearOfBirth){
        var age = 2020-yearOfBirth;
        console.log((retirementAge-age) + a);
    }
}

retirementIndia = retirement(60);
retirementIndia(1995);

//The process of retirement India using the variables retirementAge and a even after it has stopped is closure

// 


function ingredientsRequired(dish){
    var s = ",to make "+dish+" you will need ";
    return function(name){
        switch (dish){
            case "Momos": 
                // return function(name){
                console.log("Hi!"+name+ s+"maida, cabbage and carrot");
                break;
                // }
    
            case "Roti":
                // return function(name){
                    console.log("Hi!"+name+s+" wheat flour, water and a pinch of salt.");
                    break;
                // }
    
            default:
                // return function(name){
                    console.log ("Which dish ingredients would you like to know,"+name+" ?");
                    break;
                // }
    
        } 
    }

}

ingredientsRequired("Momos")("Mansi");

*/
/////////////////

//Call, bind and Apply

// var marks = [40,50,12,12,20];

// function arrCal (arr,fn){
//     var result = [];
//     for (var i =0; i<arr.length; i++){
//         result.push(fn(arr[i]));
//     }
//     return result;
// }

/*
function calResult(score){
    if (score>15){
        return "pass";
    } else {
        return "fail";
    }
}
*/
/*
function calResult(limit,score){
    if (score>limit){
        return "pass";
    } else {
        return "fail";
    }
}

//To use calResult if we want to use arrCal we have to first fix one argument 
//That can be done using bind
//this can be replaced with other object if we use function from other
var mathResult = calResult.bind(this,15);

//This shows that 15 is the limit for maths --- now mathResult function can be called with arrCal

console.log(arrCal(marks,mathResult));

var hindiResult = calResult.bind(this,12);
console.log(arrCal(marks,hindiResult));
*/
//ES6
//Spread Operator
/*var ages = [10,20,30,40];
function addFourAges(a, b, c,d) {
    return a+b+c+d;
}
var sum = addFourAges(...ages);
console.log(sum);

//String Functions
let name = "Mansi Saraf";
const dob = 1995;
function calAge(year){
    return 2020-year;
}
let age = calAge(dob);
console.log(`${name} is of age ${age}. She was born in ${dob}`);

const familySmith = ["Jane","Jake"];
const familyMiller = ["ABC","JKL"];
const familyCombined = [...familySmith,...familyMiller];
console.log(familyCombined);
console.log(familySmith);*/


/////////////////////////////////////////////
//Rest Parameters 
// Receive a couple of single values and return array 
//stores input params as array

///API andAJAX






