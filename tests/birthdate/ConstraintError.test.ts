import ConstraintError from "../../src/birthdate/ConstraintError";

describe("ConstraintError", () => {
  it("should have the correct name", () => {
    const error = new ConstraintError("Invalid constraint");

    expect(error.name).toBe("ConstraintError");
    expect(error.toString()).toBe("ConstraintError: Invalid constraint");
  });
});
