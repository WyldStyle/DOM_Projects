
function draw(){

  const canvas = document.querySelector('#canvas');
  canvas.addEventListener('click',()=>{init(canvas)})
}
function init(canvas){
  canvas.addEventListener('mousemove',handleMouseMove,false);
  const context = canvas.getContext('2d');
  let started = false;

  function handleMouseMove(e){
    let x,y;
    if(e.clientX || e.clientX == 0){
      x = e.clientX; y = e.clientY;
    }
    if(!started){
      context.beginPath();
      context.moveTo(x,y);
      started = true;
    }
    else{
      context.lineTo(x,y);
      context.stroke();
    }
  }
  
}

document.addEventListener('DOMContentLoaded',draw)