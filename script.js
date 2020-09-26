class Subject {
    constructor() {
        this.x = innerHeight / 2;
        this.y = innerWidth / 2;
        this.src = "";
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    randomX() {
        this.x = Math.random() * (innerWidth * 0.9 - 10) + 10;
    }
    randomY() {
        this.y = Math.random() * (innerHeight * 0.7 - innerHeight * 0.65) + innerHeight * 0.65;
    }
    ImgLeft(img) {
        return this.x + img.width * 0.7;
    }
    ImgBot(img) {
        return this.y + img.height * 0.7;
    }
    startPosition() {
        this.x = innerHeight / 2;
        this.y = innerWidth / 2;
    }
}
class NPC extends Subject {
    constructor() {
        super();
        this.speed = 5;
        this.health = 5;
        this.damage = 1;
    }
    setName(name) {
        this.name = name;
    }
    printName(xName, yName) {
        ctx.font = "20px Times New Roman";
        ctx.fillStyle = "Green";
        ctx.fillText(this.name, xName, yName);
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    moveRight() {
        this.x += this.speed;
    }
    moveLeft() {
        this.x -= this.speed;
    }
    moveTop(y) {
        this.y--;
    }
    moveBot(y) {
        this.y++;
    }

}
class Evil extends NPC {

    printName() {
        ctx.font = "20px Times New Roman";
        ctx.fillStyle = "Red";
        ctx.fillText(this.name, innerWidth * 0.79, innerHeight * 0.05);
    }
    startPosition() {
        this.x = innerWidth * 0.7;
        this.y = innerHeight * 0.7;
    }

    moveEvil() {

        let moveEvilTimer = setTimeout(() => {

            if (this.x < hero.x) {
                this.x++;
                position = 1;
            } else if (this.x > hero.x) {
                position = 0;
                this.x--;
            } else {
                //добавить звук из разряда "а ну спускайся от туда"
            };
            if (PlayerWidth > this.x && hero.x < EvilWidth && PlayerHeight > this.y && hero.y < EvilHeight) {
                this.startPosition();
                hero.startPosition();
                hero.health--;
                atack_evil[lvl - 1].play();
            }
            if (hero.health == 0) {
                setTimeout(draw(), 100);
                return 0;
            }
            draw();
            this.moveEvil();
        }, 25);
    }
}
class Heroes extends NPC {
    constructor() {
        super();
        this.exp = 0;
        this.colorLogin = "Gold";
    }
    printName() {
        ctx.font = "20px Times New Roman";
        ctx.fillStyle = this.colorLogin;
        ctx.fillText(this.name, innerWidth * 0.12, innerHeight * 0.05);
    }
    startPosition() {
        this.x = 0;
        this.y = innerHeight * 0.7;
    }
}
class DemonHunter extends Heroes {
    constructor() {
        super();
        this.fury = 50;
    }

}
class deathKnight extends Evil {

}
class Demon extends Evil {
    startPosition() {
        this.x = innerWidth * 0.7;
        this.y = innerHeight * 0.65;
    }

}
class Watchers extends Evil {

}
//нахождение курсора
let cursorX;
let cursorY;
document.onmousemove = function (e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
}
//работа с канвой
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//создаем изображения
let playerRight = new Image(),
    playerLeft = new Image(),
    playerJumpRight = new Image(),
    playerJumpLeft = new Image(),
    playerStopRight = new Image(),
    playerStopLeft = new Image(),
    rare = new Image(),
    playerIcon = new Image(),
    playerSpellRight = new Image(),
    playerSpellLeft = new Image(),
    evil_lvl1_Left = new Image(),
    evil_lvl1_Right = new Image(),
    evil_lvl1_icon = new Image(),
    evil_lvl2_Left = new Image(),
    evil_lvl2_Right = new Image(),
    evil_lvl2_icon = new Image(),
    evil_lvl3_Left = new Image(),
    evil_lvl3_Right = new Image(),
    evil_lvl3_icon = new Image(),
    start = new Image(),
    lvl1 = new Image(),
    lvl2 = new Image(),
    lvl3 = new Image(),
    money = new Image();
//указываем путь к изображениям
playerRight.src = "./pic/hero/hero_right.png";
playerLeft.src = "./pic/hero/hero_left.png";
playerJumpRight.src = "./pic/hero/jump_right.png";
playerJumpLeft.src = "./pic/hero/jump_left.png";
playerStopRight.src = "./pic/hero/stop_right.png";
playerStopLeft.src = "./pic/hero/stop_left.png";
playerIcon.src = "./pic/hero/icon.png";
playerSpellRight.src = "./pic/hero/spell_right.png";
playerSpellLeft.src = "./pic/hero/spell_left.png";
rare.src = "./pic/evil/rare.png";
evil_lvl1_Left.src = "./pic/evil/lvl1/evil_left.png";
evil_lvl1_Right.src = "./pic/evil/lvl1/evil_right.png";
evil_lvl1_icon.src = "./pic/evil/lvl1/icon_v1_1.png";
evil_lvl2_Left.src = "./pic/evil/lvl2/evil_left.png";
evil_lvl2_Right.src = "./pic/evil/lvl2/evil_right.png";
evil_lvl2_icon.src = "./pic/evil/lvl2/icon.png";
evil_lvl3_Left.src = "./pic/evil/lvl3/evil_left.png";
evil_lvl3_Right.src = "./pic/evil/lvl3/evil_right.png";
evil_lvl3_icon.src = "./pic/evil/lvl3/icon.png";
start.src = "./pic/background/start.jpg";
lvl1.src = "./pic/background/lvl1.jpg";
lvl2.src = "./pic/background/lvl2.jpg";
lvl3.src = "./pic/background/lvl3.jpg";
money.src = "./pic/things/coint.png";
//создаем массив картинок
let background = [start, lvl1, lvl2, lvl3],
    player = [
        [playerStopLeft, playerStopRight],
        [playerLeft, playerRight],
        [playerJumpLeft, playerJumpRight]
    ],
    evil = [
        [evil_lvl1_Left, evil_lvl1_Right],
        [evil_lvl1_Left, evil_lvl1_Right],
        [evil_lvl2_Left, evil_lvl2_Right],
        [evil_lvl3_Left, evil_lvl3_Right]
    ],
    arrEvilIcon = [evil_lvl1_icon, evil_lvl1_icon, evil_lvl2_icon, evil_lvl3_icon],
    picSpell = [playerSpellLeft, playerSpellRight];
//музыка
let step = new Audio("sound./step.wav"),
    run = new Audio("sound./run.mp3"),
    radio = new Audio("./sound/start.mp3"),
    start_sound = new Audio("./sound/start_game.mp3"),
    radio_lvl1 = new Audio("./sound/lvl_1.mp3"),
    radio_lvl2 = new Audio("./sound/lvl_2.ogg"),
    radio_lvl3 = new Audio("./sound/lvl_3.ogg"),
    soundJump = new Audio("./sound/jump.mp3"),
    takeCoint = new Audio("./sound/coint.wav"),
    lvlUp = new Audio("./sound/lvlUp.ogg"),
    atack_evil_lvl1 = new Audio("./sound/evil/lvl_1/attack.mp3"),
    atack_evil_lvl2 = new Audio("./sound/evil/lvl_2/attack.ogg"),
    atack_evil_lvl3 = new Audio("./sound/evil/lvl_3/attack.mp3"),
    start_lvl3_sound = new Audio("./sound/lvl_3/start.mp3"),
    Hit_to_evil_lvl1 = new Audio("./sound/evil/lvl_1/Hit_to_evil.mp3"),
    Hit_to_evil_lvl2 = new Audio("./sound/evil/lvl_2/Hit_to_evil.ogg"),
    Hit_to_evil_lvl3 = new Audio("./sound/evil/lvl_3/Hit_to_evil.mp3");
//массивы звуков
atack_evil = [atack_evil_lvl1, atack_evil_lvl2, atack_evil_lvl3];
Hit_to_evil = [Hit_to_evil_lvl1, Hit_to_evil_lvl2, Hit_to_evil_lvl3];

//опеределение всех координат
let xEvil, yEvil, xLogin, yLogin;
let navigation = 0; //направление персонажа
let state = 0; //стоит, идет или прыгает?
let position = 0; //направление злодея
//стартовая позиция

let damage = 1; //нанесенный урон
let startGame = false;
let lvl = 0;


//прорисовка и закраска контуров
function drawPath(path, colorLine, Fill, stroke) {
    ctx.strokeStyle = colorLine;
    ctx.fillStyle = Fill;
    ctx.lineWidth = stroke;
    ctx.stroke(path);
    ctx.fill(path);
}

//пропорциональное изменение размеров
function img_change(img, percent) {

    if (img.height > img.width) {
        d = img.height / img.width;
        img.width = percent * innerWidth / 100;
        img.height = img.width * d;
    } else {
        d = img.width / img.height;
        img.height = percent * innerHeight / 100;
        img.width = img.height * d;
    }

}

let touchMoney = false;
let isJump = true;

//писать текст
function PrintText(word, size, color, fonts, x, y) {
    ctx.font = size + "px " + fonts;
    ctx.fillStyle = color;
    ctx.fillText(word, x, y);
}
//переменные для хранения левой и правой границы
let PlayerWidth, EvilWidth, moneyWidth, PlayerHeight,
    EvilHeight, moneyHeight;


let hero = new DemonHunter();



let Arthas = new deathKnight();



let Magtheridon = new Demon();



let Maiev = new Watchers();

let skull = new Subject();

function defaultPosition() {
    xEvil,
    yEvil,
    xLogin = innerWidth * 0.43;
    yLogin = innerHeight * 0.56;
    Arthas.setName("Артас");
    Magtheridon.setName("Магтеридон");
    Magtheridon.startPosition();
    Maiev.setName("Майев");
    Maiev.startPosition();
    skull.randomX();
    skull.randomY();
    hero.startPosition();
    Arthas.startPosition();
}

//задаем стартовые позиции
defaultPosition();


function draw() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    //выбираем в какую сторону поворачиваем персонажа
    let picPlayer = player[state][navigation],
        picEvil = evil[lvl][position],
        evilIcon = arrEvilIcon[lvl],
        picBackground = background[lvl];
    //масштабируем все картинки относительно размеров экрана
    if (state == 1) {
        img_change(picPlayer, 12);
    } else {
        img_change(picPlayer, 21);
    }
    if (lvl == 1) {
        img_change(picEvil, 10);
    } else if (lvl == 2) {
        img_change(picEvil, 26);
    } else if (lvl == 3) {
        img_change(picEvil, 16.3);
    }
    img_change(money, 5);
    //находим границы картинок

    PlayerWidth = hero.ImgLeft(picPlayer);
    PlayerHeight = hero.ImgBot(picPlayer);

    if (lvl == 1) {
        xEvil = Arthas.x;
        yEvil = Arthas.y;
        EvilWidth = Arthas.ImgLeft(picEvil);
        EvilHeight = Arthas.ImgBot(picEvil);
    } else if (lvl == 2) {
        xEvil = Magtheridon.x;
        yEvil = Magtheridon.y;
        EvilWidth = Magtheridon.ImgLeft(picEvil);
        EvilHeight = Magtheridon.ImgBot(picEvil);
    } else {
        xEvil = Maiev.x;
        yEvil = Maiev.y;
        EvilWidth = Maiev.ImgLeft(picEvil);
        EvilHeight = Maiev.ImgBot(picEvil);
    }


    skullWidth = skull.ImgLeft(money);
    skullHeight = skull.ImgBot(money);
    // 
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(picBackground, 0, 0, window.innerWidth, window.innerHeight);

    if (!startGame && lvl == 0) {

        //рисуем кнопку
        let button = new Path2D;

        function drawButton(color) {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.drawImage(picBackground, 0, 0, window.innerWidth, window.innerHeight);
            button.rect(xLogin, yLogin + innerHeight * 0.2, innerWidth * 0.15, -innerHeight * 0.05);
            drawPath(button, "rgb(110,105,105)", color, 3);
            PrintText("Login", 18, "#e3bf0b", "Bookman Old Style", xLogin + innerWidth * 0.055, yLogin + innerHeight * 0.185);
            PrintText("Аккаунт", 20, "#FFAE00", "Cooper", xLogin + innerWidth * 0.05, yLogin - innerHeight * 0.05);
            ctx.fillStyle = 'rgba(43,43,43,0.8)';
            ctx.fillRect(xLogin, yLogin + innerHeight * 0.0125, innerWidth * 0.15, -innerHeight * 0.05);
            ctx.strokeStyle = "rgba(192,192,192,0.8)";
            ctx.lineWidth = 2;
            ctx.strokeRect(xLogin, yLogin + innerHeight * 0.0125, innerWidth * 0.15, -innerHeight * 0.05);
            PrintText(login, 24, "Gray", "Cooper", xLogin, yLogin);
        }
        drawButton("#691111");
        //событие движения мышкой
        canvas.addEventListener('mousemove', function (event) {
            if (!startGame && lvl == 0) {
                if (ctx.isPointInPath(button, event.clientX, event.clientY)) {
                    //если двигаем внутри кнопки
                    drawButton("#7f1515");
                } else {
                    //если двигаем за пределами кнопки
                    drawButton("#691111");
                }
                if (start_sound.paused) {
                    radio.play();
                }
                PrintText("Login", 18, "#e3bf0b", "Bookman Old Style", xLogin + innerWidth * 0.055, yLogin + innerHeight * 0.185);
            }
        });
        //нажать на кнопку старт
        document.addEventListener('click', function (event) {
            if (!startGame && lvl == 0) {
                if (ctx.isPointInPath(button, event.clientX, event.clientY)) {
                    radio.pause();
                    start_sound.play();
                }
            }
        });
        setInterval(() => {
            if (start_sound.ended && lvl == 0) {
                radio.pause();
                lvl = 1;
                Arthas.startPosition();
                hero.startPosition();
                startGame = true;
                hero.setName(login);
                Arthas.moveEvil();
                draw();
                return;
            }
        }, 20);
    }
    if (startGame) {
        if (hero.exp < 5 && lvl == 1) {
            radio_lvl1.play();
            radio_lvl1.volume = 0.1;
        }
        if (hero.exp == 100 && lvl == 1 || lvl == 1 && hit == 5) {
            Magtheridon.moveEvil();
            hero.exp = 0;
            lvl = 2;
            lvlUp.play();
            damage = 1;
            hit = 0;
            radio_lvl1.pause();
            radio_lvl2.play();
            radio_lvl2.volume = 0.1;
        } else if (hero.exp == 100 && lvl == 2 || lvl == 2 && hit == 5) {
            hero.exp = 0;
            Maiev.moveEvil();
            lvl = 3;
            lvlUp.play();
            damage = 1;
            hit = 0;
            radio_lvl1.pause();
            radio_lvl2.pause();
            radio_lvl3.play();
            start_lvl3_sound.play();
        } else if (hero.exp == 100 && lvl == 3 || lvl == 3 && hit == 5) {
            return;
        }
        //заполнение шкалы опыта
        let exp = new Path2D;
        exp.rect(innerWidth * (0.02), innerHeight * 0.94, innerWidth * 0.0096 * hero.exp, innerHeight * 0.012);
        drawPath(exp, "darkviolet", "darkviolet", 0);

        // отрисовка шкалы опыта
        let expBar = new Path2D;
        ctx.strokeStyle = "rgb(110,105,105)";
        for (let i = 0; i < 24; i++) {
            expBar.rect(innerWidth * (0.02 + i * 0.04), innerHeight * 0.94, innerWidth * 0.04, innerHeight * 0.012);
        }
        ctx.stroke(expBar);
        //ВЫВОД ОПЫТА В ЦИФРАХ ПРИ НАВЕДЕНИЕ МЫШКИ
        if (ctx.isPointInPath(expBar, cursorX, cursorY)) {
            PrintText(hero.exp + "/100", 8, "black", "Arial Black", innerWidth * (0.5), innerHeight * 0.95);
        }

        //рисуем персонажа
        // контур имени
        let namePath = new Path2D;
        namePath.moveTo(innerWidth * 0.05, innerHeight * 0.015);
        namePath.lineTo(innerWidth * 0.23 - innerHeight * 0.01, innerHeight * 0.015);
        namePath.arc(innerWidth * 0.23 - innerHeight * 0.01, innerHeight * 0.025, innerHeight * 0.01, -Math.PI / 2, 0, false);
        namePath.lineTo(innerWidth * 0.23, innerHeight * 0.065);
        namePath.arc(innerWidth * 0.23 - innerHeight * 0.01, innerHeight * 0.065, innerHeight * 0.01, 0, Math.PI / 2, false)
        namePath.lineTo(innerWidth * 0.05, innerHeight * 0.075);
        namePath.lineTo(innerWidth * 0.05, innerHeight * 0.015);
        ctx.strokeStyle = "rgb(110,105,105)";
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        //namePath.rect(innerWidth * 0.05, innerHeight * 0.015, innerWidth * 0.18, innerHeight * 0.06);
        ctx.stroke(namePath);
        ctx.fill(namePath);
        //пишем имя
        hero.printName();
        //иконка игрока 
        img_change(playerIcon, 20);
        //здоровье
        let hpBar = new Path2D;
        hpBar.rect(innerWidth * 0.08, innerHeight * 0.075, innerWidth * 0.03 * hero.health, innerHeight * 0.03);
        ctx.fillStyle = "green";
        ctx.fill(hpBar)
        //ВЫВОД здоровья В ЦИФРАХ ПРИ НАВЕДЕНИЕ МЫШКИ
        if (ctx.isPointInPath(hpBar, cursorX, cursorY)) {
            PrintText(hero.health * 20 + "/100", 12, "black", "Arial Black", innerWidth * 0.14, innerHeight * 0.097);
        }
        //мана
        ctx.fillStyle = "DarkMagenta";
        ctx.strokeStyle = "Black";
        ctx.fillRect(innerWidth * 0.08, innerHeight * 0.105, innerWidth * 0.003 * hero.fury, innerHeight * 0.03);
        //их контура
        ctx.strokeRect(innerWidth * 0.08, innerHeight * 0.075, innerWidth * 0.15, innerHeight * 0.03);
        ctx.strokeRect(innerWidth * 0.08, innerHeight * 0.105, innerWidth * 0.15, innerHeight * 0.03);
        //вход/выход режим боя
        if (hero.health < 5) {
            hero.colorLogin = "Red";
        } else {
            hero.colorLogin = "Gold";
        }

        ctx.drawImage(playerIcon, 0, 0, playerIcon.width, playerIcon.height);

        //рисуем уровень персонажа
        let circle = new Path2D();
        circle.arc(innerWidth * 0.02, innerHeight * 0.12, innerHeight * innerWidth * 0.00002, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill(circle);
        ctx.stroke(circle);
        PrintText(lvl, 16, "black", "Broadway", innerWidth * 0.016, innerHeight * 0.128);

        ctx.drawImage(picPlayer, hero.x, hero.y, picPlayer.width, picPlayer.height);

        //рисуем иконку и имя злодея
        if (lvl == 1) {
            Arthas.printName();
            img_change(rare, 21);
            img_change(evilIcon, 15);
        }
        if (lvl == 2) {
            Magtheridon.printName();
            img_change(rare, 21);
            img_change(evilIcon, 8);
        }
        if (lvl == 3) {
            Maiev.printName();
            img_change(rare, 21);
            img_change(evilIcon, 14);
        }
        // контур имени злодея
        nameEvilPath = new Path2D;
        nameEvilPath.moveTo(innerWidth - evilIcon.width, innerHeight * 0.015);
        nameEvilPath.lineTo(innerWidth * 0.86 + innerHeight * 0.01 - evilIcon.width, innerHeight * 0.015);
        nameEvilPath.arc(innerWidth * 0.86 + innerHeight * 0.01 - evilIcon.width, innerHeight * 0.025, innerHeight * 0.01, -Math.PI / 2, Math.PI, true);
        nameEvilPath.lineTo(innerWidth * 0.86 - evilIcon.width, innerHeight * 0.065);
        nameEvilPath.arc(innerWidth * 0.86 + innerHeight * 0.01 - evilIcon.width, innerHeight * 0.065, innerHeight * 0.01, Math.PI, Math.PI / 2, true);
        nameEvilPath.lineTo(innerWidth - evilIcon.width, innerHeight * 0.075);
        nameEvilPath.lineTo(innerWidth - evilIcon.width, innerHeight * 0.015);
        ctx.strokeStyle = "rgb(110,105,105)";
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fill(nameEvilPath);
        ctx.stroke(nameEvilPath);
        //здоровье злодея
        ctx.fillStyle = "green";
        ctx.fillRect(innerWidth * 0.86 * damage - evilIcon.width, innerHeight * 0.075, innerWidth * 0.15 - innerWidth * 0.86 * (-1 + damage), innerHeight * 0.03);
        //мана злодея
        ctx.fillStyle = "blue";
        ctx.fillRect(innerWidth * 0.86 - evilIcon.width, innerHeight * 0.105, innerWidth * 0.15, innerHeight * 0.03);
        ctx.rect(innerWidth * 0.86 - evilIcon.width, innerHeight * 0.075, innerWidth * 0.15, innerHeight * 0.06);
        ctx.stroke();
        //иконка злодея
        ctx.drawImage(evilIcon, innerWidth - rare.width * 0.9, innerHeight * 0.01, evilIcon.width, evilIcon.height);
        ctx.drawImage(rare, innerWidth - rare.width, 0, rare.width, rare.height);
        //спрайт злодея
        if (lvl == 1) {
            ctx.drawImage(picEvil, Arthas.x, Arthas.y, picEvil.width, picEvil.height);
        } else if (lvl == 2) {
            ctx.drawImage(picEvil, Magtheridon.x, Magtheridon.y, picEvil.width, picEvil.height);
        } else if (lvl == 3) {
            ctx.drawImage(picEvil, Maiev.x, Maiev.y, picEvil.width, picEvil.height);
        }

        if (hero.health == 0) {
            startGame = false;
            step.pause();
            run.pause();
            radio_lvl1.pause();
            radio_lvl2.pause();
            //кнопка выйти из тела
            setTimeout(() => {
                let path = new Path2D;
                path.rect(innerWidth * 0.375, innerHeight * 0.235, innerWidth * 0.25, innerHeight * 0.115);
                drawPath(path, "#6e6969", "rgba(43,43,43,0.6)", 6);
                PrintText("Вы умерли", 16, "rgba(255,255,255 ,0.7)", "Times New Roman", innerWidth * 0.472, innerHeight * 0.262);
                PrintText("Перенестись на ближайшее кладбище?", 16, "rgba(255,255,255 ,0.7)", "Times New Roman", innerWidth * 0.3985, innerHeight * 0.283);
                let buttonDeath = new Path2D;
                buttonDeath.rect(innerWidth * 0.45, innerHeight * 0.308, innerWidth * 0.1, innerHeight * 0.025);
                drawPath(buttonDeath, "rgb(110,105,105)", "#691111", 3);
                PrintText("Покинуть тело", 16, "#e3bf0b", "Bahnschrift", innerWidth * 0.4615, innerHeight * 0.329);
                document.addEventListener('click', function (event) {
                    if (ctx.isPointInPath(buttonDeath, event.clientX, event.clientY)) {
                        hero.health = 5;
                        hero.startPosition();
                        Arthas.startPosition();
                        Magtheridon.startPosition();
                        Maiev.startPosition();

                        startGame = true;
                        if (lvl == 1) {
                            Arthas.moveEvil();
                        }
                        if (lvl == 2) {
                            Magtheridon.moveEvil();
                        }
                        if (lvl == 3) {
                            Maiev.moveEvil();
                        }
                        draw();
                    }
                });
            }, 250);
        }

        //рисуем монетки
        if (!touchMoney) {
            ctx.drawImage(money, skull.x, skull.y, money.width, money.height);
        }
        if (PlayerWidth > skull.x && hero.x < skullWidth && PlayerHeight > skull.y && hero.y < skullHeight) {

            skull.randomX()
            skull.randomY();
            if (hero.fury < 50) {
                hero.fury += 10;
            }
            if (lvl == 1) {
                hero.exp += 20;
            }
            if (lvl == 2) {
                hero.exp += 10;
            } else if (lvl == 3) {
                hero.exp += 5;
            }
            takeCoint.play();
            step.pause();
            run.pause();
        }
    }

}
step.oncanplaythrough = run.oncanplaythrough = radio.oncanplaythrough = start_sound.oncanplaythrough = radio_lvl1.oncanplaythrough = radio_lvl2.oncanplaythrough = radio_lvl3.oncanplaythrough = soundJump.oncanplaythrough = takeCoint.oncanplaythrough = lvlUp.oncanplaythrough = atack_evil_lvl1.oncanplaythrough = atack_evil_lvl2.oncanplaythrough = atack_evil_lvl3.oncanplaythrough = start_lvl3_sound.oncanplaythrough = Hit_to_evil_lvl1.oncanplaythrough = Hit_to_evil_lvl2.oncanplaythrough = Hit_to_evil_lvl3.oncanplaythrough = playerRight.onload = playerLeft.onload = playerJumpRight.onload = playerJumpLeft.onload = playerStopRight.onload = playerStopLeft.onload = rare.onload = playerIcon.onload = playerSpellRight.onload = playerSpellLeft.onload = evil_lvl1_Left.onload = evil_lvl1_Right.onload = evil_lvl1_icon.onload = evil_lvl2_Left.onload = evil_lvl2_Right.onload = evil_lvl2_icon.onload = evil_lvl3_Left.onload = evil_lvl3_Right.onload = evil_lvl3_icon.onload = start.onload = lvl1.onload = lvl2.onload = lvl3.onload = money.onload = draw;

//управление персонажем

let isCast = false;
document.addEventListener('keydown', (event) => {
    if (startGame) {
        let picPlayer = player[state][navigation];
        let KeyPress = event.key;
        if (event.code == "KeyA") {
            if (!isCast && hero.fury > 10) {
                isCast = true;
                castSpell(navigation, hero.x, hero.y + picPlayer.height / 2);
                hero.fury -= 10;
            }
        }
        switch (KeyPress) {
            case 'ArrowRight': {
                if (PlayerWidth < innerWidth) {
                    hero.moveRight();
                    navigation = 1;
                    if (hero.y == innerHeight * 0.7) {
                        state = 1;
                    }
                    draw();
                }
                if (hero.exp == 0) {
                    step.play();
                } else {
                    if (takeCoint.ended) {
                        step.play();
                    } else {
                        step.pause();
                    }

                }
                break;
            }

            case 'ArrowLeft': {
                if (PlayerWidth > player[state][navigation].width) {
                    hero.moveLeft();
                    navigation = 0;
                    if (hero.y == innerHeight * 0.7) {
                        state = 1;
                    }
                    draw();
                }
                if (hero.exp == 0) {
                    step.play();
                } else {
                    if (takeCoint.ended) {
                        step.play();
                    } else {
                        step.pause();
                    }
                }
                break;
            }
            case 'Shift': {
                hero.setSpeed(15);
                step.play();
                run.play();
                run.volume = 0.25;
                break;
            }
            default: {
                step.pause();
            }
        }
    }
});


//переменные под логин пароль
let login = "",
    password = "";
//события после отпускания клавиши
document.addEventListener('keyup', (event) => {
    let KeyPress = event.key;
    if (!startGame && lvl == 0) {
        if (KeyPress.length < 2) {
            login = login + KeyPress;
        } else if (KeyPress == 'Backspace') {
            login = login.slice(0, -1);
        }

        draw();
        PrintText(login, 24, "Gray", "Cooper", xLogin, yLogin);
    }
    if (startGame) {
        switch (KeyPress) {
            case 'ArrowRight': {
                if (hero.y == innerHeight * 0.7) {
                    state = 0;
                }
                step.pause();
                draw();
                break;
            }
            case 'ArrowLeft': {
                if (hero.y == innerHeight * 0.7) {
                    state = 0;
                }
                step.pause();
                draw();
                break;
            }
            //прыжок
            case 'ArrowUp': {
                state = 2;
                if (isJump) {
                    soundJump.play();
                    isJump = false;
                    jumpUp();
                }

                function jumpUp() {
                    {
                        setTimeout(function () {
                            if (hero.y > innerHeight * 0.4) {
                                hero.moveTop();
                            } else {
                                jumpDown();
                                return;
                            }
                            draw();
                            jumpUp();
                        }, 5);
                    }
                }

                function jumpDown() {
                    {
                        setTimeout(function () {
                            if (hero.y < innerHeight * 0.7) {
                                hero.moveBot();
                            } else if (hero.y > innerHeight * 0.7) {
                                hero.moveTop();
                            } else {
                                state = 0;
                                soundJump.pause();
                                isJump = true;
                                draw();
                                return;
                            }
                            draw();
                            jumpDown();
                        }, 5);
                    }
                }
                break;
            }
            case 'Shift': {
                hero.setSpeed(2);
                step.pause();
                run.pause();
                break;
            }
        }
    }
});
let i = 0;
let hit = 0;
//каст заклинания
let ChaosBolt = new Subject;

function castSpell(LoR, x, y) {
    ChaosBolt.setX(x);
    ChaosBolt.setY(y);
    let Spell = picSpell[LoR];
    img_change(Spell, 5);
    let SpellWidth = ChaosBolt.ImgLeft(Spell),
        SpellHeight = ChaosBolt.ImgBot(Spell);
    setTimeout(function () {
        if (startGame) {
            if (LoR == 0) {
                ChaosBolt.x--;
            } else {
                ChaosBolt.x++;
            }
            ctx.drawImage(Spell, ChaosBolt.x + i, ChaosBolt.y, Spell.width, Spell.height);
            if (x + i >= innerWidth || x < 0) {
                isCast = false;
                return;
            }
            if (SpellWidth > xEvil && ChaosBolt.x < EvilWidth && SpellHeight > yEvil && ChaosBolt.y < EvilHeight) {
                damage += 0.035;
                hit++;
                Hit_to_evil[lvl - 1].pause();
                Hit_to_evil[lvl - 1].currentTime = 0.0;
                Hit_to_evil[lvl - 1].play();
                isCast = false;
                return;
            }
            castSpell(LoR, ChaosBolt.x, ChaosBolt.y);
        }
    }, 5)
}

window.addEventListener(`resize`, event => {
    defaultPosition();
    draw();
}, false);