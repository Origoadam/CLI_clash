const {
  Arena,
  Hero,
  Warrior,
  Priest,
  Mage,
  Rouge,
  Archer,
  Sword,
  Dagger,
  WarHammer,
  BattleAxe,
  Bow,
  Wand
} = require('./classes.js');

var Battleground = new Arena();

var Hero1 = new Hero("Béla");
var Hero2 = new Hero("János");

function heroClassMenu(hero){
  console.clear();
  var readlineSync = require('readline-sync'),

  options = ['Warrior', 'Priest', 'Mage', 'Rouge', 'Archer'],
  index = readlineSync.keyInSelect(options, 'Hero class selection: ');

  switch(index){
    case 0:
      return new Warrior(hero.name);
    break;

    case 1:
      return new Priest(hero.name);
    break;

    case 2:
      return new Mage(hero.name);
    break;

    case 3:
      return new Rouge(hero.name);
    break;

    case 4:
      return new Archer(hero.name);
    break;

    default: hero;
  }

  return hero;
}

function heroWeaponMenu(hero){
  console.clear();
  var readlineSync = require('readline-sync');

  if (hero.constructor == Hero){
    console.log("Please choose a valid class for the hero first or go back to the main menu!");

    options = ['Select class for hero', 'Main menu'],
    index = readlineSync.keyInSelect(options, 'Please choose an option: ');

    switch(index){
      case 0:
        if (hero==Hero1){
          Hero1 = heroClassMenu(Hero1);
        } else {
          Hero2 = heroClassMenu(Hero2);
        }
        mainMenu(Hero1,Hero2);
      break;

      case 1:
        mainMenu(Hero1,Hero2);
      break;

      default: mainMenu(Hero1,Hero2);
    }
  } else {
    options = ['Sword (default weapon)', 'Dagger (Rouge)', 'War Hammer (Priest)', 'Battle Axe (Warrior)', 'Bow (Archer)', 'Wand (Mage)'],
    index = readlineSync.keyInSelect(options, 'Hero weapon selection: ');
    console.log(hero.health);

    switch(index){
      case 0:
        hero.weapon = new Sword();
      break;

      case 1:
        hero.weapon = new Dagger();
      break;

      case 2:
        hero.weapon = new WarHammer();
      break;

      case 3:
        hero.weapon = new BattleAxe();
      break;

      case 4:
        hero.weapon = new Bow();
      break;

      case 5:
        hero.weapon = new Wand();
      break;

      default: return;
    }
  }

}

function tournamendEndMenu(code){
  var readlineSync = require('readline-sync'),

  options = ['Replay', 'Main menu'],
  index = readlineSync.keyInSelect(options, 'Tournament ended, please choose an option: ');

  Hero1.health = Hero1.maxHealth;
  Hero2.health = Hero2.maxHealth;

  switch(index){
    case 0:
      console.clear();
      tournamendEndMenu(Battleground.tournament(Hero1, Hero2));
    break;

    case 1:
      mainMenu(Hero1,Hero2);
    break;

    default:
      mainMenu(Hero1,Hero2);
  }

}

function mainMenu(hero1,hero2){
  console.clear();
  Hero1 = hero1;
  Hero2 = hero2;

  console.log("Welcome to CLI Clash!\n")

  var hero1type = hero1.constructor == Hero? "has an invalid class, please select a valid class!" : ("is a " + hero1.constructor.name + " (" + hero1.weapon.constructor.name + ")");
  console.log("Hero 1 (" + hero1.name + ") " + hero1type);

  var hero2type = hero2.constructor == Hero? "has an invalid class, please select a valid class!" : ("is a " + hero2.constructor.name + " (" + hero2.weapon.constructor.name + ")");
  console.log("Hero 2 (" + hero2.name + ") " + hero2type);

  console.log("\n");
  var readlineSync = require('readline-sync'),
  options = [
    "Press 1 to choose Hero1's class!",
    "Press 2 to choose Hero2's class!",
    "Press 3 to change Hero1's weapon!",
    "Press 4 to change Hero2's weapon!",
    "Press 5 to start the match!"
  ],
  index = readlineSync.keyInSelect(options, 'Enter a number: ');

  switch(index){
    case 0:
      Hero1 = heroClassMenu(Hero1);
      mainMenu(Hero1,Hero2);
    break;

    case 1:
      Hero2 = heroClassMenu(Hero2);
      mainMenu(Hero1,Hero2);
    break;

    case 2:
      heroWeaponMenu(Hero1);
      mainMenu(Hero1,Hero2);
    break;

    case 3:
      heroWeaponMenu(Hero2);
      mainMenu(Hero1,Hero2);
    break;

    case 4:
      console.clear();
      tournamendEndMenu(Battleground.tournament(Hero1, Hero2));
    break;

    default: process.exit();
  }

  //mainMenu(Hero1,Hero2);
}

mainMenu(Hero1,Hero2);
