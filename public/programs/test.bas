suspendupdate

x:getMouseX
y:getMouseY

while 1
  fillCanvas("hsla("+((time/100)%360)+",100%,33%,0.1)")

  d: deltaTime
  x: lerp(x, getMouseX, 0.005*d )
  y: lerp(y, getMouseY, 0.005*d )

  drawCircleGrid(x,y, 4, 4, time/100)
  
  'print ("FPS: "+1000/d)
  update
wend

function lerp(a,b,smooth)
  return a+ (b-a)*smooth
endfunction

function drawCircleGrid(x,y,w,h, i)
  for thisy:0 to h-1
    for thisx:0 to w-1
      s: sin((i+(thisx-w/2)*(thisy-h/2))/5)*10+20
      drawCircle(
        x + thisx*60 - (w-1)*60/2,
        y + thisy*60 - (h-1)*60/2,
        s,
        "hsl("+((i*2)%360)+",100%,50%)"
      )
    next
  next
endfunction
