import { Component } from "./Component";

export abstract class ComponentListener extends Component {
    abstract target: string;
    abstract event: string;

    static eventListenerAdded: boolean = false;
    static instances: ComponentListener[] = [];

    abstract handleEvent(e: any): void;

    addEventListener() {
        if (ComponentListener.eventListenerAdded) {
            return;
        }
        document
            .querySelector(this.target)
            ?.addEventListener(this.event, this.handleEvent);
        ComponentListener.eventListenerAdded = true;
    }

    removeEventListener = () => {
        document
            .querySelector(this.target)
            ?.removeEventListener(this.event, this.handleEvent);
    };
}
