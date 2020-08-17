
/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/
class Element{
    constructor(name,buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
}
//Park Class and functions
class Park extends Element{
    constructor(name, buildYear, treeCount, parkArea){
        super(name,buildYear);
        this.treeCount = treeCount;
        this.parkArea = parkArea;
    }
    //function
    calcDensity(){
        console.log(`The density of ${this.name} is ${(this.treeCount/this.parkArea).toFixed(2)}`) ;
    }
    calcAge(){
        var age = new Date().getFullYear() - this.buildYear;
        return age;
    }
    static avgAge(){

    }
}
//Find out parks that have more than 1000 trees
var isMoreThan1000 = function(parkArray){
    for (let park of parkArray){
        if(park.treeCount > 1000){
            console.log(`${park.name} has more than 1000 trees!`);
        }
    }      
}
//Calculate Average Age of Parks
var calcAvgAge =  function (parkArray){
    let sum = 0;
    for (let park of parkArray){
        sum += park.calcAge();
    }
    console.log(`Average age of parks is ${(sum/parkArray.length).toFixed(2)}`);
}
//Display Park Details
var displayParksDetails = function(parkArray){
    console.log('================PARKS================');
    for (let park of parkArray){
        park.calcDensity();
    }
    calcAvgAge(parkArray);
    isMoreThan1000(parkArray);
}
const parkA = new Park('ParkA',1990,500,546);
const parkB = new Park('ParkB',1800,800,1000);
const parkC = new Park('ParkC',1700,1200,1000);
let parkArr = [parkA, parkB, parkC];
displayParksDetails(parkArr);
//Street Class and Functions
class Street extends Element{
    constructor(name, buildYear, length, size = 'normal'){
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
}
const streetA = new Street('StreetA', 2000, 250,'small');
const streetB = new Street('StreetB', 1980, 1500,'huge');
const streetC = new Street('StreetC', 2010, 500);
let calcTotalandAvgLength = function(streetArr){
    let avg = 0, total = 0;
    for (let street of streetArr){
        total +=street.length;
    }
    avg = (total/streetArr.length).toFixed(2);
    // return [total, avg];
    console.log(`Total length of the streets is ${total} km and average length of the streets is ${avg} km`);
}
let displaySize = function(streetArr){
    for (let street of streetArr){
        console.log(`The size of street ${street.name} is ${street.size}`);
    }  
}
let displayStreetDetails= function(streetArr){
    console.log('================STREET================');
    calcTotalandAvgLength(streetArr);
    displaySize(streetArr);
}
const streetD = new Street('StreetD',1900,50,'tiny');
let streetArray = [streetA, streetB, streetC, streetD];
displayStreetDetails(streetArray);