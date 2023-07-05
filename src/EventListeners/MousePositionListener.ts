import { Position } from "../Components/Position";
import { MouseInput } from "../Systems";

export interface MousePositionObserver {
    setMousePosition: (position: Position) => void;
}

export class MousePositionListener {
    #observers: MouseInput[] = [];
    #state: Position | undefined;

    constructor() {
        document.querySelector("canvas")?.addEventListener("click", (e) => {
            this.#state = { x: e.x, y: e.y };
            //this.notifyObservers();
        });
    }

    addObserver(observer: MouseInput) {
        this.#observers.push(observer);
    }

    notifyObservers() {
        console.log("notifying")
        for (const obs of this.#observers) {
            if (this.#state !== undefined) obs.setMousePosition(this.#state);
        }
    }
}
