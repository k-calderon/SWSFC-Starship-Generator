var shipTemplate = {
	"size6": {
		"sizeStr": "Small",
		"size": 6,
		"acceleration": 50,
		"topSpeed": 700,
		"climb": 3,
		"toughness": 20,
		"toughnessFromArmor": 5,
		"crew": 1,
		"baseCost": 2000000,
		"totalMods": 20,
		"energyCapacity": 25
	},
	"size8": {
		"sizeStr": "Medium",
		"size": 8,
		"acceleration": 45,
		"topSpeed": 600,
		"climb": 2,
		"toughness": 25,
		"toughnessFromArmor": 6,
		"crew": 5,
		"baseCost": 5000000,
		"totalMods": 25,
		"energyCapacity": 100
	},
	"size12": {
		"sizeStr": "Large",
		"size": 12,
		"acceleration": 40,
		"topSpeed": 500,
		"climb": 1,
		"toughness": 35,
		"toughnessFromArmor": 8,
		"crew": 50,
		"baseCost": 20000000,
		"totalMods": 30,
		"energyCapacity": 300
	},
	"size16": {
		"sizeStr": "Huge",
		"size": 16,
		"acceleration": 35,
		"topSpeed": 400,
		"climb": 0,
		"toughness": 45,
		"toughnessFromArmor": 10,
		"crew": 300,
		"baseCost": 50000000,
		"totalMods": 40,
		"energyCapacity": 500
	},
	"size20": {
		"sizeStr": "Giant",
		"size": 20,
		"acceleration": 30,
		"topSpeed": 300,
		"climb": -1,
		"toughness": 50,
		"toughnessFromArmor": 11,
		"crew": 1000,
		"baseCost": 200000000,
		"totalMods": 50,
		"energyCapacity": 1000
	},
	"size24": {
		"sizeStr": "Gargantuan",
		"size": 24,
		"acceleration": 25,
		"topSpeed": 200,
		"climb": -2,
		"toughness": 55,
		"toughnessFromArmor": 13,
		"crew": 2000,
		"baseCost": 1000000000,
		"totalMods": 70,
		"energyCapacity": 2000
	},
	"size28": {
		"sizeStr": "Behemoth",
		"size": 28,
		"acceleration": 20,
		"topSpeed": 200,
		"climb": -3,
		"toughness": 60,
		"toughnessFromArmor": 15,
		"crew": 8000,
		"baseCost": 5000000000,
		"totalMods": 90,
		"energyCapacity": 2000
	},
	"size32": {
		"sizeStr": "Leviathan",
		"size": 32,
		"acceleration": 20,
		"topSpeed": 200,
		"climb": -4,
		"toughness": 70,
		"toughnessFromArmor": 20,
		"crew": 20000,
		"baseCost": 10000000000,
		"totalMods": 120,
		"energyCapacity": 2000
	},
	"size40": {	
		"sizeStr": "World Killer",
		"size": 40,
		"acceleration": 20,
		"topSpeed": 200,
		"climb": -5,
		"toughness": 80,
		"toughnessFromArmor": 25,
		"crew": 50000,
		"baseCost": 30000000000,
		"totalMods": 150,
		"energyCapacity": 2000
	}	
};

var blankShip = {
	"name": "",
	"description": "",
	"remainingMods": 0,
	"notes": "",
	"weapons": [],
	"shields": "",
	"shieldRecovery": 0
};

var ship = {};

var handlers = {
	newShip: function (){
		ship = {};
		for (var prop in blankShip) {
			if (blankShip.hasOwnProperty(prop)){
				ship[prop] = blankShip[prop];
			}
		}
	},
	// pass a property of shipTemplate into this method
	size: function (shipSize) {	
		ship.remainingMods = shipSize.totalMods;
		for (var prop in shipSize) {
			if (shipSize.hasOwnProperty(prop)) {
				ship[prop] = shipSize[prop];
			}
		}
	},
	name: function(str) {
		ship.name = str;
	},
	description: function(str) {
		ship.description = str;
	},
	addWeapon: function(wepID) {
		//search for weapons by this key and value combo. vehicleWeapons[i].ID
		//ex. vehicleWeapons[i].ID === autoCannonLight
		for (i = 0; i < vehicleWeapons.length; i++) {
			if (vehicleWeapons[i].ID === wepID) {
				ship.weapons.push(vehicleWeapons[i]);
			}
		}		
	},
	calcRemainingMods: function() {
		debugger;
		ship.remainingMods = ship.totalMods;
		ship.weapons.forEach(function(element) {		
			ship.remainingMods =  ship.remainingMods - element.Mods;
		});
	}
};

function test () {	
	//console.log(ship);
	handlers.newShip();
	//console.log(ship);
	handlers.size(shipTemplate.size6);
	//console.log(ship);
	handlers.name ("Test Ship");
	handlers.description ("A cool ship!");
	//console.log(ship);
	handlers.size(shipTemplate.size16);
	//console.log(ship);
	handlers.addWeapon("autoCannonLight");
	handlers.calcRemainingMods();
	console.log(ship.remainingMods);
	handlers.addWeapon("autoCannonMedium");
	handlers.calcRemainingMods();
	console.log(ship.remainingMods);
	//uncomment once calcRemainingMods is tested
	//handlers.newShip();
	//console.log(ship);
	
};