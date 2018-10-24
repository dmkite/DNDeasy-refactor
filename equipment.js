const equipment = [{
	"index": 1,
	"name": "Club",
	"equipment_category": "Weapon",
	"weapon_category:": "Simple",
	"weapon_range": "Melee",
	"category_range": "Simple Melee",
	"cost": {
		"quantity": 1,
		"unit": "sp"
	},
	"damage": {
		"dice_count": 1,
		"dice_value": 4,
		"damage_type": {
			"url": "http://www.dnd5eapi.co/api/damage-types/2",
			"name": "Bludgeoning"
		}
	},
	"range": {
		"normal": 5,
		"long": null
	},
	"weight": 2,
	"properties": [{
		"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
		"name": "Light"
	}, {
		"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
		"name": "Monk"
	}],
	"url": "1"
}, {
		"index": 2,
		"name": "Dagger",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 1,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"url": "2"
	}, {
		"index": 3,
		"name": "Greatclub",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 2,
			"unit": "sp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 10,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "3"
	}, {
		"index": 4,
		"name": "Handaxe",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"url": "4"
	}, {
		"index": 5,
		"name": "Javelin",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"throw_range": {
			"normal": 30,
			"long": 120
		},
		"url": "5"
	}, {
		"index": 6,
		"name": "Light hammer",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"url": "6"
	}, {
		"index": 7,
		"name": "Mace",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 4,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"url": "7"
	}, {
		"index": 8,
		"name": "Quarterstaff",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 2,
			"unit": "sp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 4,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"2h_damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"url": "8"
	}, {
		"index": 9,
		"name": "Sickle",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"url": "9"
	}, {
		"index": 10,
		"name": "Spear",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"2h_damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"url": "10"
	}, {
		"index": 11,
		"name": "Crossbow, light",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Ranged",
		"category_range": "Simple Ranged",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 5,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1",
			"name": "Ammunition"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/5",
			"name": "Loading"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "11"
	}, {
		"index": 12,
		"name": "Dart",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Ranged",
		"category_range": "Simple Ranged",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 0.25,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"url": "12"
	}, {
		"index": 13,
		"name": "Shortbow",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Ranged",
		"category_range": "Simple Ranged",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1",
			"name": "Ammunition"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "13"
	}, {
		"index": 14,
		"name": "Sling",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Ranged",
		"category_range": "Simple Ranged",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 0,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1",
			"name": "Ammunition"
		}],
		"url": "14"
	}, {
		"index": 15,
		"name": "Battleaxe",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 4,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}],
		"2h_damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"url": "15"
	}, {
		"index": 16,
		"name": "Flail",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [],
		"url": "16"
	}, {
		"index": 17,
		"name": "Glaive",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 20,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 6,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/6",
			"name": "Reach"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "17"
	}, {
		"index": 18,
		"name": "Greataxe",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 12,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 7,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "18"
	}, {
		"index": 19,
		"name": "Greatsword",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 2,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 6,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "19"
	}, {
		"index": 20,
		"name": "Halberd",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 20,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 6,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/6",
			"name": "Reach"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "20"
	}, {
		"index": 21,
		"name": "Lance",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 12,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 6,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/6",
			"name": "Reach"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/7",
			"name": "Special"
		}],
		"special": ["You have disadvantage when you use a lance to attack a target within 5 feet of you. Also, a lance requires two hands to wield when you aren't mounted."],
		"url": "21"
	}, {
		"index": 22,
		"name": "Longsword",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}],
		"2h_damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"url": "22"
	}, {
		"index": 23,
		"name": "Maul",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 2,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 10,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "23"
	}, {
		"index": 24,
		"name": "Morningstar",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 4,
		"properties": [],
		"url": "24"
	}, {
		"index": 25,
		"name": "Pike",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 18,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/6",
			"name": "Reach"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "25"
	}, {
		"index": 26,
		"name": "Rapier",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}],
		"url": "26"
	}, {
		"index": 27,
		"name": "Scimitar",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}],
		"url": "27"
	}, {
		"index": 28,
		"name": "Shortsword",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"url": "28"
	}, {
		"index": 29,
		"name": "Trident",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 4,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"url": "29"
	}, {
		"index": 30,
		"name": "War pick",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [],
		"url": "30"
	}, {
		"index": 31,
		"name": "Warhammer",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}],
		"2h_damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"url": "31"
	}, {
		"index": 32,
		"name": "Whip",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/6",
			"name": "Reach"
		}],
		"url": "32"
	}, {
		"index": 33,
		"name": "Blowgun",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Ranged",
		"category_range": "Martial Ranged",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 1,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 1,
		"properties": [{
			"name": "Ammunition",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1"
		}, {
			"name": "Loading",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/5"
		}],
		"url": "33"
	}, {
		"index": 34,
		"name": "Crossbow, hand",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Ranged",
		"category_range": "Martial Ranged",
		"cost": {
			"quantity": 75,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"name": "Ammunition",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"name": "Loading",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/5"
		}],
		"url": "34"
	}, {
		"index": 35,
		"name": "Crossbow, heavy",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Ranged",
		"category_range": "Martial Ranged",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 18,
		"properties": [{
			"name": "Ammunition",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"name": "Loading",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/5"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "35"
	}, {
		"index": 36,
		"name": "Longbow",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Ranged",
		"category_range": "Martial Ranged",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"name": "Ammunition",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "36"
	}, {
		"index": 37,
		"name": "Net",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Ranged",
		"category_range": "Martial Ranged",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 0,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/7",
			"name": "Special"
		}],
		"special": ["A Large or smaller creature hit by a net is restrained until it is freed. A net has no effect on creatures that are formless, or creatures that are Huge or larger. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the net (AC 10) also frees the creature without harming it, ending the effect and destroying the net. When you use an action, bonus action, or reaction to attack with a net, you can make only one attack regardless of the number of attacks you can normally make."],
		"throw_range": {
			"normal": 5,
			"long": 15
		},
		"url": "37"
	}, {
		"index": 38,
		"name": "Padded",
		"equipment_category": "Armor",
		"armor_category": "Light",
		"armor_class": {
			"base": 11,
			"dex_bonus": true,
			"max_bonus": null
		},
		"str_minimum": 0,
		"stealth_disadvantage": true,
		"weight": 8,
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"url": "38"
	}, {
		"index": 39,
		"name": "Leather",
		"equipment_category": "Armor",
		"armor_category": "Light",
		"armor_class": {
			"base": 11,
			"dex_bonus": true,
			"max_bonus": null
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 10,
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"url": "39"
	}, {
		"index": 40,
		"name": "Studded Leather",
		"equipment_category": "Armor",
		"armor_category": "Light",
		"armor_class": {
			"base": 12,
			"dex_bonus": true,
			"max_bonus": null
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 13,
		"cost": {
			"quantity": 45,
			"unit": "gp"
		},
		"url": "40"
	}, {
		"index": 41,
		"name": "Hide",
		"equipment_category": "Armor",
		"armor_category": "Medium",
		"armor_class": {
			"base": 12,
			"dex_bonus": true,
			"max_bonus": 2
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 12,
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"url": "41"
	}, {
		"index": 42,
		"name": "Chain Shirt",
		"equipment_category": "Armor",
		"armor_category": "Medium",
		"armor_class": {
			"base": 13,
			"dex_bonus": true,
			"max_bonus": 2
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 20,
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"url": "42"
	}, {
		"index": 43,
		"name": "Scale Mail",
		"equipment_category": "Armor",
		"armor_category": "Medium",
		"armor_class": {
			"base": 14,
			"dex_bonus": true,
			"max_bonus": 2
		},
		"str_minimum": 0,
		"stealth_disadvantage": true,
		"weight": 45,
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"url": "43"
	}, {
		"index": 44,
		"name": "Breastplate",
		"equipment_category": "Armor",
		"armor_category": "Medium",
		"armor_class": {
			"base": 14,
			"dex_bonus": true,
			"max_bonus": 2
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 20,
		"cost": {
			"quantity": 400,
			"unit": "gp"
		},
		"url": "44"
	}, {
		"index": 45,
		"name": "Half Plate",
		"equipment_category": "Armor",
		"armor_category": "Medium",
		"armor_class": {
			"base": 15,
			"dex_bonus": true,
			"max_bonus": 2
		},
		"str_minimum": 0,
		"stealth_disadvantage": true,
		"weight": 40,
		"cost": {
			"quantity": 750,
			"unit": "gp"
		},
		"url": "45"
	}, {
		"index": 46,
		"name": "Ring Mail",
		"equipment_category": "Armor",
		"armor_category": "Heavy",
		"armor_class": {
			"base": 14,
			"dex_bonus": false,
			"max_bonus": null
		},
		"str_minimum": 0,
		"stealth_disadvantage": true,
		"weight": 40,
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"url": "46"
	}, {
		"index": 47,
		"name": "Chain Mail",
		"equipment_category": "Armor",
		"armor_category": "Heavy",
		"armor_class": {
			"base": 16,
			"dex_bonus": false,
			"max_bonus": null
		},
		"str_minimum": 13,
		"stealth_disadvantage": true,
		"weight": 55,
		"cost": {
			"quantity": 75,
			"unit": "gp"
		},
		"url": "47"
	}, {
		"index": 48,
		"name": "Splint",
		"equipment_category": "Armor",
		"armor_category": "Heavy",
		"armor_class": {
			"base": 17,
			"dex_bonus": false,
			"max_bonus": null
		},
		"str_minimum": 15,
		"stealth_disadvantage": true,
		"weight": 60,
		"cost": {
			"quantity": 200,
			"unit": "gp"
		},
		"url": "48"
	}, {
		"index": 49,
		"name": "Plate",
		"equipment_category": "Armor",
		"armor_category": "Heavy",
		"armor_class": {
			"base": 18,
			"dex_bonus": false,
			"max_bonus": null
		},
		"str_minimum": 15,
		"stealth_disadvantage": true,
		"weight": 65,
		"cost": {
			"quantity": 1500,
			"unit": "gp"
		},
		"url": "49"
	}, {
		"index": 50,
		"name": "Shield",
		"equipment_category": "Armor",
		"armor_category": "Shield",
		"armor_class": {
			"base": 2,
			"dex_bonus": false,
			"max_bonus": null
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 6,
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"url": "50"
	}, {
		"index": 51,
		"name": "Abacus",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 2,
		"url": "51"
	}, {
		"index": 52,
		"name": "Acid (vial)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["As an action, you can splash the contents of this vial onto a creature within 5 feet of you or throw the vial up to 20 feet, shattering it on impact. In either case, make a ranged attack against a creature or object, treating the acid as an improvised weapon.", "On a hit, the target takes 2d6 acid damage."],
		"url": "52"
	}, {
		"index": 53,
		"name": "Alchemist's fire (flask)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"desc": ["This sticky, adhesive fluid ignites when exposed to air.", "As an action, you can throw this flask up to 20 feet, shattering it on impact. Make a ranged attack against a creature or object, treating the alchemist's fire as an improvised weapon.", "On a hit, the target takes 1d4 fire damage at the start of each of its turns. A creature can end this damage by using its action to make a DC 10 Dexterity check to extinguish the flames."],
		"weight": 1,
		"url": "53"
	}, {
		"index": 54,
		"name": "Arrow",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Ammunition",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 1,
		"url": "54"
	}, {
		"index": 55,
		"name": "Blowgun needle",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Ammunition",
		"cost": {
			"quantity": 2,
			"unit": "cp"
		},
		"weight": 1,
		"url": "55"
	}, {
		"index": 56,
		"name": "Crossbow bolt",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Ammunition",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 1.5,
		"url": "56"
	}, {
		"index": 57,
		"name": "Sling bullet",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Ammunition",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 1.5,
		"url": "57"
	}, {
		"index": 58,
		"name": "Amulet",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Holy Symbol",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["A holy symbol is a representation of a god or pantheon. It might be an amulet depicting a symbol representing a deity, the same symbol carefully engraved or inlaid as an emblem on a shield, or a tiny box holding a fragment of a sacred relic.", "Appendix B lists the symbols commonly associated with many gods in the multiverse. A cleric or paladin can use a holy symbol as a spellcasting focus. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield."],
		"url": "58"
	}, {
		"index": 59,
		"name": "Antitoxin (vial)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["A creature that drinks this vial of liquid gains advantage on saving throws against poison for 1 hour. It confers no benefit to undead or constructs."],
		"url": "59"
	}, {
		"index": 60,
		"name": "Crystal",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Arcane focus",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus."],
		"url": "60"
	}, {
		"index": 61,
		"name": "Orb",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Arcane focus",
		"cost": {
			"quantity": 20,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus."],
		"url": "61"
	}, {
		"index": 62,
		"name": "Rod",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Arcane focus",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus."],
		"url": "62"
	}, {
		"index": 63,
		"name": "Staff",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Arcane focus",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 4,
		"desc": ["An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus."],
		"url": "63"
	}, {
		"index": 64,
		"name": "Wand",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Arcane focus",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus."],
		"url": "64"
	}, {
		"index": 65,
		"name": "Backpack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 5,
		"url": "65"
	}, {
		"index": 66,
		"name": "Ball bearings (bag of 1,000)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["As an action, you can spill these tiny metal balls from their pouch to cover a level, square area that is 10 feet on a side.", "A creature moving across the covered area must succeed on a DC 10 Dexterity saving throw or fall prone.", "A creature moving through the area at half speed doesn't need to make the save."],
		"url": "66"
	}, {
		"index": 67,
		"name": "Barrel",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 70,
		"url": "67"
	}, {
		"index": 68,
		"name": "Basket",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 4,
			"unit": "sp"
		},
		"weight": 2,
		"url": "68"
	}, {
		"index": 69,
		"name": "Bedroll",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 7,
		"url": "69"
	}, {
		"index": 70,
		"name": "Bell",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 0,
		"url": "70"
	}, {
		"index": 71,
		"name": "Blanket",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 3,
		"url": "71"
	}, {
		"index": 72,
		"name": "Block and tackle",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["A set of pulleys with a cable threaded through them and a hook to attach to objects, a block and tackle allows you to hoist up to four times the weight you can normally lift."],
		"url": "72"
	}, {
		"index": 73,
		"name": "Book",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["A book might contain poetry, historical accounts, information pertaining to a particular field of lore, diagrams and notes on gnomish contraptions, or just about anything else that can be represented using text or pictures. A book of spells is a spellbook (described later in this section)."],
		"url": "73"
	}, {
		"index": 74,
		"name": "Bottle, glass",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 2,
		"url": "74"
	}, {
		"index": 75,
		"name": "Bucket",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 2,
		"url": "75"
	}, {
		"index": 76,
		"name": "Caltrops",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 2,
		"desc": ["As an action, you can spread a bag of caltrops to cover a square area that is 5 feet on a side.", "Any creature that enters the area must succeed on a DC 15 Dexterity saving throw or stop moving this turn and take 1 piercing damage.", "Taking this damage reduces the creature's walking speed by 10 feet until the creature regains at least 1 hit point.", "A creature moving through the area at half speed doesn't need to make the save."],
		"url": "76"
	}, {
		"index": 77,
		"name": "Candle",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 0,
		"desc": ["For 1 hour, a candle sheds bright light in a 5-foot radius and dim light for an additional 5 feet."],
		"url": "77"
	}, {
		"index": 78,
		"name": "Case, crossbow bolt",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["This wooden case can hold up to twenty crossbow bolts."],
		"url": "78"
	}, {
		"index": 79,
		"name": "Case, map or scroll",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["This cylindrical leather case can hold up to ten rolled-up sheets of paper or five rolled-up sheets of parchment."],
		"url": "79"
	}, {
		"index": 80,
		"name": "Chain (10 feet)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 10,
		"desc": ["A chain has 10 hit points. It can be burst with a successful DC 20 Strength check."],
		"url": "80"
	}, {
		"index": 81,
		"name": "Chalk (1 piece)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 0,
		"url": "81"
	}, {
		"index": 82,
		"name": "Chest",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 25,
		"url": "82"
	}, {
		"index": 83,
		"name": "Clothes, common",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 3,
		"url": "83"
	}, {
		"index": 84,
		"name": "Clothes, costume",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 4,
		"url": "84"
	}, {
		"index": 85,
		"name": "Clothes, fine",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"weight": 6,
		"url": "85"
	}, {
		"index": 86,
		"name": "Clothes, traveler's",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 4,
		"url": "86"
	}, {
		"index": 87,
		"name": "Component pouch",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 2,
		"desc": [" A component pouch is a small, watertight leather belt pouch that has compartments to hold all the material components and other special items you need to cast your spells, except for those components that have a specific cost (as indicated in a spell's description)."],
		"url": "87"
	}, {
		"index": 88,
		"name": "Crowbar",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["Using a crowbar grants advantage to Strength checks where the crowbar's leverage can be applied."],
		"url": "88"
	}, {
		"index": 89,
		"name": "Sprig of mistletoe",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Druidic focus",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another special wood, a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, and teeth from sacred animals. A druid can use such an object as a spellcasting focus."],
		"url": "89"
	}, {
		"index": 90,
		"name": "Totem",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Druidic focus",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another special wood, a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, and teeth from sacred animals. A druid can use such an object as a spellcasting focus."],
		"url": "90"
	}, {
		"index": 91,
		"name": "Wooden staff",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Druidic focus",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 4,
		"desc": ["A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another special wood, a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, and teeth from sacred animals. A druid can use such an object as a spellcasting focus."],
		"url": "91"
	}, {
		"index": 92,
		"name": "Yew wand",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Druidic focus",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another special wood, a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, and teeth from sacred animals. A druid can use such an object as a spellcasting focus."],
		"url": "92"
	}, {
		"index": 93,
		"name": "Emblem",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Holy Symbol",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["A holy symbol is a representation of a god or pantheon. It might be an amulet depicting a symbol representing a deity, the same symbol carefully engraved or inlaid as an emblem on a shield, or a tiny box holding a fragment of a sacred relic.", "Appendix B lists the symbols commonly associated with many gods in the multiverse. A cleric or paladin can use a holy symbol as a spellcasting focus. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield."],
		"url": "93"
	}, {
		"index": 94,
		"name": "Fishing tackle",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 4,
		"desc": ["This kit includes a wooden rod, silken line, corkwood bobbers, steel hooks, lead sinkers, velvet lures, and narrow netting."],
		"url": "94"
	}, {
		"index": 95,
		"name": "Flask or tankard",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "cp"
		},
		"weight": 1,
		"url": "95"
	}, {
		"index": 96,
		"name": "Grappling hook",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 4,
		"url": "96"
	}, {
		"index": 97,
		"name": "Hammer",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 3,
		"url": "97"
	}, {
		"index": 98,
		"name": "Hammer, sledge",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 10,
		"url": "98"
	}, {
		"index": 99,
		"name": "Holy water (flask)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["As an action, you can splash the contents of this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. In either case, make a ranged attack against a target creature, treating the holy water as an improvised weapon.", "If the target is a fiend or undead, it takes 2d6 radiant damage.", "A cleric or paladin may create holy water by performing a special ritual.", "The ritual takes 1 hour to perform, uses 25 gp worth of powdered silver, and requires the caster to expend a 1st-level spell slot."],
		"url": "99"
	}, {
		"index": 100,
		"name": "Hourglass",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 1,
		"url": "100"
	}, {
		"index": 101,
		"name": "Hunting trap",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"desc": ["When you use your action to set it, this trap forms a saw-toothed steel ring that snaps shut when a creature steps on a pressure plate in the center. The trap is affixed by a heavy chain to an immobile object, such as a tree or a spike driven into the ground.", "A creature that steps on the plate must succeed on a DC 13 Dexterity saving throw or take 1d4 piercing damage and stop moving. Thereafter, until the creature breaks free of the trap, its movement is limited by the length of the chain (typically 3 feet long).", "A creature can use its action to make a DC 13 Strength check, freeing itself or another creature within its reach on a success. Each failed check deals 1 piercing damage to the trapped creature."],
		"weight": 25,
		"url": "101"
	}, {
		"index": 102,
		"name": "Ink (1 ounce bottle)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 0,
		"url": "102"
	}, {
		"index": 103,
		"name": "Ink pen",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "cp"
		},
		"weight": 0,
		"url": "103"
	}, {
		"index": 104,
		"name": "Jug or pitcher",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "cp"
		},
		"weight": 4,
		"url": "104"
	}, {
		"index": 105,
		"name": "Climber's Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 12,
		"desc": ["A climber's kit includes special pitons, boot tips, gloves, and a harness. You can use the climber's kit as an action to anchor yourself; when you do, you can't fall more than 25 feet from the point where you anchored yourself, and you can't climb more than 25 feet away from that point without undoing the anchor."],
		"url": "105"
	}, {
		"index": 106,
		"name": "Disguise Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["This pouch of cosmetics, hair dye, and small props lets you create disguises that change your physical appearance. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to create a visual disguise."],
		"url": "106"
	}, {
		"index": 107,
		"name": "Forgery Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["This small box contains a variety of papers and parchments, pens and inks, seals and sealing wax, gold and silver leaf, and other supplies necessary to create convincing forgeries of physical documents. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to create a physical forgery of a document."],
		"url": "107"
	}, {
		"index": 108,
		"name": "Herbalism Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["This kit contains a variety of instruments such as clippers, mortar and pestle, and pouches and vials used by herbalists to create remedies and potions. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to identify or apply herbs. Also, proficiency with this kit is required to create antitoxin and potions of healing."],
		"url": "108"
	}, {
		"index": 109,
		"name": "Healer's Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["This kit is a leather pouch containing bandages, salves, and splints. The kit has ten uses. As an action, you can expend one use of the kit to stabilize a creature that has 0 hit points, without needing to make a Wisdom (Medicine) check."],
		"url": "109"
	}, {
		"index": 110,
		"name": "Mess Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 2,
			"unit": "sp"
		},
		"weight": 1,
		"desc": ["This tin box contains a cup and simple cutlery. The box clamps together, and one side can be used as a cooking pan and the other as a plate or shallow bowl."],
		"url": "110"
	}, {
		"index": 111,
		"name": "Poisoner's Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["A poisoner's kit includes the vials, chemicals, and other equipment necessary for the creation of poisons. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to craft or use poisons."],
		"url": "111"
	}, {
		"index": 112,
		"name": "Ladder (10-foot)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"weight": 25,
		"url": "112"
	}, {
		"index": 113,
		"name": "Lamp",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 1,
		"desc": ["A lamp casts bright light in a 15-foot radius and dim light for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil."],
		"url": "113"
	}, {
		"index": 114,
		"name": "Lantern, bullseye",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["A bullseye lantern casts bright light in a 60-foot cone and dim light for an additional 60 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil."],
		"url": "114"
	}, {
		"index": 115,
		"name": "Lantern, hooded",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["A hooded lantern casts bright light in a 30-foot radius and dim light for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil. As an action, you can lower the hood, reducing the light to dim light in a 5-foot radius."],
		"url": "115"
	}, {
		"index": 116,
		"name": "Lock",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["A key is provided with the lock. Without the key, a creature proficient with thieves' tools can pick this lock with a successful DC 15 Dexterity check. Your GM may decide that better locks are available for higher prices."],
		"url": "116"
	}, {
		"index": 117,
		"name": "Magnifying glass",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 100,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["This lens allows a closer look at small objects. It is also useful as a substitute for flint and steel when starting fires. Lighting a fire with a magnifying glass requires light as bright as sunlight to focus, tinder to ignite, and about 5 minutes for the fire to ignite.", "A magnifying glass grants advantage on any ability check made to appraise or inspect an item that is small or highly detailed."],
		"url": "117"
	}, {
		"index": 118,
		"name": "Manacles",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 6,
		"desc": ["These metal restraints can bind a Small or Medium creature. Escaping the manacles requires a successful DC 20 Dexterity check. Breaking them requires a successful DC 20 Strength check.", "Each set of manacles comes with one key. Without the key, a creature proficient with thieves' tools can pick the manacles' lock with a successful DC 15 Dexterity check. Manacles have 15 hit points."],
		"url": "118"
	}, {
		"index": 119,
		"name": "Mirror, steel",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 0.5,
		"url": "119"
	}, {
		"index": 120,
		"name": "Oil (flask)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"weight": 1,
		"desc": ["Oil usually comes in a clay flask that holds 1 pint.", "As an action, you can splash the oil in this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. Make a ranged attack against a target creature or object, treating the oil as an improvised weapon.", "On a hit, the target is covered in oil. If the target takes any fire damage before the oil dries (after 1 minute), the target takes an additional 5 fire damage from the burning oil.", "You can also pour a flask of oil on the ground to cover a 5-foot-square area, provided that the surface is level.", "If lit, the oil burns for 2 rounds and deals 5 fire damage to any creature that enters the area or ends its turn in the area. A creature can take this damage only once per turn."],
		"url": "120"
	}, {
		"index": 121,
		"name": "Paper (one sheet)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "sp"
		},
		"weight": 0,
		"url": "121"
	}, {
		"index": 122,
		"name": "Parchment (one sheet)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"weight": 0,
		"url": "122"
	}, {
		"index": 123,
		"name": "Perfume (vial)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 0,
		"url": "123"
	}, {
		"index": 124,
		"name": "Pick, miner's",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 10,
		"url": "124"
	}, {
		"index": 125,
		"name": "Piton",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 0.25,
		"url": "125"
	}, {
		"index": 126,
		"name": "Poison, basic (vial)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 100,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["You can use the poison in this vial to coat one slashing or piercing weapon or up to three pieces of ammunition. Applying the poison takes an action. A creature hit by the poisoned weapon or ammunition must make a DC 10 Constitution saving throw or take 1d4 poison damage. Once applied, the poison retains potency for 1 minute before drying."],
		"url": "126"
	}, {
		"index": 127,
		"name": "Pole (10-foot)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 7,
		"url": "127"
	}, {
		"index": 128,
		"name": "Pot, iron",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 10,
		"url": "128"
	}, {
		"index": 129,
		"name": "Potion of healing",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 0.5,
		"desc": ["A character who drinks the magical red fluid in this vial regains 2d4 + 2 hit points. Drinking or administering a potion takes an action."],
		"url": "129"
	}, {
		"index": 130,
		"name": "Pouch",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 1,
		"desc": ["A cloth or leather pouch can hold up to 20 sling bullets or 50 blowgun needles, among other things. A compartmentalized pouch for holding spell components is called a component pouch (described earlier in this section)."],
		"url": "130"
	}, {
		"index": 131,
		"name": "Quiver",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["A quiver can hold up to 20 arrows."],
		"url": "131"
	}, {
		"index": 132,
		"name": "Ram, portable",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 4,
			"unit": "gp"
		},
		"weight": 35,
		"desc": ["You can use a portable ram to break down doors. When doing so, you gain a +4 bonus on the Strength check. One other character can help you use the ram, giving you advantage on this check."],
		"url": "132"
	}, {
		"index": 133,
		"name": "Rations (1 day)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 2,
		"desc": ["Rations consist of dry foods suitable for extended travel, including jerky, dried fruit, hardtack, and nuts."],
		"url": "133"
	}, {
		"index": 134,
		"name": "Reliquary",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Holy Symbol",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["A holy symbol is a representation of a god or pantheon. It might be an amulet depicting a symbol representing a deity, the same symbol carefully engraved or inlaid as an emblem on a shield, or a tiny box holding a fragment of a sacred relic.", "Appendix B lists the symbols commonly associated with many gods in the multiverse. A cleric or paladin can use a holy symbol as a spellcasting focus. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield."],
		"url": "134"
	}, {
		"index": 135,
		"name": "Robes",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 4,
		"url": "135"
	}, {
		"index": 136,
		"name": "Rope, hempen (50 feet)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 10,
		"desc": ["Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check."],
		"url": "136"
	}, {
		"index": 137,
		"name": "Rope, silk (50 feet)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check."],
		"url": "137"
	}, {
		"index": 138,
		"name": "Sack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 0.5,
		"url": "138"
	}, {
		"index": 139,
		"name": "Scale, merchant's",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["A scale includes a small balance, pans, and a suitable assortment of weights up to 2 pounds. With it, you can measure the exact weight of small objects, such as raw precious metals or trade goods, to help determine their worth."],
		"url": "139"
	}, {
		"index": 140,
		"name": "Sealing wax",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 0,
		"url": "140"
	}, {
		"index": 141,
		"name": "Shovel",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 5,
		"url": "141"
	}, {
		"index": 142,
		"name": "Signal whistle",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 0,
		"url": "142"
	}, {
		"index": 143,
		"name": "Signet ring",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 0,
		"url": "143"
	}, {
		"index": 144,
		"name": "Soap",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "cp"
		},
		"weight": 0,
		"url": "144"
	}, {
		"index": 145,
		"name": "Spellbook",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["Essential for wizards, a spellbook is a leather-bound tome with 100 blank vellum pages suitable for recording spells."],
		"url": "145"
	}, {
		"index": 146,
		"name": "Spike, iron",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"weight": 5,
		"url": "146"
	}, {
		"index": 147,
		"name": "Spyglass",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1000,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["Objects viewed through a spyglass are magnified to twice their size."],
		"url": "147"
	}, {
		"index": 148,
		"name": "Tent, two-person",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 20,
		"desc": ["A simple and portable canvas shelter, a tent sleeps two."],
		"url": "148"
	}, {
		"index": 149,
		"name": "Tinderbox",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 1,
		"desc": ["This small container holds flint, fire steel, and tinder (usually dry cloth soaked in light oil) used to kindle a fire. Using it to light a torch—or anything else with abundant, exposed fuel—takes an action.", "Lighting any other fire takes 1 minute."],
		"url": "149"
	}, {
		"index": 150,
		"name": "Torch",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 1,
		"desc": ["A torch burns for 1 hour, providing bright light in a 20-foot radius and dim light for an additional 20 feet. If you make a melee attack with a burning torch and hit, it deals 1 fire damage."],
		"url": "150"
	}, {
		"index": 151,
		"name": "Vial",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 0,
		"url": "151"
	}, {
		"index": 152,
		"name": "Waterskin",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "sp"
		},
		"weight": 5,
		"url": "152"
	}, {
		"index": 153,
		"name": "Whetstone",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 1,
		"url": "153"
	}, {
		"index": 154,
		"name": "Burglar's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 16,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "66",
			"quantity": 1
		}, {
			"item_url": "77",
			"quantity": 5
		}, {
			"item_url": "88",
			"quantity": 1
		}, {
			"item_url": "97",
			"quantity": 1
		}, {
			"item_url": "125",
			"quantity": 10
		}, {
			"item_url": "115",
			"quantity": 1
		}, {
			"item_url": "120",
			"quantity": 2
		}, {
			"item_url": "133",
			"quantity": 5
		}, {
			"item_url": "149",
			"quantity": 1
		}, {
			"item_url": "152",
			"quantity": 1
		}, {
			"item_url": "136",
			"quantity": 1
		}],
		"url": "154"
	}, {
		"index": 155,
		"name": "Diplomat's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 39,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "82",
			"quantity": 1
		}, {
			"item_url": "79",
			"quantity": 2
		}, {
			"item_url": "85",
			"quantity": 5
		}, {
			"item_url": "102",
			"quantity": 1
		}, {
			"item_url": "103",
			"quantity": 1
		}, {
			"item_url": "113",
			"quantity": 1
		}, {
			"item_url": "120",
			"quantity": 2
		}, {
			"item_url": "121",
			"quantity": 5
		}, {
			"item_url": "123",
			"quantity": 1
		}, {
			"item_url": "140",
			"quantity": 1
		}, {
			"item_url": "144",
			"quantity": 1
		}],
		"url": "155"
	}, {
		"index": 156,
		"name": "Dungeoneer's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 12,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "88",
			"quantity": 1
		}, {
			"item_url": "97",
			"quantity": 1
		}, {
			"item_url": "125",
			"quantity": 10
		}, {
			"item_url": "150",
			"quantity": 10
		}, {
			"item_url": "133",
			"quantity": 10
		}, {
			"item_url": "152",
			"quantity": 1
		}, {
			"item_url": "136",
			"quantity": 1
		}],
		"url": "156"
	}, {
		"index": 157,
		"name": "Entertainer's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 40,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "69",
			"quantity": 1
		}, {
			"item_url": "84",
			"quantity": 2
		}, {
			"item_url": "77",
			"quantity": 5
		}, {
			"item_url": "133",
			"quantity": 5
		}, {
			"item_url": "152",
			"quantity": 1
		}, {
			"item_url": "106",
			"quantity": 1
		}],
		"url": "157"
	}, {
		"index": 158,
		"name": "Explorer's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "69",
			"quantity": 1
		}, {
			"item_url": "110",
			"quantity": 1
		}, {
			"item_url": "149",
			"quantity": 1
		}, {
			"item_url": "150",
			"quantity": 10
		}, {
			"item_url": "133",
			"quantity": 10
		}, {
			"item_url": "152",
			"quantity": 1
		}, {
			"item_url": "106",
			"quantity": 1
		}],
		"url": "158"
	}, {
		"index": 159,
		"name": "Priest's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 19,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "71",
			"quantity": 1
		}, {
			"item_url": "77",
			"quantity": 10
		}, {
			"item_url": "149",
			"quantity": 1
		}, {
			"item_url": "133",
			"quantity": 2
		}, {
			"item_url": "152",
			"quantity": 1
		}],
		"url": "159"
	}, {
		"index": 160,
		"name": "Scholar's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 40,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "73",
			"quantity": 1
		}, {
			"item_url": "102",
			"quantity": 1
		}, {
			"item_url": "103",
			"quantity": 1
		}, {
			"item_url": "122",
			"quantity": 10
		}],
		"url": "160"
	}, {
		"index": 161,
		"name": "Alchemist's supplies",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 8,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "161"
	}, {
		"index": 162,
		"name": "Brewer's supplies",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 20,
			"unit": "gp"
		},
		"weight": 9,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "162"
	}, {
		"index": 163,
		"name": "Calligrapher's supplies",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "163"
	}, {
		"index": 164,
		"name": "Carpenter's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 8,
			"unit": "gp"
		},
		"weight": 6,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "164"
	}, {
		"index": 165,
		"name": "Cartographer's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"weight": 6,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "165"
	}, {
		"index": 166,
		"name": "Cobbler's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "166"
	}, {
		"index": 167,
		"name": "Cook's utensils",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 8,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "167"
	}, {
		"index": 168,
		"name": "Glassblower's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "168"
	}, {
		"index": 169,
		"name": "Jeweler's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "169"
	}, {
		"index": 170,
		"name": "Leatherworker's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "170"
	}, {
		"index": 171,
		"name": "Mason's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 8,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "171"
	}, {
		"index": 172,
		"name": "Painter's supplies",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "172"
	}, {
		"index": 173,
		"name": "Potter's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "173"
	}, {
		"index": 174,
		"name": "Smith's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 20,
			"unit": "gp"
		},
		"weight": 8,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "174"
	}, {
		"index": 175,
		"name": "Tinker's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 10,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "175"
	}, {
		"index": 176,
		"name": "Weaver's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "176"
	}, {
		"index": 177,
		"name": "Woodcarver's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "177"
	}, {
		"index": 178,
		"name": "Dice set",
		"equipment_category": "Tools",
		"tool_category": "Gaming Sets",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"weight": 0,
		"desc": ["This item encompasses a wide range of game pieces, including dice and decks of cards (for games such as Three-Dragon Ante). A few common examples appear on the Tools table, but other kinds of gaming sets exist. If you are proficient with a gaming set, you can add your proficiency bonus to ability checks you make to play a game with that set. Each type of gaming set requires a separate proficiency."],
		"url": "178"
	}, {
		"index": 179,
		"name": "Playing card set",
		"equipment_category": "Tools",
		"tool_category": "Gaming Sets",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 0,
		"desc": ["This item encompasses a wide range of game pieces, including dice and decks of cards (for games such as Three-Dragon Ante). A few common examples appear on the Tools table, but other kinds of gaming sets exist. If you are proficient with a gaming set, you can add your proficiency bonus to ability checks you make to play a game with that set. Each type of gaming set requires a separate proficiency."],
		"url": "179"
	}, {
		"index": 180,
		"name": "Bagpipes",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"weight": 6,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "180"
	}, {
		"index": 181,
		"name": "Drum",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 6,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "181"
	}, {
		"index": 182,
		"name": "Dulcimer",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 10,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "182"
	}, {
		"index": 183,
		"name": "Flute",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "183"
	}, {
		"index": 184,
		"name": "Lute",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 35,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "184"
	}, {
		"index": 185,
		"name": "Lyre",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "185"
	}, {
		"index": 186,
		"name": "Horn",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 3,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "186"
	}, {
		"index": 187,
		"name": "Pan flute",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 12,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "187"
	}, {
		"index": 188,
		"name": "Shawm",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "188"
	}, {
		"index": 189,
		"name": "Viol",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "189"
	}, {
		"index": 190,
		"name": "Navigator's tools",
		"equipment_category": "Tools",
		"tool_category": "Other Tools",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["This set of instruments is used for navigation at sea. Proficiency with navigator's tools lets you chart a ship's course and follow navigation charts. In addition, these tools allow you to add your proficiency bonus to any ability check you make to avoid getting lost at sea."],
		"url": "190"
	}, {
		"index": 191,
		"name": "Thieves' tools",
		"equipment_category": "Tools",
		"tool_category": "Other Tools",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["This set of tools includes a small file, a set of lock picks, a small mirror mounted on a metal handle, a set of narrow-bladed scissors, and a pair of pliers. Proficiency with these tools lets you add your proficiency bonus to any ability checks you make to disarm traps or open locks."],
		"url": "191"
	}]

module.exports = equipment