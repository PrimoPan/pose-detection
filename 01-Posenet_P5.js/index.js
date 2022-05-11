let video;
//视频
let pose;
//存放身体坐标信息
let skeleton;
//存放连线相关信息


modelLoaded=()=>
{
    console.log("model ready")
}


gotPoses=(poses)=>{

    if (poses.length>0){
      //  console.log(poses)
        pose=poses[0].pose;
        console.log(pose);
        skeleton=poses[0].skeleton;
    }
}

function setup()
{
    createCanvas(640,480)
    video=createCapture(VIDEO)

    /* const options={
     architecture: 'MobileNetV1',
         imageScaleFactor: 0.3,
         outputStride: 16,
         flipHorizontal: false,
         minConfidence: 0.3,
         maxPoseDetections: 5,
         scoreThreshold: 0.5,
         nmsRadius: 20,
         detectionType: 'multiple',
         inputResolution: 513,
         multiplier: 0.75,
         quantBytes: 2,
 };*/

    //配置参数

    video.hide();
    //隐藏"输入视频"，把这句话去掉你会看到有两个视频界面
    let poseNet=ml5.poseNet(video,modelLoaded);
    /*
        如果想手动配置参数
        let poseNet=ml5.poseNet(video,options,modelLoaded);
        options为上面的配置对象
    */

    //调用ml5，识别输入视频中的人体关键点
    poseNet.on('pose',gotPoses);
    //如果识别出了人体关键点，调用getPoses函数，在本地接收数据
}

function draw()
{
    image(video,0,0);
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