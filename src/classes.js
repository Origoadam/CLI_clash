
class Weapon {
  _damageMin;
  _damageMax;
  _hitChance;
  _canbeUsedBy;
  _bonus = 0;

  set minDmg (newMin) {
    this._damageMin = newMin;
  }

  get minDmg () {
    return this._damageMin;
  }

  set maxDmg (newMax) {
    this._damageMax = newMax;
  }

  get maxDmg () {
    return this._damageMax;
  }

  set hitChance (newChance) {
    this._hitChance = newChance;
  }

  get hitChance () {
    return this._hitChance;
  }

  set canBeUsedBy (newArr) {
    this._canbeUsedBy = newArr;
  }

  get canBeUsedBy () {
    return this._canbeUsedBy;
  }

  set dmgBonus (newBonus) {
    this._bonus = newBonus;
  }

  get dmgBonus () {
    return this._bonus;
  }

  get randomDamage () {
    return (
      this.dmgBonus +
      Math.floor(Math.random() * (this.maxDmg - this.minDmg + 1)) +
      this.minDmg
    );
  }

  willItHit () {
    return Math.random() * 100 < this.hitChance;
  }
}

class Sword extends Weapon {
  constructor () {
    super();
    this.minDmg = 8;
    this.maxDmg = 12;
    this.hitChance = 90;
    this.canBeUsedBy = [Warrior, Priest, Mage, Rouge, Archer];
  }
}

class Dagger extends Weapon {
  constructor () {
    super();
    this.minDmg = 4;
    this.maxDmg = 5;
    this.hitChance = 98;
    this.canBeUsedBy = [Rouge];
  }
}

class WarHammer extends Weapon {
  constructor () {
    super();
    this.minDmg = 10;
    this.maxDmg = 15;
    this.hitChance = 93;
    this.canBeUsedBy = [Priest];
  }
}

class BattleAxe extends Weapon {
  constructor () {
    super();
    this.minDmg = 12;
    this.maxDmg = 15;
    this.hitChance = 92;
    this.canBeUsedBy = [Warrior];
  }
}

class Bow extends Weapon {
  constructor () {
    super();
    this.minDmg = 7;
    this.maxDmg = 12;
    this.hitChance = 89;
    this.canBeUsedBy = [Archer];
  }
}

class Wand extends Weapon {
  constructor () {
    super();
    this.minDmg = 9;
    this.maxDmg = 15;
    this.hitChance = 97;
    this.canBeUsedBy = [Mage];
  }
}

const Abilities = Object.freeze({
  ArmourBoost: 'armourbonus',
  Dodge: 'dodge',
  FireStorm: 'firestorm',
  HeadShot: 'headshot',
  Heal: 'heal'
});

class Hero {
  _name;
  _hp;
  _maxHP;
  _ability;
  _armour;
  _evasion;
  _weapon = new Sword();
  _armourBonus = 0;
  _evasionBonus = 0;

  constructor (heroName) {
    this.name = heroName;
  }

  set name (newName) {
    this._name = newName;
  }

  get name () {
    return this._name;
  }

  set health (newHp) {
    this._hp = newHp;
  }

  get health () {
    return this._hp;
  }

  set maxHealth (newMax) {
    this._maxHP = newMax;
  }

  get maxHealth () {
    return this._maxHP;
  }

  set ability (newA) {
    this._ability = newA;
  }

  get ability () {
    return this._ability;
  }

  set armour (newArmour) {
    this._armour = newArmour;
  }

  get armour () {
    return this._armour;
  }

  set evasion (newEvasion) {
    this._evasion = newEvasion;
  }

  get evasion () {
    return this._evasion;
  }

  set weapon (wpn) {
    if (!(wpn instanceof Weapon)) {
      throw new Error('Object type is not a weapon!');
    }
    this._weapon = wpn;

    // incompatible weapon -> damage will be 0 when using this weapon
    if (!this._weapon.canBeUsedBy.includes(this.constructor)) {
      this.weapon.minDmg = 0;
      this.weapon.maxDmg = 0;
    }
  }

  get weapon () {
    return this._weapon;
  }

  set armourBonus (newBonus) {
    this._armourBonus = newBonus;
  }

  get armourBonus () {
    return this._armourBonus;
  }

  set evasionBonus (newBonus) {
    this._evasionBonus = newBonus;
  }

  get evasionBonus () {
    return this._evasionBonus;
  }

  printStats () {
    console.table([
      this._name,
      this._hp,
      this._ability,
      this._armour,
      this._evasion,
      this._weapon
    ]);
  }

  tryToUseAbility () {
    // 10% chance of success
    if (Math.random() < 0.9) {
      return;
    }

    switch (this._ability) {
      case Abilities.ArmourBoost:
        console.log(this.name + ' uses Armour Boost (+10 armour)!');
        this.armourBonus = 10;
        break;

      case Abilities.Dodge:
        console.log(this.name + ' uses Dodge(+100 evasion)!');
        this.evasionBonus = 100;
        break;

      case Abilities.FireStorm:
        console.log(this.name + ' uses FireStorm (+20 damage for weapon)!');
        this.weapon.dmgBonus = 20;
        break;

      case Abilities.HeadShot:
        console.log(this.name + ' uses HeadShot (+15 damage for weapon)!');
        this.weapon.dmgBonus = 15;
        break;

      case Abilities.Heal:
        console.log(this.name + ' uses Heal (+10 health)!');
        this.updateHealth(-10);
        break;

      default:
        console.log('Ability not defined');
    }
  }

  tryToEvade () {
    return Math.random() * 100 < this.evasion + this.evasionBonus;
  }

  // Positive numbers will deal damage, negative numbers will heal.
  updateHealth (delta) {
    // console.log("New health: " + Math.min(Math.max( this.health - delta,0), this.maxHealth) );
    this.health = Math.min(Math.max(this.health - delta, 0), this.maxHealth);
  }

  // Handle incoming damage. Returns final damage.
  handleDamage (dmg) {
    const finalDmg = dmg - Math.floor((this.armour + this.armourBonus) / 3);
    console.log('inflicting ' + finalDmg);
    this.updateHealth(finalDmg);
    return finalDmg;
  }

  tryToAttack (otherHero, table) {
    if (this.weapon === null) {
      throw new Error('Hero has no weapon to attack with!');
    }

    const hitSuccess = this.weapon.willItHit();
    const otherEvadeSuccess = otherHero.tryToEvade();
    if (hitSuccess && !otherEvadeSuccess) {
      table.RawDamage = this.weapon.randomDamage;
      table.HPloss = otherHero.handleDamage(table.RawDamage);
      table.HPEnd = otherHero.health;
      console.log('hit successful');
      return true;
    }
    console.log('hit missied');
    return false;
  }

  resetBonuses () {
    this.armourBonus = 0;
    this.evasionBonus = 0;

    if (this.weapon === null) {
      throw new Error('Hero has no weapon!');
    }

    this.weapon.dmgBonus = 0;
  }

  isAlive () {
    return this.health > 0;
  }
}

class Warrior extends Hero {
  constructor (heroName) {
    super();
    this.name = heroName;
    this.health = 100;
    this.maxHealth = 100;
    this.ability = Abilities.ArmourBoost;
    this.armour = 5;
    this.evasion = 20;
  }
}

class Priest extends Hero {
  constructor (heroName) {
    super();
    this.name = heroName;
    this.health = 70;
    this.maxHealth = 70;
    this.ability = Abilities.Heal;
    this.armour = 4;
    this.evasion = 20;
  }
}

class Mage extends Hero {
  constructor (heroName) {
    super();
    this.name = heroName;
    this.health = 70;
    this.maxHealth = 70;
    this.ability = Abilities.FireStorm;
    this.armour = 1;
    this.evasion = 5;
  }
}

class Rouge extends Hero {
  constructor (heroName) {
    super();
    this.name = heroName;
    this.health = 80;
    this.maxHealth = 80;
    this.ability = Abilities.Dodge;
    this.armour = 3;
    this.evasion = 30;
  }
}

class Archer extends Hero {
  constructor (heroName) {
    super();
    this.name = heroName;
    this.health = 80;
    this.maxHealth = 80;
    this.ability = Abilities.HeadShot;
    this.armour = 2;
    this.evasion = 15;
  }
}

class Arena {
  _hero1;
  _hero2;

  // 10% use ability kör elején mindkét félnek, csak utána jön az attack,stb
  // Hitreg: fegyver találati esély szerint eltalálhatja-e az ellenfelet, ha nem, akkor miss. Ha igen, akkor a megtámadott hős még kitérhet evade szerinti %-ban.
  // Találat ÉS sikertelen evade esetén a megtámadott ennyi sérülést szenved el: fegyver damage random in range - floor(heroArmor/3).

  generateHeroTable (hero) {
    if (!(hero instanceof Hero)) {
      throw new Error('Not a hero!');
    }

    const heroTable = { };
    heroTable.Attacker = false;
    heroTable.name = hero.name;
    heroTable.HPStart = hero.health;
    heroTable.HPEnd = hero.health;
    heroTable.RawDamage = 0;
    heroTable.HPloss = 0;

    return heroTable;
  }

  updateHeroTable (table, hero) {
    if (!(hero instanceof Hero)) {
      throw new Error('Not a hero!');
    }

    table.HPEnd = hero.health;
  }

  startRound(hero1,hero2){

  }

  tournament (hero1, hero2) {
    if (!(hero1 instanceof Hero) || !(hero2 instanceof Hero)) {
      throw new Error('Both arguments must be a valid hero!');
    }

    if (hero1.constructor == Hero || hero2.constructor == Hero){
      //throw new Error('Please select a valid class for the hero(es)!');
      console.log("Please select a valid class for the hero(es)!");
      return -1;
    }
    const self = this;
    console.log('Round start');

    hero1.tryToUseAbility();
    hero2.tryToUseAbility();

    const hero1table = this.generateHeroTable(hero1);
    const hero2table = this.generateHeroTable(hero2);

    if (Math.random() < 0.5) {
      hero1table.Attacker = true;
      hero1.tryToAttack(hero2, hero2table);
    } else {
      hero2table.Attacker = true;
      hero2.tryToAttack(hero1, hero1table);
    }

    const table = {};
    table.Hero1 = hero1table;
    table.Hero2 = hero2table;

    console.table(table);

    hero1.resetBonuses();
    hero2.resetBonuses();
    console.log('Round end\n\n');

    if (hero1.isAlive() && hero2.isAlive()) {
      return this.tournament(hero1,hero2);
    } else {
      const winner = hero1.isAlive() ? hero1 : hero2;
      console.log(winner.name + ' won!');

      return 1;
    }
  }
}

module.exports = {
  Arena,
  Abilities,
  Hero,
  Warrior,
  Priest,
  Mage,
  Rouge,
  Archer,
  Weapon,
  Sword,
  Dagger,
  WarHammer,
  BattleAxe,
  Bow,
  Wand
};
