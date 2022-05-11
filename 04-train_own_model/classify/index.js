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

function setup() {

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


    const modelInfo={
     model:"model/model.json",
      metadata:"model/model_meta.json",
    weights:"model/model.weights.bin",
    }
    brain.load(modelInfo,brainload)
}

function brainload()
{
    console.log("brain ready")
    cp()
}
function cp()
{
    if (pose)
    {
     let IP=[];
     for (let i=0;i<pose.keypoints.length;i++)
     {
         IP.push(pose.keypoints[i].position.x)
        IP.push(pose.keypoints[i].position.y)
     }
      brain.classify(IP,gotResult)
    }else{
    setTimeout(cp,100)
}
}
function gotResult(err,results)
{

    let t=results[0].label;
    let stu=document.getElementById("status2")
    let s="";
    if (t==='a')
    {
       s='a'
    }else
    if (t==='b')
    {
       s='b'
    }else
    if (t==="c")
    {
      s='c'
    }else{
    s='d'
}
    console.log(s)
    stu.innerHTML=s;
    cp();
}


function draw()
{
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