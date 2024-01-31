#!/usr/bin/env node

import { getIssues } from "../src/index.js";
import fs from "fs";

const args = process.argv.slice(2);

// Parse command line arguments
const parsedArgs = args.reduce((acc, arg) => {
  const [key, value] = arg.split("=");
  if (key && value) {
    acc[key] = value;
  }
  return acc;
}, {});

const { organization, project_keys: projectKeys, token, output_file } = parsedArgs;

if (organization && projectKeys && token) {
  getIssues({ organization, projectKeys, token }).then(({ data }) => {
    const output = JSON.stringify(data);
    if (output_file) {
      fs.writeFile(output_file, output, (err) => {
        if (err) throw err;
        process.stderr.write(`Output has been written to ${output_file}`);
      });
    }
    process.stderr.write(JSON.stringify(output));
  });
} else {
  process.stderr.write("Missing or invalid arguments. Usage:\n");
  process.stderr.write(
    "  npx sonar-find organization=your_organization project_keys=cloud_project token=your_token\n",
  );
  process.exitCode = 1;
}
