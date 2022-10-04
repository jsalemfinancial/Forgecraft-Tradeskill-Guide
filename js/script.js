// main calculation script



// Calculator class.
let Calculate = new class {
    constructor() {
        this.cSkill = null; // Crafting Skill.
        this.cDiff = null; // Crafting Difficulty.
        this.iProb = null; // Inspiration Probability.
        // this.sIMax = 0; // Skill Level Cap by Inspiration.
        // this.sLMax = 0; // Skill Level Cap by Level.
        // this.sFinal = 0; //Final Decided Crafting Skill.
        this.qMax = 1; // Max Quality.
        this.qMin = 1; // Guaranteed Quality.
        this.iBonus = 0; // Inspiration Bonus.
        this.qGap = 0; // Quality Gap.
        this.t4Ratio = 6.5;
        this.t3Ratio = 2.8;
        this.t2Ratio = 1.6;
        this.eCrafts = 0; // Expected Crafts.
    }

    getParams() {
        this.iBonus = this.cDiff/6;
        this.qGap = this.cDiff/4;
        // this.sIMax = Math.floor(this.cSkill/this.iBonus)*this.iBonus;
        // this.sLMax = Math.floor(this.cSkill/this.qGap)*this.qGap;
        // this.sFinal = Math.max(this.sIMax, this.sLMax);
        // this.qMax = Math.floor(5 - (this.cDiff - (this.cSkill + this.iBonus))/this.qGap);

        if (this.cDiff - this.cSkill <= 0) {
            this.qMin = 5;
        } else if (this.cDiff/(this.cDiff - this.cSkill) > this.t4Ratio) {
            this.qMin = 4;
        } else if (this.cDiff/(this.cDiff - this.cSkill) > this.t3Ratio) {
            this.qMin = 3;
        } else if (this.cDiff/(this.cDiff - this.cSkill) > this.t2Ratio) {
            this.qMin = 2;
        } else {
            this.qMin = 1;
        };

        if (this.cSkill + this.iBonus > this.cDiff) {
            this.qMax = 5;
        } else if (this.cSkill + this.iBonus > this.cDiff*(this.t4Ratio - 1)/this.t4Ratio) {
            console.log(this.cDiff*(this.t4Ratio - 1)/this.t4Ratio);
            this.qMax = 4;
        } else if (this.cSkill + this.iBonus > this.cDiff*(this.t3Ratio - 1)/this.t3Ratio) {
            console.log(this.cDiff*(this.t3Ratio - 1)/this.t3Ratio);
            this.qMax = 3;
        } else {
            this.qMax = 2;
        };
    };

    geteCrafts() {  
        // this.eCrafts = Math.ceil(Math.log(1 - ((this.cDiff - (this.sFinal + this.qGap*(5 - this.qMax))))/this.iBonus)/Math.log(1 - this.iProb));
        // this.eCrafts = (this.eCrafts < 0) ? 0 : this.eCrafts;
        // this.eCrafts = (this.eCrafts != this.eCrafts) ? 0 : this.eCrafts;

        if (this.qMax == this.qMin) {
            this.eCrafts = 0;
        } else if (this.qMax > this.qMin) {
            this.eCrafts = Math.ceil(1/(this.iProb/100));
        } else {
            this.eCrafts = "Something Went Wrong!";
        };

        this.eCrafts = (this.eCrafts != this.eCrafts) ? "Does Not Apply" : this.eCrafts;
        this.eCrafts = (this.eCrafts > 1000) ? "Does Not Apply" : this.eCrafts;
    };

    display() {
        document.getElementsByName("iBonus")[0].getElementsByTagName("p")[0].innerHTML = (this.iBonus).toFixed(2);
        document.getElementsByName("qMin")[0].getElementsByTagName("p")[0].innerHTML = this.qMin;
        document.getElementsByName("qMax")[0].getElementsByTagName("p")[0].innerHTML = this.qMax;
        document.getElementsByName("eCrafts")[0].getElementsByTagName("p")[0].innerHTML = this.eCrafts;
    };
}

// Initial globals for stream.

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

// document.querySelectorAll("input").forEach(input => {
//     input.addEventListener('input', () => {
//         Calculate[input.getAttribute("name")] = parseFloat(input.value);

//         if (typeof(Calculate.cSkill) == "number" && typeof(Calculate.cDiff) == "number" && typeof(Calculate.iProb) == "number") {
//             Calculate.getParams();
//             Calculate.geteCrafts();
//             Calculate.display();
//         };
//     });
// });

document.querySelectorAll("input").forEach(input => {
    input.addEventListener('input', () => {
        Calculate[input.getAttribute("name")] = parseFloat(input.value);

        Calculate.getParams();
        Calculate.geteCrafts();
        Calculate.display();
    });
});

document.getElementById("grid-item-content-right").querySelectorAll("label").forEach(variable => {
    variable.addEventListener('mouseover', async () => {
        if (variable.getAttribute("name") == "iBonus") {
            await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/inspiration.txt")
                .then(response => response.text())
                .then(text => document.getElementById("grid-item-footer").getElementsByTagName("h1")[0].innerText = text);       
        };

        if (variable.getAttribute("name") == "qMax") {
            await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/quality.txt")
                .then(response => response.text())
                .then(text => document.getElementById("grid-item-footer").getElementsByTagName("h1")[0].innerText = text);            
        };

        if (variable.getAttribute("name") == "eCrafts") {
            await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/expected.txt")
                .then(response => response.text())
                .then(text => document.getElementById("grid-item-footer").getElementsByTagName("h1")[0].innerText = text);             
        };
    });
});

document.getElementById("twitch-player-minimize").addEventListener("click", twitchMinimize);

document.getElementById("stream-link").addEventListener("click", async () => {
    document.getElementById("stream-link").style.display = "none";
    document.getElementById("twitch-player-container").style.transition = "bottom 0.5s";
    document.getElementById("twitch-player-container").style.bottom = "0";
});

document.getElementById("dropdown").addEventListener("click", async () => {
    var menuRod = document.getElementById("menu-rod");
    var menuOptions = document.getElementById("menu-options");

    menuRod.style.transition = "padding 0.25s";
    menuRod.style.backgroundColor = "#FFD700";
    
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