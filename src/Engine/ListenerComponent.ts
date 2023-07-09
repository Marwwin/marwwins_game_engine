import { Component } from "./Component";

export abstract class ListenerComponent extends Component {

    abstract target: string;
    abstract event: string;

    static eventListenerAdded: { [key: string]: boolean } = {};
    static instances: ListenerComponent[] = [];

    abstract handleEvent(e: any): void;

    addEventListener() {
        const className = this.constructor.name;
        if (ListenerComponent.eventListenerAdded[className]) {
            return;
        }
        document
            .querySelector(this.target)
            ?.addEventListener(this.event, this.handleEvent);
        ListenerComponent.eventListenerAdded[className] = true;
    }

    removeEventListener = () => {
        document
            .querySelector(this.target)
            ?.removeEventListener(this.event, this.handleEvent);
    };
}
