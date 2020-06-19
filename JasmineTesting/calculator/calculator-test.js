
it('should calculate the monthly rate correctly', function () {
  // ...
  expect(calculateMonthlyPayment({amount: 200000, years: 30, rate: 3})).toEqual('843.21');
});


it("should return a result with 2 decimal places", function() {
  // ..
  expect(calculateMonthlyPayment({amount: 9999, years: 10, rate: 2})).toEqual('92.00');

});

/// etc
