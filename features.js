const features = [ 
    { index: 1,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/1',
       name: 'Barbarian' },
    subclass: {},
    name: 'Rage',
    level: 1,
    desc:
     [ 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain the following benefits if you aren\'t wearing heavy armor:',
       '• You have advantage on Strength checks and Strength saving throws.',
       '• When you make a melee weapon Attack using Strength, you gain a +2 bonus to the damage roll. This bonus increases as you level.',
       '• You have Resistance to bludgeoning, piercing, and slashing damage.',
       'If you are able to cast Spells, you can\'t cast them or concentrate on them while raging.',
       'Your rage lasts for 1 minute. It ends early if you are knocked Unconscious or if Your Turn ends and you haven\'t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on Your Turn as a Bonus Action.',
       'Once you have raged the maximum number of times for your barbarian level, you must finish a Long Rest before you can rage again. You may rage 2 times at 1st level, 3 at 3rd, 4 at 6th, 5 at 12th, and 6 at 17th.' ],
    url: '1' },
  { index: 2,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/1',
       name: 'Barbarian' },
    subclass: {},
    name: 'Unarmored Defense',
    level: 1,
    desc:
     [ 'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.' ],
    url: '2' },
  { index: 25,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/2', name: 'Bard' },
    subclass: {},
    name: 'Spellcasting',
    level: 1,
    desc:
     [ 'You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music. Your spells are part of your vast repertoire, magic that you can tune to different situations.' ],
    reference: 'http://www.dnd5eapi.co/api/spellcasting/bard',
    url: '25' },
  { index: 26,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/2', name: 'Bard' },
    subclass: {},
    name: 'Bardic Inspiration (d6)',
    level: 1,
    desc:
     [ 'You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6. Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the GM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.',
       'You can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain any expended uses when you finish a long rest. ',
       'Your Bardic Inspiration die changes when you reach certain levels in this class. The die becomes a d8 at 5th level, a d10 at 10th level, and a d12 at 15th level.' ],
    url: '26' },
  { index: 71,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/3', name: 'Cleric' },
    subclass: {},
    name: 'Spellcasting',
    level: 1,
    desc:
     [ 'As a conduit for divine power, you can cast cleric spells.' ],
    reference: 'http://www.dnd5eapi.co/api/spellcasting/cleric',
    url: '71' },
  { index: 72,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/3', name: 'Cleric' },
    subclass: {},
    name: 'Divine Domain',
    level: 1,
    desc:
     [ 'Choose one domain related to your deity: Knowledge, Life, Light, Nature, Tempest, Trickery, or War. Only the Life domain is detailed in the Open Game Licensed SRD. Additional Domains are described in the official rulebooks or products from other publishers.',
       'Your domain grants you domain spells and other features when you choose it at 1st level. It also grants you additional ways to use Channel Divinity when you gain that feature at 2nd level, and additional benefits at 6th, 8th, and 17th levels.' ],
    url: '72' },
  { index: 73,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/3', name: 'Cleric' },
    subclass: {},
    name: 'Domain Spells 1',
    level: 1,
    desc:
     [ 'Each domain has a list of spells—its domain spells— that you gain at the cleric levels noted in the domain description. Once you gain a domain spell, you always have it prepared, and it doesn’t count against the number of spells you can prepare each day.',
       'If you have a domain spell that doesn’t appear on the cleric spell list, the spell is nonetheless a cleric spell for you.' ],
    url: '73' },
  { index: 74,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/3', name: 'Cleric' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/3', name: 'Life' },
    name: 'Bonus Proficiency',
    level: 1,
    desc:
     [ 'When you choose this domain at 1st level, you gain proficiency with heavy armor.' ],
    url: '74' },
  { index: 75,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/3', name: 'Cleric' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/3', name: 'Life' },
    name: 'Disciple of Life',
    level: 1,
    desc:
     [ 'Also starting at 1st level, your healing spells are more effective. Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell’s level.' ],
    url: '75' },
  { index: 100,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/4', name: 'Druid' },
    subclass: {},
    name: 'Spellcasting',
    level: 1,
    desc:
     [ 'Drawing on the divine essence of nature itself, you can cast spells to shape that essence to your will.' ],
    reference: 'http://www.dnd5eapi.co/api/spellcasting/druid',
    url: '100' },
  { index: 101,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/4', name: 'Druid' },
    subclass: {},
    name: 'Druidic',
    level: 1,
    desc:
     [ 'You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages. You and others who know this language automatically spot such a message. Others spot the message\'s presence with a successful DC 15 Wisdom (Perception) check but can\'t decipher it without magic.' ],
    url: '101' },
  { 
      index: 131,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/5', name: 'Fighter' },
    subclass: {},
    name: 'Choose: Fighting Style',
    level: 1,
      desc:   [ 'You adopt a particular style of fighting as your specialty. Choose one of the following options. You can’t take a Fighting Style option more than once, even if you later get to choose again.' ],
    choice: { choose: 1, type: 'feature', from: [
        {
        url: "132",
        name: "Archery",
        desc:
                ['You gain a +2 bonus to attack rolls you make with ranged weapons.']
    },
    {
        url: "133",
        name: "Defense",
        desc: ['While you are wearing armor, you gain a +1 bonus to AC.'],
    },
    {
        url: "134",
        name: "Dueling",
        desc: ['When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.']
    },
    {
        url: "135",
        name: "Great Weapon Fighting",
        desc:
            ['When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.']
    },
    {
        url: "136",
        name: "Protection",
        desc: ['When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.']
    },
    {
        url: "137",
        name: "Two-Weapon Fighting",
        desc: ['When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.']
    }
] },
    url: '131' },
  { index: 132,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/5', name: 'Fighter' },
    subclass: {},
    name: 'Archery',
    level: 1,
    desc:
     [ 'You gain a +2 bonus to attack rolls you make with ranged weapons.' ],
    group: 'Fighting Style (Fighter)',
    url: '132' },
  { index: 133,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/5', name: 'Fighter' },
    subclass: {},
    name: 'Defense',
    level: 1,
    desc:
     [ 'While you are wearing armor, you gain a +1 bonus to AC.' ],
    group: 'Fighting Style (Fighter)',
    url: '133' },
  { index: 134,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/5', name: 'Fighter' },
    subclass: {},
    name: 'Dueling',
    level: 1,
    desc:
     [ 'When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.' ],
    group: 'Fighting Style (Fighter)',
    url: '134' },
  { index: 135,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/5', name: 'Fighter' },
    subclass: {},
    name: 'Great Weapon Fighting',
    level: 1,
    desc:
     [ 'When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.' ],
    group: 'Fighting Style (Fighter)',
    url: '135' },
  { index: 136,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/5', name: 'Fighter' },
    subclass: {},
    name: 'Protection',
    level: 1,
    desc:
     [ 'When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.' ],
    group: 'Fighting Style (Fighter)',
    url: '136' },
  { index: 137,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/5', name: 'Fighter' },
    subclass: {},
    name: 'Two-Weapon Fighting',
    level: 1,
    desc:
     [ 'When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.' ],
    group: 'Fighting Style (Fighter)',
    url: '137' },
  { index: 138,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/5', name: 'Fighter' },
    subclass: {},
    name: 'Second Wind',
    level: 1,
    desc:
     [ 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.' ],
    url: '138' },
  { index: 160,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/6', name: 'Monk' },
    subclass: {},
    name: 'Unarmored Defense',
    level: 1,
    desc:
     [ 'Beginning at 1st level, while you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.' ],
    url: '160' },
  { index: 161,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/6', name: 'Monk' },
    subclass: {},
    name: 'Martial Arts',
    level: 1,
    desc:
     [ 'At 1st level, your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons, which are shortswords and any simple melee weapons that don’t have the two- handed or heavy property.',
       'You gain the following benefits while you are unarmed or wielding only monk weapons and you aren’t wearing armor or wielding a shield:',
       '• You can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes and monk weapons.',
       '• You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels, as shown in the Martial Arts column of Table: The Monk.',
       '• When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven’t already taken a bonus action this turn.',
       'Certain monasteries use specialized forms of the monk weapons. For example, you might use a club that is two lengths of wood connected by a short chain (called a nunchaku) or a sickle with a shorter, straighter blade (called a kama). Whatever name you use for a monk weapon, you can use the game statistics provided for the weapon.' ],
    url: '161' },
  { index: 191,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/7', name: 'Paladin' },
    subclass: {},
    name: 'Divine Sense',
    level: 1,
    desc:
     [ 'The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces. Until the end of your next turn, you know the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You know the type (celestial, fiend, or undead) of any being whose presence you sense, but not its identity. Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated, as with the hallow spell.',
       'You can use this feature a number of times equal to 1 + your Charisma modifier. When you finish a long rest, you regain all expended uses.' ],
    url: '191' },
  { index: 192,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/7', name: 'Paladin' },
    subclass: {},
    name: 'Lay on Hands',
    level: 1,
    desc:
     [ 'Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level × 5.',
       'As an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool.',
       'Alternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.',
       'This feature has no effect on undead and constructs.' ],
    url: '192' },
  { index: 220,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/8', name: 'Ranger' },
    subclass: {},
    name: 'Favored Enemy (1 type)',
    level: 1,
    desc:
     [ 'Beginning at 1st level, you have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.',
       'Choose a type of favored enemy: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead. Alternatively, you can select two races of humanoid (such as gnolls and orcs) as favored enemies.',
       'You have advantage on Wisdom (Survival) checks to track your favored enemies, as well as on Intelligence checks to recall information about them.',
       'When you gain this feature, you also learn one language of your choice that is spoken by your favored enemies, if they speak one at all.',
       'You choose one additional favored enemy, as well as an associated language, at 6th and 14th level. As you gain levels, your choices should reflect the types of monsters you have encountered on your adventures.' ],
    url: '220' },
  { index: 221,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/8', name: 'Ranger' },
    subclass: {},
    name: 'Natural Explorer (1 terrain type)',
    level: 1,
    desc:
     [ 'You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions. Choose one type of favored terrain: arctic, coast, desert, forest, grassland, mountain, or swamp. When you make an Intelligence or Wisdom check related to your favored terrain, your proficiency bonus is doubled if you are using a skill that you’re proficient in.',
       'While traveling for an hour or more in your favored terrain, you gain the following benefits:',
       '• Difficult terrain doesn’t slow your group’s travel.',
       '• Your group can’t become lost except by magical means.',
       '• Even when you are engaged in another activity while traveling (such as foraging, navigating, or tracking), you remain alert to danger.',
       '• If you are traveling alone, you can move stealthily at a normal pace.',
       '• When you forage, you find twice as much food as you normally would.',
       '• While tracking other creatures, you also learn their exact number, their sizes, and how long ago they passed through the area.',
       'You choose additional favored terrain types at 6th and 10th level.' ],
    url: '221' },
  { index: 260,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/9', name: 'Rogue' },
    subclass: {},
    name: 'Choose: Expertise 1',
    level: 1,
    desc:
     [ 'At 1st level, choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves’ tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.',
       'At 6th level, you can choose two more of your proficiencies (in skills or with thieves’ tools) to gain this benefit' ],
      choice: {
          choose: 2, type: 'feature', from: [
              {
                  "url": "278",
                  "name": "Expertise: Acrobatics",
                  desc:[]
              },
              {
                  "url": "277",
                  "name": "Expertise: Animal Handling",
                  desc: []
              },
              {
                  "url": "261",
                  "name": "Expertise: Arcana",
                  desc: []
              },
              {
                  "url": "262",
                  "name": "Expertise: Athletics",
                  desc: []
              },
              {
                  "url": "263",
                  "name": "Expertise: Deception",
                  desc: []
              },
              {
                  "url": "264",
                  "name": "Expertise: History",
                  desc: []
              },
              {
                  "url": "265",
                  "name": "Expertise: Insight",
                  desc: []
              },
              {
                  "url": "266",
                  "name": "Expertise: Intimidation",
                  desc: []
              },
              {
                  "url": "267",
                  "name": "Expertise: Investigation",
                  desc: []
              },
              {
                  "url": "268",
                  "name": "Expertise: Medicine",
                  desc: []
              },
              {
                  "url": "269",
                  "name": "Expertise: Nature",
                  desc: []
              },
              {
                  "url": "270",
                  "name": "Expertise: Perception",
                  desc: []
              },
              {
                  "url": "271",
                  "name": "Expertise: Performance",
                  desc: []
              },
              {
                  "url": "272",
                  "name": "Expertise: Persuasion",
                  desc: []
              },
              {
                  "url": "273",
                  "name": "Expertise: Religion",
                  desc: []
              },
              {
                  "url": "274",
                  "name": "Expertise: Sleight of Hand",
                  desc: []
              },
              {
                  "url": "275",
                  "name": "Expertise: Stealth",
                  desc: []
              },
              {
                  "url": "276",
                  "name": "Expertise: Survival",
                  desc: []
              }
          ] },
    url: '260' },
  { index: 280,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/9', name: 'Rogue' },
    subclass: {},
    name: 'Sneak Attack',
    level: 1,
    desc:
     [ 'Beginning at 1st level, you know how to strike subtly and exploit a foe’s distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon.',
       'You don’t need advantage on the attack roll if another enemy of the target is within 5 feet of it, that enemy isn’t incapacitated, and you don’t have disadvantage on the attack roll.',
       'The amount of the extra damage increases as you gain levels in this class, as shown in the Sneak Attack column of the Rogue table.' ],
    url: '280' },
  { index: 281,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/9', name: 'Rogue' },
    subclass: {},
    name: 'Thieves\' Cant',
    level: 1,
    desc:
     [ 'During your rogue training you learned thieves’ cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation. Only another creature that knows thieves’ cant understands such messages. It takes four times longer to convey such a message than it does to speak the same idea plainly.',
       'In addition, you understand a set of secret signs and symbols used to convey short, simple messages, such as whether an area is dangerous or the territory of a thieves’ guild, whether loot is nearby, or whether the people in an area are easy marks or will provide a safe house for thieves on the run.' ],
    url: '281' },
  { index: 303,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass: {},
    name: 'Spellcasting',
    level: 1,
    desc:
     [ 'An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic. This font of magic, whatever its origin, fuels your spells.' ],
    reference: 'http://www.dnd5eapi.co/api/spellcasting/sorcerer',
    url: '303' },
  { index: 304,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass: {},
    name: 'Sorcerous Origin',
    level: 1,
    desc:
     [ 'Choose a sorcerous origin, which describes the source of your innate magical power: Draconic Bloodline or Wild Magic, both detailed at the end of the class description.',
       'Your choice grants you features when you choose it at 1st level and again at 6th, 14th, and 18th level.' ],
    url: '304' },
  { index: 305,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Choose: Dragon Ancestor',
    level: 1,
    desc:
     [ 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.',
       'You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.' ],
        choice: {
            choose: 1, type: 'feature', from: [
        {
                "url": "306",
                "name": "Dragon Ancestor: Black - Acid Damage"
            },
        {
        "url": "307",
        "name": "Dragon Ancestor: Blue - Lightning Damage"
    },
    {
        "url": "308",
        "name": "Dragon Ancestor: Brass - Fire Damage"
    },
    {
        "url": "309",
        "name": "Dragon Ancestor: Bronze - Lightning Damage"
    },
    {
        "url": "310",
        "name": "Dragon Ancestor: Copper - Acid Damage"
    },
    {
        "url": "311",
        "name": "Dragon Ancestor: Gold - Fire Damage"
    },
    {
        "url": "312",
        "name": "Dragon Ancestor: Green - Poison Damage"
    },
    {
        "url": "313",
        "name": "Dragon Ancestor: Red - Fire Damage"
    },
    {
        "url": "314",
        "name": "Dragon Ancestor: Silver - Cold Damage"
    },
    {
        "url": "315",
        "name": "Dragon Ancestor: White - Cold Damage"
    }
]
 },
    url: '305' },
  { index: 306,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Dragon Ancestor: Black - Acid Damage',
    level: 1,
    desc:
     [ 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.',
       'You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.' ],
    group: 'Dragon Ancestor',
    url: '306' },
  { index: 307,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Dragon Ancestor: Blue - Lightning Damage',
    level: 1,
    desc:
     [ 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.',
       'You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.' ],
    group: 'Dragon Ancestor',
    url: '307' },
  { index: 308,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Dragon Ancestor: Brass - Fire Damage',
    level: 1,
    desc:
     [ 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.',
       'You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.' ],
    group: 'Dragon Ancestor',
    url: '308' },
  { index: 309,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Dragon Ancestor: Bronze - Lightning Damage',
    level: 1,
    desc:
     [ 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.',
       'You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.' ],
    group: 'Dragon Ancestor',
    url: '309' },
  { index: 310,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Dragon Ancestor: Copper - Acid Damage',
    level: 1,
    desc:
     [ 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.',
       'You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.' ],
    group: 'Dragon Ancestor',
    url: '310' },
  { index: 311,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Dragon Ancestor: Gold - Fire Damage',
    level: 1,
    desc:
     [ 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.',
       'You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.' ],
    group: 'Dragon Ancestor',
    url: '311' },
  { index: 312,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Dragon Ancestor: Green - Poison Damage',
    level: 1,
    desc:
     [ 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.',
       'You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.' ],
    group: 'Dragon Ancestor',
    url: '312' },
  { index: 313,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Dragon Ancestor: Red - Fire Damage',
    level: 1,
    desc:
     [ 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.',
       'You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.' ],
    group: 'Dragon Ancestor',
    url: '313' },
  { index: 314,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Dragon Ancestor: Silver - Cold Damage',
    level: 1,
    desc:
     [ 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.',
       'You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.' ],
    group: 'Dragon Ancestor',
    url: '314' },
  { index: 315,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Dragon Ancestor: White - Cold Damage',
    level: 1,
    desc:
     [ 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.',
       'You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.' ],
    group: 'Dragon Ancestor',
    url: '315' },
  { index: 316,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/10',
       name: 'Sorcerer' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/10',
       name: 'Draconic' },
    name: 'Draconic Resilience',
    level: 1,
    desc:
     [ 'As magic flows through your body, it causes physical traits of your dragon ancestors to emerge. At 1st level, your hit point maximum increases by 1 and increases by 1 again whenever you gain a level in this class.',
       'Additionally, parts of your skin are covered by a thin sheen of dragon-like scales. When you aren’t wearing armor, your AC equals 13 + your Dexterity modifier.' ],
    url: '316' },
  { index: 340,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/11',
       name: 'Warlock' },
    subclass: {},
    name: 'Otherworldly Patron',
    level: 1,
    desc:
     [ 'At 1st level, you have struck a bargain with an otherworldly being of your choice: the Archfey, the Fiend, or the Great Old One, each of which is detailed at the end of the class description. Your choice grants you features at 1st level and again at 6th, 10th, and 14th level.' ],
    url: '340' },
  { index: 341,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/11',
       name: 'Warlock' },
    subclass:
     { url: 'http://www.dnd5eapi.co/api/subclasses/11',
       name: 'Fiend' },
    name: 'Dark One\'s Blessing',
    level: 1,
    desc:
     [ 'Starting at 1st level, when you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level (minimum of 1).' ],
    url: '341' },
  { index: 342,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/11',
       name: 'Warlock' },
    subclass: {},
    name: 'Pact Magic',
    level: 1,
    desc:
     [ 'Your arcane research and the magic bestowed on you by your patron have given you facility with spells.' ],
    reference: 'http://www.dnd5eapi.co/api/spellcasting/warlock',
    url: '342' },
  { index: 400,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/12', name: 'Wizard' },
    subclass: {},
    name: 'Spellcasting',
    level: 1,
    desc:
     [ 'As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.' ],
    reference: 'http://www.dnd5eapi.co/api/spellcasting/wizard',
    url: '400' },
  { index: 401,
    class:
     { url: 'http://www.dnd5eapi.co/api/classes/12', name: 'Wizard' },
    subclass: {},
    name: 'Arcane Recovery',
    level: 1,
    desc:
     [ 'You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher.',
       'For example, if you’re a 4th-level wizard, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level spell slot or two 1st-level spell slots.' ],
    url: '401' } ]


    module.exports = features