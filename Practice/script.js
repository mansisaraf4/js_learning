// Function Constructor ----Class

//Function Constructor always with capital

var Person = function(name,yearOfBirth,job){
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
mansi.calculateAge();