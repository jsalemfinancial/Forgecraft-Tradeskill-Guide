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
    }

    getParams() {
        this.iBonus = this.cDiff/6;
        this.qGap = this.cDiff/4;
        this.qMax = Math.floor(5 - ((this.cDiff - (this.cSkill + this.iBonus))/this.qGap));
        console.log(this.iBonus, this.qGap, this.qMax);
    };

    geteCrafts() {
        this.eCrafts = Math.ceil(Math.log(1 - ((this.cDiff - (this.cSkill + this.qGap*(5-this.qMax))))/this.iBonus)/Math.log(1 - this.iProb));
        console.log(this.eCrafts);
    };

    display() {
        document.getElementsByName("iBonus")[0].getElementsByTagName("p")[0].innerHTML = this.iBonus;
        document.getElementsByName("qMax")[0].getElementsByTagName("p")[0].innerHTML = this.qMax;
        document.getElementsByName("eCrafts")[0].getElementsByTagName("p")[0].innerHTML = this.eCrafts;
    };
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener('input', function(event) {
        Calculate[event.target.name] = parseFloat(event.target.value);

        if (typeof(Calculate.cSkill) == "number" && typeof(Calculate.cDiff) == "number" && typeof(Calculate.iProb) == "number") {
            Calculate.getParams();
            Calculate.geteCrafts();
            Calculate.display();
        };
    });
});