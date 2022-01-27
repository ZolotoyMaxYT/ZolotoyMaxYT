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

interface EmptyConstructor {
    prototype: {};
    new(): {};
}

interface NumberConstructor {
    is(num: any, options: ('0' | '-' | '+' | '+infinity' | '-infinity' | 'NaN')[]): num is number
}
interface Math {
    /**
     * `value` в промежуток между `min` и `max`
     */
    toRange(value: number, min: number, max: number): number | false
    /**
     * `value` в промежуток между `0` и `max`
     */
    toRange(value: number, max: number): number | false
    /**
     * `value` в промежуток между `0` и `1`
     */
    toRange(value: number): number | false

    /**
     * `n` Корень из числа `x`
     */
    toRoot(x: number, n: number): number
}

interface ArrayConstructor {
    /**
     * 
     * @param arr - массив
     * @param types - `File`, `HTMLElement` или другие классы для `instanceof`
     */
    hasOnlyInstanceof<T extends EmptyConstructor>(arr: any, types: T[]): arr is T['prototype'][];
    /**
     * 
     * @param arr - массив
     * @param types - `number`, `string`, `object` или другие типы для `typeof`
     */
    hasOnlyTypeof<T>(arr: any, types: T[]): arr is T[];
}
interface Array<T> {
    clear(): T[];
    add(value: T, index: number): T[];
    remove(index: number): T[];
    lastIndex(): number;
    getIndex(value: T, type: 'first' | 'last'): number | null;
    getAllIndexs(value: T): number[];
}

interface ObjectConstructor {
    getKey<T>(obj: { [key: string]: T }, value: T, type: 'first' | 'last'): string | null;
    getAllKey<T>(obj: { [key: string]: T }, value: T): string[] | null;
    hasOnlyInstanceof<T extends EmptyConstructor>(obj: any, types: T[]): obj is { [key: string]: T['prototype'] };
    hasOnlyTypeof<T>(obj: any, types: T[]): obj is { [key: string]: T };
}

type cssStyle = CSSStyleDeclaration | { [key: string]: string };
type EventObjet = GlobalEventHandlers | { [key: string]: Function }
interface HTMLElement {
    /**
     * Добавить стили для элемента
     * @returns сам себя возвращает
     */
    styled<T extends HTMLElement>(this: T, styles: cssStyle): T;
    getHitbox(): { x: number, y: number, width: number, height: number, left: number, top: number, right: number, bottom: number }
}
interface Document {
    stringToHTML(str: string): HTMLElement | null;
}


/**
 * Библиотека ZolotoyLib
 * * Расширенные функции js (`JSFunctions`)
 * * Классы для удобной работы (`JSClasses`)
 * * Расширенные функции для dom (`Dompp`)
 * * Создание ввода dom (`Dompp.Inputs`)
 * * Класс DragAndDrop для dom (`Dompp.DragAndDrop`)
 * * Класс для создания окна (`CustomWindow`)
 */
namespace ZolotoyLib {
    // <code>
    //#region jsfunctions.ts
    export namespace JSFunctions {
        export function getValue<T>(obj: any, key: string, type?: T[]): T {
            return obj[key];
        }
        export function getValueInstanceof<T extends EmptyConstructor>(obj: any, key: string, type: T): T['prototype'] {
            return obj[key];
        }
        export function createObject<T>(types: T[]): { [key: string]: T } {
            return {};
        }
        export function typedObject<T>(obj: any, types: T[]): { [key: string]: T } {
            return obj;
        }
        export function setValue(obj: any, key: string, value: any) {
            obj[key] = value;
        }
        // Array
        (function () {
            Array.prototype.clear = function () {
                this.splice(0, this.length);
                return this;
            }
            Array.prototype.add = function <T>(value: T, index: number) {
                if (index < 0) {
                    this.unshift(value);
                } else if (index >= this.length) {
                    this.push(value);
                } else {
                    this.splice(index, 0, value);
                }

                return this;
            }
            Array.prototype.lastIndex = function () {
                if (this.length > 0) {
                    return this.length - 1;
                }
                return 0;
            }
            Array.prototype.remove = function (index: number) {
                if (index < 0) {
                    this.shift();
                } else if (index >= this.length) {
                    this.pop();
                } else {
                    this.splice(index, 1);
                }

                return this;
            }
            Array.prototype.getIndex = function (value, type) {
                let result: number[] = [];
                Cicles.Foreach((v, i) => {
                    if (v === value) {
                        result.push(i);
                    }
                    return true;
                }, this);
                if (type === 'first') { return result[0] }
                else if (type === 'last') { return result[result.lastIndex()] }
                return null;
            }
            Array.prototype.getAllIndexs = function (value) {
                let result: number[] = [];
                Cicles.Foreach((v, i) => {
                    if (v === value) {
                        result.push(i);
                    }
                    return true;
                }, this);
                return result;
            }

            Array.hasOnlyInstanceof = function <T>(arr: any[], types: T[]): arr is T[] {
                if (Array.isArray(arr)) {
                    let results = true;
                    arr.forEach((value, index) => {
                        types.forEach((type: any) => {
                            if (!(value instanceof type) && results) {
                                results = false;
                                return
                            }
                        });
                        if (results === false) {
                            return
                        }
                    });
                    if (results) {
                        return true;
                    }
                }
                return false;
            }
            Array.hasOnlyTypeof = function <T>(arr: any, types: T[]): arr is T[] {
                if (Array.isArray(arr)) {
                    let results = true;
                    arr.forEach((value, index) => {
                        types.forEach((type: any) => {
                            if (!(typeof (value) == typeof (type)) && results) {
                                results = false;
                                return
                            }
                        });
                        if (results === false) {
                            return
                        }
                    });
                    if (results) {
                        return true;
                    }
                }
                return false;
            }
        })();
        // Object
        (function () {
            Object.getKey = function (obj, value, type) {
                if (typeof obj === 'object') {
                    let result: string[] = [];
                    Cicles.ForObject((v, k) => {
                        if (v === value) {
                            result.push(k);
                        }
                        return true;
                    }, obj);
                    if (type === 'first') { return result[0] }
                    else if (type === 'last') { return result[result.lastIndex()] }
                }
                return null;
            };
            Object.getAllKey = function (obj, value) {
                if (typeof obj === 'object') {
                    let result: string[] = [];
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
            Object.hasOnlyTypeof = function <T>(obj: { [key: string]: any }, types: T[]): obj is { [key: string]: T } {
                if (typeof obj === 'object') {
                    let result = true;
                    Cicles.ForObject((v, k) => {
                        if (result) {
                            let has: boolean[] = [];
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
            Object.hasOnlyInstanceof = function <T extends EmptyConstructor>(obj: any, types: T[]): obj is { [key: string]: T['prototype'] } {
                if (typeof obj === 'object') {
                    let result = true;
                    Cicles.ForObject((v, k) => {
                        if (result) {
                            let has: boolean[] = [];
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
            Number.is = function (num, options): num is number {
                if (typeof num !== 'number') {
                    return typeof num == 'number';
                } else if (options.indexOf('+') === -1 && num > 0) {
                    return false;
                } else if (options.indexOf('-') === -1 && num < 0) {
                    return false;
                } else if (options.indexOf('0') === -1 && num === 0) {
                    return false;
                } else if (options.indexOf('+infinity') === -1 && num === Infinity) {
                    return false;
                } else if (options.indexOf('-infinity') === -1 && num === -Infinity) {
                    return false;
                } else if (options.indexOf('NaN') === -1 && this.isNaN(num)) {
                    return false;
                }
                return true;
            }
            Math.toRange = function (...args: number[]) {
                let value: number = 0;
                let min: number = 0;
                let max: number = 1;
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
                } else if (min === max) {
                    console.error('Минимальное значение не может быть равень большему')
                    return false;
                }
                if (value > max) {
                    value = max;
                } else if (value < min) {
                    value = min;
                }
                return value;
            }
            Math.toRoot = function (x: number, n: number = 2) {
                if (x < 0 && n % 2 === 1)
                    return -Math.pow(-x, 1 / n);
                else
                    return Math.pow(x, 1 / n)
            }
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
            }
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
                }
            }
        })();

        export interface Ioperator {
            (number1: number, operator: Toperator, number2: number): number;
            (number1: number, operator: Toperator, number2: number, defoult: number): number;
            (numbers: number[], operator: Toperator): number;
            (numbers: number[], operator: Toperator, defoult: number): number;
            f: {
                isOperator(operator: any): operator is "+" | "-" | "*" | "/" | "^" | "&";
            }
        }

        /**
         * * `"+"` - плюс
         * * `"-"` - минус
         * * `"*"` - умножить
         * * `"/"` - разделить
         * * `"^"` - степень
         * * `"&"` - корень
         */
        type Toperator = "+" | "-" | "*" | "/" | "^" | "&"
        export const operator: Ioperator = function (...args: (Toperator | number | number[])[]): number {
            let numbers: number[] = [];
            let op: Toperator = '+';
            let defoult: number = 0;
            let result: number = 0;
            if (
                Number.is(args[0], ['+', '-', '0']) && Number.is(args[2], ['+', '-', '0']) &&
                operator.f.isOperator(args[1]) && Number.is(args[3], ['+', '-', '0'])
            ) {
                numbers = [args[0], args[2]];
                op = args[1];
                defoult = args[3];
            } else if (
                Number.is(args[0], ['+', '-', '0']) && Number.is(args[2], ['+', '-', '0']) &&
                operator.f.isOperator(args[1])
            ) {
                numbers = [args[0], args[2]];
                op = args[1];
                defoult = 0;
            } else if (
                Array.isArray(args[0]) && Array.hasOnlyTypeof(args[0], [0]) &&
                operator.f.isOperator(args[1]) && Number.is(args[2], ['+', '-', '0'])
            ) {
                numbers = args[0];
                op = args[1];
                defoult = args[2];
            } else if (
                Array.isArray(args[0]) && Array.hasOnlyTypeof(args[0], [0]) &&
                operator.f.isOperator(args[1])
            ) {
                numbers = args[0];
                op = args[1];
                defoult = 0;
            } else {
                return NaN
            }

            if (op === '+') {
                numbers.forEach(number => {
                    try {
                        result += number
                    } catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            } else if (op === '-') {
                numbers.forEach(number => {
                    try {
                        result -= number
                    } catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            } else if (op === '*') {
                numbers.forEach(number => {
                    try {
                        result *= number
                    } catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            } else if (op === '/') {
                numbers.forEach(number => {
                    try {
                        result /= number
                    } catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            } else if (op === '^') {
                numbers.forEach(number => {
                    try {
                        result **= number
                    } catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            } else if (op === '&') {
                numbers.forEach(number => {
                    try {
                        result = Math.toRoot(result, number)
                    } catch (error) {
                        console.error(error);
                        return defoult;
                    }
                });
            }
            return NaN
        }

        operator.f = {
            isOperator(operator: any): operator is "+" | "-" | "*" | "/" | "^" | "&" {
                return (
                    operator === '+' || operator === '-' ||
                    operator === '*' || operator === '/' ||
                    operator === '^' || operator === '&'
                );
            }
        }

        export namespace Cicles {
            interface IRepeat {
                /**
                 * Повторить 10 раз и выполнить `func`, или пока `func` возвращает `true`
                 */
                (func: (x: number) => boolean): void
                /**
                 * Повторить `max` раз и выполнить `func`, или пока `func` возвращает `true`
                 */
                (func: (x: number) => boolean, max: number): void
                /**
                 * Повторить с `min` до `max` раз и выполнить `func`, или пока `func` возвращает `true`
                 */
                (func: (x: number) => boolean, min: number, max: number): void
                /**
                 * Повторить с `min` до `max` с шагом `step` раз и выполнить `func`, или пока `func` возвращает `true`
                 */
                (func: (x: number) => boolean, min: number, max: number, step: number): void
            }
            export const Repeat: IRepeat = function (func: (x: number) => boolean = (x) => true, ...args: number[]) {
                if (typeof func === 'function' && typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number') {
                    for (let x = args[0]; x < args[1]; x += args[2]) {
                        if (!func(x)) {
                            break;
                        }
                    }
                } else if (typeof func === 'function' && typeof args[0] === 'number' && typeof args[1] === 'number') {
                    for (let x = args[0]; x < args[1]; x += 1) {
                        if (!func(x)) {
                            break;
                        }
                    }
                } else if (typeof func === 'function' && typeof args[0] === 'number') {
                    for (let x = 0; x < args[0]; x += 1) {
                        if (!func(x)) {
                            break;
                        }
                    }
                } else if (typeof func === 'function') {
                    for (let x = 0; x < 10; x += 1) {
                        if (!func(x)) {
                            break;
                        }
                    }
                }
            }
            /**
             * Повторять пока `func` возвращает `true`
             */
            export const While = function (func: () => boolean = () => true) {
                while (func()) { }
            }
            /**
             * Пройтись по `array` и выполнить `func`, пока возвращает `true`
             */
            export const Foreach = function <T>(func: (value: T, index: number) => boolean, array: T[]) {
                if (Array.isArray(array)) {
                    let run: boolean = true;
                    array.forEach((value, index) => {
                        if (run) {
                            run = func(value, index);
                        }
                    });
                }
            }
            /**
             * Пройтись по `object` и выполнить `func`, пока возвращает `true`
             */
            export const ForObject = function <T>(func: (value: T, key: string) => boolean, object: { [key: string]: T }) {
                if (typeof object === 'object') {
                    let run = true;
                    for (const key in object) {
                        if (run && Object.prototype.hasOwnProperty.call(object, key)) {
                            const value = object[key];
                            run = func(value, key);
                        }
                    }
                }
            }

            export const ForString = function (func: (word: string, pos: number) => boolean, str: string) {
                if (typeof str !== 'string') {
                    str = String(str);
                }
                for (let x = 0; x < str.length; x++) {
                    const word = str[x];
                    if (!func(word, x)) {
                        break;
                    }
                }
            }
        }
    }
    //#endregion
    //#region jsclasses.ts 
    export namespace JSClasses {
        /**
         * Работа с углами
         */
        export const Angle = {
            /**
             * Градусы в радианы
             */
            toRadians(angle: number) {
                return (Math.PI / 180) * angle;
            },
            /**
             * Радианы в градусы
             */
            toAngle(radians: number) {
                return (radians / Math.PI) * 180;
            }
        }
        /**
         * Класс вектора, может использоваться для:
         *  * координат, 
         *  * направления, 
         *  * двух значений
         */
        export class Vector2 {
            private _x: number = 0;
            /**
             * Координата x
             */
            public get x(): number {
                return this._x;
            }
            public set x(v: number) {
                this._setX(v);
            }

            private _y: number = 0;
            /**
             * Координата y
             */
            public get y(): number {
                return this._y;
            }
            public set y(v: number) {
                this._setY(v);
            }

            constructor(x = 0, y = 0) {
                this._setX(x);
                this._setY(y);
            }
            /**
             * Задать новое значение `v` для координаты x
             */
            _setX(x: number): boolean {
                if (Number.is(x, ["0", '+', '-'])) {
                    this._x = x;
                    return true;
                }
                return false;
            }
            /**
             * Задать новое значение `v` для координаты y
             */
            _setY(y: number): boolean {
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
            d_rotateTo(angle: number) {
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
            d_setSpeed(speed: number) {
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
            d_directionTo(pos2: Vector2) {
                let direction = new Vector2(this._x - pos2._x, this._y - pos2._y);
                direction.d_normalize();
                return direction;
            }
            static Zero = () => new Vector2(0, 0);
            static Right = () => new Vector2(1, 0);
            static Left = () => new Vector2(-1, 0);
            static Up = () => new Vector2(0, 1);
            static Down = () => new Vector2(0, -1);
            /**
             * Совершить какое-то действие с векторами
             * @param vectors векторы
             * @param oper операторы
             * @param defoult вернуть значение, если произошла ошибка
             * @returns 
             */
            static operator(vectors: Vector2[] = [], oper: "+" | "-" | "*" | "/", defoult = Vector2.Zero()) {
                if (Array.isArray(vectors)) {
                    let sum = new Vector2(0, 0);
                    vectors.forEach(vector => {
                        sum.x = JSFunctions.operator([sum.x, vector.x], oper, sum.x);
                        sum.y = JSFunctions.operator([sum.y, vector.y], oper, sum.y);
                    })
                    return sum;
                }
                return defoult;
            }
        }

        /**
         * Класс прямоугольника, содержит:
         *  * `x` координату,
         *  * `y` координату,
         *  * `width` ширину,
         *  * `height` высоту
         */
        export class Rectangle {
            private _vector: Vector2 = new Vector2();
            /**
             * Работа с позицией
             */
            public get vector(): Vector2 {
                return this._vector;
            }
            public set vector(v: Vector2) {
                if (v instanceof Vector2) {
                    this._vector = v;
                }
            }

            private _size: Vector2;
            /**
             * Работа с размером
             */
            public get size(): Vector2 {
                return this._size;
            }
            public set size(v: Vector2) {
                if (v instanceof Vector2) {
                    this._size = v;
                }
            }

            constructor(x = 0, y = 0, width = 1, heigth = 1) {
                this._vector = new Vector2(x, y);
                this._size = new Vector2(width, heigth);
            }
            /**
             * Координата x
             */
            public get x(): number {
                return this._vector.x;
            }
            /**
             * Координата y
             */
            public get y(): number {
                return this._vector.y;
            }
            /**
             * Ширина
             */
            public get width(): number {
                return this._size.x;
            }
            /**
             * Высота
             */
            public get height(): number {
                return this._size.y;
            }
            public set x(v: number) {
                this._vector._setX(v);
            }
            public set y(v: number) {
                this._vector._setY(v);
            }
            public set width(v: number) {
                this._size._setX(v);
            }
            public set height(v: number) {
                this._size._setY(v);
            }
        }
        export class Cicle {
            private _vector: Vector2 = new Vector2();
            /**
             * Работа с позицией
             */
            public get vector(): Vector2 {
                return this._vector;
            }
            public set vector(v: Vector2) {
                if (v instanceof Vector2) {
                    this._vector = v;
                }
            }

            private _radius: number = 0;
            /**
             * Работа с размером
             */
            public get radius(): number {
                return this._radius;
            }
            public set radius(v: number) {
                if (typeof v === 'number') {
                    this._radius = v;
                }
            }

            constructor(x = 0, y = 0, radius = 1) {
                this.vector = new Vector2(x, y);
                this.radius = radius;
            }
            /**
             * Координата x
             */
            public get x(): number {
                return this._vector.x;
            }
            /**
             * Координата y
             */
            public get y(): number {
                return this._vector.y;
            }
            public set x(v: number) {
                this._vector._setX(v);
            }
            public set y(v: number) {
                this._vector._setY(v);
            }
        }

        /**
         * Класс мыши
         * * Желательно не использовать
         */
        export class Mouse {
            private _vector: Vector2 = new Vector2();
            /**
             * Позиция мыши
             */
            public get vector(): Vector2 {
                return this._vector;
            }

            private _click: boolean = false;
            /**
             * Мышь нажата?
             */
            public get click(): boolean {
                return this._click;
            }
            public set click(v: boolean) {
                this._click = v;
            }

        }

        /**
         * Цвет
         */
        export class Color {
            private _red: number = 0;
            public get red(): number {
                return this._red;
            }
            public set red(v: number) {
                this._red = Math.toRange(v, 0, 255) || this._red;
            }
            private _green: number = 0;
            public get green(): number {
                return this._green;
            }
            public set green(v: number) {
                this._green = Math.toRange(v, 0, 255) || this._green;
            }
            private _blue: number = 0;
            public get blue(): number {
                return this._blue;
            }
            public set blue(v: number) {
                this._blue = Math.toRange(v, 0, 255) || this._blue;
            }
            private _alpha: number = 0;
            public get alpha(): number {
                return this._alpha;
            }
            public set alpha(v: number) {
                this._alpha = Math.toRange(v, 0, 1) || this._alpha;
            }

            constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1) {
                this.alpha = alpha;
                this.blue = blue;
                this.green = green;
                this.red = red;
            }

            public toRGB() {
                return `rgb(${this.red}, ${this.green}, ${this.blue})`;
            }
            public toRGBA() {
                return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
            }
            public toHEX() {
                return `#${this.red.toString(16)}${this.green.toString(16)}${this.blue.toString(16)}`;
            }

        }
    }
    //#endregion
    //#region dompp.ts
    export namespace Dompp {
        export const DocumentHitbox = document.documentElement.getHitbox();
        export interface IThemesID {
            [key: string]: cssStyle | {
                [key: string]: cssStyle
            };
            'input-number': cssStyle;
            'input-string': cssStyle;
            'input-boolean': cssStyle;
            'input-object': {
                'input-object-main': cssStyle;
                'input-object-element': cssStyle;
                'input-object-value': cssStyle;
                'input-object-key': cssStyle;
            };
            'input-list': {
                'input-list-main': cssStyle;
                'input-list-element': cssStyle;
                'input-list-value': cssStyle;
                'input-list-index': cssStyle;
            };
            'input-select': cssStyle;
        }
        /**
         * Темы
         */
        export interface IThemes {
            [key: string]: IThemesID
            Dark: IThemesID;
            White: IThemesID;
        }
        /**
         * Ид тем
         */
        export type TThemeID = 'Dark' | 'White';
        export const Themes: IThemes = {
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
        }
        export function styled(dom: HTMLElement, styles: cssStyle) {
            for (const key in styles) {
                if (Object.prototype.hasOwnProperty.call(styles, key)) {
                    const value = JSFunctions.getValue(styles, key, ['']);
                    if (Object.prototype.hasOwnProperty.call(dom.style, key)) {
                        JSFunctions.setValue(dom.style, key, value);
                    }
                }
            }
        }
        export interface IHTMLElementOptions {
            classes?: string[];
            id?: string;
            styles?: cssStyle;
            on?: EventObjet | {};
            [key: string]: string | string[] | undefined | null | cssStyle | EventObjet;
        }
        export function createHTMLElement<T extends typeof HTMLElement>(tagname: string, options: IHTMLElementOptions | null = null, childs: (HTMLElement | string)[] | null = null, type: T): T['prototype'] {
            let html = document.createElement(tagname);
            if (typeof options === 'object' && options) {
                JSFunctions.Cicles.ForObject((v, k) => {
                    if (k === 'classes' && Array.hasOnlyTypeof(v, [''])) {
                        JSFunctions.Cicles.Foreach((va, ia) => {
                            html.classList.add(va);
                            return true;
                        }, v);
                    } else if (k === 'id' && typeof v === 'string' && v !== '') {
                        html.id = v;
                    } else if (k === 'styles' && typeof (v) === 'object' && v && !Array.isArray(v) && v) {
                        html.styled(JSFunctions.getValue<cssStyle>({ a: v }, 'a'));
                    } else if (k === 'on' && typeof v === 'object' && v && !Array.isArray(v)) {
                        JSFunctions.Cicles.ForObject((val, key) => {
                            JSFunctions.setValue(html, key, val)
                            return true;
                        }, JSFunctions.getValueInstanceof({ a: v }, 'a', null!))
                    } else {
                        JSFunctions.setValue(html, k, v);
                    }
                    return true;
                }, options);
            }
            if (Array.isArray(childs)) {
                JSFunctions.Cicles.Foreach((v, i) => {
                    html.append(v instanceof HTMLElement ? v : String(v))
                    return true;
                }, childs);
            }
            return JSFunctions.getValueInstanceof({ a: html }, 'a', type);
        }
        export function editHTMLElement<T extends HTMLElement>(html: T, options: IHTMLElementOptions | null = null, childs: (HTMLElement | string)[] | null = null): T {
            if (typeof options === 'object' && options) {
                JSFunctions.Cicles.ForObject((v, k) => {
                    if (k === 'classes' && Array.hasOnlyTypeof(v, [''])) {
                        JSFunctions.Cicles.Foreach((va, ia) => {
                            html.classList.add(va);
                            return true;
                        }, v);
                    } else if (k === 'id' && typeof v === 'string' && v !== '') {
                        html.id = v;
                    } else if (k === 'styles' && typeof (v) === 'object' && v && !Array.isArray(v)) {
                        html.styled(JSFunctions.getValue<cssStyle>({ a: v }, 'a'));
                    } else {
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
                    html.append(v instanceof HTMLElement ? v : String(v))
                    return true;
                }, childs);
            }
            return html;
        }
        export const Mouse: JSClasses.Mouse = new JSClasses.Mouse();
        document.addEventListener('mousemove', (ev) => {
            Mouse.vector.x = ev.pageX;
            Mouse.vector.y = ev.pageY;
        });
        document.addEventListener('mousedown', (ev) => {
            Mouse.click = true;
        });
        document.addEventListener('mouseup', (ev) => {
            Mouse.click = false;
        });
    }
    //#endregion
    //#region dompp_Inputs.ts
    export namespace Dompp {
        /**
         * Работа с вводом данных
         */
        export namespace Inputs {
            export function getInputNumber(min: number | null = 0, max: number | null = 1, theme: TThemeID = 'White') {
                let html: HTMLInputElement = document.createElement('input');
                html.type = 'number';
                if (min) { html.min = `${min}` }
                if (max) { html.max = `${max}` }
                return html.styled(Dompp.Themes[theme]['input-number']);
            }
            export function getInputString(maxLenght: number | null = null, theme: TThemeID = 'White') {
                let html: HTMLInputElement = document.createElement('input');
                html.type = 'text';
                if (maxLenght) { html.maxLength = maxLenght }
                return html.styled(Dompp.Themes[theme]['input-string']);
            }
            export function getInputBoolean(theme: TThemeID = 'White') {
                let html: HTMLSelectElement = document.createElement('select');
                html.innerHTML =
                    `<option selected disabled>Выберете "Да" или "Нет"</option> 
                        <option value="true">Да</option> 
                        <option value="false">Нет</option>`;
                return html.styled(Dompp.Themes[theme]['input-boolean']);
            }
            export function getInputObject(obj: { [key: string]: HTMLElement }, theme: TThemeID = 'White') {
                if (typeof obj === 'object') {
                    let html: HTMLDivElement = document.createElement('div');
                    html.className = `more-input-object`;
                    JSFunctions.Cicles.ForObject((v, k) => {
                        html.appendChild(
                            createHTMLElement('div',
                                {},
                                [
                                    createHTMLElement('div',
                                        { innerText: k },
                                        [],
                                        HTMLDivElement
                                    ).styled(Themes[theme]["input-object"]["input-object-key"]),
                                    createHTMLElement('div',
                                        {},
                                        [v],
                                        HTMLDivElement
                                    ).styled(Themes[theme]["input-object"]["input-object-value"]),
                                ],
                                HTMLDivElement
                            ).styled(Themes[theme]["input-object"]["input-object-element"]),
                        );
                        return true;
                    }, obj);
                    return html.styled(Themes[theme]['input-object']["input-object-main"]);
                }
                return null;
            }
            export interface IHTMLObject {
                key: HTMLElement;
                value: HTMLElement
            }
            export function getInputHTMLObject(htmlobj: IHTMLObject[], theme: TThemeID = 'White') {
                if (Array.isArray(htmlobj)) {
                    let html: HTMLDivElement = document.createElement('div');
                    html.className = `more-input-object`;
                    JSFunctions.Cicles.Foreach((v, i) => {
                        html.appendChild(
                            createHTMLElement('div',
                                {},
                                [
                                    createHTMLElement('div',
                                        {},
                                        [v.key],
                                        HTMLDivElement
                                    ).styled(Themes[theme]["input-object"]["input-object-key"]),
                                    createHTMLElement('div',
                                        {},
                                        [v.value],
                                        HTMLDivElement
                                    ).styled(Themes[theme]["input-object"]["input-object-value"]),
                                ],
                                HTMLDivElement
                            ).styled(Themes[theme]["input-object"]["input-object-element"]),
                        );
                        return true;
                    }, htmlobj);
                    return html.styled(Themes[theme]['input-object']["input-object-main"]);
                }
                return null;
            }
            export function getInputStringObject(obj: { [key: string]: string }, theme: TThemeID = 'White') {
                if (typeof obj === 'object') {
                    let html: HTMLDivElement = createHTMLElement('div',
                        { classes: [`more-input-object`] },
                        [],
                        HTMLDivElement
                    );
                    JSFunctions.Cicles.ForObject((v, k) => {
                        html.appendChild(
                            createHTMLElement('div',
                                {},
                                [
                                    createHTMLElement('div',
                                        { innerText: k },
                                        [],
                                        HTMLDivElement
                                    ).styled(Themes[theme]["input-object"]["input-object-key"]),
                                    createHTMLElement('div',
                                        { innerText: v },
                                        [],
                                        HTMLDivElement
                                    ).styled(Themes[theme]["input-object"]["input-object-value"]),
                                ],
                                HTMLDivElement
                            ).styled(Themes[theme]["input-object"]["input-object-element"]),
                        );
                        return true;
                    }, obj);
                    return html.styled(Themes[theme]['input-object']["input-object-main"]);
                }
                return null;
            }
            export function getInputList(arr: (HTMLElement | string)[], theme: TThemeID = 'White') {
                let elements: HTMLDivElement[] = []
                if (Array.isArray(arr)) {
                    JSFunctions.Cicles.Foreach((v, i) => {
                        elements.push(
                            Dompp.createHTMLElement('div',
                                { classes: ["more-input-list-element"] },
                                [
                                    Dompp.createHTMLElement('div',
                                        { classes: ["more-input-list-index"] },
                                        [
                                            `${i}`
                                        ],
                                        HTMLDivElement
                                    ).styled(Themes[theme]['input-list']["input-list-index"]),
                                    Dompp.createHTMLElement('div',
                                        { classes: ["more-input-list-value"] },
                                        [
                                            v
                                        ],
                                        HTMLDivElement
                                    ).styled(Themes[theme]['input-list']["input-list-value"]),
                                ],
                                HTMLDivElement
                            ).styled(Themes[theme]['input-list']["input-list-element"]),
                        );
                        return true;
                    }, arr);
                }
                return Dompp.createHTMLElement('div',
                    { classes: ["more-input-list"] },
                    elements,
                    HTMLDivElement
                ).styled(Themes[theme]['input-list']["input-list-main"]);
            }
            export interface IObjectSelect {
                id: string;
                value: string;
            }
            export function getInputSelect(defoultText: string, list: IObjectSelect[] = [], theme: TThemeID = 'White') {
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
        }
    }
    //#endregion
    //#region dompp_DragAndDrop.ts
    export namespace Dompp {
        /**
         * Работа с DragAndDrop
         */
        export namespace DragAndDrop { }
    }

    export namespace Dompp.DragAndDrop {
        export type TypeDAD = 'none' | 'full' | 'horizontall' | 'verticall';
        export const listTypeDAD: TypeDAD[] = ['none', 'full', 'horizontall', 'verticall'];
        export type TypeOptionsDAD = {
            minpos: {
                x: number;
                y: number;
            };
            maxpos: {
                x: number;
                y: number;
            };
            hitbox: JSClasses.Rectangle;
        }
        export interface MouseInfo {
            x: number;
            y: number;
        }

        export class DragAndDropElement<T extends HTMLElement> {
            private _html: T = null!;
            public get html(): T {
                return this._html;
            }
            public set html(v: T) {
                if (v instanceof HTMLElement) {
                    this._html = v;
                }
            }

            private _type: TypeDAD = 'full';
            public get type(): TypeDAD {
                return this._type;
            }
            public set type(v: TypeDAD) {
                if (listTypeDAD.indexOf(v) > -1) {
                    this._type = v;
                }
            }

            private _options: TypeOptionsDAD = {
                minpos: {
                    x: 0,
                    y: 0
                },
                maxpos: {
                    x: 0,
                    y: 0
                },
                hitbox: null!,
            };
            public get options(): TypeOptionsDAD {
                return this._options;
            }
            public set options(v: TypeOptionsDAD) {
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


            constructor(html: T, type: TypeDAD, options: TypeOptionsDAD) {
                this.html = html;
                this.type = type;
                this.options = options;
                this.update();
            }

            private mousemove = (e: MouseEvent) => { };
            MouseOnHitbox() {
                let box = this.html.getHitbox();
                return (
                    box.x + this.options.hitbox.x < Mouse.vector.x &&
                    box.y + this.options.hitbox.y < Mouse.vector.y &&
                    box.x + this.options.hitbox.width > Mouse.vector.x &&
                    box.y + this.options.hitbox.height > Mouse.vector.y
                )
            }
            MouseOnWindow() {
                let box = this.html.getHitbox();
                return (
                    box.x < Mouse.vector.x &&
                    box.y < Mouse.vector.y &&
                    box.x + box.width > Mouse.vector.x &&
                    box.y + box.height > Mouse.vector.y
                )
            }
            update() {
                this.html.onmousedown = (e) => {
                    let box = this.html.getHitbox();
                    this.html.styled({
                        position: "absolute",
                    });
                    let mouseStart: JSClasses.Vector2 = new JSClasses.Vector2(Mouse.vector.x - box.x, Mouse.vector.y - box.y);
                    this.mousemove = (e: MouseEvent) => {
                        this.moveAt(mouseStart)
                    };
                    document.addEventListener('mousemove', this.mousemove,)

                    this.html.onmouseup = () => {
                        document.removeEventListener('mousemove', this.mousemove);
                        this.mousemove = null!;
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
                    } else {
                        this.html.styled({
                            cursor: 'auto',
                        });
                    }
                }
            }
            moveAt(mouseStart: MouseInfo, count = false) {
                let box = this.html.getHitbox();
                if (
                    (
                        this.type === 'full' ||
                        this.type === 'horizontall' ||
                        this.type === "verticall"
                    ) &&
                    !this.MouseOnHitbox() &&
                    this.MouseOnWindow() &&
                    Dompp.Mouse.click &&
                    (
                        !(box.x < this.options.minpos.x || box.x + box.width > this.options.maxpos.x) ||
                        !(box.y < this.options.minpos.y || box.y + box.height > this.options.maxpos.y)
                    )
                ) {
                    if (this.type == "full" || this.type == 'horizontall') {
                        this.html.style.left = Mouse.vector.x - mouseStart.x + "px";
                    }
                    if (this.type == "full" || this.type == 'verticall') {
                        this.html.style.top = Mouse.vector.y - mouseStart.y + "px";
                    }
                    if (count == false) {
                        this.moveAt(mouseStart, true);
                    }
                }
                // x
                if (box.x < this.options.minpos.x) {
                    this.html.style.left = this.options.minpos.x + "px";
                } else if (box.x + box.width > this.options.maxpos.x) {
                    this.html.style.left = this.options.maxpos.x - box.width + "px";
                }
                // y
                if (box.y < this.options.minpos.y) {
                    this.html.style.top = this.options.minpos.y + "px";
                } else if (box.y + box.height > this.options.maxpos.y) {
                    this.html.style.top = this.options.maxpos.y - box.height + "px";
                }
            }
        }
    }
    //#endregion
    //#region CustomWindow.ts
    export namespace CustomWindow {
        export interface IThemeID {
            [key: string]: cssStyle | {
                [key: string]: cssStyle;
            };
            'window': cssStyle;
            'window-head': cssStyle;
            'window-body': cssStyle;
        }
        export interface IThemes {
            Dark: IThemeID;
            White: IThemeID;
        }
        export const Themes: IThemes = {
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
        //
        export interface Ioptions {
            dad: boolean;
            width: number;
            height: number;
        }
        export class DOMWindow {
            //#region Props
            private _hitbox: JSClasses.Rectangle = new JSClasses.Rectangle(0, 0, 0, 0);
            public get hitbox(): JSClasses.Rectangle {
                return this._hitbox;
            }
            public set hitbox(v: JSClasses.Rectangle) {
                this._hitbox = v;
            }

            private _content: HTMLElement = null!;
            public get content(): HTMLElement {
                return this._content;
            }
            public set content(v: HTMLElement) {
                if (v instanceof HTMLElement) {
                    this._content = v;
                }
            }

            private _options: Ioptions = {
                dad: true,
                width: 100,
                height: 100,
            };
            public get options(): Ioptions {
                return this._options;
            }
            public set options(v: Ioptions) {
                this._options.dad = typeof v.dad === 'boolean' ? v.dad : this._options.dad;
                this._options.height = typeof v.height === 'number' ? v.height : this._options.height;
                this._options.width = typeof v.width === 'number' ? v.width : this._options.width;
            }

            private _title: HTMLElement = null!;
            public get title(): HTMLElement {
                return this._title;
            }
            public set title(v: HTMLElement) {
                if (v instanceof HTMLElement) {
                    this._title = v;
                }
            }


            private _theme: Dompp.TThemeID = "White";
            public get theme(): Dompp.TThemeID {
                return this._theme;
            }
            public set theme(v: Dompp.TThemeID) {
                this._theme = v;
            }


            private _dad: Dompp.DragAndDrop.DragAndDropElement<HTMLDivElement> = null!;
            public get dad(): Dompp.DragAndDrop.DragAndDropElement<HTMLDivElement> {
                return this._dad;
            }


            private _html: HTMLDivElement = null!;
            public get html(): HTMLDivElement {
                return this._html;
            }
            public set html(v: HTMLDivElement) {
                if (v instanceof HTMLDivElement) {
                    this._html = v;
                }
            }

            private _open: boolean = false;
            public get open(): boolean {
                return this._open;
            }

            //#endregion
            constructor(options: Ioptions, content: HTMLElement, title: HTMLElement, theme: Dompp.TThemeID) {
                this.options = options;
                this.theme = theme;
                this.content = content;
                this.title = title;
                this.update();
            }
            public update() {
                this.hitbox.width = this.options.width;
                this.hitbox.height = this.options.height;
                this.html = Dompp.createHTMLElement('div',
                    {},
                    [
                        Dompp.createHTMLElement('div',
                            {},
                            [
                                this.title,
                            ],
                            HTMLDivElement
                        ).styled(Themes[this.theme]['window-head']),
                        Dompp.createHTMLElement('div',
                            {},
                            [
                                this.content,
                            ],
                            HTMLDivElement
                        ).styled(Themes[this.theme]['window-body'])
                            .styled({ width: `${this.hitbox.width - 10}px`, height: `${this.hitbox.height - 40}px` }),
                    ],
                    HTMLDivElement
                ).styled(Themes[this.theme]['window'])
                    .styled({ width: `${this.hitbox.width}px`, height: `${this.hitbox.height}px` });
                this.html.addEventListener('timeupdate', (ev) => {
                    let box = this.html.getHitbox()
                    this.hitbox.x = box.x;
                    this.hitbox.y = box.y;
                    this.hitbox.width = box.width;
                    this.hitbox.height = box.height;
                });
                this._dad = new Dompp.DragAndDrop.DragAndDropElement(
                    this.html, this.options ? 'full' : 'none',
                    {
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
                    }
                );
            }
            public toHTML() {
                this.update();
                if (this.open === false) {
                    this._open = true;
                    return this.html;
                }
                return null;
            }
            public close() {
                this.html.remove();
                this._open = false;
            }
        }
    }
    //#endregion
    // </code>
}