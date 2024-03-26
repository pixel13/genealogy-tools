import inquirer from "inquirer";

export type Command = {
  description: string;
  execute: () => Promise<void>;
};

export default async (commands: Record<string, Command>) => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "tool",
      message: "Select the tool you want to use:",
      choices: Object.keys(commands).map((key) => ({ name: commands[key].description, value: key })),
    },
  ]);

  commands[answers.tool].execute();
};
