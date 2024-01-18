#!/usr/bin/env node

import { getIssues } from "../src/index.js";

const args = process.argv.slice(2);

// Parse command line arguments
const parsedArgs = args.reduce((acc, arg) => {
  const [key, value] = arg.split("=");
  if (key && value) {
    acc[key] = value;
  }
  return acc;
}, {});

const { organization, project_keys: projectKeys, token } = parsedArgs;

if (organization && projectKeys && token) {
  getIssues({ organization, projectKeys, token }).then(({ data: { issues } }) => {
    process.stderr.write(issues);
  });
} else {
  process.stderr.write("Missing or invalid arguments. Usage:\n");
  process.stderr.write(
    "  npx sonar-find organization=your_organization project_keys=cloud_project token=your_token\n",
  );
  process.exitCode = 1;
}
