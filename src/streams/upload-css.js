import { parse } from "csv-parse";
import fs from "node:fs/promises";

const cssPath = new URL("./tasks.csv", import.meta.url);

const stream = fs.createReadStream(cssPath);

const csvParse = parse({
  delimiter: ",",
  skip_empty_lines: true,
  from_line: 2,
});

async function run() {
  const lineParse = await stream.pipe(csvParse);

  for await (const line of lineParse) {
    console.log(line);
  }
}
