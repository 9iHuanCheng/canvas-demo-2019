//1、初始化canvas宽高
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

atuoSetCanvasSize(yyy);

/*****/
//2、进行操作
listenToMouse(yyy);

//3、使用橡皮擦
var eraserEnabled = false;
eraser.onclick = function(){
  eraserEnabled = true;
  actions.className = 'actions x';
};
brush.onclick = function(){
  eraserEnabled = false;
  actions.className = 'actions';
}

/****************** */

function atuoSetCanvasSize(canvas){
  setCanvasSize();

  window.onresize = function(){
  setCanvasSize();
  }

  function setCanvasSize(){
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  canvas.width = pageWidth;
  canvas.height = pageHeight;
  }
}

function drawLine(x1, y1, x2, y2){
  context.beginPath();
  context.strokeStyle = 'black';
  context.moveTo(x1, y1);//起点
  context.lineTo(x2, y2);//终点
  context.stroke();
  context.closePath();
};

function listenToMouse(canvas){
  var using = false;
  var lastPoint = {
    x: undefined, 
    y: undefined
  };

  canvas.onmousedown = function(random){
    let x = random.clientX;
  //这里的x,y是相对于视口的位置
    let y = random.clientY;
    using = true;
    if(eraserEnabled){
      context.clearRect(x - 5, y - 5, 10, 10);
    }  else {
      lastPoint = {'x': x, 'y': y};
      }
  };
  canvas.onmousemove = function(random){
    let x = random.clientX;
    let y = random.clientY;
    //检查是否在使用橡皮擦
    if(!using){return;}
    if(eraserEnabled){
        context.clearRect(x - 5, y - 5, 10, 10);
    } else {
        let newPoint = {'x': x, 'y': y};
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
  };
  canvas.onmouseup = function(random){
    using = false;
  };
}