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
