import { Component, ComponentClass } from "./Component";

export class ComponentContainer {
    #map = new Map<Function, Component>();

    add(component: Component): void {
        this.#map.set(component.constructor, component);
    }

    get<T extends Component>(componentClass: ComponentClass<T>): T {
        return this.#map.get(componentClass) as T;
    }

    has(componentClass: Function): boolean {
        return this.#map.has(componentClass);
    }

    hasAll(componentClasses: Iterable<Function>): boolean {
        for (const cls of componentClasses) {
            if (!this.#map.has(cls)) {
                return false;
            }
        }
        return true;
    }
    delete(componentClass: Function): void {
        this.#map.delete(componentClass);
    }
}
