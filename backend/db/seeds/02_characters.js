exports.seed = function (knex, Promise) {
  return knex('characters').insert([
    { id: 1, user_id: 1, character_JSON: `{"log": ["Half-Elf", "Infernal", ["Acrobatics", "Animal Handling"], null, null,"Bard",["Arcana", "Athletics", "Deception"],["Bagpipes", "Drum", "Dulcimer"],null,["Dancing Lights", "Light"],["Bane", "Charm Person", "Comprehend Languages", "Cure Wounds"],[],[],[],null,null,null,["9", "13", "17", "14", "9", "8"],["10", "14", "17", "14", "9"],8,"Acolyte","Chaotic Evil",['dlyan', 'asg', 'asdf', 'awfew', 'aawg']],classId: 1,"raceId": 6,"subraceId": undefined,"numChoices": 1}` }
  ])
    .then(() => {
      return knex.raw(`SELECT setval('characters_id_seq', (SELECT MAX(id) FROM characters));`)
    })
}


