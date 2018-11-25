const user = require('./user')

function standardTemplate(item) {
    return`
    <div class="card">
        <button class="select" type="button">select</button>
        <img src="${item.img}" alt="Image of ${item.name}">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <button class="more" type="button" data-id="${item.index}">more</button>
    </div>`
}

function infoPageHTML(item){
    
    return `
    <div class="infoPage">
        <button type="button" class="back">back</button>
        <h2>${item.name}</h2>
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
        <div class="alignment">Lawful<br>Good</div>
        <div class="alignment">Neutral<br>Good</div>
        <div class="alignment">Chaotic<br>Good</div>
        <div class="alignment">Lawful<br>Neutral</div>
        <div class="alignment">True<br>Neutral</div>
        <div class="alignment">Chaotic<br>Nautral</div>
        <div class="alignment">Lawful<br>Evil</div>
        <div class="alignment">Neutral<br>Evil</div>
        <div class="alignment">Chaotic<br>Evil</div>
    </div>`
}



module.exports = {standardTemplate, infoPageHTML, radioTemplate, classChoiceTemplate, sorcererTemplate, statTemplate, statUpgrade, backStoryForm, alignmentTemplate}
