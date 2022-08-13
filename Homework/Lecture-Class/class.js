function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Weapon {
  constructor(type, name, level, minDamage, maxDamage, speed) {
    this._type = type;
    this.name = name;
    this.level = level;
    this.damage = {
      min: minDamage,
      max: maxDamage,
    };
    this.speed = speed;
  }
  getInfo() {
    return console.log(
      `name: ${this.name} \ntype: ${this.type} \nLevel: ${this.level}\ndamage: ${this.damage.min} - ${this.damage.max} \nspeed ${this.speed}`
    );
  }
  level1Up() {
    console.log("Работает");
  }
}

class RangeWeapon extends Weapon {
  constructor(
    type,
    name,
    level,
    minDamage,
    maxDamage,
    speed,
    range,
    totalammo,
    currentammo
  ) {
    super(type, name, level, minDamage, maxDamage, speed);
    this.range = range;
    this.ammo = {
      total: totalammo,
      current: currentammo,
    };
  }
  fillAmmo() {
    this.ammo.current = this.ammo.total;
    console.log(
      `Боеприпасы были перезаряжены!\nТеперь у вас есть: ${this.ammo.current} /${this.ammo.total} патронов`
    );
  }

  getInfo() {
    const temp = super.getInfo();
    return `${temp}range: ${this.range}\nammo: ${this.ammo.current}/${this.ammo.total}`;
  }

  attack() {
    const chance = Math.random();
    if (this.ammo.current === 0) {
      return console.log("Вы получили 0 урона: пополните боеприпасы");
    }
    if (chance <= 0.3) {
      this.ammo.current -= 1;
      return console.log("Промах!!!");
    } else {
      this.ammo.current -= 1;
      return console.log(
        `Успех!!! Ты получил ${getRandomNumber(
          this.damage.min,
          this.damage.max
        )} урона!`
      );
    }
  }
}

class Crossbow extends RangeWeapon {
  constructor(
    type,
    name,
    level,
    minDamage,
    maxDamage,
    speed,
    range,
    totalammo,
    currentammo
  ) {
    super(
      type,
      name,
      level,
      minDamage,
      maxDamage,
      speed,
      range,
      totalammo,
      currentammo
    );
  }
  level1Up() {
    // super.level1Up();
    this._speed -= 23;
    if (this.level % 2 === 0) {
      this.damage.max += 2;
    }
    if (this.level % 2 !== 0) {
      this.damage.min += 1;
    }
  }
}

class Bow extends RangeWeapon {
  constructor(
    type,
    name,
    level,
    minDamage,
    maxDamage,
    speed,
    range,
    totalammo,
    currentammo
  ) {
    super(
      type,
      name,
      level,
      minDamage,
      maxDamage,
      speed,
      range,
      totalammo,
      currentammo
    );
  }

  level1Up() {
    super.level1Up();
    this.speed -= 15;
    if (this.level % 2 === 0) {
      this.damage.max += 3;
    }
    if (this.level % 2 !== 0) {
      this.damage.min += 2;
    }
  }
}

class MeleeWeapon extends Weapon {
  constructor(
    type,
    name,
    level,
    radius,
    maxDamage,
    minDamage,
    totalDurability,
    currentDurability,
    speed
  ) {
    super(type, name, level, minDamage, maxDamage, speed);
    this.radius = radius;
    this.durability = {
      total: totalDurability,
      current: currentDurability,
    };
  }
}

class Sword extends MeleeWeapon {
  constructor(
    type,
    name,
    level,
    radius,
    minDamage,
    maxDamage,
    totalDurability,
    currentDurability,
    speed
  ) {
    super(
      type,
      name,
      level,
      radius,
      minDamage,
      maxDamage,
      totalDurability,
      currentDurability,
      speed
    );
  }
  level1Up() {
    super.level1Up();
    this.speed -= 20;
    if (this.level % 2 === 0) {
      this.damage.max += 3;
    }
    if (this.level % 2 !== 0) {
      this.damage.min += 3;
    }
  }
}

class Axe extends MeleeWeapon {
  constructor(
    type,
    name,
    level,
    radius,
    minDamage,
    maxDamage,
    totalDurability,
    currentDurability,
    speed
  ) {
    super(
      type,
      name,
      level,
      radius,
      minDamage,
      maxDamage,
      totalDurability,
      currentDurability,
      speed
    );
  }
  level1Up() {
    super.level1Up();
    this.speed -= 15;
    if (this.level + 1) {
      this.damage.max += 2;
    }
    if (this.level + 1) {
      this.damage.min += 1;
    }
  }
}

class Spear extends MeleeWeapon {
  constructor(
    type,
    name,
    level,
    radius,
    minDamage,
    maxDamage,
    totalDurability,
    currentDurability,
    speed
  ) {
    super(
      type,
      name,
      level,
      radius,
      minDamage,
      maxDamage,
      totalDurability,
      currentDurability,
      speed
    );
  }
  level1Up() {
    super.level1Up();
    this.speed -= 18;
    if (this.level + 1) {
      this.damage.max += 3;
    }
    if (this.level + 1) {
      this.damage.min += 0;
    }
  }
}

const bow = new Bow(
  "Bow",
  "Лук справедливости",
  1,
  10,
  16,
  1000,
  500,
  20,
  20,
  50,
  50
);
const crossBow = new Crossbow(
  "CrossBow",
  "Арбалет победы",
  1,
  15,
  20,
  800,
  500,
  5,
  5,
  50,
  50
);

const spear = new Spear("Spear", "Убийца Короля", 1, 500, 18, 12, 50, 50, 900);
const axe = new Axe("Axe", "Топор войны", 1, 400, 22, 16, 50, 50, 820);
const sword = new Sword(
  "Sword",
  "Меч Короля Далиафа",
  1,
  350,
  10,
  16,
  50,
  50,
  1000
);
console.log(bow);
console.log(sword);
console.log(spear);
console.log(axe);
console.log(crossBow);

// console.log(spearobj.level1Up)

crossBow.level1Up();
