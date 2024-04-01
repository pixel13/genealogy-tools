import birthdateTool from "../../src/birthdate/tool";
import birthdateCalculator from "../../src/birthdate/birthdateCalculator";
import ConstraintError from "../../src/birthdate/ConstraintError";
import constraintReader from "../../src/birthdate/constraintReader";

jest.mock("../../src/birthdate/birthdateCalculator", () => {
  return jest.fn();
});

jest.mock("../../src/birthdate/constraintReader", () => {
  return jest.fn();
});

const mockBirthdateCalculator = birthdateCalculator as jest.MockedFunction<typeof birthdateCalculator>;
const mockConstraintReader = constraintReader as jest.MockedFunction<typeof constraintReader>;

describe("birthdateTool", () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log");
    consoleErrorSpy = jest.spyOn(console, "error");
  });

  it("should read the constraint from the user and then calculate and output the birthdate", async () => {
    const constraints = [{ date: new Date("2024-03-23"), age: 26 }];
    mockConstraintReader.mockResolvedValue(constraints);
    mockBirthdateCalculator.mockReturnValue({ from: new Date("1997-06-11"), to: new Date("1997-08-01") });

    await birthdateTool();

    expect(mockConstraintReader).toHaveBeenCalledTimes(1);
    expect(mockBirthdateCalculator).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "\n",
      "The birthdate is between",
      "11/06/1997",
      "and",
      "01/08/1997",
      "\n"
    );
  });

  it("should output the error message if there is an invalid constraint", async () => {
    const constraints = [
      { date: new Date("2024-03-23"), age: 26 },
      { date: new Date("2024-03-23"), age: 25 },
    ];

    const error = new ConstraintError("Invalid constraint");

    mockConstraintReader.mockResolvedValue(constraints);
    mockBirthdateCalculator.mockImplementation(() => {
      throw error;
    });

    await birthdateTool();

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error.message);
  });

  it("should re-trow any other error but constraint error", () => {
    const constraints = [{ date: new Date("2024-03-23"), age: 26 }];
    const error = new Error("Another error");

    mockConstraintReader.mockResolvedValue(constraints);
    mockBirthdateCalculator.mockImplementation(() => {
      throw error;
    });

    expect(async () => await birthdateTool()).rejects.toThrow("Another error");
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });
});
