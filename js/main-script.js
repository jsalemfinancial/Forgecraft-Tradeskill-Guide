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
        this.skillToNext = 0; //Skill Until Next Quality Level.
        this.iBonus = 0; // Inspiration Bonus.
        this.iSklRgtBonus = 100; // Skill and Reagent Increase to Inspiration Bonus.
        this.eCrafts = 0; // Expected Crafts for Max Quality.
    };

    getMax() {
        if (document.getElementsByName("iType")[0].selectedIndex == 0) {
            if (this.cSkill + this.iBonus >= this.cDiff) {
                this.qMax = 5;
                this.skillToNext = 0;
            } else if (this.cSkill + this.iBonus > 0.8*this.cDiff - 1) {
                this.qMax = 4;
                this.skillToNext = (this.cDiff - this.cSkill - this.iBonus)
            } else if (this.cSkill + this.iBonus > 0.5*this.cDiff) {
                this.qMax = 3;
                this.skillToNext = (0.8*this.cDiff - this.cSkill - this.iBonus - 1)
            } else if (this.cSkill + this.iBonus > 0.2*this.cDiff - 1) {
                this.qMax = 2;
                this.skillToNext = (0.5*this.cDiff - this.cSkill - this.iBonus)
            } else {
                this.qMax = 1;
                this.skillToNext = (0.2*this.cDiff - this.cSkill - this.iBonus - 1)
            };
        } else {
            if (this.cSkill + this.iBonus > this.cDiff) {
                this.qMax = 3;
            } else if (this.cSkill + this.iBonus > 0.5*this.cDiff) {
                this.qMax = 2;
            } else {
                this.qMax = 1;
            }
        }
    };

    getMin() {
        if (document.getElementsByName("iType")[0].selectedIndex == 0) {
            if (this.cSkill >= this.cDiff) {
                this.qMin = 5;
            } else if (this.cSkill > 0.8*this.cDiff - 1) {
                this.qMin = 4;
            } else if (this.cSkill > 0.5*this.cDiff) {
                this.qMin = 3;
            } else if (this.cSkill > 0.2*this.cDiff - 1) {
                this.qMin = 2;
            } else {
                this.qMin = 1;
            };
        } else {
            if (this.cSkill > this.cDiff) {
                this.qMin = 3;
            } else if (this.cSkill > 0.5*this.cDiff) {
                this.qMin = 2;
            } else {
                this.qMin = 1;
            }
        }
    };

    getParams() {
        this.cDiff = parseFloat(document.getElementsByName("cDiff")[0].value);
        this.cSkill = parseFloat(document.getElementsByName("cSkill")[0].value);
        this.iProb = parseFloat(document.getElementsByName("iProb")[0].value);
        this.iSklRgtBonus = parseFloat(document.getElementsByName("iSklRgtBonus")[0].value);

        if (document.getElementsByName("iType")[0].selectedIndex == 0) {
            this.iBonus = this.cDiff/6 * (this.iSklRgtBonus/100);
        } else {
            this.iBonus = this.cDiff/3 * (this.iSklRgtBonus/100);
        }

        this.getMax();
        this.getMin();
    };

    geteCrafts() {  

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
        document.getElementsByName("qMinLabel")[0].getElementsByTagName("h2")[0].innerText = "Tier " + this.qMin;
        document.getElementsByName("qMinLabel")[0].getElementsByTagName("img")[0].src = "graphics/tier" + this.qMin + ".png";

        document.getElementsByName("qMaxLabel")[0].getElementsByTagName("h2")[0].innerText = "Tier " + this.qMax;
        document.getElementsByName("qMaxLabel")[0].getElementsByTagName("img")[0].src = "graphics/tier" + this.qMax + ".png";

        document.getElementsByName("eCraftsLabel")[0].getElementsByTagName("h2")[0].innerText = this.eCrafts;
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