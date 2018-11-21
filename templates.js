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
    return `
    <input id="${id}" type="radio" name="choice1">
    <label for="${id}">
        ${item.name} | ${item.damage.dice_count}d${item.damage.dice_value} ${item.damage.damage_type.name}
    </label>
    `
}
module.exports = {standardTemplate, infoPageHTML, radioTemplate}