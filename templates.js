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

module.exports = {standardTemplate, infoPageHTML, radioTemplate, classChoiceTemplate, sorcererTemplate, statTemplate}
