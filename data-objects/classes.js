const classes = {
  Barbarian : {
      classType: 'Barbarian',
      hitDie: 12,
      savingThrows: ['STR', 'CON'],
      profs:{
          armor:['light armor','medium armor','shields'],
          weapons:['simple weapons', 'martial weapons']
      },
      armorType:[],
      choices: {skills: [1, ['animalHandling', 'athletics', 'intimidation', 'nature', 'perception','survival']]},
      equipment:['Great Axe', '2 Hand Axes', "explorer's pack",  '4 Javelins'],
      features:['Unarmored Defense']
  }
}

module.exports = classes