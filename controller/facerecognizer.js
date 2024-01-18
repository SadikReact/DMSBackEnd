import * as faceapi from 'face-api.js';
import * as canvas from 'canvas';

const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function detectFaces() {
  // Load models
//   await faceapi.nets.tinyFaceDetector.loadFromDisk('../');

  await faceapi.nets.tinyFaceDetector.loadFromDisk('../node_modules/face-api.js/weights');
  await faceapi.nets.faceLandmark68Net.loadFromDisk('../node_modules/face-api.js/weights');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('../node_modules/face-api.js/weights');

  // Load an image for face detection
  const image = await canvas.loadImage('"C:\Users\deepa\Downloads\admin\faceimg.jpg"');

  // Detect faces in the image
  const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

  // Draw rectangles around the detected faces
  const out = faceapi.createCanvasFromMedia(image);
  faceapi.draw.drawDetections(out, detections.map(det => det.detection));
  faceapi.draw.drawFaceLandmarks(out, detections.map(det => det.landmarks));

  // Save the result to a new image
  require('fs').writeFileSync('"C:\Users\deepa\Downloads\admin\faceimg.jpg"', out.toBuffer('"C:\Users\deepa\Downloads\admin\faceimg.jpg"'));
}

// Call the function
detectFaces();