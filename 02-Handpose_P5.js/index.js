let video;
//视频
let handpose;
let predictions=[];






function setup()
{
    createCanvas(640,480)
    video=createCapture(VIDEO)
    video.size(640,480)
    video.hide();
    handpose = ml5.handpose(video, modelReady);
    handpose.on("predict", results => {
        predictions = results;
      //  console.log(predictions)
    })
}
function modelReady() {
    console.log("Model ready!");
}
function draw() {

        image(video, 0, 0, 640, 480);
        drawKeypoints();
}

function drawKeypoints() {

    for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        console.log(prediction);
        for (let j = 0; j < prediction.landmarks.length; j += 1) {
            const keypoint = prediction.landmarks[j];
            fill(255, 255, 0);
            noStroke();
            ellipse(keypoint[0], keypoint[1], 15, 15);
        }
    }
}