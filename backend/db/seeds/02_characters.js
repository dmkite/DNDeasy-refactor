const character = { log: 
  ["Half-Elf", "Infernal", ["Acrobatics", "Animal Handling"], null, null, "Bard", ["Arcana", "Athletics", "Deception"], ["Bagpipes", "Drum", "Dulcimer"], null, ["Dancing Lights", "Light"], ["Bane", "Charm Person", "Comprehend Languages", "Cure Wounds"], [], [], [], null, null, null, ["9", "13", "17", "14", "9", "8"], ["10", "14", "17", "14", "9"], 8, "Acolyte", "Chaotic Evil", ['Dylan', 'asg', 'asdf', 'awfew', 'aawg']], 
  classId: 1, 
  raceId: 6, 
  subraceId: undefined, 
  numChoices: 1 
}

const formattedChar = JSON.stringify(character)



exports.seed = function (knex, Promise) {
  return knex('characters').insert([
    { id: 1, user_id: 2, character: formattedChar}
  ])
    .then(() => {
      return knex.raw(`SELECT setval('characters_id_seq', (SELECT MAX(id) FROM characters));`)
    })
}


