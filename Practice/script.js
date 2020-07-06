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




























