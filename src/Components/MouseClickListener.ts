import { ListenerComponent } from "../Engine/ListenerComponent";
import { XYPair } from "../utils/types";

export class MouseClickListener extends ListenerComponent {
    state: XYPair | undefined;
    target: string;
    event: string;

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
    }

    updateState(e: any) {
        this.state = {
            x: e.clientX,
            y: e.clientY,
        };
    }
}
