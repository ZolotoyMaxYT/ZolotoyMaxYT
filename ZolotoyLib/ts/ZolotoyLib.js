"use strict";
/*
 *  ---------------------
 *  < Русский / Russian ]:
 *  Библиотека создана и собрана ZolotoyMaxYT
 *  Используйте её бесплатно!
 *  ------------------------
 *  < Английский / English ]:
 *  Library made by ZolotoyMaxYT
 *  Use this free!
 */
/**
 * Библиотека ZolotoyLib
 * * Расширенные функции js (`JSFunctions`)
 * * Классы для удобной работы (`JSClasses`)
 * * Расширенные функции для dom (`Dompp`)
 * * Создание ввода dom (`Dompp.Inputs`)
 * * Класс DragAndDrop для dom (`Dompp.DragAndDrop`)
 * * Класс для создания окна (`CustomWindow`)
 */
var ZolotoyLib;
(function (ZolotoyLib) {
    // <code>
    //#region jsfunctions.ts
    let JSFunctions;
    (function (JSFunctions) {
        function getValue(obj, key, type) {
            return obj[key];
        }
        JSFunctions.getValue = getValue;
        function getValueInstanceof(obj, key, type) {
            return obj[key];
        }
        JSFunctions.getValueInstanceof = getValueInstanceof;
        function createObject(types) {
            return {};
        }
        JSFunctions.createObject = createObject;
        function typedObject(obj, types) {
            return obj;
        }
        JSFunctions.typedObject = typedObject;
        function setValue(obj, key, value) {
            obj[key] = value;
        }
        JSFunctions.setValue = setValue;
        // Array
        (function () {
            Array.prototype.clear = function () {
                this.splice(0, this.length);
                return this;
            };
            Array.prototype.add = function (value, index) {
                if (index < 0) {
                    this.unshift(value);
                }
                else if (index >= this.length) {
                    this.push(value);
                }
                else {
                    this.splice(index, 0, value);
                }
                return this;
            };
            Array.prototype.lastIndex = function () {
                if (this.length > 0) {
                    return this.length - 1;
                }
                return 0;
            };
            Array.prototype.remove = function (index) {
                if (index < 0) {
                    this.shift();
                }
                else if (index >= this.length) {
                    this.pop();
                }
                else {
                    this.splice(index, 1);
                }
                return this;
            };
            Array.prototype.getIndex = function (value, type) {
                let result = [];
                Cicles.Foreach((v, i) => {
                    if (v === value) {
                        result.push(i);
                    }
                    return true;
                }, this);
                if (type === 'first') {
                    return result[0];
                }
                else if (type === 'last') {
                    return result[result.lastIndex()];
                }
                return null;
            };
            Array.prototype.getAllIndexs = function (value) {
                let result = [];
                Cicles.Foreach((v, i) => {
                    if (v === value) {
                        result.push(i);
                    }
                    return true;
                }, this);
                return result;
            };
            Array.hasOnlyInstanceof = function (arr, types) {
                if (Array.isArray(arr)) {
                    let results = true;
                    arr.forEach((value, index) => {
                        types.forEach((type) => {
                            if (!(value instanceof type) && results) {
                                results = false;
                                return;
                            }
                        });
                        if (results === false) {
                            return;
                        }
                    });
                    if (results) {
                        return true;
                    }
                }
                return false;
            };
            Array.hasOnlyTypeof = function (arr, types) {
                if (Array.isArray(arr)) {
                    let results = true;
                    arr.forEach((value, index) => {
                        types.forEach((type) => {
                            if (!(typeof (value) == typeof (type)) && results) {
                                results = false;
                                return;
                            }
                        });
                        if (results === false) {
                            return;
                        }
                    });
                    if (results) {
                        return true;
                    }
                }
                return false;
            };
        })();
        // Object
        (function () {
            Object.getKey = function (obj, value, type) {
                if (typeof obj === 'object') {
                    let result = [];
                    Cicles.ForObject((v, k) => {
                        if (v === value) {
                            result.push(k);
                        }
                        return true;
                    }, obj);
                    if (type === 'first') {
                        return result[0];
                    }
                    else if (type === 'last') {
                        return result[result.lastIndex()];
                    }
                }
                return null;
            };
            Object.getAllKey = function (obj, value) {
                if (typeof obj === 'object') {
                    let result = [];
                    Cicles.ForObject((v, k) => {
                        if (v === value) {
                            result.push(k);
                        }
                        return true;
                    }, obj);
                    return result;
                }
                return null;
            };
            Object.hasOnlyTypeof = function (obj, types) {
                if (typeof obj === 'object') {
                    let result = true;
                    Cicles.ForObject((v, k) => {
                        if (result) {
                            let has = [];
                            Cicles.Foreach((val, ind) => {
                                has.push(typeof val === typeof v);
                                return true;
                            }, types);
                            result = (has.indexOf(true) === -1);
                            return true;
                        }
                        return false;
                    }, obj);
                    return result;
                }
                return false;
            };
            Object.hasOnlyInstanceof = function (obj, types) {
                if (typeof obj === 'object') {
                    let result = true;
                    Cicles.ForObject((v, k) => {
                        if (result) {
                            let has = [];
                            Cicles.Foreach((val, ind) => {
                                has.push(v instanceof val);
                                return true;
                            }, types);
                            result = (has.indexOf(true) === -1);
                            return true;
                        }
                        return false;
                    }, obj);
                    return result;
                }
                return false;
            };
        })();
        // Number
        (function () {
            Number.is = function (num, options) {
                if (typeof num !== 'number') {
                    return typeof num == 'number';
                }
                else if (options.indexOf('+') === -1 && num > 0) {
                    return false;
                }
                else if (options.indexOf('-') === -1 && num < 0) {
                    return false;
                }
                else if (options.indexOf('0') === -1 && num === 0) {
                    return false;
                }
                else if (options.indexOf('+infinity') === -1 && num === Infinity) {
                    return false;
                }
                else if (options.indexOf('-infinity') === -1 && num === -Infinity) {
                    return false;
                }
                else if (options.indexOf('NaN') === -1 && this.isNaN(num)) {
                    return false;
                }
                return true;
            };
            Math.toRange = function (...args) {
                let value = 0;
                let min = 0;
                let max = 1;
                if (Number.is(args[0], ['0', '+', '-']) && Number.is(args[1], ['0', '+', '-']) && Number.is(args[2], ['0', '+', '-'])) {
                    value = args[0];
                    min = args[1];
                    max = args[2];
                }
                else if (Number.is(args[0], ['0', '+', '-']) && Number.is(args[1], ['0', '+', '-'])) {
                    value = args[0];
                    max = args[1];
                }
                else if (Number.is(args[0], ['0', '+', '-'])) {
                    value = args[0];
                }
                if (min > max) {
                    let a = max;
                    max = min;
                    min = a;
                }
                else if (min === max) {
                    console.error('Минимальное значение не может быть равень большему');
                    return false;
                }
                if (value > max) {
                    value = max;
                }
                else if (value < min) {
                    value = min;
                }
                return value;
            };
            Math.toRoot = function (x, n = 2) {
                if (x < 0 && n % 2 === 1)
                    return -Math.pow(-x, 1 / n);
                else
                    return Math.pow(x, 1 / n);
            };
        })();
        // HTML
        (function () {
            HTMLElement.prototype.styled = function (styles) {
                if (typeof styles === 'object') {
                    for (const key in styles) {
                        if (Object.prototype.hasOwnProperty.call(styles, key)) {
                            const value = getValue(styles, key, ['']);
                            if (Object.prototype.hasOwnProperty.call(this.style, key)) {
                                setValue(this.style, key, value);
                            }
                        }
                    }
                }
                return this;
            };
            HTMLElement.prototype.getHitbox = function () {
                let { left, right, top, bottom } = this.getBoundingClientRect();
                return {
                    x: left + window.scrollX,
                    y: top + window.scrollY,
                    width: right - left + window.scrollX,
                    height: bottom - top + window.scrollY,
                    left: left + window.scrollX,
                    top: top + window.scrollY,
                    right: right + window.scrollX,
                    bottom: bottom + window.scrollY,
                };
            };
        })();
        JSFunctions.operator = function (...args) {
            let numbers = [];
            let op = '+';
            let defoult = 0;
            let result = 0;
            if (Number.is(args[0], ['+', '-', '0']) && Number.is(args[2], ['+', '-', '0']) &&
                JSFunctions.operator.f.isOperator(args[1]) && Number.is(args[3], ['+', '-', '0'])) {
                numbers = [args[0], args[2]];
                op = args[1];
                defoult = args[3];
            }
            else if (Number.is(args[0], ['+', '-', '0']) && Number.is(args[2], ['+', '-', '0']) &&
                JSFunctions.operator.f.isOperator(args[1])) {
                numbers = [args[0], args[2]];
                op = args[1];
                defoult = 0;
            }
            else if (Array.isArray(args[0]) && Array.hasOnlyTypeof(args[0], [0]) &&
                JSFunctions.operator.f.isOperator(args[1]) && Number.is(args[2], ['+', '-', '0'])) {
                numbers = args[0];
                op = args[1];
                defoult = args[2];
            }
            else if (Array.isArray(args[0]) && Array.hasOnlyTypeof(args[0], [0]) &&
                JSFunctions.operator.f.isOperator(args[1])) {
                numbers = args[0];
                op = args[1];
                defoult = 0;
            }
            else {
                return NaN;
            }
            if (op === '+') {
                numbers.forEach(number => {
                    try {
                        result += number;
                    }
                    catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            }
            else if (op === '-') {
                numbers.forEach(number => {
                    try {
                        result -= number;
                    }
                    catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            }
            else if (op === '*') {
                numbers.forEach(number => {
                    try {
                        result *= number;
                    }
                    catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            }
            else if (op === '/') {
                numbers.forEach(number => {
                    try {
                        result /= number;
                    }
                    catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            }
            else if (op === '^') {
                numbers.forEach(number => {
                    try {
                        result = Math.pow(result, number);
                    }
                    catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            }
            else if (op === '&') {
                numbers.forEach(number => {
                    try {
                        result = Math.toRoot(result, number);
                    }
                    catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            }
            return NaN;
        };
        JSFunctions.operator.f = {
            isOperator(operator) {
                return (operator === '+' || operator === '-' ||
                    operator === '*' || operator === '/' ||
                    operator === '^' || operator === '&');
            }
        };
        let Cicles;
        (function (Cicles) {
            Cicles.Repeat = function (func = (x) => true, ...args) {
                if (typeof func === 'function' && typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number') {
                    for (let x = args[0]; x < args[1]; x += args[2]) {
                        if (!func(x)) {
                            break;
                        }
                    }
                }
                else if (typeof func === 'function' && typeof args[0] === 'number' && typeof args[1] === 'number') {
                    for (let x = args[0]; x < args[1]; x += 1) {
                        if (!func(x)) {
                            break;
                        }
                    }
                }
                else if (typeof func === 'function' && typeof args[0] === 'number') {
                    for (let x = 0; x < args[0]; x += 1) {
                        if (!func(x)) {
                            break;
                        }
                    }
                }
                else if (typeof func === 'function') {
                    for (let x = 0; x < 10; x += 1) {
                        if (!func(x)) {
                            break;
                        }
                    }
                }
            };
            /**
             * Повторять пока `func` возвращает `true`
             */
            Cicles.While = function (func = () => true) {
                while (func()) { }
            };
            /**
             * Пройтись по `array` и выполнить `func`, пока возвращает `true`
             */
            Cicles.Foreach = function (func, array) {
                if (Array.isArray(array)) {
                    let run = true;
                    array.forEach((value, index) => {
                        if (run) {
                            run = func(value, index);
                        }
                    });
                }
            };
            /**
             * Пройтись по `object` и выполнить `func`, пока возвращает `true`
             */
            Cicles.ForObject = function (func, object) {
                if (typeof object === 'object') {
                    let run = true;
                    for (const key in object) {
                        if (run && Object.prototype.hasOwnProperty.call(object, key)) {
                            const value = object[key];
                            run = func(value, key);
                        }
                    }
                }
            };
            Cicles.ForString = function (func, str) {
                if (typeof str !== 'string') {
                    str = String(str);
                }
                for (let x = 0; x < str.length; x++) {
                    const word = str[x];
                    if (!func(word, x)) {
                        break;
                    }
                }
            };
        })(Cicles = JSFunctions.Cicles || (JSFunctions.Cicles = {}));
    })(JSFunctions = ZolotoyLib.JSFunctions || (ZolotoyLib.JSFunctions = {}));
    //#endregion
    //#region jsclasses.ts 
    let JSClasses;
    (function (JSClasses) {
        /**
         * Работа с углами
         */
        JSClasses.Angle = {
            /**
             * Градусы в радианы
             */
            toRadians(angle) {
                return (Math.PI / 180) * angle;
            },
            /**
             * Радианы в градусы
             */
            toAngle(radians) {
                return (radians / Math.PI) * 180;
            }
        };
        /**
         * Класс вектора, может использоваться для:
         *  * координат,
         *  * направления,
         *  * двух значений
         */
        class Vector2 {
            constructor(x = 0, y = 0) {
                this._x = 0;
                this._y = 0;
                this._setX(x);
                this._setY(y);
            }
            /**
             * Координата x
             */
            get x() {
                return this._x;
            }
            set x(v) {
                this._setX(v);
            }
            /**
             * Координата y
             */
            get y() {
                return this._y;
            }
            set y(v) {
                this._setY(v);
            }
            /**
             * Задать новое значение `v` для координаты x
             */
            _setX(x) {
                if (Number.is(x, ["0", '+', '-'])) {
                    this._x = x;
                    return true;
                }
                return false;
            }
            /**
             * Задать новое значение `v` для координаты y
             */
            _setY(y) {
                if (Number.is(y, ["0", '+', '-'])) {
                    this._y = y;
                    return true;
                }
                return false;
            }
            /**
             * Повернуть направление в градусах
             * * Направление
             * @returns Себя
             */
            d_rotateTo(angle) {
                let x = this._x + Math.cos(angle * (Math.PI / 180));
                let y = this._y + Math.sin(angle * (Math.PI / 180));
                this._setX(x);
                this._setY(y);
                return this;
            }
            /**
             * Получить направление в градусах
             * * Направление
             * @returns Себя
             */
            d_getAngle() {
                return Math.acos(this._x) / Math.PI * 180;
            }
            /**
             * Нормализировать направление (преобразовать в значения между -1 и 1)
             * * Направление
             * @returns Себя
             */
            d_normalize() {
                let speed = Math.abs(this._x) + Math.abs(this._y);
                this._x /= speed;
                this._y /= speed;
                return this;
            }
            /**
             * Задать скорости направление (Умножить значения между -1 и 1 на скорость)
             * * Направление
             * @returns Себя
             */
            d_setSpeed(speed) {
                this.d_normalize;
                this._x *= speed;
                this._y *= speed;
                return this;
            }
            /**
             * Повернуться в позицию `pos2`.
             * * Направление
             * @returns Себя
             */
            d_directionTo(pos2) {
                let direction = new Vector2(this._x - pos2._x, this._y - pos2._y);
                direction.d_normalize();
                return direction;
            }
            /**
             * Совершить какое-то действие с векторами
             * @param vectors векторы
             * @param oper операторы
             * @param defoult вернуть значение, если произошла ошибка
             * @returns
             */
            static operator(vectors = [], oper, defoult = Vector2.Zero()) {
                if (Array.isArray(vectors)) {
                    let sum = new Vector2(0, 0);
                    vectors.forEach(vector => {
                        sum.x = JSFunctions.operator([sum.x, vector.x], oper, sum.x);
                        sum.y = JSFunctions.operator([sum.y, vector.y], oper, sum.y);
                    });
                    return sum;
                }
                return defoult;
            }
        }
        Vector2.Zero = () => new Vector2(0, 0);
        Vector2.Right = () => new Vector2(1, 0);
        Vector2.Left = () => new Vector2(-1, 0);
        Vector2.Up = () => new Vector2(0, 1);
        Vector2.Down = () => new Vector2(0, -1);
        JSClasses.Vector2 = Vector2;
        /**
         * Класс прямоугольника, содержит:
         *  * `x` координату,
         *  * `y` координату,
         *  * `width` ширину,
         *  * `height` высоту
         */
        class Rectangle {
            constructor(x = 0, y = 0, width = 1, heigth = 1) {
                this._vector = new Vector2();
                this._vector = new Vector2(x, y);
                this._size = new Vector2(width, heigth);
            }
            /**
             * Работа с позицией
             */
            get vector() {
                return this._vector;
            }
            set vector(v) {
                if (v instanceof Vector2) {
                    this._vector = v;
                }
            }
            /**
             * Работа с размером
             */
            get size() {
                return this._size;
            }
            set size(v) {
                if (v instanceof Vector2) {
                    this._size = v;
                }
            }
            /**
             * Координата x
             */
            get x() {
                return this._vector.x;
            }
            /**
             * Координата y
             */
            get y() {
                return this._vector.y;
            }
            /**
             * Ширина
             */
            get width() {
                return this._size.x;
            }
            /**
             * Высота
             */
            get height() {
                return this._size.y;
            }
            set x(v) {
                this._vector._setX(v);
            }
            set y(v) {
                this._vector._setY(v);
            }
            set width(v) {
                this._size._setX(v);
            }
            set height(v) {
                this._size._setY(v);
            }
        }
        JSClasses.Rectangle = Rectangle;
        class Cicle {
            constructor(x = 0, y = 0, radius = 1) {
                this._vector = new Vector2();
                this._radius = 0;
                this.vector = new Vector2(x, y);
                this.radius = radius;
            }
            /**
             * Работа с позицией
             */
            get vector() {
                return this._vector;
            }
            set vector(v) {
                if (v instanceof Vector2) {
                    this._vector = v;
                }
            }
            /**
             * Работа с размером
             */
            get radius() {
                return this._radius;
            }
            set radius(v) {
                if (typeof v === 'number') {
                    this._radius = v;
                }
            }
            /**
             * Координата x
             */
            get x() {
                return this._vector.x;
            }
            /**
             * Координата y
             */
            get y() {
                return this._vector.y;
            }
            set x(v) {
                this._vector._setX(v);
            }
            set y(v) {
                this._vector._setY(v);
            }
        }
        JSClasses.Cicle = Cicle;
        /**
         * Класс мыши
         * * Желательно не использовать
         */
        class Mouse {
            constructor() {
                this._vector = new Vector2();
                this._click = false;
            }
            /**
             * Позиция мыши
             */
            get vector() {
                return this._vector;
            }
            /**
             * Мышь нажата?
             */
            get click() {
                return this._click;
            }
            set click(v) {
                this._click = v;
            }
        }
        JSClasses.Mouse = Mouse;
        /**
         * Цвет
         */
        class Color {
            constructor(red = 0, green = 0, blue = 0, alpha = 1) {
                this._red = 0;
                this._green = 0;
                this._blue = 0;
                this._alpha = 0;
                this.alpha = alpha;
                this.blue = blue;
                this.green = green;
                this.red = red;
            }
            get red() {
                return this._red;
            }
            set red(v) {
                this._red = Math.toRange(v, 0, 255) || this._red;
            }
            get green() {
                return this._green;
            }
            set green(v) {
                this._green = Math.toRange(v, 0, 255) || this._green;
            }
            get blue() {
                return this._blue;
            }
            set blue(v) {
                this._blue = Math.toRange(v, 0, 255) || this._blue;
            }
            get alpha() {
                return this._alpha;
            }
            set alpha(v) {
                this._alpha = Math.toRange(v, 0, 1) || this._alpha;
            }
            toRGB() {
                return `rgb(${this.red}, ${this.green}, ${this.blue})`;
            }
            toRGBA() {
                return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
            }
            toHEX() {
                return `#${this.red.toString(16)}${this.green.toString(16)}${this.blue.toString(16)}`;
            }
        }
        JSClasses.Color = Color;
    })(JSClasses = ZolotoyLib.JSClasses || (ZolotoyLib.JSClasses = {}));
    //#endregion
    //#region dompp.ts
    let Dompp;
    (function (Dompp) {
        Dompp.DocumentHitbox = document.documentElement.getHitbox();
        Dompp.Themes = {
            Dark: {
                'input-number': {
                    background: 'rgb(46, 46, 46)',
                    color: 'rgb(204, 204, 204)',
                    border: '1px solid rgb(204, 204, 204)',
                    borderRadius: '5px',
                    padding: '10px',
                },
                'input-string': {
                    background: 'rgb(46, 46, 46)',
                    color: 'rgb(204, 204, 204)',
                    border: '1px solid rgb(204, 204, 204)',
                    borderRadius: '5px',
                    padding: '10px',
                },
                'input-boolean': {
                    background: 'rgb(46, 46, 46)',
                    color: 'rgb(204, 204, 204)',
                    border: '1px solid rgb(204, 204, 204)',
                    borderRadius: '5px',
                    padding: '10px',
                },
                'input-object': {
                    'input-object-main': {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'stretch',
                        alignItems: 'stretch',
                        padding: '3px',
                        color: 'rgb(209, 209, 209)',
                    },
                    'input-object-element': {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        border: '1px solid rgb(209, 209, 209)',
                        borderRadius: '15px',
                        background: 'rgb(40, 40, 40)',
                        margin: '1px',
                    },
                    'input-object-key': {
                        width: '50%',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'stretch',
                        background: 'rgb(46, 46, 46)',
                        borderRight: '1px solid rgb(209, 209, 209)',
                        borderRadius: '15px 0px 0px 15px',
                    },
                    'input-object-value': {
                        width: '50%',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch',
                        background: 'rgb(55, 55, 55)',
                        borderLeft: '1px solid rgb(209, 209, 209)',
                        borderRadius: '0px 15px 15px 0px',
                    },
                },
                'input-list': {
                    'input-list-main': {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'stretch',
                        alignItems: 'stretch',
                        padding: '3px',
                        color: 'rgb(209, 209, 209)',
                    },
                    'input-list-element': {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'stretch',
                        border: '1px solid  rgb(209, 209, 209)',
                        borderRadius: '15px',
                        background: 'rgb(40, 40, 40)',
                        margin: '1px',
                    },
                    'input-list-index': {
                        width: 'min-content',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'stretch',
                        background: 'rgb(46, 46, 46)',
                        borderRight: '1px solid rgb(209, 209, 209)',
                        borderRadius: '15px 0px 0px 15px',
                    },
                    'input-list-value': {
                        width: '100%',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch',
                        background: 'rgb(55, 55, 55)',
                        borderLeft: '1px solid rgb(209, 209, 209)',
                        borderRadius: '0px 15px 15px 0px',
                    },
                },
                'input-select': {
                    background: 'rgb(46, 46, 46)',
                    color: 'rgb(204, 204, 204)',
                    border: '1px solid rgb(204, 204, 204)',
                    borderRadius: '5px',
                    padding: '10px',
                },
            },
            White: {
                'input-number': {
                    background: 'rgb(194, 194, 194)',
                    color: 'rgb(39, 39, 39)',
                    border: '1px solid rgb(39, 39, 39)',
                    borderRadius: '5px',
                    padding: '10px',
                },
                'input-string': {
                    background: 'rgb(194, 194, 194)',
                    color: 'rgb(39, 39, 39)',
                    border: '1px solid rgb(39, 39, 39)',
                    borderRadius: '5px',
                    padding: '10px',
                },
                'input-boolean': {
                    background: 'rgb(46, 46, 46)',
                    color: 'rgb(204, 204, 204)',
                    border: '1px solid rgb(204, 204, 204)',
                    borderRadius: '5px',
                    padding: '10px',
                },
                'input-object': {
                    'input-object-main': {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'stretch',
                        alignItems: 'stretch',
                        padding: '3px',
                    },
                    'input-object-element': {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        border: '1px solid rgb(56, 56, 56)',
                        borderRadius: '15px',
                        background: 'rgb(173, 173, 173)',
                        margin: '1px',
                    },
                    'input-object-key': {
                        width: '50%',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'stretch',
                        background: 'rgb(170, 170, 170)',
                        borderRight: '1px solid rgb(56, 56, 56)',
                        borderRadius: '15px 0px 0px 15px',
                    },
                    'input-object-value': {
                        width: '50%',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch',
                        background: 'rgb(194, 194, 194)',
                        borderLeft: '1px solid rgb(56, 56, 56)',
                        borderRadius: '0px 15px 15px 0px',
                    },
                },
                'input-list': {
                    'input-list-main': {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'stretch',
                        alignItems: 'stretch',
                        background: 'rgb(209, 209, 209)',
                        padding: '3px',
                    },
                    'input-list-element': {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'stretch',
                        border: '1px solid rgb(56, 56, 56)',
                        borderRadius: '15px',
                        background: 'rgb(173, 173, 173)',
                        margin: '1px',
                    },
                    'input-list-index': {
                        width: 'min-content',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'stretch',
                        background: 'rgb(170, 170, 170)',
                        borderRight: '1px solid rgb(56, 56, 56)',
                        borderRadius: '15px 0px 0px 15px',
                    },
                    'input-list-value': {
                        width: '100%',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch',
                        background: 'rgb(194, 194, 194)',
                        borderLeft: '1px solid rgb(56, 56, 56)',
                        borderRadius: '0px 15px 15px 0px',
                    },
                },
                'input-select': {
                    background: 'rgb(46, 46, 46)',
                    color: 'rgb(204, 204, 204)',
                    border: '1px solid rgb(204, 204, 204)',
                    borderRadius: '5px',
                    padding: '10px',
                },
            },
        };
        function styled(dom, styles) {
            for (const key in styles) {
                if (Object.prototype.hasOwnProperty.call(styles, key)) {
                    const value = JSFunctions.getValue(styles, key, ['']);
                    if (Object.prototype.hasOwnProperty.call(dom.style, key)) {
                        JSFunctions.setValue(dom.style, key, value);
                    }
                }
            }
        }
        Dompp.styled = styled;
        function createHTMLElement(tagname, options = null, childs = null, type) {
            let html = document.createElement(tagname);
            if (typeof options === 'object' && options) {
                JSFunctions.Cicles.ForObject((v, k) => {
                    if (k === 'classes' && Array.hasOnlyTypeof(v, [''])) {
                        JSFunctions.Cicles.Foreach((va, ia) => {
                            html.classList.add(va);
                            return true;
                        }, v);
                    }
                    else if (k === 'id' && typeof v === 'string' && v !== '') {
                        html.id = v;
                    }
                    else if (k === 'styles' && typeof (v) === 'object' && v && !Array.isArray(v) && v) {
                        html.styled(JSFunctions.getValue({ a: v }, 'a'));
                    }
                    else if (k === 'on' && typeof v === 'object' && v && !Array.isArray(v)) {
                        JSFunctions.Cicles.ForObject((val, key) => {
                            JSFunctions.setValue(html, key, val);
                            return true;
                        }, JSFunctions.getValueInstanceof({ a: v }, 'a', null));
                    }
                    else {
                        JSFunctions.setValue(html, k, v);
                    }
                    return true;
                }, options);
            }
            if (Array.isArray(childs)) {
                JSFunctions.Cicles.Foreach((v, i) => {
                    html.append(v instanceof HTMLElement ? v : String(v));
                    return true;
                }, childs);
            }
            return JSFunctions.getValueInstanceof({ a: html }, 'a', type);
        }
        Dompp.createHTMLElement = createHTMLElement;
        function editHTMLElement(html, options = null, childs = null) {
            if (typeof options === 'object' && options) {
                JSFunctions.Cicles.ForObject((v, k) => {
                    if (k === 'classes' && Array.hasOnlyTypeof(v, [''])) {
                        JSFunctions.Cicles.Foreach((va, ia) => {
                            html.classList.add(va);
                            return true;
                        }, v);
                    }
                    else if (k === 'id' && typeof v === 'string' && v !== '') {
                        html.id = v;
                    }
                    else if (k === 'styles' && typeof (v) === 'object' && v && !Array.isArray(v)) {
                        html.styled(JSFunctions.getValue({ a: v }, 'a'));
                    }
                    else {
                        JSFunctions.setValue(html, k, v);
                    }
                    return true;
                }, options);
            }
            if (Array.isArray(childs)) {
                html.childNodes.forEach((v, i) => {
                    html.removeChild(v);
                });
                JSFunctions.Cicles.Foreach((v, i) => {
                    html.append(v instanceof HTMLElement ? v : String(v));
                    return true;
                }, childs);
            }
            return html;
        }
        Dompp.editHTMLElement = editHTMLElement;
        Dompp.Mouse = new JSClasses.Mouse();
        document.addEventListener('mousemove', (ev) => {
            Dompp.Mouse.vector.x = ev.pageX;
            Dompp.Mouse.vector.y = ev.pageY;
        });
        document.addEventListener('mousedown', (ev) => {
            Dompp.Mouse.click = true;
        });
        document.addEventListener('mouseup', (ev) => {
            Dompp.Mouse.click = false;
        });
    })(Dompp = ZolotoyLib.Dompp || (ZolotoyLib.Dompp = {}));
    //#endregion
    //#region dompp_Inputs.ts
    (function (Dompp) {
        /**
         * Работа с вводом данных
         */
        let Inputs;
        (function (Inputs) {
            function getInputNumber(min = 0, max = 1, theme = 'White') {
                let html = document.createElement('input');
                html.type = 'number';
                if (min) {
                    html.min = `${min}`;
                }
                if (max) {
                    html.max = `${max}`;
                }
                return html.styled(Dompp.Themes[theme]['input-number']);
            }
            Inputs.getInputNumber = getInputNumber;
            function getInputString(maxLenght = null, theme = 'White') {
                let html = document.createElement('input');
                html.type = 'text';
                if (maxLenght) {
                    html.maxLength = maxLenght;
                }
                return html.styled(Dompp.Themes[theme]['input-string']);
            }
            Inputs.getInputString = getInputString;
            function getInputBoolean(theme = 'White') {
                let html = document.createElement('select');
                html.innerHTML =
                    `<option selected disabled>Выберете "Да" или "Нет"</option> 
                        <option value="true">Да</option> 
                        <option value="false">Нет</option>`;
                return html.styled(Dompp.Themes[theme]['input-boolean']);
            }
            Inputs.getInputBoolean = getInputBoolean;
            function getInputObject(obj, theme = 'White') {
                if (typeof obj === 'object') {
                    let html = document.createElement('div');
                    html.className = `more-input-object`;
                    JSFunctions.Cicles.ForObject((v, k) => {
                        html.appendChild(Dompp.createHTMLElement('div', {}, [
                            Dompp.createHTMLElement('div', { innerText: k }, [], HTMLDivElement).styled(Dompp.Themes[theme]["input-object"]["input-object-key"]),
                            Dompp.createHTMLElement('div', {}, [v], HTMLDivElement).styled(Dompp.Themes[theme]["input-object"]["input-object-value"]),
                        ], HTMLDivElement).styled(Dompp.Themes[theme]["input-object"]["input-object-element"]));
                        return true;
                    }, obj);
                    return html.styled(Dompp.Themes[theme]['input-object']["input-object-main"]);
                }
                return null;
            }
            Inputs.getInputObject = getInputObject;
            function getInputHTMLObject(htmlobj, theme = 'White') {
                if (Array.isArray(htmlobj)) {
                    let html = document.createElement('div');
                    html.className = `more-input-object`;
                    JSFunctions.Cicles.Foreach((v, i) => {
                        html.appendChild(Dompp.createHTMLElement('div', {}, [
                            Dompp.createHTMLElement('div', {}, [v.key], HTMLDivElement).styled(Dompp.Themes[theme]["input-object"]["input-object-key"]),
                            Dompp.createHTMLElement('div', {}, [v.value], HTMLDivElement).styled(Dompp.Themes[theme]["input-object"]["input-object-value"]),
                        ], HTMLDivElement).styled(Dompp.Themes[theme]["input-object"]["input-object-element"]));
                        return true;
                    }, htmlobj);
                    return html.styled(Dompp.Themes[theme]['input-object']["input-object-main"]);
                }
                return null;
            }
            Inputs.getInputHTMLObject = getInputHTMLObject;
            function getInputStringObject(obj, theme = 'White') {
                if (typeof obj === 'object') {
                    let html = Dompp.createHTMLElement('div', { classes: [`more-input-object`] }, [], HTMLDivElement);
                    JSFunctions.Cicles.ForObject((v, k) => {
                        html.appendChild(Dompp.createHTMLElement('div', {}, [
                            Dompp.createHTMLElement('div', { innerText: k }, [], HTMLDivElement).styled(Dompp.Themes[theme]["input-object"]["input-object-key"]),
                            Dompp.createHTMLElement('div', { innerText: v }, [], HTMLDivElement).styled(Dompp.Themes[theme]["input-object"]["input-object-value"]),
                        ], HTMLDivElement).styled(Dompp.Themes[theme]["input-object"]["input-object-element"]));
                        return true;
                    }, obj);
                    return html.styled(Dompp.Themes[theme]['input-object']["input-object-main"]);
                }
                return null;
            }
            Inputs.getInputStringObject = getInputStringObject;
            function getInputList(arr, theme = 'White') {
                let elements = [];
                if (Array.isArray(arr)) {
                    JSFunctions.Cicles.Foreach((v, i) => {
                        elements.push(Dompp.createHTMLElement('div', { classes: ["more-input-list-element"] }, [
                            Dompp.createHTMLElement('div', { classes: ["more-input-list-index"] }, [
                                `${i}`
                            ], HTMLDivElement).styled(Dompp.Themes[theme]['input-list']["input-list-index"]),
                            Dompp.createHTMLElement('div', { classes: ["more-input-list-value"] }, [
                                v
                            ], HTMLDivElement).styled(Dompp.Themes[theme]['input-list']["input-list-value"]),
                        ], HTMLDivElement).styled(Dompp.Themes[theme]['input-list']["input-list-element"]));
                        return true;
                    }, arr);
                }
                return Dompp.createHTMLElement('div', { classes: ["more-input-list"] }, elements, HTMLDivElement).styled(Dompp.Themes[theme]['input-list']["input-list-main"]);
            }
            Inputs.getInputList = getInputList;
            function getInputSelect(defoultText, list = [], theme = 'White') {
                if (Array.isArray(list)) {
                    let html = document.createElement('select');
                    let deft = document.createElement('option');
                    deft.textContent = defoultText;
                    deft.selected = true;
                    deft.disabled = true;
                    html.append(deft);
                    JSFunctions.Cicles.Foreach((v, i) => {
                        let opt = document.createElement('option');
                        opt.textContent = v.value;
                        opt.value = v.id;
                        html.append(opt);
                        return true;
                    }, list);
                    return html.styled(Dompp.Themes[theme]['input-select']);
                }
                return null;
            }
            Inputs.getInputSelect = getInputSelect;
        })(Inputs = Dompp.Inputs || (Dompp.Inputs = {}));
    })(Dompp = ZolotoyLib.Dompp || (ZolotoyLib.Dompp = {}));
    (function (Dompp) {
        let DragAndDrop;
        (function (DragAndDrop) {
            DragAndDrop.listTypeDAD = ['none', 'full', 'horizontall', 'verticall'];
            class DragAndDropElement {
                constructor(html, type, options) {
                    this._html = null;
                    this._type = 'full';
                    this._options = {
                        minpos: {
                            x: 0,
                            y: 0
                        },
                        maxpos: {
                            x: 0,
                            y: 0
                        },
                        hitbox: null,
                    };
                    this.mousemove = (e) => { };
                    this.html = html;
                    this.type = type;
                    this.options = options;
                    this.update();
                }
                get html() {
                    return this._html;
                }
                set html(v) {
                    if (v instanceof HTMLElement) {
                        this._html = v;
                    }
                }
                get type() {
                    return this._type;
                }
                set type(v) {
                    if (DragAndDrop.listTypeDAD.indexOf(v) > -1) {
                        this._type = v;
                    }
                }
                get options() {
                    return this._options;
                }
                set options(v) {
                    JSFunctions.Cicles.ForObject((val, key) => {
                        if (key === 'minpos') {
                            this._options.minpos = val;
                        }
                        if (key === 'maxpos') {
                            this._options.maxpos = val;
                        }
                        if (key === 'hitbox' && val instanceof JSClasses.Rectangle) {
                            this._options.hitbox = val;
                        }
                        return true;
                    }, v);
                }
                MouseOnHitbox() {
                    let box = this.html.getHitbox();
                    return (box.x + this.options.hitbox.x < Dompp.Mouse.vector.x &&
                        box.y + this.options.hitbox.y < Dompp.Mouse.vector.y &&
                        box.x + this.options.hitbox.width > Dompp.Mouse.vector.x &&
                        box.y + this.options.hitbox.height > Dompp.Mouse.vector.y);
                }
                MouseOnWindow() {
                    let box = this.html.getHitbox();
                    return (box.x < Dompp.Mouse.vector.x &&
                        box.y < Dompp.Mouse.vector.y &&
                        box.x + box.width > Dompp.Mouse.vector.x &&
                        box.y + box.height > Dompp.Mouse.vector.y);
                }
                update() {
                    this.html.onmousedown = (e) => {
                        let box = this.html.getHitbox();
                        this.html.styled({
                            position: "absolute",
                        });
                        let mouseStart = new JSClasses.Vector2(Dompp.Mouse.vector.x - box.x, Dompp.Mouse.vector.y - box.y);
                        this.mousemove = (e) => {
                            this.moveAt(mouseStart);
                        };
                        document.addEventListener('mousemove', this.mousemove);
                        this.html.onmouseup = () => {
                            document.removeEventListener('mousemove', this.mousemove);
                            this.mousemove = null;
                            this.html.onmouseup = null;
                            this.html.styled({
                                zIndex: '999',
                            });
                        };
                    };
                    this.html.ondragstart = () => {
                        return false;
                    };
                    this.html.onmousemove = () => {
                        if (!this.MouseOnHitbox() && this.MouseOnWindow()) {
                            this.html.styled({
                                cursor: 'move',
                            });
                        }
                        else {
                            this.html.styled({
                                cursor: 'auto',
                            });
                        }
                    };
                }
                moveAt(mouseStart, count = false) {
                    let box = this.html.getHitbox();
                    if ((this.type === 'full' ||
                        this.type === 'horizontall' ||
                        this.type === "verticall") &&
                        !this.MouseOnHitbox() &&
                        this.MouseOnWindow() &&
                        Dompp.Mouse.click &&
                        (!(box.x < this.options.minpos.x || box.x + box.width > this.options.maxpos.x) ||
                            !(box.y < this.options.minpos.y || box.y + box.height > this.options.maxpos.y))) {
                        if (this.type == "full" || this.type == 'horizontall') {
                            this.html.style.left = Dompp.Mouse.vector.x - mouseStart.x + "px";
                        }
                        if (this.type == "full" || this.type == 'verticall') {
                            this.html.style.top = Dompp.Mouse.vector.y - mouseStart.y + "px";
                        }
                        if (count == false) {
                            this.moveAt(mouseStart, true);
                        }
                    }
                    // x
                    if (box.x < this.options.minpos.x) {
                        this.html.style.left = this.options.minpos.x + "px";
                    }
                    else if (box.x + box.width > this.options.maxpos.x) {
                        this.html.style.left = this.options.maxpos.x - box.width + "px";
                    }
                    // y
                    if (box.y < this.options.minpos.y) {
                        this.html.style.top = this.options.minpos.y + "px";
                    }
                    else if (box.y + box.height > this.options.maxpos.y) {
                        this.html.style.top = this.options.maxpos.y - box.height + "px";
                    }
                }
            }
            DragAndDrop.DragAndDropElement = DragAndDropElement;
        })(DragAndDrop = Dompp.DragAndDrop || (Dompp.DragAndDrop = {}));
    })(Dompp = ZolotoyLib.Dompp || (ZolotoyLib.Dompp = {}));
    //#endregion
    //#region CustomWindow.ts
    let CustomWindow;
    (function (CustomWindow) {
        CustomWindow.Themes = {
            Dark: {
                'window': {
                    position: 'absolute',
                    background: 'rgb(10, 10, 10)',
                    border: '1px solid rgb(223, 223, 223)',
                    padding: '10px',
                    width: '250px',
                    height: '200px',
                },
                'window-head': {
                    background: 'rgb(10, 10, 10)',
                    color: 'rgb(204, 204, 204)',
                    margin: '5px',
                },
                'window-body': {
                    position: 'relative',
                    background: 'rgb(41, 41, 41)',
                    color: 'rgb(204, 204, 204)',
                    border: '1px solid rgb(204, 204, 204)',
                    padding: '5px',
                    height: '160px',
                },
            },
            White: {
                'window': {
                    position: 'absolute',
                    background: 'rgb(59, 102, 221)',
                    border: '1px solid rgb(44, 44, 44)',
                    padding: '10px',
                    width: '250px',
                    height: '200px',
                },
                'window-head': {
                    background: 'rgb(52, 92, 204)',
                    color: 'rgb(212, 212, 212)',
                    padding: '5px',
                },
                'window-body': {
                    position: 'relative',
                    background: 'rgb(199, 199, 199)',
                    color: 'rgb(37, 37, 37)',
                    border: '1px solid rgb(71, 71, 71)',
                    padding: '5px',
                    height: '160px',
                },
            },
        };
        class DOMWindow {
            //#endregion
            constructor(options, content, title, theme) {
                //#region Props
                this._hitbox = new JSClasses.Rectangle(0, 0, 0, 0);
                this._content = null;
                this._options = {
                    dad: true,
                    width: 100,
                    height: 100,
                };
                this._title = null;
                this._theme = "White";
                this._dad = null;
                this._html = null;
                this._open = false;
                this.options = options;
                this.theme = theme;
                this.content = content;
                this.title = title;
                this.update();
            }
            get hitbox() {
                return this._hitbox;
            }
            set hitbox(v) {
                this._hitbox = v;
            }
            get content() {
                return this._content;
            }
            set content(v) {
                if (v instanceof HTMLElement) {
                    this._content = v;
                }
            }
            get options() {
                return this._options;
            }
            set options(v) {
                this._options.dad = typeof v.dad === 'boolean' ? v.dad : this._options.dad;
                this._options.height = typeof v.height === 'number' ? v.height : this._options.height;
                this._options.width = typeof v.width === 'number' ? v.width : this._options.width;
            }
            get title() {
                return this._title;
            }
            set title(v) {
                if (v instanceof HTMLElement) {
                    this._title = v;
                }
            }
            get theme() {
                return this._theme;
            }
            set theme(v) {
                this._theme = v;
            }
            get dad() {
                return this._dad;
            }
            get html() {
                return this._html;
            }
            set html(v) {
                if (v instanceof HTMLDivElement) {
                    this._html = v;
                }
            }
            get open() {
                return this._open;
            }
            update() {
                this.hitbox.width = this.options.width;
                this.hitbox.height = this.options.height;
                this.html = Dompp.createHTMLElement('div', {}, [
                    Dompp.createHTMLElement('div', {}, [
                        this.title,
                    ], HTMLDivElement).styled(CustomWindow.Themes[this.theme]['window-head']),
                    Dompp.createHTMLElement('div', {}, [
                        this.content,
                    ], HTMLDivElement).styled(CustomWindow.Themes[this.theme]['window-body'])
                        .styled({ width: `${this.hitbox.width - 10}px`, height: `${this.hitbox.height - 40}px` }),
                ], HTMLDivElement).styled(CustomWindow.Themes[this.theme]['window'])
                    .styled({ width: `${this.hitbox.width}px`, height: `${this.hitbox.height}px` });
                this.html.addEventListener('timeupdate', (ev) => {
                    let box = this.html.getHitbox();
                    this.hitbox.x = box.x;
                    this.hitbox.y = box.y;
                    this.hitbox.width = box.width;
                    this.hitbox.height = box.height;
                });
                this._dad = new Dompp.DragAndDrop.DragAndDropElement(this.html, this.options ? 'full' : 'none', {
                    minpos: {
                        x: 0,
                        y: 0,
                    },
                    maxpos: {
                        x: Dompp.DocumentHitbox.width,
                        y: Dompp.DocumentHitbox.height,
                    },
                    hitbox: this.options.dad ?
                        new JSClasses.Rectangle(10, 33, this.hitbox.width - 10, this.hitbox.height - 17)
                        : new JSClasses.Rectangle(0, 0, this.hitbox.width, this.hitbox.height)
                });
            }
            toHTML() {
                this.update();
                if (this.open === false) {
                    this._open = true;
                    return this.html;
                }
                return null;
            }
            close() {
                this.html.remove();
                this._open = false;
            }
        }
        CustomWindow.DOMWindow = DOMWindow;
    })(CustomWindow = ZolotoyLib.CustomWindow || (ZolotoyLib.CustomWindow = {}));
    //#endregion
    // </code>
})(ZolotoyLib || (ZolotoyLib = {}));
//# sourceMappingURL=ZolotoyLib.js.map