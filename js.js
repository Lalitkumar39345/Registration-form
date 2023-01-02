let mediaRecorder;
let recordedBlobs;

const errorMsgElement = document.querySelector("span#errorMsg");
const recordedVideo = document.querySelector("video#recorded");
const recordButton = document.querySelector("button#record");
const playButton = document.querySelector("button#play");

recordButton.addEventListener("click", () => {
    if (recordButton.textContent === "Record") return startRecording(); stopRecording();
    recordButton.textContent = "record";
    playButton.disabled = false;
});
playButton.addEventListener("click", () => {
    const superBuffer = new Blob(recordedBlobs, {
        type: "video/webm"
    });
    recordedVideo.src = null;
    recordedVideo.srcobject = null;
    recordedVideo.src = windows.URL.createobjectURL(superBuffer);
    recordedVideo.controls = true;
    recordedVideo.play();
});
function handlesuccess(event) {
    if (event.data && event.data.size > 0)
        recordedBlobs.push(event.data);
}

function startRecording() {
    recordedBlobs = [];
    let options = { MimeType: "video/webm; codecs=vp9, opus" };
    try {
        mediaRecorder = new mediaRecorder(window.MediaStream, options);
    } catch (e) {
        console.error("Exception while creating MediaRecorder:", e);
        errorMsgElement.innerHTML = `Exception while creating MediaRecorder : ${JSON.stringify(e)
            }`;
            return;

    }
    recordButton.textContent = "Stop recording";
    playButton.disabled= true;
    mediaRecorder.onstop = (event)
}