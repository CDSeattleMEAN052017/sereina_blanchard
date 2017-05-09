function Vehicle(name, numWheels, numPassengers, speed){

    var vinNum = "";

    for(var i = 1; i < 13; i++){
        var randVin = Math.floor(Math.random() * 10);
        vinNum += randVin;
    }

    this.name = name;
    this.numWheels = numWheels;
    this.numPassengers = numPassengers;
    this.speed = speed;
    this.distanceTraveled = 0;
    this.vin = vinNum;
}

Vehicle.prototype.move = function(){
    console.log("Honk honk!");
    this.updateDistanceTraveled();
    return this;
}

Vehicle.prototype.checkMiles = function(){
    console.log("Disance traveled: ", this.distanceTraveled);
    return this;
}

Vehicle.prototype.updateDistanceTraveled = function(){
    this.distanceTraveled += this.speed;
    console.log("Distance traveled: ", this.distanceTraveled);
    return this;
}

var honda = new Vehicle("honda", 4, 5, 50);
honda.move().move();
console.log(honda);
