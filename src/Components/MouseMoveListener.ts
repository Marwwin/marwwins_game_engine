import { Component } from "../Engine/Component";
import { Position } from "./Position";

interface EListener {
    state?: Position;
    HTMLElement: string;
    event: string;
    eventListenerCallback: (e: EventListener) => void;
    addEventListener: () => void;
}

export class MouseMoveListener extends Component implements EListener {
    state: Position | undefined;
    HTMLElement: string;
    event: string;
    hasChanged: boolean = false;
    eventListenerCallback: (e: any) => void;

    constructor() {
        super();
        this.HTMLElement = "canvas";
        this.event = "mousemove";
        this.eventListenerCallback = (e) => {
            console.log(e)
            this.state = {
                x: e.x - e.target.offsetLeft,
                y: e.y - e.target.offsetTop,
            };
            this.hasChanged = true;
        };

        this.addEventListener();
    }
    addEventListener = () => {
        document
            .querySelector(this.HTMLElement)
            ?.addEventListener(this.event, this.eventListenerCallback);
    };

    removeEventListener = () => {
        document
            .querySelector(this.HTMLElement)
            ?.removeEventListener(this.event, this.eventListenerCallback);
    };
}
