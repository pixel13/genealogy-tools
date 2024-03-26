import birthdateCalculator, { ConstraintError } from "./birthdateCalculator.js";
import constraintReader from "./constraintReader.js";
import { dateFormat } from "../utils/dateUtils.js";

export default async (): Promise<void> => {
  const constraints = await constraintReader();

  try {
    const range = birthdateCalculator(constraints);
    console.log("\n", "The birthdate is between", dateFormat(range.from), "and", dateFormat(range.to), "\n");
  } catch (error) {
    if (error instanceof ConstraintError) {
      console.error(error.message);
      return;
    }

    throw error;
  }
};
