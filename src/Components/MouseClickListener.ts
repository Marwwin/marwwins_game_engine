import { ComponentListener } from "../Engine/ComponentListener";
import { Position } from "./Position";


export class MouseClickListener extends ComponentListener {

    state: Position | undefined;
    target: string;
    event: string;

    static eventListenerAdded: boolean = false;
    static instances: MouseClickListener[] = [];

    constructor() {
        super();
        this.target = "canvas";
        this.event = "click";

        MouseClickListener.instances.push(this);

        this.addEventListener();
    }
    handleEvent(e: any) {
        MouseClickListener.instances.forEach((instance) => {
            instance.updateState(e);
        });
    };

    updateState(e: any) {
            console.log(e);
            this.state = {
                x: e.x - e.target.offsetLeft,
                y: e.y - e.target.offsetTop,
            };
        }
}
