score=0;
cross=true;
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown=function(e){

    d=document.querySelector('.dino');
    if(e.keyCode==38){
       
        d.classList.add('dinoAni')
        setTimeout(() => {
            d.classList.remove('dinoAni')
        }, 500);
    }
    else if(e.keyCode==39){
        let l=parseInt(window.getComputedStyle(d).left,10) || 40;
        
        if(l<1120)
        d.style.left=l+350+"px";
        
    }
    else if(e.keyCode==37){
        let l=parseInt(window.getComputedStyle(d).left,10) || 40;
        
        if(l>80)
        d.style.left=l-180+"px";
    }
}

setInterval(()=>{
dino=document.querySelector('.dino');
ob=document.querySelector('.obstacle');
gameover=document.querySelector('.gameover');
sc=document.querySelector('.scorecount');

dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
function leftframe(){
    ox=parseInt(ob.getBoundingClientRect().x);
    dy=parseInt(dino.getBoundingClientRect().top);
    oy=parseInt(ob.getBoundingClientRect().top);
    requestAnimationFrame(leftframe);
}
leftframe();
offsetX=Math.abs(ox-dx);
offsetY=Math.abs(dy-oy);
console.log(offsetY);


if(offsetX<200 && offsetY<50){
    audiogo.play();
    setTimeout(() => {
        audiogo.pause();
        audio.pause();
    }, 1000);
    gameover.style.visibility="visible";
    gameover.style.color='red'
    score=0;
    cross=true;
    ob.classList.remove('objanim');
    scorecount.innerText=`Score:${score}`;
    document.querySelector('#reset').style.visibility='visible'
    
}
if(offsetX<300 && cross){
    score+=1;
    scorecount.innerText=`Score:${score}`;
    cross=false;
    setInterval(() => {
        cross=true;
    }, 1000);
    aniDur = parseFloat(window.getComputedStyle(ob, null).getPropertyValue('animation-duration'));
    if(aniDur!=1)
    setTimeout(() => {
        aniDur = parseFloat(window.getComputedStyle(ob, null).getPropertyValue('animation-duration'));
        newDur = aniDur - 0.2;
        ob.style.animationDuration = newDur + 's';
        console.log('New animation duration: ', newDur)
    }, 500);
}

},500)
function reset(){
        location.reload()
}