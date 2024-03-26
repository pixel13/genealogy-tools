import inquirer from "inquirer";
import toolSelector from "../src/toolSelector";

jest.mock("inquirer", () => {
  return {
    prompt: jest.fn(),
  };
});

const mockedInquirer = inquirer as jest.Mocked<typeof inquirer>;

describe("Tools selector", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should let the user choose a tool from a list", async () => {
    const mockAnswers = {
      tool: "a-command",
    };

    mockedInquirer.prompt.mockResolvedValue(mockAnswers);

    const aCommandExecute = jest.fn();
    const anotherCommandExecute = jest.fn();
    await toolSelector({
      "a-command": {
        description: "A command",
        execute: aCommandExecute,
      },
      "another-command": {
        description: "Another command",
        execute: anotherCommandExecute,
      },
    });

    expect(aCommandExecute).toHaveBeenCalledTimes(1);
    expect(anotherCommandExecute).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
