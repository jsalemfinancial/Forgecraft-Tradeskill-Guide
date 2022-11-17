// Event listeners

window.addEventListener("load", () => {

    // Fetch About Section Description.
    fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/about_desc.txt")
    .then(response => response.text())
    .then(text => document.getElementById("introduction").getElementsByTagName("p")[0].innerText = text);  
    
    // Changing Tabs -- Non-array Method.

    document.getElementById("navbar-content").querySelectorAll("h1").forEach(tab => {
        tab.addEventListener('click', () => {
            Controller.changeTab(tab.innerText);
        });
    });
    
    // Collect Inputs on Input Change

    document.querySelectorAll("input").forEach(input => {
        input.addEventListener('change', () => {
            Calculate.getParams();
            Calculate.geteCrafts();
            Calculate.display();
        });
    });

    // Collect Inputs on Type Change

    document.getElementsByName("iType")[0].addEventListener('change', () => {
        Calculate.getParams();
        Calculate.geteCrafts();
        Calculate.display();
    });
    
    document.querySelectorAll("#calculator label h1").forEach(variable => {
        variable.addEventListener('mouseover', async () => {
            if (variable.parentElement.getAttribute("name") == "qMinLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/min_quality.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);       
            };
    
            if (variable.parentElement.getAttribute("name") == "qMaxLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/max_quality.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);            
            };
    
            if (variable.parentElement.getAttribute("name") == "eCraftsLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/expected.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);             
            };
    
            if (variable.parentElement.getAttribute("name") == "cDiffLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/crafting_difficulty.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);             
            };
    
            if (variable.parentElement.getAttribute("name") == "cSkillLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/crafting_skill.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);             
            };

            if (variable.parentElement.getAttribute("name") == "iProbLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/inspiration_prob.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);             
            };

            if (variable.parentElement.getAttribute("name") == "iSklRgtBonusLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/skill_reagent_bonus.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);             
            };

            if (variable.parentElement.getAttribute("name") == "advancedLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/advanced.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);             
            };

            if (variable.parentElement.getAttribute("name") == "iTypeLabel") {
                await fetch("https://raw.githubusercontent.com/jsalemfinancial/WoW-Applet/main/descriptions/item_type.txt")
                    .then(response => response.text())
                    .then(text => document.getElementById("grid-item-footer").getElementsByTagName("p")[0].innerText = text);             
            };
        });
    }); 
    
    document.getElementById("advanced-button").addEventListener("click", () => {
        document.getElementsByName("iBonusTotal")[0].getElementsByTagName("h2")[0].innerText = (Calculate.iBonus).toFixed(2);
        document.getElementsByName("skillToNextMin")[0].getElementsByTagName("h2")[0].innerText = Math.ceil(Calculate.skillToNextMin);
        document.getElementsByName("skillToNextMax")[0].getElementsByTagName("h2")[0].innerText = Math.ceil(Calculate.skillToNextMax);

        document.getElementById("advanced-lightbox").style.display = "flex";
    });

    document.getElementById("advanced-lightbox-close").addEventListener("click", () => {
        document.getElementById("advanced-lightbox").style.display = "";
    });

    document.getElementById("advanced-lightbox").addEventListener("click", () => {
        document.getElementById("advanced-lightbox").style.display = "";
    });
    
    document.getElementById("twitch-player-minimize").addEventListener("click", twitchMinimize);
    
    document.getElementById("stream-link").addEventListener("click", async () => {
        document.getElementById("stream-link").style.display = "none";
        document.getElementById("twitch-player-container").style.transition = "bottom 0.5s";
        document.getElementById("twitch-player-container").style.bottom = "0";
    });
});