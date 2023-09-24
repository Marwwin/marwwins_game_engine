import { Component } from "../Engine/Component";
import { CssColorNames, XYPair } from "../utils/types";
type Size = { h: number; w: number };

export class Body extends Component {
    position: XYPair;
    velocity: XYPair;
    shape: Size;
    speed: number;
    colour: CssColorNames;

    constructor(
        position = { x: 0, y: 0 },
        shape = { h: 20, w: 20 },
        velocity = { x: 0, y: 0, },
        speed = 1,
        colour:CssColorNames = "Red"
    ) {
        super();
        this.position = position;
        this.speed = speed;
        this.velocity = velocity;
        this.shape = shape;
        this.colour = colour;
    }
}

export function getBodySpecs(body:Body){
    return {
        left: body.position.x - body.shape.w,
        right: body.position.x + body.shape.w,
        top: body.position.y - body.shape.h,
        bottom: body.position.y + body.shape.h,
    }
}
export function getCorners(body:Body){
    return {
        x1: body.position.x - body.shape.w,
        y1: body.position.x + body.shape.w,
        x2: body.position.y - body.shape.h,
        y2: body.position.y + body.shape.h,
    }
}