song_1="";
song_2="";

leftWristx=0;
leftWristy=0;

rightWristx=0;
rightWristy=0;

scoreleftWrist=0;
scorerightWrist=0;

song_1_status="";
song_2_status="";

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses); 
}

function draw(){
    image(video,0,0,600,500);
    song_1_status = song_1.isPlaying();
    song_2_status = song_2.isPlaying();
    fill("#005A9C");
    stroke("#005A9C");

    if(scoreleftWrist > 0.2){
        circle(leftWristx,leftWristy,20);
        song_2.stop();
    if(song_1_status == false){
        song_1.play();
        document.getElementById("song").innerHTML="Song name: Peter Pan Song"
    }
   }

   if(scorerightWrist > 0.2){
      circle(rightWristx,rightWristy,20);
      song_1.stop();
   if(song_2_status == false){
      song_2.play();
      document.getElementById("song_2").innerHTML = "Song name: Harry Potter Theme Song";  
  }
 }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("posenet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("score_rightWrist= "+scorerightWrist+" "+"score_leftWrist= "+scoreleftWrist);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftWristx= "+ leftWristx +" "+ "leftWristy= " + leftWristy);
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("rightWrisx=  "+ rightWristx +" "+ "rightWristy= " + rightWristy);
    }
}

function preload(){
    song_1=loadSound("music.mp3");
    song_2=loadSound("music2.mp3");
}