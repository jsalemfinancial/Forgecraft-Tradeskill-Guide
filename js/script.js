// Master content controller class.

let Controller = new class {
    constructor() {
        this.about = document.getElementById("about");
        this.calculator = document.getElementById("calculator");
        this.tutorial = document.getElementById("tutorial");
        this.guides = document.getElementById("guides");
        this.tabArray = [this.about, this.calculator, this.tutorial, this.guides];
    };

    changeTab(tab) {
        for (let i = 0; i < this.tabArray.length; i++) {
            this.tabArray[i].style.display = "none";
        }

        if (tab == "calculator") {
            this[tab].style.display = "grid";
            this[tab].style.justifyContent = "start";
        } else {
            this[tab].style.display = "flex";
        }
    };
};

// Calculator class.

let Calculate = new class {
    constructor() {
        this.cSkill = null; // Crafting Skill.
        this.cDiff = null; // Crafting Difficulty.
        this.iProb = null; // Inspiration Probability.
        this.qMax = 1; // Max Quality.
        this.qMin = 1; // Guaranteed Quality.
        this.iBonus = 0; // Inspiration Bonus.
        this.qGap = 0; // Quality Gap.
        this.t4Ratio = 6.5;
        this.t3Ratio = 2.8;
        this.t2Ratio = 1.6;
        this.eCrafts = 0; // Expected Crafts.
    };

    getMax() {
        if (this.cSkill + this.iBonus > this.cDiff) {
            this.qMax = 5;
        } else if (this.cSkill + this.iBonus > Math.ceil(0.8545*this.cDiff - 2.0909)) {
            this.qMax = 4;
        } else if (this.cSkill + this.iBonus > Math.ceil((22/35)*this.cSkill - 47/7)) {
            this.qMax = 3;
        } else if (this.cSkill + this.iBonus > Math.ceil(0.4*this.cSkill - 1)) {
            this.qMax = 2;
        } else {
            this.qMax = 1;
        };
    };

    getMin() {
        if (this.cDiff - this.cSkill <= 0) {
            this.qMin = 5;
        } else if (Math.ceil(0.8545*this.cDiff - 2.0909) < this.cSkill) {
            this.qMin = 4;
        } else if (Math.ceil((22/35)*this.cSkill - 47/7) < this.cSkill) {
            this.qMin = 3;
        } else if (Math.ceil(0.4*this.cSkill - 1) < this.cSkill) {
            this.qMin = 2;
        } else {
            this.qMin = 1;
        };
    };

    getParams() {
        this.iBonus = this.cDiff/6;
        this.qGap = this.cDiff/4;

        this.getMax();
        this.getMin();
        
        // if (this.cDiff - this.cSkill <= 0) {
        //     this.qMin = 5;
        // } else if (this.cDiff/(this.cDiff - this.cSkill) > this.t4Ratio) {
        //     this.qMin = 4;
        // } else if (this.cDiff/(this.cDiff - this.cSkill) > this.t3Ratio) {
        //     this.qMin = 3;
        // } else if (this.cDiff/(this.cDiff - this.cSkill) > this.t2Ratio) {
        //     this.qMin = 2;
        // } else {
        //     this.qMin = 1;
        // };

        // if (this.cSkill + this.iBonus > this.cDiff) {
        //     this.qMax = 5;
        // } else if (this.cSkill + this.iBonus > this.cDiff*(this.t4Ratio - 1)/this.t4Ratio) {
        //     this.qMax = 4;
        // } else if (this.cSkill + this.iBonus > this.cDiff*(this.t3Ratio - 1)/this.t3Ratio) {
        //     this.qMax = 3;
        // } else if (this.cSkill + this.iBonus > this.cDiff*(this.t2Ratio - 1)/this.t2Ratio) {
        //     this.qMax = 2;
        // } else {
        //     this.qMax = 1;
        // };
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
        document.getElementsByName("qMin")[0].getElementsByTagName("h2")[0].innerText = "Tier " + this.qMin;
        document.getElementsByName("qMin")[0].getElementsByTagName("img")[0].src = "graphics/tier" + this.qMin + ".png";

        document.getElementsByName("qMax")[0].getElementsByTagName("h2")[0].innerText = "Tier " + this.qMax;
        document.getElementsByName("qMax")[0].getElementsByTagName("img")[0].src = "graphics/tier" + this.qMax + ".png";
        document.getElementsByName("eCrafts")[0].getElementsByTagName("h2")[0].innerText = this.eCrafts;
    };
};


// Initial globals for stream.

async function twitchMinimize() {
    clearTimeout(INIT_MINIMIZE);

    document.getElementById("twitch-player-container").style.transition = "bottom 1s";
    document.getElementById("twitch-player-container").style.bottom = "-30vh";

    setTimeout(async () => {
        document.getElementById("stream-link").style.display = "flex";
        document.getElementById("twitch-player-container").style.transition = "";
    }, 1000);
};

const INIT_MINIMIZE = setTimeout(async () => {
                        twitchMinimize();
                    }, 5000);

// Event listeners
window.addEventListener("load", () => {
    document.getElementById("navbar-content").querySelectorAll("h1").forEach(tab => {
        tab.addEventListener('click', () => {
            Controller.changeTab(tab.innerText);
        });
    });
    
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener('input', () => {
            Calculate[input.getAttribute("name")] = parseFloat(input.value);
    
            Calculate.getParams();
            Calculate.geteCrafts();
            Calculate.display();
        });
    });
    
    document.getElementById("calculator").querySelectorAll("label").forEach(variable => {
        variable.addEventListener('mouseover', async () => {
            if (variable.getAttribute("name") == "qMin") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/min_quality.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);       
            };
    
            if (variable.getAttribute("name") == "qMax") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/max_quality.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);            
            };
    
            if (variable.getAttribute("name") == "eCrafts") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/expected.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);             
            };
    
            if (variable.getAttribute("name") == "cDiffLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/crafting_difficulty.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);             
            };
    
            if (variable.getAttribute("name") == "cSkillLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/crafting_skill.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);             
            };
    
            if (variable.getAttribute("name") == "iProbLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/inspiration_prob.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);             
            };
        });
    });
    
    window.addEventListener('load', async () => {
        await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/guides.txt")
            .then(response => response.text())
            .then(text => document.getElementById("guide-text").innerText = text);
    
    });
    
    document.getElementById("twitch-player-minimize").addEventListener("click", twitchMinimize);
    
    document.getElementById("stream-link").addEventListener("click", async () => {
        document.getElementById("stream-link").style.display = "none";
        document.getElementById("twitch-player-container").style.transition = "bottom 0.5s";
        document.getElementById("twitch-player-container").style.bottom = "0";
    });
});