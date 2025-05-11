// import React, { useEffect, useRef, useState } from "react";
// const VideoStream = () => {
//   const [img, setImg] = useState(); // Reference to the <img> element

//   const fetchImageStream = async () => {
//     console.log("wow");
//     const response = await fetch("http://localhost:5000/control/fetchStreamedImage");
//     // console.log({ response });
//     if (!response.body) {
//       console.error("Stream body not available!");
//       return;
//     }

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder("utf-8");
//     while (true) {
//       const { value, done } = await reader.read();
//       let buffer = decoder.decode(value);
//       // let resizeBase64Image = (base64Image) => {
//       //   return new Promise((resolve, reject) => {
//       //     const maxSizeInMB = 4;
//       //     const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
//       //     const img = new Image();
//       //     img.src = base64Image;
//       //     img.onload = function () {
//       //       const canvas = document.createElement("canvas");
//       //       const ctx = canvas.getContext("2d");
//       //       const width = img.width;
//       //       const height = img.height;
//       //       const aspectRatio = width / height;
//       //       const newWidth = Math.sqrt(maxSizeInBytes * aspectRatio);
//       //       const newHeight = Math.sqrt(maxSizeInBytes / aspectRatio);
//       //       canvas.width = newWidth;
//       //       canvas.height = newHeight;
//       //       ctx.drawImage(img, 0, 0, newWidth, newHeight);
//       //       let quality = 0.8;
//       //       let dataURL = canvas.toDataURL("image/jpeg", quality);
//       //       resolve(dataURL);
//       //     };
//       //   });
//       // };
//       // let data = await resizeBase64Image(buffer);
//       console.log({ data });
//       setImg(`data:image/png;base64,${buffer}`.trim());
//     }
//   };

//   useEffect(() => {
//     fetchImageStream();
//   }, []);

//   return (
//     <div>
//       {img ? (
//         <img src={img} alt="Streamed from API" style={{ maxWidth: "100%" }} />
//       ) : (
//         <p>Loading image...</p>
//       )}
//     </div>
//   );
// };
// export default VideoStream;

// // const ImageStream = () => {
// //   const canvasRef = useRef(null);

// //   useEffect(() => {
// //     const fetchImageStream = async () => {
// //       const response = await axios.get("http://localhost:5000/control/fetchStreamedImage", {
// //         responseType: "stream",
// //       });

// //       const stream = response.data;

// //       stream.on("data", (data) => {
// //         console.log(data);
// //       });

// //       stream.on("end", () => {
// //         console.log("stream done");
// //       });
// //     };
// //     // const fetchImageStream = async () => {
// //     //   console.log({ wow: "wow" });
// //     //   const response = await axios.get("http://localhost:5000/control/fetchStreamedImage");
// //     //   const reader = response.body.getReader();
// //     //   console.log({ wow: "wow" });
// //     //   const canvas = canvasRef.current;
// //     //   const ctx = canvas.getContext("2d");

// //     //   let buffer = "";
// //     //   const decoder = new TextDecoder("utf-8");

// //     //   while (true) {
// //     //     console.log({ wow: "wow" });
// //     //     const { value, done } = await reader.read();
// //     //     console.log({ value, done });
// //     //     if (done) break;

// //     //     // Decode binary data into a string
// //     //     buffer += decoder.decode(value);
// //     //     console.log({ buffer });
// //     //     // Extract frames based on the boundary ("--frame")
// //     //     const frames = buffer.split("--frame");
// //     //     frames.slice(0, -1).forEach((frame) => {
// //     //       const startIndex = frame.indexOf("Content-Type: image/png");
// //     //       if (startIndex === -1) return; // Skip invalid frames

// //     //       const imageData = frame.slice(startIndex).split("\r\n\r\n")[1]; // Get the binary image data
// //     //       const binaryData = Uint8Array.from(imageData.split("").map((char) => char.charCodeAt(0)));

// //     //       // Create a Blob and render it on the canvas
// //     //       const blob = new Blob([binaryData], { type: "image/png" });
// //     //       const img = new Image();
// //     //       img.src = URL.createObjectURL(blob);

// //     //       img.onload = () => {
// //     //         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
// //     //         ctx.drawImage(img, 0, 0); // Draw the image
// //     //       };
// //     //     });

// //     //     // Retain the last incomplete chunk
// //     //     buffer = frames[frames.length - 1];
// //     //   }
// //     // };

// //     fetchImageStream();
// //   }, []);

// //   return (
// //     <div>
// //       <canvas ref={canvasRef} width={640} height={480} />
// //     </div>
// //   );
// // };

// // export default ImageStream;

import React from "react";

const VideoStream = () => {
  return (
    <div>
      <h1>CARLA Simulator Camera Feed</h1>
      <img
        src="http://localhost:5000/control/fetchFrontCameraStream"
        alt="CARLA Video Stream"
        style={{ width: "100%", maxWidth: "800px", border: "1px solid black" }}
      />
    </div>
  );
};

export default VideoStream;
