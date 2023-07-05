import { Position } from "../Components/Position";
import { Shape } from "../Components/Shape";
import { System } from "../Engine/System";

export class Renderer extends System {
    componentsRequired = new Set<Function>([Position, Shape]);
    update(entities: Set<number>): void {
        for (const entity of entities) {
            const components = this.engine.getComponents(entity);
            const position = components.get(Position);
            const { color, size } = components.get(Shape);

            const ctx = this.engine.getContext();
            ctx.fillStyle = color;
            ctx.fillRect(position.x, position.y, size.w, size.h);
        }
    }
}
