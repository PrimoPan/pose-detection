let handpose;
let video;
let predictions = [];
let prex=0,prey=0;
let poseNet;
let poses = [];
let is_index_down=false;
let is_middle_down=false;
let is_ring_down=false;
let is_pinky_down=false;
let left_Wrist;
let Thumb;
let is_thumb_down=false;
let right_Wrist;
let palm_Base;
let L_or_R;
let Index;
let Ring;
let Middle;
let Pinky;
function setup() {
    createCanvas(640, 480);
    // background(0)
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    handpose = ml5.handpose(video, modelReady);
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on("pose", function(results) {
        poses = results;
        // console.log(poses);
    });
    // This sets up an event that fills the global variable "predictions"
    // with an array every time new hand poses are detected
    handpose.on("predict", results => {
        predictions = results;
    });

    // Hide the video element, and just show the canvas
}

function modelReady() {
    console.log("Model ready!");
}

function draw() {
    image(video, 0, 0, 640, 480);
    drawKeypoints();
    drawposepoint();
    drawSkeleton();
    // image(video, 0, 0, width, height);
}
function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i += 1) {
        const skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j += 1) {
            const partA = skeleton[j][0];
            const partB = skeleton[j][1];
            stroke(0, 0, 255);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}

// A function to draw ellipses over the detected keypoints
function drawposepoint()
{
    var s;
    for (let i = 0; i < poses.length; i += 1) {
        // For each pose detected, loop through all the keypoints
        const pose = poses[i].pose;
        left_Wrist=pose.leftWrist;
        right_Wrist=pose.rightWrist;

        s="left: "+JSON.stringify(left_Wrist)+"\n"+"right: "+JSON.stringify(right_Wrist);
        for (let j = 0; j < pose.keypoints.length; j += 1) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            const keypoint = pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                fill(255, 255,255);
                noStroke();//取消描边

                ellipse(keypoint.position.x, keypoint.position.y, 20, 20);
            }
        }
    }
}
function isIndexdown()
{
    Index=predictions[0].annotations.indexFinger;
    if (Index[3][1]>Index[1][1])
    {
        is_index_down=true;
        fill(255,123,123);
        noStroke();
        ellipse(Index[3][0], Index[3][1], 35,35);
    }
    else is_index_down=false;
}
function isMiddledown()
{
    Middle=predictions[0].annotations.middleFinger;
    if (Middle[3][1]>Middle[1][1])
    {
        is_middle_down=true;
        fill(255,123,123);
        noStroke();
        ellipse(Middle[3][0], Middle[3][1], 35,35);
    }
    else is_middle_down=false;
}
function isRingdown()
{
    Ring=predictions[0].annotations.ringFinger;
    if (Ring[3][1]>Ring[1][1])
    {
        is_ring_down=true;
        fill(255,123,123);
        noStroke();
        ellipse(Ring[3][0], Ring[3][1], 35,35);
    }
    else is_ring_down=false;
}
function ispinkydown()
{
    Pinky=predictions[0].annotations.pinky;
    if (Pinky[3][1]>Pinky[1][1])
    {
        is_pinky_down=true;
        fill(255,123,123);
        noStroke();
        ellipse(Pinky[3][0], Pinky[3][1], 35,35);
    }else is_pinky_down=false;
}
function isthumbdown()
{
    Thumb=predictions[0].annotations.thumb;
    if (Thumb[3][0]>Thumb[1][0])
    {
        is_thumb_down=true;
        fill(255,123,123);
        noStroke();
        ellipse(Thumb[3][0],Thumb[3][1],35,35);
    }else is_thumb_down=false;
}
function handsdict() {
    isIndexdown();
    isMiddledown();
    isRingdown();
    ispinkydown();
    isthumbdown();
    if (is_pinky_down && is_middle_down && is_ring_down && !is_index_down && is_thumb_down) {
        document.getElementById("number").innerHTML = "这是1";
        document.getElementById("number").style.color = "black";
    }
    if (is_pinky_down && !is_middle_down && is_ring_down && !is_index_down && is_thumb_down) {
        document.getElementById("number").innerHTML = "这是2";
        document.getElementById("number").style.color = "black";
    }
    if (!is_pinky_down && !is_middle_down && !is_ring_down && is_index_down) {
        document.getElementById("number").innerHTML = "这是3";
        document.getElementById("number").style.color = "black";
    }
    if (is_thumb_down && !is_ring_down && !is_index_down && !is_middle_down && !is_pinky_down) {
        document.getElementById("number").innerHTML = "这是4";
        document.getElementById("number").style.color = "black";
    }
    if (!is_thumb_down && !is_ring_down && !is_index_down && !is_middle_down && !is_pinky_down) {
        document.getElementById("number").innerHTML = "这是5";
        document.getElementById("number").style.color = "black";
    }
    if (is_thumb_down && is_ring_down && is_index_down && is_middle_down && is_pinky_down) {
        document.getElementById("number").innerHTML = "这是0";
        document.getElementById("number").style.color = "black";
    }
    if (!is_thumb_down && is_ring_down && is_index_down && is_middle_down && !is_pinky_down) {
        document.getElementById("number").innerHTML = "这是6";
        document.getElementById("number").style.color = "black";
    }
    if (!is_thumb_down && is_ring_down && !is_index_down && is_middle_down && is_pinky_down) {
        document.getElementById("number").innerHTML = "这是8";
        document.getElementById("number").style.color = "black";
    }
    palm_Base = predictions[0].annotations.palmBase[0];

    var dist1 = dist(palm_Base[0], palm_Base[1], left_Wrist.x, left_Wrist.y);
    var dist2 = dist(palm_Base[0], palm_Base[1], right_Wrist.x, right_Wrist.y);
    if (dist1 < dist2) {
        L_or_R = 0;
    } else L_or_R = 1;
    var T;
    if (L_or_R === 0)
        T = "left_hand";
    else T = "right_hand";
    document.getElementById("L_or_R").innerHTML = T;
}
function drawKeypoints() {
     if (predictions.length===0)
         document.getElementById("L_or_R").innerHTML="Hands not Dictected!";
    for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        console.log(prediction);
        for (let j = 0; j < prediction.landmarks.length; j += 1) {
            const keypoint = prediction.landmarks[j];
            fill(255, 255, 0);
            noStroke();
            ellipse(keypoint[0], keypoint[1], 15,15);
        }
        handsdict();
    }
}
