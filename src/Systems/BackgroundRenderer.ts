import { Entity } from "../Engine/Entity";
import { System } from "../Engine/System";

export class BackgroundRenderer extends System {
    componentsRequired = new Set<Function>([Screen]);
    update(entities: Set<Entity>): void {
            const context = this.engine.getContext();
            const canvas = this.engine.getCanvas();
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
    }
}
