import { Component } from "../Engine/Component";
import { Position } from "./Position";

interface EListener {
    state?: Position;
    HTMLElement: string;
    event: string;
    eventListenerCallback: (e: EventListener) => void;
    addEventListener: () => void;
}

export class MousePosition extends Component implements EListener {
    state: Position | undefined;
    HTMLElement: string;
    event: string;
    eventListenerCallback: (e: any) => void;

    constructor() {
        super();
        this.HTMLElement = "canvas";
        this.event = "click";
        this.eventListenerCallback = (e) => {
            this.state = {
                x: e.x - e.target.offsetLeft,
                y: e.y - e.target.offsetTop ,
            };
        };

        this.addEventListener()
    }
    addEventListener = () => {
        document
            .querySelector(this.HTMLElement)
            ?.addEventListener(this.event, this.eventListenerCallback);
    };
}
