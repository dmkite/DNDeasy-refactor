function charProg(user){
    const charProg = document.querySelector('#charProg')
    const { STR, DEX, CON, INT, WIS, CHA } = user.stats
    charProg.innerHTML = `
    <h2>Character Glance <span id="arrowDown"></span></h2>
        <div id="charContainer" class="minimize">
        <p><b>Race:</b> ${user.race}</p>
        <p><b>Name:</b> ${user.name}</p>
        <p><b>Class:</b> ${user.classType}</p>

        <p><b>Background:</b> ${user.background}</p>
        <div id="lists">
            <ul>
                <li><b>Stats</b></li>
                <li>STR: ${STR}</li>
                <li>DEX: ${DEX}</li>
                <li>CON: ${CON}</li>
                <li>INT: ${INT}</li>
                <li>WIS: ${WIS}</li>
                <li>CHA: ${CHA}</li>
            </ul>
            <ul>
                <li><b>Skills</b></li>
                <li>${user.skills.join().split(',').join(' </li> <li> ')}</li>
            </ul>

        </div>
        <ul>
            <li><b>Spells</b></li>
            <li>${user.spells.cantrips.join().split(',').join(' </li> <li> ')}</li>
            <li>${user.spells.level1.join().split(',').join(' </li> <li> ')}</li>
        </ul>
    </div>
    `
    document.querySelector('#arrowDown').addEventListener('click', function(){
        document.querySelector('#arrowDown').classList.toggle('rotate')
        document.querySelector('#charContainer').classList.toggle('minimize')
    })
}

module.exports = charProg