// Sara Strong
// Timers Exercise
// Springboard Software Engineering Career Track
// 5/28/20

// countdown
//
// Write a function called countdown that accepts a number as a parameter and every 1000 milliseconds decrements the value and console.logs it. Once the value is 0 it should log “DONE!” and stop.
//
function countdown (howMany) {    
     let intervalFunc;
     
     function repeatThis () {
        if (howMany > 1) {
            howMany--;
            if (howMany >= 1)
            {
                console.log(howMany);
            }
        }
        else {
            console.log('DONE!');
            clearInterval(intervalFunc);
         }

     }
  
     intervalFunc = setInterval(repeatThis, 1000);

}

// randomGame
//
// Write a function called randomGame that selects a random number between 0 and 1 every 1000 milliseconds and each time that a random number is picked, add 1 to a counter. If the number is greater than .75, stop the timer and console.log the number of tries it took before we found a number greater than .75.

function randomGame() {
    
    let intervalFunc;
    let count = 1;

    function pickNumber() {
        let rando = Math.random();
        if (rando < 0.75) {
            console.log(rando);
            rando = Math.random;
            count++;
        }
        else {
            console.log(rando);
            console.log('It took ' + count + ' tries before you found a number greater than 0.75');
            clearInterval(intervalFunc);
        }
    }

    intervalFunc = setInterval(pickNumber, 1000);

}