const fs = require("fs");
const path = require("path");

const folderPath = ".";
const outputFile = "backend_code.txt";

function readFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fullPath.includes("node_modules") || fullPath.includes(".git")) {
      return;
    }

    if (fs.statSync(fullPath).isDirectory()) {
      readFiles(fullPath);
    } else {
      if (fullPath.endsWith(".js") || fullPath.endsWith(".json")) {
        const content = fs.readFileSync(fullPath, "utf8");

        fs.appendFileSync(
          outputFile,
          `\n\n===== FILE: ${fullPath} =====\n\n${content}`,
        );
      }
    }
  });
}

readFiles(folderPath);

console.log("Backend code extracted!");
