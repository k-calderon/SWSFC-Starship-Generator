"use strict";

const blankShip = {
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
	// pass a property of shipTemplate into this 'size' method
	// adds elements into the ship array from a template in shipTemplate
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
		for (var i = 0; i < vehicleWeapons.length; i++) {
			if (vehicleWeapons[i].ID === wepID) {
				ship.weapons.push(vehicleWeapons[i]);
			};
		};
		handlers.calcRemainingMods();		
	},
	deleteWeapon: function(wepID){
		//delete weapons from the ship.weapons array
		// it needs to get the position in the ship.weapons array of the weapon I want to delete
		// then it needs to use a .splice method to remove it from the array.
		for (var i = ship.weapons.length - 1; i >= 0; i--) {
			if (ship.weapons[i].ID === wepID) {
				ship.weapons.splice(i, 1);
			};
		};
		handlers.calcRemainingMods();				
	},

	calcRemainingMods: function() {
		ship.remainingMods = ship.totalMods;
		ship.weapons.forEach(function(element) {		
			ship.remainingMods =  ship.remainingMods - element.Mods;
		});
	}
};

var view = {
	displayWeapons: function (){
		var weaponsList = document.querySelector('#weapons-list');
		weaponsList.innerHTML = '';
		
		vehicleWeapons.forEach(function (weapon, position){
			//grab the name of the weapon
			//(weapon.Name is the name of the weapon)
			//create an entry in the html for it
			/*<div class="row" style="background-color: green;">
						<div class="col-xs-2">
							<button class="btn minus-button">-</button><button class="btn plus-button">+</button>
						</div>
						<div class="col-xs-10">
							<p>Superstructure (Passenger, Military)</p>
						</div>
			*/
			const weaponsDivHTML = '<div class="row" style="background-color: green;">\
										<div class="col-xs-2">\
											<button class="btn minus-button">-</button><button class="btn plus-button">+</button>\
										</div>\
										<div class="col-xs-10">\
											<p> '+ weapon.Name + ' </p>\
										</div>';
			var weaponsDiv = document.createElement('div')
			weaponsDiv.innerHTML = weaponsDivHTML;
			weaponsList.appendChild(weaponsDiv);
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

function testListeners (prop) {
	console.log('it works! property is ' + prop);
};

function addEventListener () {
	document.getElementById("testButton").addEventListener("click", testListeners('test prop'));
};