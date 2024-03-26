import { Constraint, Constraints, DateRange } from "./types.js";
import { dateFormat } from "../utils/dateUtils.js";

const MIN_DATE = new Date("0000-01-01");
const MAX_DATE = new Date("9999-12-31");

function rangeFromConstraint(constraint: Constraint): DateRange {
  const to = new Date(constraint.date);
  to.setFullYear(to.getFullYear() - constraint.age);

  const from = new Date(to);
  from.setDate(from.getDate() + 1);
  from.setFullYear(from.getFullYear() - 1);

  return { to, from };
}

export class ConstraintError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConstraintError";
  }
}

export default (constraints: Constraints): DateRange => {
  if (constraints.length === 0) {
    throw new ConstraintError("No constraints given: cannot calculate birthdate");
  }

  let from: Date = MIN_DATE;
  let to: Date = MAX_DATE;

  constraints.forEach((constraint) => {
    const range = rangeFromConstraint(constraint);
    from = range.from > from ? range.from : from;
    to = range.to < to ? range.to : to;

    if (from > to) {
      throw new ConstraintError(`Conflicting constraint: ${dateFormat(constraint.date)} - ${constraint.age}`);
    }
  });

  return { from, to };
};
