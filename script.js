const pet=document.getElementById("pet");

let x=100;
let direction=1;

let xp=0;
let level=1;

let hunger=100;

function updateBars(){

    document.getElementById("level").innerText=level;

    document.getElementById("xpBar").style.width=
    (xp/(level*100))*100+"%";

    document.getElementById("hungerBar").style.width=
    hunger+"%";
}

function levelUp(){

    level++;

    xp=0;

    createHeart();
}

function addXP(amount){

    xp+=amount;

    if(xp>=level*100){

        levelUp();
    }

    updateBars();
}

function createHeart(){

    let heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤️";

    heart.style.left=(x+50)+"px";

    heart.style.bottom="150px";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },2000);
}

function feed(){

    hunger=Math.min(100,hunger+20);

    addXP(10);

    createHeart();

    updateBars();
}

function sleep(){

    pet.src="assets/cat_sleep.gif";

    setTimeout(()=>{

        walk();

    },5000);
}

function idle(){

    pet.src="assets/cat_idle.gif";

    setTimeout(()=>{

        let random=Math.random();

        if(random<0.25){

            sleep();

        }else{

            direction=Math.random()>0.5?1:-1;

            walk();
        }

    },3000);
}

function walk(){

    pet.src="assets/cat_walk.gif";

    let distance=Math.random()*300+100;

    let moved=0;

    pet.style.transform=
    direction===-1
    ? "scaleX(-1)"
    : "scaleX(1)";

    let timer=setInterval(()=>{

        x+=direction*2;

        moved+=2;

        if(x<0){

            direction=1;
        }

        if(x>1400){

            direction=-1;
        }

        pet.style.left=x+"px";

        if(moved>=distance){

            clearInterval(timer);

            idle();
        }

    },20);
}

setInterval(()=>{

    hunger--;

    if(hunger<0){

        hunger=0;
    }

    updateBars();

},10000);

updateBars();

idle();

window.petAPI={

    rose(){

        feed();
    },

    follow(){

        addXP(20);
    },

    galaxy(){

        addXP(100);

        createHeart();
    }
}
