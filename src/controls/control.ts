import {Point} from "../shared/point.ts"

export interface ControlBase {
    id: string
    position: Point
}

export abstract class Control implements ControlBase {
    id: string = '';
    position: Point = Point.zero();
    size: Point = Point.zero();
    selected: boolean = false
    visible: boolean = true

    abstract draw(ctx: CanvasRenderingContext2D): void

    abstract hitTest(point: Point): boolean

    abstract getPropertyValue(name: string): Point

    abstract animateEndByPropertyAndTarget(propertyName: string, targetControl: Control): Point

    getPropertyUpdater(_: string): (x: number, y: number) => void {
        throw new Error('not implemented exception')
    }

    get center(): Point {
        return this.position
    }

    updatePosition(x: number, y: number): void {
        this.position.x = x
        this.position.y = y
    }

    normalizePositionUnit(point: Point, cellSize: number): void {
        point.normalizeUnit(cellSize)
    }

    abstract clone(): Control

}