// Base Vehicle class to be extended in Car and Motorcyle classes
//
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk() {
        return "Beep!";
    }

    toString() {
        return `This vehicle is a ${this.make} ${this.model} from ${this.year}`;
    }
}

// Car class inherts from Vehicle class and has four wheels
//
class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

// Motorcycle class inherits from Vehicle class and has two wheels
//
class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine() {
        return 'VROOM!!!';
    }
}

// Garage class aggregates cars up to a given capacity
//
class Garage {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }
    add(vehicle) {
        if (vehicle instanceof Vehicle) {
            if (this.vehicles.length < this.capacity) {
                this.vehicles.push(vehicle);
                return "Vehicle added!";
            }
            else {
                return "Sorry, we're full.";
            }
        }
        else return "Only vehicles are allowed in here!";
    }

    toString() {
        let result = `Garage capacity: ${this.capacity}\n`;
        this.vehicles.forEach(val => {
            result += val.toString() + "\n";
        })
        return result;
    }
}

// Tests
//
let g = new Garage(3);

let s = new Car("Hyundai", "Sonata", "2014");
let m = new Motorcycle("Harley Davidson", "Steel Horse", "2017");
let c = new Car("Volkswagen", "Golf", "2019");

g.add(s);
g.add(m);
g.add(c);

console.log(g.toString());