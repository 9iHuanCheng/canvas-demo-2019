//1、初始化canvas宽高
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
lineWidth = 5;

atuoSetCanvasSize(yyy);

/*****/
//2、进行操作
listenToUser(yyy);

//3、使用橡皮擦
var eraserEnabled = false;
pen.onclick = function(){
  eraserEnabled = false;
  pen.classList.add('active');
  eraser.classList.remove('active');
};
eraser.onclick = function(){
  eraserEnabled = true;
  eraser.classList.add('active');
  pen.classList.remove('active');
};
clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height);
};
download.onclick = function(){
  var url = yyy.toDataURL("image/png");
  console.log(url);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = '我的画儿';
  a.target = '_blank';
  a.click();
};
black.onclick = function(){
  context.strokeStyle = 'black';
  black.classList.add('active');
  red.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
}; 
red.onclick = function(){
  context.strokeStyle = 'red';
  red.classList.add('active');
  black.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
};
green.onclick = function(){
  context.strokeStyle = 'green';
  green.classList.add('active');
  black.classList.remove('active');
  blue.classList.remove('active');
  red.classList.remove('active');
};
blue.onclick = function(){
  context.strokeStyle = 'blue';
  blue.classList.add('active');
  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.remove('active');
};
thin.onclick = function(){
  lineWidth = 5;
}
thick.onclick = function(){
  lineWidth = 8;
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
  context.moveTo(x1, y1);//起点
  context.lineWidth = lineWidth;
  context.lineTo(x2, y2);//终点
  context.stroke();
  context.closePath();
};

function listenToUser(canvas){
  var using = false;
  var lastPoint = {
    x: undefined, 
    y: undefined
  };
  //特性检测
  if(document.body.ontouchstart !== undefined){
    //触屏设备
    canvas.ontouchstart = function(random){
      let x = random.touches[0].clientX;
      let y = random.touches[0].clientY;
      using = true;
      if(eraserEnabled){
        context.clearRect(x - 5, y - 5, 10, 10);
      }  else {
        lastPoint = {'x': x, 'y': y};
        }
    };
    canvas.ontouchmove = function(random){
      let x = random.touches[0].clientX;
      let y = random.touches[0].clientY;
      if(!using){return;}
      if(eraserEnabled){
          context.clearRect(x - 5, y - 5, 10, 10);
      } else {
          let newPoint = {'x': x, 'y': y};
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          lastPoint = newPoint;
        }
    };
    canvas.ontouchend = function(){
      using = false;
    };
  } else {
    //非触屏设备
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
}