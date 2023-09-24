import { ListenerComponent } from "../Engine/ListenerComponent";
import { ERRORS } from "../scripts/Errors";
import { XYPair } from "../utils/types";

export class MouseMoveListener extends ListenerComponent {
    target: string = "canvas";
    state: XYPair | undefined;
    HTMLElement: HTMLCanvasElement | null;
    event: string;
    hasChanged: boolean = false;

    constructor() {
        super();

        this.HTMLElement = document.querySelector(this.target);
        if (this.HTMLElement === null){
            throw new Error(ERRORS.NO_CANVAS)
        }
        this.event = "mousemove";
        
        this.addInstance()
        this.addEventListener();
    }


    updateState(e: any) {
        if (this.HTMLElement === null){
            throw new Error(ERRORS.NO_CANVAS)
        }
        const rect = this.HTMLElement.getBoundingClientRect();
        this.state = {
            x: e.x - rect.left,
            y: e.y - rect.top,
        };
    }
}
