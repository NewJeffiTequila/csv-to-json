import { Request, Response, Router } from "express";
import multer from "multer";
import { Readable } from "stream";
import readline from "readline";
const multerCfg = multer();
const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("alow");
});
router.post(
  "/import",
  multerCfg.single("file"),
  async (req: Request, res: Response) => {
    const { file } = req;

    const buffer = file?.buffer;
    const readableFile = new Readable();

    readableFile.push(buffer);
    readableFile.push(null);

    const lines = readline.createInterface({
      input: readableFile,
    });
    let response = []
    for await (const line of lines) {
      const lineArray = line.split(",");
      let object = {
        attribute1: lineArray[0],
        attribute2: lineArray[1],
        attribute3: lineArray[2],
      };
      response.push(object);
    }
    return res.send(response);
  }
);
export { router };
