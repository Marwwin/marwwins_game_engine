import { ListenerComponent } from "../Engine/ListenerComponent";
import { XYPair } from "../utils/types";

export class MouseClickListener extends ListenerComponent {
    state: XYPair | undefined;
    target: string;
    event: string;

    constructor() {
        super();
        this.target = "canvas";
        this.event = "click";

        this.addInstance();
        this.addEventListener();
    }
    
    handleEvent = (e: any) => {
        this.getInstances<MouseClickListener>().forEach((instance) => {
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
