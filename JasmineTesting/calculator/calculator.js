window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById("loan-amount").value = 200000;
  document.getElementById("loan-years").value = 30;
  document.getElementById("loan-rate").value = 3;
  // console.log(getCurrentUIValues());
  update();

}

// Get the current values from the UI
// Update the monthly payment
function update() {
  console.log(getCurrentUIValues());
  updateMonthly(calculateMonthlyPayment(getCurrentUIValues()));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  console.log("calculating payment");
  
  let rate = values['rate']/12/100;
  
  let numerator = values['amount'] * rate;
  console.log("numerator" + numerator);
  
  let denominator = 1 - Math.pow(1 + rate, -Math.abs(values['years']*12));
  console.log("denominator" + denominator);
  
  let payment = numerator/denominator;
  payment = payment.toFixed(2);
  
  console.log("payment is:" + payment);
  return payment;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById('monthly-payment').innerText = `${monthly}`;
}
