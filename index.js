let mediaRecorder;
let recordedBlobs;

const errorMsgElement = document.querySelector("span#errorMsg");
const recordedVideo = document.querySelector("video#recorded");
const recordButton = document.querySelector("button#record");
const playButton = document.querySelector("button#play");

recordButton.addEventListener("click", () => {
  if (recordButton.textContent === "Record") return startRecording();
  stopRecording();
  recordButton.textContent = "Record";
  playButton.disabled = false;
});

playButton.addEventListener("click", () => {
  const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
  recordedVideo.src = null;
  recordedVideo.srcObject =null;
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.controls = true;
  recordedVideo.play();
});
function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) recordedBlobs.push(event.data);
}

function startRecording() {
  recordedBlobs = [];
  let options = { mimeType: "video/webm;codecs=vp9,opus" };
  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(
      e
    )}`;
    return;
  }
  recordButton.textContent = "Stop Recording";
  playButton.disabled = true;
  mediaRecorder.onstop = (event) => console.log(event);
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log("MediaRecorder started", mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
}

document.querySelector("button#start").addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    recordButton.disabled = false;
    window.stream = stream;
    const gumVideo = document.querySelector("video#video");
    gumVideo.srcObject = stream;
  } catch (e) {
    console.error("navigator.getUserMedia error:", e);
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }

  
});
var videoId = 'recorded';
var scaleFactor = 0.25;
var snapshots = [];
function capture(video, scaleFactor) {
	if(scaleFactor == null){
		scaleFactor = 1;
	}
	var w = video.videoWidth * scaleFactor;
	var h = video.videoHeight * scaleFactor;
	var canvas = document.createElement('canvas');
		canvas.width  = w;
	    canvas.height = h;
	var ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, w, h);
    return canvas;
} 
function shoot(){
	var video  = document.getElementById(videoId);
	var output = document.getElementById('output');
	var canvas = capture(video, scaleFactor);
		canvas.onclick = function(){
			window.open(this.toDataURL());
		};
	snapshots.unshift(canvas);
	output.innerHTML = '';
	for(var i=0; i<2; i++){
		output.appendChild(snapshots[i]);
	}
}