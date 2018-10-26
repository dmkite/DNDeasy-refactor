function addRaceData(user, race){
    let {raceType, speed, stats, profs = null, features = null, languages} = race
    user.race = raceType
    user.speed = speed
    if(profs !== null){
      for (let profType in race.profs){
        user.profs[profType] += race.profs[profType]
      }
    }
    if(features !== null){
      user.features.push(features)
    }
    for (let stat in stats){
      user.stats[stat] += stats[stat]
    }
    user.languages.push(languages)
    return user
}
  
function addSubraceData(user, subrace){
    for(let attributes in subrace){
        switch(attributes){
        case 'subType':
            user.race = subrace.subType
            break
        case 'stats':
            for(let statName in subrace.stats){
                user.stats[statName] += subrace.stats[statName]
            }
            break
        case 'profs':
            for(let profType in subrace.profs){
                user.profs[profType].push(subrace.profs[profType])
            }
            break
        case 'speed':
            user.speed = subrace.speed
            break
        case 'features':
            for(let feature of subrace.features){
                user.features.push(feature)
            }
            
            break
        case 'HP':
            user.HP += Number(subrace.HP)
            break
        default:
            
        }
    }
} 


function addClassData(user, className){
  let {classType, hitDie, savingThrows, profs: {armor, weapons, other}, skillChoices, equipmentChoices, features} = className

  user.classType = classType
  user.savingThrows = savingThrows
  user.profs.armor = armor
  user.profs.weapons = weapons
  user.profs.other = other
  user.hitDie = hitDie
  user.features.push(features)

}

function addClassChoices(user, progressLogEntry, className, num){
    let classChoiceList = Object.keys(className.choices)
    if(classChoiceList[num] === 'cantrips'){
        for (let items of progressLogEntry){
            user.spells.cantrips.push(items)
        }
        
    }
    else if(classChoiceList[num] === 'spells'){
        for (let items of progressLogEntry) {
            user.spells.level1.push(items)
        }
    }
    else{
        user.features.push(progressLogEntry)
    }
}

function addBackgroundData(user, backgroundName){
    
    for(let skill of backgroundName.skills){
        if(user.skills.includes(skill)){
            continue
        }
        else{
            user.skills.push(skill)
        }
    }
    user.equipment.other.push(backgroundName.equipment)

    if(backgroundName.profs){user.profs.tools.push(backgroundName.profs.tools)}
}



module.exports = { addRaceData, addSubraceData, addClassData, addClassChoices, addBackgroundData }