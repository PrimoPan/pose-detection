const isFlipped = true;
let keypointsPose = [];


const videoElement = document.getElementsByClassName("input_video")[0];
videoElement.style.display = "none";

function onPoseResults(results) {
    keypointsPose = results.poseLandmarks;
}

const pose = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    },
});

//配置参数
pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
pose.onResults(onPoseResults);

//开启摄像头
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await pose.send({ image: videoElement });
    },
    width: 1280,
    height: 720,
});
camera.start();

let videoImage;
let w = 2;
let w2 = 2*w;

function setup() {
    createCanvas(1280, 720);
    videoImage = createGraphics(1280,720);
}
function keyPressed(){
    let targetLabel=key;
    console.log(targetLabel)
    let pos=document.getElementById("pos");
    pos.innerHTML=JSON.stringify(keypointsPose)

}
function draw() {
    background(255, 255, 255);
    stroke(0,0,255);
    strokeWeight(2);
    fill(0, 255, 0);
    videoImage.drawingContext.drawImage(
        videoElement,
        0,
        0,
        videoImage.width,
        videoImage.height
    );
    //push()-pop()之间----镜面翻转
    {
        push();
        if (isFlipped) {
            translate(width, 0);
            scale(-1, 1);
        }
        displayWidth = width;
        displayHeight = (width * videoImage.height) / videoImage.width;
        image(videoImage, 0, 0, displayWidth, displayHeight);
        pop();
    }


    if (keypointsPose.length > 0) {
        for (let i=0; i<33; i++){
            indexTip = keypointsPose[i];
            let xx = (1-indexTip.x) * displayWidth;
            let yy = indexTip.y * displayHeight;
            fill(255,127,0);
            ellipse(xx, yy, 20);
        }
        stroke(0,0,255);
        strokeWeight(w2);
    }
}

