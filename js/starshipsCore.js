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
	// adds elements into the ship array from a 
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
	deleteWeapon: function(wepID){
		//delete weapons from the ship.weapons array
		// it needs to get the position in the ship.weapons array of the weapon I want to delete
		// then it needs to use a .splice method to remove it from the array.
		var position = 0;
		for (i = 0; i < ship.weapons.length; i++) {
			if (ship.weapons[i].ID === wepID) {
				position = i;
			};
		};
		ship.weapons.splice(position, 1);		
	},
	calcRemainingMods: function() {
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
	//handlers.newShip();
	console.log(ship);
	
};