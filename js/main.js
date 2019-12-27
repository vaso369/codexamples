//window.onload=function(){
    var canvasi=document.getElementById("canvasi");
    var canvasi2=document.getElementById("canvasi2");
    var canvasi3=document.getElementById("canvasi3");
    var canvasi4=document.getElementById("canvasi4");
    var canvasi5=document.getElementById("canvasi5");
    var nizFiltera=["grayscale(100%)","sepia(100%)","blur(1.5px)","invert(100%)","none"];
    ispisCanvasa(canvasi,nizFiltera[0]);
    ispisCanvasa(canvasi2,nizFiltera[1]);
    ispisCanvasa(canvasi3,nizFiltera[2]);
    ispisCanvasa(canvasi4,nizFiltera[3]);
    ispisCanvasa(canvasi5,nizFiltera[4]);
    console.log(canvasi);
    
    //for(var i=0;i<canvasi.length;i++){
        function ispisCanvasa(canvasi,filter){
            canvasi.width=canvasi.scrollWidth;
            canvasi.height=canvasi.scrollHeight;
            var ctx=canvasi.getContext('2d');
            console.log(ctx);
            var image=new Image();
            console.log(canvasi);
            image.onload=function(){
    
                console.log(canvasi.width);
                ctx.filter=filter;
                console.log(image);
                ctx.drawImage(image,0,0,canvasi.width,canvasi.height);
                var pixelData = ctx.getImageData(0,0,canvasi.width,canvasi.height);
                console.log(pixelData);
          }
         
           
            
            
        image.src="../lena.png";
        }
        
  //  }
    
   
//}
var filter;

//console.log(canvasi[i]);
var canvasDiv=document.getElementById("canvasDiv");
var canvas=document.getElementById("canvas");
canvas.width=canvas.scrollWidth;
canvas.height=canvas.scrollHeight;
var ctx=canvas.getContext('2d');
var image=new Image();

image.onload=function(){
    
    ctx.drawImage(image,0,0,canvas.width,canvas.height);
   
    var pixelData = ctx.getImageData(0,0,canvas.width,canvas.height);
    console.log(pixelData);
}
image.src="../lena.png";
console.log(image);
initDraw(canvasDiv);
var br=0;
var brojac=0;
var clickedCrop=false;
function drawCroped() {
    var razlika=brojac-1;
    var cropX=document.getElementsByClassName('rectangle')[razlika].style.left;
    var valCropX=Number(cropX.substring(0,cropX.length-2));
    var cropY=document.getElementsByClassName('rectangle')[razlika].style.top;
    var valCropY=Number(cropY.substring(0,cropY.length-2));
    var cropWidth=document.getElementsByClassName('rectangle')[razlika].style.width;
    var valCropWidth=Number(cropWidth.substring(0,cropWidth.length-2));
    var cropHeight=document.getElementsByClassName('rectangle')[razlika].style.height;
    var valCropHeight=Number(cropHeight.substring(0,cropHeight.length-2));
    ctx.drawImage(image,valCropX,valCropY,valCropWidth,valCropHeight,(canvas.width-valCropWidth)/2,(canvas.height-valCropHeight)/2,valCropWidth,valCropHeight);
}

function initDraw(canvas) {
var mouse = {
x: 0,
y: 0,
startX: 0,
startY: 0
};
function setMousePosition(e) {
var ev = e || window.event; //Moz || IE
if (ev.pageX) { //Moz
mouse.x = ev.pageX + window.pageXOffset;
mouse.y = ev.pageY + window.pageYOffset;
} else if (ev.clientX) { //IE
mouse.x = ev.clientX + document.body.scrollLeft;
mouse.y = ev.clientY + document.body.scrollTop;
}
};

var element = null;    
canvas.onmousemove = function (e) {
setMousePosition(e);
if (element !== null) {
element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
}
}

canvas.onclick = function (e) {
if(br==0){
if (element !== null) {
element=null;
canvas.style.cursor = "crosshair";
console.log("finsihed.");
br++;
} else {
console.log("begun.");
mouse.startX = mouse.x;
mouse.startY = mouse.y;
element = document.createElement('div');
element.className = 'rectangle';
element.style.left = mouse.x + 'px';
element.style.top = mouse.y + 'px';
canvas.appendChild(element)
canvas.style.cursor = "crosshair";
}
}
}
}
// CROP
 document.getElementById("btnCrop").addEventListener("click",cropuj);
function cropuj(){
    clickedCrop=true;
    if(br!=0)
    document.getElementById("btnUndo").style.display="block";
    var cropX=document.getElementsByClassName('rectangle')[brojac].style.left;
    var valCropX=Number(cropX.substring(0,cropX.length-2));
    var cropY=document.getElementsByClassName('rectangle')[brojac].style.top;
    var valCropY=Number(cropY.substring(0,cropY.length-2));
    var cropWidth=document.getElementsByClassName('rectangle')[brojac].style.width;
    var valCropWidth=Number(cropWidth.substring(0,cropWidth.length-2));
    var cropHeight=document.getElementsByClassName('rectangle')[brojac].style.height;
    var valCropHeight=Number(cropHeight.substring(0,cropHeight.length-2));
    document.getElementsByClassName('rectangle')[brojac].style.display="none";
    document.getElementById("canvasDiv").style.cursor="default";
    brojac++;
    var pixelData = ctx.getImageData(0,0,canvas.width,canvas.height);
    for(var i=0;i<pixelData.data.length;i+=4){         
      pixelData.data[i]=255;
      pixelData.data[i+1]=255; 
      pixelData.data[i+2]=255;
 }
 ctx.putImageData(pixelData,0,0);
    ctx.drawImage(image,valCropX,valCropY,valCropWidth,valCropHeight,(canvas.width-valCropWidth)/2,(canvas.height-valCropHeight)/2,valCropWidth,valCropHeight);
  //   var pixelDataCrop = ctx.getImageData(valCropX,valCropY,valCropWidth,valCropHeight,(canvas.width-valCropWidth)/2,(canvas.height-valCropHeight)/2,valCropWidth,valCropHeight);
    if(filter=="blackwhite")                   
        blackWhite();
    if(filter=="sepia")
        sephia();
    if(filter=="blur")
        blurr();
    element.parentNode.removeChild(element);
    element = null;
}
// NORMAL
$('#Normal').click(normalno);
function normalno(){
    document.getElementById("canvasDiv").style.cursor="crosshair";
    br=0;
    filter="normal";
    clickedCrop=false;
    console.log(br);
    var canvas=document.getElementById("canvas");
canvas.width=canvas.scrollWidth;
canvas.height=canvas.scrollHeight;
var ctx=canvas.getContext('2d');
var image=new Image();
image.onload=function(){
 ctx.drawImage(image,0,0,canvas.width,canvas.height);
 var pixelData = ctx.getImageData(0,0,canvas.width,canvas.height);
 console.log(pixelData);
}
image.src="./lena.png";
}
// BLACK WHITE
$('#blackWhite').click(blackWhite);
function blackWhite(){
    if(!clickedCrop){
        ctx.filter='invert(0%)';
        ctx.drawImage(image,0,0,canvas.width,canvas.height);
    }
     filter="blackwhite";
    var pixelData = ctx.getImageData(0,0,canvas.width,canvas.height);
    for(var i=0;i<pixelData.data.length;i+=4){         
     var bw=( pixelData.data[i] + pixelData.data[i+1] + pixelData.data[i+2])/3;
      pixelData.data[i]=bw;
      pixelData.data[i+1]=bw; 
      pixelData.data[i+2]=bw;
 }
 ctx.putImageData(pixelData,0,0);
    console.log(pixelData);
    console.log(bw);  
}
//  SEPIA
$('#Sepia').click(sephia);
function sephia(){
    ctx.filter='sepia(100%)';
     filter="sepia";
    if(!clickedCrop)
    ctx.drawImage(image,0,0,canvas.width,canvas.height);
    else {
        console.log(clickedCrop);
        drawCroped();
    }
    //br=0;  
    
}
$('#Blur').click(blurr);
function blurr(){
    filter="blur";
    ctx.filter='blur(1.5px)';
    console.log("radi");
    if(!clickedCrop)
    ctx.drawImage(image,0,0,canvas.width,canvas.height);
    else {
        drawCroped();
    }
}
$('#Invert').click(invertImage);
function invertImage(){
    filter="invert";
    ctx.filter='invert(100%)';
    console.log("radi");
    if(!clickedCrop)
    ctx.drawImage(image,0,0,canvas.width,canvas.height);
    else {
        drawCroped();
    }
}
document.getElementById("btnUndo").addEventListener("click",undoCrop);
function undoCrop(){
    console.log("radi undo");
    console.log(filter);
    clickedCrop=false;
    if(filter=="blackwhite")
    blackWhite();
    if(filter=="sepia")
    sephia();
    if(filter=="blur")
    blurr();
    if(filter=="normal")
    normalno();
    if(filter==undefined)
    normalno();
    if(filter=="invert")
    invertImage();
    document.getElementById("btnUndo").style.display="none";
}
var rotate=1;
document.getElementById("btnRotate").addEventListener("click",rotatePic);
function rotatePic(){
    console.log(rotate);
   if(rotate==0)
   normalno();
   if(rotate==1){
//        console.log(ctx);
//   //  ctx.rotate(90);
//     ctx.drawImage(image,0,0,canvas.width,canvas.height);
 pixelData = ctx.getImageData(0,0,canvas.width,canvas.height);
for(var i=0;i<pixelData.data.length;i+=4){         
 var bw=( pixelData.data[i] + pixelData.data[i+1] + pixelData.data[i+2])/3;
  pixelData.data[i]=pixelData.data[i+10];
  pixelData.data[i+1]=pixelData.data[i+10]; 
  pixelData.data[i+2]=bw;
}
ctx.putImageData(pixelData,0,0);
console.log(pixelData);
   }
   
}