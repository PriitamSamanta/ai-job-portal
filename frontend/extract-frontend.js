import fs from "fs";
import path from "path";

const folderPath = "./src";
const outputFile = "frontend_code.txt";

function readFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      readFiles(fullPath);
    } else {
      if (
        fullPath.endsWith(".js") ||
        fullPath.endsWith(".jsx") ||
        fullPath.endsWith(".css")
      ) {
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

console.log("Frontend code extracted!");
