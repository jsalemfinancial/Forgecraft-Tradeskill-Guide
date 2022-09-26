// main calculation script


// Calculator class.
let Calculate = new class {
    constructor() {
        this.cSkill = null;
        this.cDiff = null;
        this.iProb = null;
        this.qMax = 1;
        this.iBonus = 0;
        this.qGap = 0;
        this.eCrafts = 0;
    }

    getParams() {
        this.iBonus = this.cDiff/6;
        this.qGap = this.cDiff/4;
        this.qMax = Math.floor(5 - ((this.cDiff - (this.cSkill + this.iBonus))/this.qGap));
        console.log(this.iBonus, this.qGap, this.qMax);
    };

    geteCrafts() {
        this.eCrafts = Math.ceil(Math.log(1 - ((this.cDiff - (this.cSkill + this.qGap*(5-this.qMax))))/this.iBonus)/Math.log(1 - this.iProb));
        this.eCrafts = (this.eCrafts < 0) ? 0 : this.eCrafts;

        console.log(this.eCrafts);
    };

    display() {
        document.getElementsByName("iBonus")[0].getElementsByTagName("p")[0].innerHTML = this.iBonus;
        document.getElementsByName("qMax")[0].getElementsByTagName("p")[0].innerHTML = this.qMax;
        document.getElementsByName("eCrafts")[0].getElementsByTagName("p")[0].innerHTML = this.eCrafts;
    };
}

//Initial globals for stream.

async function twitchMinimize() {
    clearTimeout(INIT_MINIMIZE);

    document.getElementById("twitch-player-container").style.transition = "bottom 1s";
    document.getElementById("twitch-player-container").style.bottom = "-20vh";

    setTimeout(async () => {
        document.getElementById("stream-link").style.display = "flex";
        document.getElementById("twitch-player-container").style.transition = "";
    }, 1000);
};

const INIT_MINIMIZE = setTimeout(async () => {
                        twitchMinimize();
                    }, 5000);

// Event listeners

document.querySelectorAll("input").forEach(input => {
    input.addEventListener('input', function() {
        Calculate[input.getAttribute("name")] = parseFloat(input.value);

        if (typeof(Calculate.cSkill) == "number" && typeof(Calculate.cDiff) == "number" && typeof(Calculate.iProb) == "number") {
            Calculate.getParams();
            Calculate.geteCrafts();
            Calculate.display();
        };
    });
});

document.getElementById("grid-item-content-right").querySelectorAll("label").forEach(variable => {
    variable.addEventListener('mouseover', async function() {
        if (variable.getAttribute("name")== "iBonus") {
            await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/inspiration.txt")
                .then(response => response.text())
                .then(text => document.getElementById("grid-item-footer").getElementsByTagName("h1")[0].innerHTML = text);
            console.log("fetch done");        
        };

        if (variable.getAttribute("name") == "qMax") {
            document.getElementById("grid-item-footer").getElementsByTagName("h1")[0].innerHTML = "The max achievable quality";        
        };

        if (variable.getAttribute("name") == "eCrafts") {
            document.getElementById("grid-item-footer").getElementsByTagName("h1")[0].innerHTML = "The expected crafts to reach max quality";        
        };
    });
});

document.getElementById("twitch-player-minimize").addEventListener("click", twitchMinimize);

document.getElementById("stream-link").addEventListener("click", async function() {
    document.getElementById("stream-link").style.display = "none";
    document.getElementById("twitch-player-container").style.transition = "bottom 0.5s";
    document.getElementById("twitch-player-container").style.bottom = "0";
});

document.getElementById("dropdown").addEventListener("click", async function() {
    var menuRod = document.getElementById("menu-rod");
    var menuOptions = document.getElementById("menu-options");

    menuRod.style.transition = "padding 0.25s";
    
    if (menuOptions.style.opacity == 0) {
        menuRod.style.padding = "0 15vw 0 0";

        setTimeout(async () => {
            menuRod.style.transition = ""
            menuOptions.style.transition = "opacity 0.25s";
            menuOptions.style.opacity = "1";
        }, 250);
    } else {
        menuOptions.style.opacity = "0";

        setTimeout(async () => {
            menuRod.style.padding = "0 0 0 0";
        }, 250);
    }
});