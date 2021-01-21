const { MarkovMachine } = require("./markov");

describe("MarkovMachine", function () {
  let m = new MarkovMachine(
    "Shall I compare thee to a summer’s day? Thou art more lovely and more temperate: Rough winds do shake the darling buds of May, And summer’s lease hath all too short a date."
  );
  test("m should be instance of MarkovMachine", function () {
    expect(m).toBeInstanceOf(MarkovMachine);
  });
  test("m.chains properties and values", function () {
    expect(m.chains).toBeInstanceOf(Object);
    expect(m.chains).toHaveProperty("buds");
    expect(m.chains.more).toContain("temperate:");
  });
  describe("makeText method", function () {
    let text = m.makeText();
    test("m.makeText should return a string", function () {
      expect(text).toBeInstanceOf(String);
    });
  });
});
