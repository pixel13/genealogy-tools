import birthdateCalculator from "../../src/birthdate/birthdateCalculator";

describe("Birthdate Calculator", () => {
  it("should return an error if no contraints are given", () => {
    expect(() => birthdateCalculator([])).toThrow("No constraints given: cannot calculate birthdate");
  });

  it("should return the range of the birthdate, with a single constraint", () => {
    const constraints = [{ date: new Date("2024-03-23"), age: 26 }];

    const birthdateRange = birthdateCalculator(constraints);

    expect(birthdateRange.from).toEqual(new Date("1997-03-24"));
    expect(birthdateRange.to).toEqual(new Date("1998-03-23"));
  });

  it("should return the range of the birthdate, with two constraints", () => {
    const constraints = [
      { date: new Date("2024-03-23"), age: 26 },
      { date: new Date("2024-09-01"), age: 27 },
    ];

    const birthdateRange = birthdateCalculator(constraints);

    expect(birthdateRange.from).toEqual(new Date("1997-03-24"));
    expect(birthdateRange.to).toEqual(new Date("1997-09-01"));
  });

  it("should return the range of the birthdate, with multiple constraints", () => {
    const constraints = [
      { date: new Date("2024-03-23"), age: 26 },
      { date: new Date("2023-06-10"), age: 25 },
      { date: new Date("2024-08-01"), age: 27 },
      { date: new Date("2025-12-01"), age: 28 },
    ];

    const birthdateRange = birthdateCalculator(constraints);

    expect(birthdateRange.from).toEqual(new Date("1997-06-11"));
    expect(birthdateRange.to).toEqual(new Date("1997-08-01"));
  });

  it("should return a single date range, if constraints are very strict", () => {
    const constraints = [
      { date: new Date("2024-03-23"), age: 26 },
      { date: new Date("2023-06-12"), age: 25 },
      { date: new Date("2024-08-01"), age: 27 },
      { date: new Date("2025-12-01"), age: 28 },
      { date: new Date("2027-06-13"), age: 30 },
    ];

    const birthdateRange = birthdateCalculator(constraints);

    expect(birthdateRange.from).toEqual(new Date("1997-06-13"));
    expect(birthdateRange.to).toEqual(new Date("1997-06-13"));
  });

  it("should throw an error if the constraints are invalid", () => {
    const constraints = [
      { date: new Date("2024-03-23"), age: 26 },
      { date: new Date("2023-06-12"), age: 27 },
    ];

    expect(() => birthdateCalculator(constraints)).toThrow("Conflicting constraint: 12/06/2023 - 27");
  });
});
