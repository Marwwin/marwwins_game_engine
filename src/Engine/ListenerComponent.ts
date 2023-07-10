import { Component } from "./Component";

export abstract class ListenerComponent extends Component {
    abstract target: string;
    abstract event: string;

    /**
     *
     * handleEvent must be defined as an arrow function so this is correct
     *
     * @param e: An event
     */
    abstract handleEvent(e: any): void;

    static eventListenerAdded: Map<Function, boolean> = new Map();
    static instances: Map<Function, ListenerComponent[]> = new Map();

    getInstances<T extends ListenerComponent>(): T[] {
        const instances = ListenerComponent.instances.get(this.constructor);
        return instances as T[];
    }

    addInstance() {
        const instances = ListenerComponent.instances.get(this.constructor);
        if (instances === undefined) {
            ListenerComponent.instances.set(this.constructor, [this]);
            return;
        }
        instances.push(this);
    }

    addEventListener() {
        if (ListenerComponent.eventListenerAdded.get(this.constructor)) {
            return;
        }
        document
            .querySelector(this.target)
            ?.addEventListener(this.event, this.handleEvent);
        ListenerComponent.eventListenerAdded.set(this.constructor, true);
    }

    removeEventListener = () => {
        document
            .querySelector(this.target)
            ?.removeEventListener(this.event, this.handleEvent);
    };
}
