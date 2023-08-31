import fs from "node:fs/promises";
import path from "node:path";

export async function handleCsvUpload(req, res) {
  const chucks = [];
  let fileSize = 0;

  req.on("data", (chuck) => {
    chucks.push(chuck);
    fileSize += chuck.length;
  });

  req.on("end", async () => {
    if (fileSize > 10 * 1024 * 1024) {
      res.writeHead(413, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: "File size is too big",
        })
      );
      return;
    }

    const fileData = Buffer.concat(chucks);
    const filePath = path.join(process.cwd(), "uploads", fileData.toString());

    await fs.writeFile(filePath, fileData, (err) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            message: "Error writing file",
          })
        );
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "File CSV uploaded successfully" }));
      }
    });
  });
}
