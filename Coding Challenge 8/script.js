
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
let ageSum = 0;
class Element{
    constructor(name,buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
}
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
    isMoreThan1000(){
        if(this.treeCount>1000){
            console.log(`${this.name} has more than 1000 trees!`);
        }
    }
    calcAge(){
        var age = new Date().getFullYear() - this.buildYear;
        return age;
    }
    static avgAge(){

    }
}
class Street extends Element{
    constructor(name, buildYear, length, size = 'normal'){
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
}
const parkA = new Park('ParkA',1990,500,546);
const parkB = new Park('ParkB',1800,800,1000);
const parkC = new Park('ParkC',1700,1200,1000);
console.log('================PARKS================');
parkA.calcDensity();
parkA.isMoreThan1000();
parkB.calcDensity();
parkB.isMoreThan1000();
parkC.calcDensity();
parkC.isMoreThan1000();