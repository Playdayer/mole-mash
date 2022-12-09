const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Hammer {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.image = new Image();
        this.style = "./assests/hammer.png";
        this.image.src = this.style;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y);
        /* hammer-hit animation (i just change images lol) */
        canvas.onclick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            this.image.src = "./assests/hammerRotate.png"

            ctx.drawImage(this.image, this.x, this.y);
            setTimeout(() => {
                this.image.src = "./assests/hammer.png"

                ctx.drawImage(this.image, this.x, this.y);
            }, 500);
        }
    }
};

class HoleFront {
    constructor() {
        this.x = 250;
        this.y = 50;
        this.image = new Image();
        this.style = "./assests/holeFront.png";
        this.image.src = this.style;
    }

    draw() {
        /* drawing holes */
        ctx.drawImage(this.image, this.x, this.y);
        ctx.drawImage(this.image, this.x + 250, this.y);
        ctx.drawImage(this.image, this.x + 500, this.y);
        ctx.drawImage(this.image, this.x + 750, this.y);
        
        ctx.drawImage(this.image, this.x, this.y + 250);
        ctx.drawImage(this.image, this.x + 250, this.y + 250);
        ctx.drawImage(this.image, this.x + 500, this.y + 250);
        ctx.drawImage(this.image, this.x + 750, this.y + 250);
        
        ctx.drawImage(this.image, this.x, this.y + 500);
        ctx.drawImage(this.image, this.x + 250, this.y + 500);
        ctx.drawImage(this.image, this.x + 500, this.y + 500);
        ctx.drawImage(this.image, this.x + 750, this.y + 500);
    }
};

class HoleBack extends HoleFront {
    constructor() {
        super();
        this.style = "./assests/holeBack.png"
        this.image.src = this.style;
    }

    draw() {
        /* drawing holes */
        ctx.drawImage(this.image, this.x, this.y);
        ctx.drawImage(this.image, this.x + 250, this.y);
        ctx.drawImage(this.image, this.x + 500, this.y);
        ctx.drawImage(this.image, this.x + 750, this.y);
        
        ctx.drawImage(this.image, this.x, this.y + 250);
        ctx.drawImage(this.image, this.x + 250, this.y + 250);
        ctx.drawImage(this.image, this.x + 500, this.y + 250);
        ctx.drawImage(this.image, this.x + 750, this.y + 250);
        
        ctx.drawImage(this.image, this.x, this.y + 500);
        ctx.drawImage(this.image, this.x + 250, this.y + 500);
        ctx.drawImage(this.image, this.x + 500, this.y + 500);
        ctx.drawImage(this.image, this.x + 750, this.y + 500);
    }
}

let holeFront = new HoleFront();
let holeBack = new HoleBack();

class Mole {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.style = "./assests/mole.svg";
        this.image.src = this.style;
        this.value = 23;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y);
    }

    reCord() {
        /* mole animation (its so ugly xD) */
        setInterval(() => {
            this.x = getRandomX();
            this.y = getRandomY() - this.value;
            if(score.text <= 29) {
                setTimeout(() => {
                    let a = 0;
                    do {
                        this.y -= 1;
                        a++;
                    } while(a < 14)
                }, 70)
                
                setTimeout(() => {
                    let a = 0;
                    do {
                        this.y += 1;
                        a++;
                    } while(a < 9)
                }, 700)
            } else {
                canvas.style.visibility = "hidden";
                winner();
            }

        }, 800);
    }
};

class Score {
    constructor() {
        this.x = 80;
        this.y = 50;
        this.text = 0;
    } 

    draw() {
        ctx.font = "50px cursive";
        ctx.fillStyle = "#B88C33";
        ctx.fillText(this.text, this.x, this.y)
    }
}

class MoleScore {
    constructor() {
        this.x = 20;
        this.y = 10;
        this.image = new Image();
        this.style = "./assests/moleScore.png";
        this.image.src = this.style;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y)
    }
}

const resize = () => {
    const { innerWidth, innerHeight } = window;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    canvas.style.height = `${innerHeight}px`;
    canvas.style.width = `${innerWidth}px`;
}

/* render function for clear & draw canvas */
const render = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    holeBack.draw();
    mole.draw();
    holeFront.draw();
    hammer.draw();
    score.draw();
    scoreMole.draw();

    requestAnimationFrame(render);
}
requestAnimationFrame(render);

/* cords system for spawn mole */
const cordX = [holeFront.x, holeFront.x + 250, holeFront.x + 500, holeFront.x + 750];
const cordY = [holeFront.y, holeFront.y + 250, holeFront.y + 500];

const getRandomX = () => {
    const random = Math.floor(Math.random() * cordX.length);
    return cordX[random];
};

const getRandomY = () => {
    const random = Math.floor(Math.random() * cordY.length);
    return cordY[random];
};

const winner = () => {
    document.body.innerHTML = `
        <h1 style="font-size: 50px; font-family: cursive;">Mole Mash By Playdayer <br> Thanks for playing</h1>
    `
}

let x;
let y;

window.addEventListener("mousemove", (event) => {
    x = event.clientX - 50;
    y = event.clientY - 50;

    hammer.x = x;
    hammer.y = y;
});

canvas.addEventListener("click", () => {
    if(
        x >= mole.x  && x <= mole.x + 200 &&
        y >= mole.y  && y <= mole.y + 200
    ) {
        score.text++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mole.image.src = "./assests/moleDied.png";
        ctx.drawImage(mole.image, mole.x, mole.y);

        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            mole.image.src = "./assests/mole.svg";
            ctx.drawImage(mole.image, mole.x, mole.y);
        }, 200)
    }
});

let hammer = new Hammer();
let mole = new Mole(getRandomX(), getRandomY() - 23);
let score = new Score();
let scoreMole = new MoleScore();

mole.reCord();

window.onload = resize;
window.addEventListener("resize", resize);