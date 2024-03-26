import birthdateTool from "../../src/birthdate/tool";
import birthdateCalculator from "../../src/birthdate/birthdateCalculator";
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

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log");
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

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });
});
