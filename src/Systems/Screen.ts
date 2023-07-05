import { Screen } from "../Components/Screen";
import { Entity } from "../Engine/Entity";
import { System } from "../Engine/System";

export class BackgroundRenderer extends System {
    componentsRequired = new Set<Function>([Screen]);
    update(entities: Set<Entity>): void {
        for (const entity of entities) {
            const { color } = this.engine.getComponents(entity).get(Screen);
            const context = this.engine.getContext();
            const canvas = this.engine.getCanvas();
            context.fillStyle = color;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}
