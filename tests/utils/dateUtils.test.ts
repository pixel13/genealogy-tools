import { dateFormat, strToDate } from "../../src/utils/dateUtils";

describe("Date Utils", () => {
  it("should format a Date as dd/mm/yyyy", () => {
    expect(dateFormat(new Date("1988-12-23T00:00:00.000Z"))).toEqual("23/12/1988");
    expect(dateFormat(new Date("2000-01-01T00:00:00.000Z"))).toEqual("01/01/2000");
    expect(dateFormat(new Date("1755-04-30T00:00:00.000Z"))).toEqual("30/04/1755");
    expect(dateFormat(new Date("1321-07-31T00:00:00.000Z"))).toEqual("31/07/1321");
  });

  it("should convert a dd/mm/yyyy string to a date", () => {
    expect(strToDate("23/12/1988")).toEqual(new Date("1988-12-23T00:00:00.000Z"));
    expect(strToDate("01/01/2000")).toEqual(new Date("2000-01-01T00:00:00.000Z"));
    expect(strToDate("30/04/1755")).toEqual(new Date("1755-04-30T00:00:00.000Z"));
    expect(strToDate("31/07/1321")).toEqual(new Date("1321-07-31T00:00:00.000Z"));
  });
});
