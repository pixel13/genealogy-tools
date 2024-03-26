import inquirer from "inquirer";
import constraintReader from "../../src/birthdate/constraintReader";

jest.mock("inquirer", () => {
  return {
    prompt: jest.fn(),
  };
});

const mockedInquirer = inquirer as jest.Mocked<typeof inquirer>;

describe("constraintReader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should collect at least one constraint from user input", async () => {
    const mockAnswers = {
      date: "13/06/2000",
      age: 14,
      addMore: false,
    };

    mockedInquirer.prompt.mockResolvedValue(mockAnswers);

    const constraints = await constraintReader();

    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(constraints).toEqual([
      {
        age: mockAnswers.age,
        date: new Date("2000-06-13T00:00:00.000Z"),
      },
    ]);
  });

  it("should collect multiple constraints from user input", async () => {
    const mockAnswers = [
      {
        date: "13/06/2000",
        age: 14,
        addMore: true,
      },
      {
        date: "13/06/2001",
        age: 15,
        addMore: false,
      },
    ];

    mockedInquirer.prompt.mockResolvedValueOnce(mockAnswers[0]);
    mockedInquirer.prompt.mockResolvedValueOnce(mockAnswers[1]);

    const constraints = await constraintReader();

    expect(inquirer.prompt).toHaveBeenCalledTimes(2);
    expect(constraints).toEqual([
      {
        age: mockAnswers[0].age,
        date: new Date("2000-06-13T00:00:00.000Z"),
      },
      {
        age: mockAnswers[1].age,
        date: new Date("2001-06-13T00:00:00.000Z"),
      },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
