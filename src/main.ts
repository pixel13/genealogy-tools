#!/usr/bin/env node

import toolSelector from "./toolSelector.js";
import birthdateTool from "./birthdate/tool.js";

// Stryker disable all
toolSelector({
  birthdate: {
    description: "Birthdate calculator",
    execute: birthdateTool,
  },
});
