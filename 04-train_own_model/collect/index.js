let video;
let pose;
let skeleton;
let brain;
let state='waiting'
let targetLabel,inputs;


modelLoaded=()=>
{
    console.log("model ready")
}
settleInputs=()=>{
    inputs=[];
    for (let i=0;i<pose.keypoints.length;i++)
    {
        inputs.push(pose.keypoints[i].position.x)
        inputs.push(pose.keypoints[i].position.y)
    }

}
gotPoses=(poses)=>{
    if (poses.length>0){
        pose=poses[0].pose;
        skeleton=poses[0].skeleton;
        if (state==='collecting') {
            settleInputs()
            let target = [targetLabel]
            brain.addData(inputs, target)
        }
    }
}
function keyPressed()
{

    targetLabel=key;
    console.log(targetLabel)
    state="ready"
    if (key==='s')
    {
        brain.saveData();
        return ;
    }
    setTimeout(()=>{
        console.log("collecting")
        state='collecting'
        setTimeout(()=>{
            console.log("not collecting")
            state='waiting'
        },10000)
    },3000)
}
function setup() {
    let stu = document.getElementById("status")
    stu.innerText = state;
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    let options = {
        inputs: 34,
        outputs: 4,
        task: 'classification',
        debug: true
    }
    brain = ml5.neuralNetwork(options);
}
function draw()
{
    let stu=document.getElementById("status")
    stu.innerText=state;
    translate(video.width,0)
    scale(-1,1)
    image(video,0,0,640,480);
    fill(255,0,0);
    if (pose)
    {
        for (let i=0;i<pose.keypoints.length;i++)
        {

            let x=pose.keypoints[i].position.x;
            let y=pose.keypoints[i].position.y;
            fill(0,255,0);
            ellipse(x,y,16);
        }

        for (let i=0;i<skeleton.length;i++)
        {
            let a=skeleton[i][0];
            let b=skeleton[i][1];
            strokeWeight(10);
            stroke(255);
            line(a.position.x,a.position.y,b.position.x,b.position.y)
        }
    }
}