import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { Worker,isMainThread,workerData } from 'worker_threads';
import dotenv from 'dotenv'
dotenv.config()

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({ dest: "uploads", storage: storage })
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload-video", upload.single("ssvideo"), (req, res) => {
    if (isMainThread) {
        console.log(req.file.path);
        console.log(req.file.filename);
      let thread = new Worker("./threads/worker.js", {
        workerData: {
          file: req.file.path,
          filename: req.file.filename,
          watermark_image_url: './threads/watermark.png',
        }
      });
      thread.on("message", data => {
        res.download(data.file, req.file.filename)
      })
      thread.on("error", err => {
        console.error("thread", err)
        res.status(500);
      })
      thread.on("exit", code => {
        if (code != 0) console.error(`Worker stopped with exit code ${code}`)
        res.status(500);
      })
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})