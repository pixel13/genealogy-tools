import inquirer from "inquirer";
import { Constraints } from "./types.js";
import { strToDate } from "../utils/dateUtils.js";

export default async (): Promise<Constraints> => {
  const constraints: Constraints = [];

  let collectConstraints = true;
  while (collectConstraints) {
    // Stryker disable all
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "date",
        message: "Enter the date (dd/mm/yyyy):",
        validate: (input) => {
          if (input.match(/^[0123]\d\/[01]\d\/\d{4}$/)) {
            return true;
          }

          return "Please enter a valid date (dd/mm/yyyy)";
        },
      },
      {
        type: "number",
        name: "age",
        message: "Enter the age at the given date:",
        validate: (input) => {
          if (Number.isInteger(input) && input > 0) {
            return true;
          }

          return "Please enter a valid age (positive integer)";
        },
      },
      {
        type: "confirm",
        name: "addMore",
        message: "Do you have any other information to add?",
        default: false,
      },
    ]);

    // Stryker restore all
    const { date, age, addMore } = answers;
    constraints.push({ date: strToDate(date), age });

    if (!addMore) {
      collectConstraints = false;
    }
  }

  return constraints;
};
