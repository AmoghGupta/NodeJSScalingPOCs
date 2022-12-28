import ffmpeg from "ffmpeg";
import { workerData, parentPort } from "worker_threads";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  let process = new ffmpeg(workerData.file);
  console.log("here 1");
  process.then(video => {
    console.log("here 2");
    video.fnAddWatermark(
      __dirname + "/watermark.png",
      __dirname + "/" + workerData.filename,
      {
        position: "SW",
      },
      function(err, file) {
        if(err){
          console.log(err);
          throw Error(err);
        }
        if (!err) {
          console.log("here 3");
          console.log("New video file is" + file)
          parentPort.postMessage({ status: "Done", file: file })
        }
      }
    )
  })
} catch (e) {
  console.log(e.code)
  console.log(e.msg)
}