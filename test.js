// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    camerast = document.querySelector("#cam--btn1"),
    camerastp = document.querySelector("#cam--btn2"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // Create a link element for downloading the image
    const link = document.createElement("a");

    // Set the download attribute and file name
    link.download = new Date();

    // Convert the canvas content to a data URL
    link.href = cameraSensor.toDataURL();

    // Simulate a click event to trigger the download
    link.click();
    track.stop();
    cameraStart();
};

camerast.onclick = function() {
    cameraStart();
}
camerastp.onclick = function() {
    track.stop();
}


// Start the video stream when the window loads
// window.addEventListener("load", cameraStart, false);