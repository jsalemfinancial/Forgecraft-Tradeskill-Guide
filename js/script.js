// main calculation script

let Calculate = new class {
    constructor() {
        this.cSkill = null;
        this.cDiff = null;
        this.iProb = null;
        this.qMax = 1;
        this.iBonus = 0;
        this.qGap = 0;
        this.eCrafts = 0;

        setTimeout(async () => {
            this.twitchMinimize();
        }, 2000);
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

    async twitchMinimize() {
        document.getElementById("twitch-player-container").style.opacity = "0";
        document.getElementById("stream-link").style.display = "flex";
    };
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener('input', function() {
        // Calculate[event.target.name] = parseFloat(event.target.value);
        Calculate[input.getAttribute("name")] = parseFloat(input.value);

        if (typeof(Calculate.cSkill) == "number" && typeof(Calculate.cDiff) == "number" && typeof(Calculate.iProb) == "number") {
            Calculate.getParams();
            Calculate.geteCrafts();
            Calculate.display();
        };
    });
});

document.getElementById("grid-item-content-right").querySelectorAll("span").forEach(variable => {
    variable.addEventListener('mouseover', function() {
        if (variable.getAttribute("name")== "iBonus") {
            document.getElementById("grid-item-footer").getElementsByTagName("h1")[0].innerHTML = "The insipiration bonus";        
        };

        if (variable.getAttribute("name") == "qMax") {
            document.getElementById("grid-item-footer").getElementsByTagName("h1")[0].innerHTML = "The max achievable quality";        
        };

        if (variable.getAttribute("name") == "eCrafts") {
            document.getElementById("grid-item-footer").getElementsByTagName("h1")[0].innerHTML = "The expected crafts to reach max quality";        
        };
    });
});

document.getElementById("twitch-player-minimize").addEventListener("click", Calculate.twitchMinimize);

document.getElementById("stream-link").addEventListener("click", async function() {
    document.getElementById("twitch-player-container").style.opacity = "1";
    document.getElementById("stream-link").style.display = "none";
});