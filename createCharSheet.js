const classes = require('./data-objects/classes')
function calcMod(raw){
    return Math.floor((raw - 10) / 2)
}

function calcAC(user){
    const dexMod = calcMod(user.stats.DEX)
    const armorType = classes[user.classType].armorType
    let AC
    switch(armorType){
        case 'leather':
            AC = 11 + dexMod
            break
        case 'scale':
            AC = 11 + dexMod
            break
        case 'chain':
            AC = 11 + dexMod
            break  
        case '':
            if(classes[user.classType].features.incldues('Uarmored Defense') && user.classType === 'Barbarian'){
                AC = 10 + calcMod(user.stats.CON) + dexMod
            } 
            else if (classes[user.classType].features.incldues('Uarmored Defense') && user.classType === 'Monk'){
                AC = 10 + calcMod(user.stats.WIS) + dexMod
            }
            else{
                AC = 10
            }
    }
    return AC
}

function createCharSheet(user){
    let holder = document.querySelector('#holder')
    holder.classList.add('charsheet')
    holder.classList.remove('flex')
    let charsheetHTML = `
            <article id="baseInfo">
                <img id="logo" src="https://d30y9cdsu7xlg0.cloudfront.net/png/407535-200.png" alt="dndEASY logo">
                <article id="name">${user.name}</article>
                <article id="class">${user.classType}</article>
                <article id="background">${user.background}</article>
                <article id="race">${user.race}</article>
                <article id="alignment">${user.alignment}</article>
                <article id="dc">${10 + user.stats.INT}</article>
            </article>
            <article id="stats">
                <div class="mod">
                    <div class="raw">${user.stats.STR}</div>
                    <div class="modifier">${calcMod(user.stats.STR)}</div>
                    <h4>Strength</h4>
                </div>
                <div class="mod">
                    <div class="raw">${user.stats.DEX}</div>
                    <div class="modifier">${calcMod(user.stats.DEX)}</div>
                    <h4>Dexterity</h4>
                </div>
                <div class="mod">
                    <div class="raw">${user.stats.CON}</div>
                    <div class="modifier">${calcMod(user.stats.CON)}</div>
                    <h4>Constitution</h4>
                </div>
                <div class="mod">
                    <div class="raw">${user.stats.INT}</div>
                    <div class="modifier">${calcMod(user.stats.INT)}</div>
                    <h4>Intelligence</h4>
                </div>
                <div class="mod">
                    <div class="raw">${user.stats.WIS}</div>
                    <div class="modifier">${calcMod(user.stats.WIS)}</div>
                    <h4>Wisdom</h4>
                </div>
                <div class="mod">
                    <div class="raw">${user.stats.CHA}</div>
                    <div class="modifier">${calcMod(user.stats.CHA)}</div>
                    <h4>Charisma</h4>
                </div>
            </article>
            <article id="savingThrows">
                <h4>Saving Throws</h4>
                <p>+2 ${user.savingThrow[0]}</p>
                <p>+2 ${user.savingThrow[1]}</p>
            </article>
            <article id="skills">
                <p>${user.skills.join('</p><p>+2 ')}</p>
            </article>
            <article id="profAndLang">
                <h4>Other Proficiencies and Langauges</h4>
                <h5>Proficiencies</h5>
                <p>${user.profs.other.join('</p><p>')}</p>
                <p>${user.profs.tools.join('</p><p>')}</p>
                <h5>Languages</h5>
                <p>${user.languages.join('</p><p>')}</p>
            </article>
            <article id="hp">
                <div>
                    <h4>Armor Class</h4>
                    <h5>${calcAC(user)}</h5>
                </div>
                <div>
                    <h4>Speed</h4>
                    <h5>${user.speed}</h5>
                </div>
                <div>
                    <h4>Hit Points</h4>
                    <h5>${user.HP}</h5>
                </div>
            </article>
            <article id="attacks">
                <h4>Attacks and Spells</h4>
                <h5>Attacks</h5>
                <p>${user.equipment.weapons.join('</p><p>')}</p>
                <h5>Spells</h5>
                <p>${user.spells.cantrips.join('</p><p>')}</p>
                <h6>Cantrips</h6>
                <h6>Level 1 Spells</h6>
                <p>${user.spells.level1.join('</p><p>')}</p>
            </article>
            <article id="equipment">
                <h4>Equipment</h4>
                <p>${user.equipment.other.join('</p><p>')}</p>
                <p>${user.equipment.shield.join('</p><p>')}</p>
            </article>
            <article id="charInfo">
                <div>
                    <h4>Personality Traits</h4>
                    <p>${user.traits}</p>
                </div>
                <div>
                    <h4>Ideals</h4>
                    <p>${user.ideals}</p>
                </div>
                <div>
                    <h4>Bonds</h4>
                    <p>${user.bonds}</p>
                </div>
                <div>
                    <h4>Flaws</h4>
                    <p>${user.flaws}</p>
                </div>
            </article>
            <article id="features">
                <h4>Features</h4>
                <p>${user.features.join('</p><p>')}</p>
            </article>`
    holder.innerHTML = charsheetHTML
}

module.exports = createCharSheet