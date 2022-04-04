import simpleRound from "./simpleRound";

describe("simple round tests", () => {
  it("should round number", () => {
    const result = simpleRound(10.345);

    expect(result).toBe(10.3);
  });

  it("should not change number with no decimal points", () => {
    const result = simpleRound(11);

    expect(result).toBe(11);
  });

  it("should return false if no number was provided", () => {
    const result = simpleRound();

    expect(result).toBe(false);
  });
});
