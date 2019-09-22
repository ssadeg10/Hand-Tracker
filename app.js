//Params when loading on the model

const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.2,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }

navigator.getUserMedia = navigator.getUserMedia || 
navigator.webkitGetUserMedia||
navigator.mozGetUserMedia|| 
navigator.msGetUserMedia;

//Select everything in the HTML
const video = document.querySelector('#video');
//const audio = document.querySelector('#audio')
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let model;




function runDetection(){
    model.detect(video)
        .then(predictions => {
            if (predictions[0]) {
                    for(var i = 0; i<predictions.length; i++){
                    let x = predictions[i].bbox[0] + (predictions[0].bbox[2] / 2);
                    let y = predictions[i].bbox[1] + (predictions[0].bbox[3] / 2);
                    animateCircles(x, y);
                }
            }
            model.renderPredictions(predictions, canvas, context, video,);
        });
}


handTrack.load(modelParams).then(lmodel => {
        model = lmodel;
    })



    var colors = ['#C4FAF8', '#FFABAB', '#D5AAFF']
           
   function animateCircles (x,y)
    {
       var circle = document.createElement("div");
       circle.setAttribute("id", "mainDiv");
       circle.setAttribute("class", "circle");
   
       document.body.appendChild(circle);

       circle.style.left = x + 'px';
       circle.style.top = y + 'px';
       
       var color = colors[Math.floor(Math.random() * colors.length)];
       circle.style.borderColor = color;



       circle.style.transition = "all 0.5s linear 0s";

       circle.style.left = circle.offsetLeft - 20 - 'px';
       circle.style.top =circle.offsetRight -20 + 'px';

       circle.style.width = "100px";
       circle.style.height = "100px";
       circle.style.borderLength = "50px";
       circle.style.opacity = 0;
    }
    
    
    handTrack.startVideo(video).then(status => {
    if(status){
        navigator.getUserMedia(
            {video:{}},
              stream => {
                video.srcObject = stream;
                setInterval(runDetection,10);
            },
            err => console.log(err)
        );
    }
});

