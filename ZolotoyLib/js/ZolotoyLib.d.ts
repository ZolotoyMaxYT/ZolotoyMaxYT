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

declare namespace ZolotoyLib {
    // <code>
    //#region jsfunctions.ts
    export namespace JSFunctions {
        export function getValue<T>(obj: any, key: string, type?: T[]): T
        export function getValueInstanceof<T extends EmptyConstructor>(obj: any, key: string, type: T): T['prototype']
        export function createObject<T>(types: T[]): { [key: string]: T }
        export function typedObject<T>(obj: any, types: T[]): { [key: string]: T }
        export function setValue(obj: any, key: string, value: any): void

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
        export const operator: Ioperator

        operator.f = {
            isOperator(operator: any): operator is "+" | "-" | "*" | "/" | "^" | "&";
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
            export declare const Repeat: IRepeat
            /**
             * Повторять пока `func` возвращает `true`
             */
            export declare function While(func: () => boolean): void
            /**
             * Пройтись по `array` и выполнить `func`, пока возвращает `true`
             */
            export declare function Foreach<T>(func: (value: T, index: number) => boolean, array: T[]): void
            /**
             * Пройтись по `object` и выполнить `func`, пока возвращает `true`
             */
            export declare function ForObject<T>(func: (value: T, key: string) => boolean, object: { [key: string]: T }): void;

            export declare function ForString(func: (word: string, pos: number) => boolean, str: string): void;
        }

    }
    //#endregion
    //#region jsclasses.ts 
    export namespace JSClasses {
        /**
         * Работа с углами
         */
        export declare const Angle: {
            /**
             * Градусы в радианы
             */
            toRadians(angle: number): number;
            /**
             * Радианы в градусы
             */
            toAngle(radians: number): number;
        }
        /**
         * Класс вектора, может использоваться для:
         *  * координат, 
         *  * направления, 
         *  * двух значений
         */
        export declare class Vector2 {
            private _x: number;
            /**
             * Координата x
             */
            public get x(): number
            public set x(v: number)

            private _y: number;
            /**
             * Координата y
             */
            public get y(): number
            public set y(v: number)
            /**
             * Задать новое значение `v` для координаты x
             */
            _setX(x: number): boolean
            /**
             * Задать новое значение `v` для координаты y
             */
            _setY(y: number): boolean
            /**
             * Повернуть направление в градусах
             * * Направление
             * @returns Себя
             */
            d_rotateTo(angle: number): Vector2
            /**
             * Получить направление в градусах
             * * Направление
             * @returns Себя
             */
            d_getAngle(): number
            /**
             * Нормализировать направление (преобразовать в значения между -1 и 1)
             * * Направление
             * @returns Себя
             */
            d_normalize(): Vector2
            /**
             * Задать скорости направление (Умножить значения между -1 и 1 на скорость)
             * * Направление
             * @returns Себя
             */
            d_setSpeed(speed: number): Vector2
            /**
             * Повернуться в позицию `pos2`.
             * * Направление
             * @returns Себя
             */
            d_directionTo(pos2: Vector2): Vector2
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
            static operator(vectors: Vector2[] = [], oper: "+" | "-" | "*" | "/", defoult = Vector2.Zero()): Vector2;
        }

        /**
         * Класс прямоугольника, содержит:
         *  * `x` координату,
         *  * `y` координату,
         *  * `width` ширину,
         *  * `height` высоту
         */
        export declare class Rectangle {
            private _vector: Vector2;
            /**
             * Работа с позицией
             */
            public get vector(): Vector2
            public set vector(v: Vector2)

            private _size: Vector2;
            /**
             * Работа с размером
             */
            public get size(): Vector2
            public set size(v: Vector2)
            /**
             * Координата x
             */
            public get x(): number
            /**
             * Координата y
             */
            public get y(): number
            /**
             * Ширина
             */
            public get width(): number
            /**
             * Высота
             */
            public get height(): number
            public set x(v: number)
            public set y(v: number)
            public set width(v: number)
            public set height(v: number)
        }
        export class Cicle {
            private _vector: Vector2;
            /**
             * Работа с позицией
             */
            public get vector(): Vector2
            public set vector(v: Vector2)

            private _radius: number;
            /**
             * Работа с размером
             */
            public get radius(): number
            public set radius(v: number)

            /**
             * Координата x
             */
            public get x(): number
            /**
             * Координата y
             */
            public get y(): number
            public set x(v: number)
            public set y(v: number)
        }

        /**
         * Класс мыши
         * * Желательно не использовать
         */
        export declare class Mouse {
            private _vector: Vector2;
            /**
             * Позиция мыши
             */
            public get vector(): Vector2

            private _click: boolean;
            /**
             * Мышь нажата?
             */
            public get click(): boolean
            public set click(v: boolean)
        }

        /**
         * Цвет
         */
        export declare class Color {
            private _red: number;
            public get red(): number;
            public set red(v: number);
            private _green: number;
            public get green(): number;
            public set green(v: number);
            private _blue: number;
            public get blue(): number;
            public set blue(v: number);
            private _alpha: number;
            public get alpha(): number;
            public set alpha(v: number);

            public toRGB(): string
            public toRGBA(): string
            public toHEX(): string
        }
    }
    //#endregion
    //#region dompp.ts
    export namespace Dompp {
        export declare const DocumentHitbox;
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
        export declare const Themes: IThemes;
        export declare function styled(dom: HTMLElement, styles: cssStyle): void;
        export interface IHTMLElementOptions {
            classes?: string[];
            id?: string;
            styles?: cssStyle;
            on?: EventObjet | {};
            [key: string]: string | string[] | undefined | null | cssStyle | EventObjet;
        }
        export declare function createHTMLElement<T extends typeof HTMLElement>(tagname: string, options: IHTMLElementOptions | null, childs: (HTMLElement | string)[] | null, type: T): T['prototype'];
        export declare function editHTMLElement<T extends HTMLElement>(html: T, options: IHTMLElementOptions | null, childs: (HTMLElement | string)[] | null): T;
        export const Mouse: JSClasses.Mouse = new JSClasses.Mouse();
    }
    //#endregion
    //#region dompp_Inputs.ts
    export namespace Dompp {
        /**
         * Работа с вводом данных
         */
        export namespace Inputs {
            export declare function getInputNumber(min: number | null = 0, max: number | null = 1, theme: TThemeID = 'White'): HTMLInputElement
            export declare function getInputString(maxLenght: number | null = null, theme: TThemeID = 'White'): HTMLInputElement
            export declare function getInputBoolean(theme: TThemeID = 'White'): HTMLInputElement
            export declare function getInputObject(obj: { [key: string]: HTMLElement }, theme: TThemeID = 'White'): HTMLInputElement
            export interface IHTMLObject {
                key: HTMLElement;
                value: HTMLElement
            }
            export declare function getInputHTMLObject(htmlobj: IHTMLObject[], theme: TThemeID = 'White'): HTMLInputElement
            export declare function getInputStringObject(obj: { [key: string]: string }, theme: TThemeID = 'White'): HTMLInputElement
            export declare function getInputList(arr: (HTMLElement | string)[], theme: TThemeID = 'White'): HTMLInputElement
            export interface IObjectSelect {
                id: string;
                value: string;
            }
            export declare function getInputSelect(defoultText: string, list: IObjectSelect[] = [], theme: TThemeID = 'White'): HTMLInputElement
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

        export declare class DragAndDropElement<T extends HTMLElement> {
            private _html: T;
            public get html(): T
            public set html(v: T)

            private _type: TypeDAD;
            public get type(): TypeDAD;
            public set type(v: TypeDAD);

            private _options: TypeOptionsDAD
            public get options(): TypeOptionsDAD
            public set options(v: TypeOptionsDAD): void

            private mousemove: (e: MouseEvent) => {};
            MouseOnHitbox(): boolean
            MouseOnWindow(): boolean
            update(): void
            moveAt(mouseStart: MouseInfo, count = false): void
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
        export declare const Themes: IThemes
        //
        export interface Ioptions {
            dad: boolean;
            width: number;
            height: number;
        }
        export declare class DOMWindow {
            //#region Props
            private _hitbox: JSClasses.Rectangle;
            public get hitbox(): JSClasses.Rectangle
            public set hitbox(v: JSClasses.Rectangle)

            private _content: HTMLElement;
            public get content(): HTMLElement
            public set content(v: HTMLElement)

            private _options: Ioptions;
            public get options(): Ioptions;
            public set options(v: Ioptions);

            private _title: HTMLElement;
            public get title(): HTMLElement
            public set title(v: HTMLElement)


            private _theme: Dompp.TThemeID = "White";
            public get theme(): Dompp.TThemeID;
            public set theme(v: Dompp.TThemeID);


            private _dad: Dompp.DragAndDrop.DragAndDropElement<HTMLDivElement> = null!;
            public get dad(): Dompp.DragAndDrop.DragAndDropElement<HTMLDivElement>;


            private _html: HTMLDivElement = null!;
            public get html(): HTMLDivElement;
            public set html(v: HTMLDivElement);

            private _open: boolean;
            public get open(): boolean;

            //#endregion
            public update(): void;
            public toHTML(): HTMLDivElement | null;
            public close(): void;
        }
    }
    //#endregion
    // </code>
}