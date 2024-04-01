import inquirer from "inquirer";

export type Command = {
  description: string;
  execute: () => Promise<void>;
};

export default async (commands: Record<string, Command>) => {
  // Stryker disable all
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "tool",
      message: "Select the tool you want to use:",
      choices: Object.keys(commands).map((key) => ({ name: commands[key].description, value: key })),
    },
  ]);

  // Stryker restore all
  commands[answers.tool].execute();
};
