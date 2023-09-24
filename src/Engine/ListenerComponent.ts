import { Component } from "./Component";

export abstract class ListenerComponent extends Component {
    abstract target: string;
    abstract event: string;

    static eventListenerAdded: Map<Function, boolean> = new Map();
    static instances: Map<Function, ListenerComponent[]> = new Map();

    addInstance() {
        const instances = ListenerComponent.instances.get(this.constructor);
        if (instances === undefined) {
            ListenerComponent.instances.set(this.constructor, [this]);
            return;
        }
        instances.push(this);
    }

    getInstances<T extends ListenerComponent>(): T[] {
        const instances = ListenerComponent.instances.get(this.constructor);
        return instances as T[];
    }

    /**
     *
     * handleEvent must be defined as an arrow function so this is correct
     *
     * @param e: An event
     */
    handleEvent = (e: any): void => {
        this.getInstances<this>().forEach((instance: any) => {
            instance.updateState(e);
        });
    };

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
