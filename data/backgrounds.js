const languages = require('./languages')

const backgrounds = [
    {
    name: "Acolyte",
    index:1,
    skills: ['Insight', 'Religion'], 
    choices:{languages: [2, languages]},
    equipment: ['holy symbol', 'prayer book', '5 sticks of incense', 'vestments', 'common clothes', '15 GP'],
    desc:'',
    img: 'img/acolyte.jpg'
  },
   {
    name: "Charlatan",
    index: 2,
    skills: ['Deception', 'Sleight of Hand'],
    profs:{tools:['disguise kit', 'forgery kit']},
    equipment: ['fine clothes', 'disguise kit', 'tools of a con of your choice', '15 GP'],
    desc: '',
    img: 'img/charlatan.jpg'
  },
  {
    name: "Criminal",
    index: 3,
    skills: ['Deception', 'Stealth'],
    profs: { tools: ['One type of gaming set', "thieve's tools"] },
    equipment: ['crowbar', 'dark common clothes', '15 GP'],
    desc: '',
    img: 'img/criminal.jpg'
    
  },
  {
    name:"Entertainer",
    index: 4,
    skills: ['Acrobatics', 'Performance'],
    profs: { tools: ['disguise kit', 'musical instrument'] },
    equipment: ['musical instrument', 'the favor of an admirer', 'costume', '15 GP'],
    desc: '',
    img: 'img/entertainer.jpg'
  },
  {
    name: "Folk Hero",
    index: 5,
    skills: ['Animal Handling', 'Survival'],
    profs: { tools: ["artisan's tools", 'land vehicles'] },
    equipment: ["artisan's tools of your choice", 'shovel', 'iron pot', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/folkHero.jpg'
  },
  { 
    name: "Guild Artisan",
    index: 6,
    skills: ['Insight', 'Persuasion'],
    profs: { tools: ["artisan's tools", 'land vehicles'] },
    choices: { languages: [1, languages] },
    equipment: ["artisan's tools of your choice", 'a letter of introduction from your guild', "traveler's clothes", '15 GP'],
    desc: '',
    img: 'img/stoutHalfling.jpg'
  },
  {
    name: "Hermit",
    index: 7,
    skills: ['Medicine', 'Religion'],
    profs: { tools: ['herbalism kit'] },
    choices: { languages: [1, languages] },
    equipment: ['scroll case full of notes from studies or prayers', 'winter blanket', 'common clothes', 'herbalism kit', '5 GP'],
    desc: '',
    img: 'img/hermit.jpg'
  },
  {
    name: "Noble",
    index: 8,
    skills: ['History', 'Persuasion'],
    profs: { tools: ['One type of gaming set'] },
    choices: { languages: [1, languages] },
    equipment: ['scroll of pedigree', 'signet ring', 'fine clothes', '25 GP'],
    desc: '',
    img: 'img/noble.jpg'
  },
  {
    name: "Outlander",
    index: 9,
    skills: ['Athletics', 'Survival'],
    profs: { tools: ['musical instrument'] },
    choices: { languages: [1, languages] },
    equipment: ['staff', 'hunting trap', 'trophy from an animal you killed', "traveler's kit", '10 GP'],
    desc: '',
    img: 'img/outlander.jpg'
  },
  {
    name: "Sage",
    index: 10,
    skills: ['Arcana', 'History'],
    choices: { languages: [2, languages] },
    equipment: ['bottle of black ink', 'quill', 'small knife', 'letter from dead colleague posing an unanswered question', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/wizard.jpg'
  },
  {
    name: "Sailor",
    index: 11,
    skills: ['Athletics', 'Perception'],
    profs: { tools: ["navigator's tools", 'water vehicles'] },
    equipment: ['club', 'silk rope (50ft)', 'lucky charm', "common clothes", '10 GP'],
    desc: '',
    img: 'img/sailor.jpg'
  },
  {
    name: "Soldier",
    index: 12,
    skills: ['Athletics', 'Intimidation'],
    profs: { tools: ['disguise kit', 'land vehicles'] },
    equipment: ['insignia of rank', 'trophy from a fallen enemy', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/soldier.jpg'
  },
  {
    name:"Urchin",
    index: 13,
    skills: ['Sleight of Hand', 'Stealth'],
    profs: { tools: ['disguise kit', "thieves' tools"] },
    equipment: ['small knife', 'map of home town', 'pet mouse', 'a toke to remember your parents', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/urchin.jpg'
  }
]

module.exports = backgrounds