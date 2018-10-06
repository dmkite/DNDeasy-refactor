const backgrounds = {
  Acolyte: {
    skills: ['Insight', 'Religion'], 
    choices:{languages: [2, languages]},
    equipment: ['holy symbol', 'prayer book', '5 sticks of incense', 'vestments', 'common clothes', '15 GP'],
    desc:''
  },
  Charlatan: {
    skills: ['Deception', 'Sleight of Hand'],
    profs:{tools:['disguise kit', 'forgery kit']},
    equipment: ['fine clothes', 'disguise kit', 'tools of a con of your choice', '15 GP'],
    desc: ''
  },
  Criminal: {
    skills: ['Deception', 'Stealth'],
    profs: { tools: ['One type of gaming set', "thieve's tools"] },
    equipment: ['crowbar', 'dark common clothes', '15 GP'],
    desc: ''
  },
  Entertainer: {
    skills: ['Acrobatics', 'Performance'],
    profs: { tools: ['disguise kit', 'musical instrument'] },
    equipment: ['musical instrument', 'the favor of an admirer', 'costume', '15 GP'],
    desc: ''
  },
  Charlatan: {
    skills: ['Deception', 'Sleight of Hand'],
    profs: { tools: ['disguise kit', 'forgery kit'] },
    equipment: ['fine clothes', 'disguise kit', 'tools of a con of your choice', '15 GP'],
    desc: ''
  },
  "Folk Hero": {
    skills: ['Animal Handling', 'Survival'],
    profs: { tools: ["artisan's tools", 'land vehicles'] },
    equipment: ["artisan's tools of your choice", 'shovel', 'iron pot', 'common clothes', '10 GP'],
    desc: ''
  },
  "Guild Artisan": {
    skills: ['Insight', 'Persuasion'],
    profs: { tools: ["artisan's tools", 'land vehicles'] },
    choices: { languages: [1, languages] },
    equipment: ["artisan's tools of your choice", 'a letter of introduction from your guild', "traveler's clothes", '15 GP'],
    desc: ''
  },
  Hermit:{
    skills: ['Medicine', 'Religion'],
    profs: { tools: ['herbalism kit'] },
    choices: { languages: [1, languages] },
    equipment: ['scroll case full of notes from studies or prayers', 'winter blanket', 'common clothes', 'herbalism kit', '5 GP'],
    desc: ''
  },
  Noble: {
    skills: ['History', 'Persuasion'],
    profs: { tools: ['One type of gaming set'] },
    choices: { languages: [1, languages] },
    equipment: ['scroll of pedigree', 'signet ring', 'fine clothes', '25 GP'],
    desc: ''
  },
  Outlander: {
    skills: ['Athletics', 'Survival'],
    profs: { tools: ['musical instrument'] },
    choices: { languages: [1, languages] },
    equipment: ['staff', 'hunting trap', 'trophy from an animal you killed', "traveler's kit", '10 GP'],
    desc: ''
  },
  Sage: {
    skills: ['Arcana', 'History'],
    choices: { languages: [2, languages] },
    equipment: ['bottle of black ink', 'quill', 'small knife', 'letter from dead colleague posing an unanswered question', 'common clothes', '10 GP'],
    desc: ''
  },
  Sailor: {
    skills: ['Athletics', 'Perception'],
    profs: { tools: ["navigator's tools", 'water vehicles'] },
    equipment: ['club', 'silk rope (50ft)', 'lucky charm', "common clothes", '10 GP'],
    desc: ''
  },
  Soldier: {
    skills: ['Athletics', 'Intimidation'],
    profs: { tools: ['disguise kit', 'land vehicles'] },
    equipment: ['insignia of rank', 'trophy from a fallen enemy', 'common clothes', '10 GP'],
    desc: ''
  },
  Urchin: {
    skills: ['Sleight of Hand', 'Stealth'],
    profs: { tools: ['disguise kit', "thieves' tools"] },
    equipment: ['small knife', 'map of home town', 'pet mouse', 'a toke to remember your parents', 'common clothes', '10 GP'],
    desc: ''
  }
}

module.exports = backgrounds