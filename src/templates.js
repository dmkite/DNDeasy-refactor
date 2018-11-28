const user = require('./user')
const classes = require('../data/classes')

function standardTemplate(item) {
    return `
    <div class="card">
        <button class="more" type="button" data-id="${item.index}"><i class="fa fa-ellipsis-v" data-id="${item.index}"></i></button>
        <img class="card-img-top cardImg" src="${item.img}" alt="Image of ${item.name}">
        <h3>${item.name}</h3>
        
        <button class="select" type="button"><i class="fa fa-plus-circle"></i></button>
        <div class="gradient"></div>
    </div>`
}

function skillChoiceTemplate(item) {
    return `
    <div class="card skillCard">
        <button type="button" class="select"></button>
        <h5>${item.name}</h5>
        <p>${item.desc}</p>
    </div>
    `
}

function justX(title, array, key, join){
    console.log(title, array, key, join)
    let result = array.reduce((acc, item) => {
        acc.push(item[key]) 
        return acc
    }, [])
    if(!result.length) result = ['N/A']

    return title + result.join(join)
}

function calcAbility(abilityArr){
    let abilities = ['Strength', 'Dexterity', 'Constitution', 'Wisdom', 'Intelligence', 'Charisma']
    let newArray = []
    for(let i = 0; i < 6; i++){
        newArray[i] = `+${abilityArr[i]} ${abilities[i]}`
    }
    return newArray
}
function infoPageHTML(item){
    console.log(item)
    return `
    <div class="infoPage">

        <button type="button" class="back fa fa-chevron-circle-left"></button>
        <h2>${item.name}</h2>
        <p>${item.alignment || item.desc}</p>
        <p>${item.language_desc || 'Hi there!'}</p>
        <p>${calcAbility(item.ability_bonuses).join('<br>')}</p>

    </div>`
}

function radioTemplate(item){
    const id = item.name.split(' ').join('')
    if(item.damage){
        return `
        <input id="${id}" type="radio" name="equipmentChoice">
        <label for="${id}">
            ${item.name} | ${item.damage.dice_count}d${item.damage.dice_value} ${item.damage.damage_type.name}
        </label>
        `
    }
    else{
        return `
    <input id="${id}" type="radio" name="equipmentChoice">
    <label for="${id}">
        ${item.name} | 
    </label>
    `
    }
}

function classChoiceTemplate(item){
    return `
    <div class="card">
        <button class="select" type="button">select</button>
        <img src="${item.img}" alt="Image of ${item.name}">
        <h2>${item.name}</h2>
        <p>${item.desc[0]}</p>
    </div>`
}

function sorcererTemplate(){
    return `
    <div class="card">
        <button class="select" type="button">select</button>
        <img src="" alt="Image of Wild Magic">
        <h2>Wild Magic</h2>
        <p>You can manipulate the forces of chance and chaos to gain advantage on one attack roll, ability check, or saving throw. Once you do so, you must finish a long rest before you can use this feature again.
        <br>Your spellcasting can unleash surges of untamed magic. Immediately after you cast a sorcerer spell of 1st level or higher, the DM can have you roll a d20. If you roll a 1, roll on the Wild Magic Surge table to create a random magical effect.</p>
    </div>
    <div class="card">
        <img class="card-img-top" src="" alt="Image of Draconic Bloodline">
        <h2>Draconic Bloodline</h2>
        <p >At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.
        <br>You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.</p>     
    </div>`          
}

function statTemplate(statArr){

   return `
   <div class="row">
    <div id="statHolder" class="col-sm-12 col-md-6">
            <div class="statType">STR</div>
            <div class="statType">DEX</div>
            <div class="statType">CON</div>
            <div class="statType">INT</div>
            <div class="statType">WIS</div>
            <div class="statType">CHA</div>
        </div>
        <div id="stats" class="col-sm-12 col-md-6">
            <div class="stat">${statArr[0]}</div>
            <div class="stat">${statArr[1]}</div>
            <div class="stat">${statArr[2]}</div>
            <div class="stat">${statArr[3]}</div>
            <div class="stat">${statArr[4]}</div>
            <div class="stat">${statArr[5]}</div>
        </div>
    </div>
    <button class="reset" type="button">reset</button>`
}

function statUpgrade(statArr){ 
    return `    
        <div class="statType">STR <span>${statArr[0]}</span></div>
        <div class="statType">DEX<span>${statArr[1]}</span></div>
        <div class="statType">CON<span>${statArr[2]}</span></div>
        <div class="statType">INT<span>${statArr[3]}</span></div>
        <div class="statType">WIS<span>${statArr[4]}</span></div>
        `
}

function backStoryForm(){
    return `
    <label for="name" required>Name:</label>
    <input class="backstory" type="text" id="name">

    <label for="traits">Traits:</label>
    <textarea class="backstory" name="traits" id="traits" maxlength="150"></textarea>

    <label for="ideals">Ideals:</label>
    <textarea class="backstory" name="ideals" id="ideals" maxlength="150"></textarea>

    <label for="bonds">Bonds:</label>
    <textarea class="backstory" name="bonds" id="bonds" maxlength="150"></textarea>

    <label for="flaws">Flaws:</label>
    <textarea class="backstory" name="flaws" id="flaws" maxlength="150"></textarea>
    `
}

function alignmentTemplate(){
    return `
    <div class="row">
        <div class="alignment">Lawful <br>Good</div>
        <div class="alignment">Neutral <br>Good</div>
        <div class="alignment">Chaotic <br>Good</div>
        <div class="alignment">Lawful <br>Neutral</div>
        <div class="alignment">True <br>Neutral</div>
        <div class="alignment">Chaotic <br>Nautral</div>
        <div class="alignment">Lawful <br>Evil</div>
        <div class="alignment">Neutral <br>Evil</div>
        <div class="alignment">Chaotic <br>Evil</div>
    </div>`
}

function statRender(arr) {
    function modCalc(num) {
        let result = Number(Math.floor((num - 10) / 2))
        if (result > 0) return `+${result}`
        return result
    }

    return `
    <div class="accordion" id="accordionExample">
        <div class="card">
            <div class="card-header" id="headingOne">
            <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Stats
                </button>
            </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                    <div class="finalStat">
                        <p class="statName">STR</p>
                        <div class="rawStat">${arr[0]}</div>
                        <div class="mod">${modCalc(arr[0])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">DEX</p>
                        <div class="rawStat">${arr[1]}</div>
                        <div class="mod">${modCalc(arr[1])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">CON</p>
                        <div class="rawStat">${arr[2]}</div>
                        <div class="mod">${modCalc(arr[2])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">INT</p>
                        <div class="rawStat">${arr[3]}</div>
                        <div class="mod">${modCalc(arr[3])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">WIS</p>
                        <div class="rawStat">${arr[4]}</div>
                        <div class="mod">${modCalc(arr[4])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">CHA</p>
                        <div class="rawStat">${arr[5]}</div>
                        <div class="mod">${modCalc(arr[5])}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}

function skillTemplate(arr) {
    let tempHTML = [
        `<div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Skills
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
     `]
    for (let skill of arr) {
        tempHTML.push(`<div class="skillHolder"><span class="skillMod"></span>${skill.name}</div>`)
    }

    tempHTML.push(`</div ></div ></div >`)
    return tempHTML.join('')
}

function utilityTemplate(){
    function figureSpeed() {
        if (user.subraceId === 4) return 35
        else if (user.raceId === 0 || user.raceId === 2 || user.raceId === 5) return 25
        else return 30
    }
    
    return `
    <div class="card">
        <div class="card-header" id="headingThree">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Utils
                </button>
            </h5>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div class="card-body">
                <div> Hit Points: ${user.log[19]}</div>
                <div>Speed: ${figureSpeed()}</div>
                <div>Saving Throws: ${classes[user.classId].saving_throws[0].name}, ${classes[user.classId].saving_throws[1].name}</div>
            </div>
        </div>
    </div>
      `
}

function equipmentTemplate(arr){
    return `
    <div class="card">
        <div class="card-header" id="headingFour">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Equipment
                </button>
            </h5>
        </div>
        <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
            <div class="card-body">
                ${arr.join('<br>')}
            </div>
        </div>
    </div>
      `
}

function spellTemplate(arr){
    return `
    <div class="card">
        <div class="card-header" id="headingFive">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    Spells
                </button>
            </h5>
        </div>
        <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
            <div class="card-body">
                ${arr.join('<br>')}
            </div>
        </div>
    </div>
      `
}

function backstoryTemplate(arr){
    return `
    <div class="card">
        <div class="card-header" id="headingFive">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    Backstory
                </button>
            </h5>
        </div>
        <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
            <div class="card-body">
                <p>Traits:</p>
                <p>${arr[1]}</p>
                <p>Ideals:</p>
                <p>${arr[2]}</p>
                <p>Bonds:</p>
                <p>${arr[3]}</p>
                <p>Flaws:</p>
                <p>${arr[4]}</p>
            </div>
        </div>
    </div>`
}

module.exports = {standardTemplate, infoPageHTML, radioTemplate, classChoiceTemplate, sorcererTemplate, statTemplate, statUpgrade, backStoryForm, alignmentTemplate, statRender, skillTemplate, utilityTemplate, equipmentTemplate, spellTemplate, backstoryTemplate, skillChoiceTemplate}
