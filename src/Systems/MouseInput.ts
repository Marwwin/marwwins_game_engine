import { Position } from "../Components/Position";
import { System } from "../Engine/System";
import { MousePosition } from "../Components/MousePosition.ts";
import { MousePositionObserver } from "../EventListeners/MousePositionListener.ts";

export class MouseInput extends System implements MousePositionObserver {
    mousePosition: Position | undefined;
    hasChanged: boolean = false;
    componentsRequired = new Set<Function>([MousePosition]);

    constructor() {
        super();
    }

    update(entities: Set<number>): void {
        if (this.hasChanged && this.mousePosition) {
            console.log("updating");
            for (const entity of entities) {
                console.log("setting");
                const components = this.engine.getComponents(entity);
                const mouse = components.get(MousePosition).state;
                if (mouse) {
                    mouse.x = this.mousePosition.x;
                    mouse.y = this.mousePosition.y;
                }
            }
            this.hasChanged = false;
        }
    }

    setMousePosition(position: Position) {
        this.mousePosition = position;
        this.hasChanged = true;
    }
}
