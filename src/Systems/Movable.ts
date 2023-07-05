import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { System } from "../Engine/System";
import { clamp } from "../utils/utils";

export class Move extends System {
    componentsRequired = new Set<Function>([Velocity, Position]);
    update(entities: Set<number>): void {
        for (const entity of entities) {
            const components = this.engine.getComponents(entity);
            const { velocity } = components.get(Velocity);
            const position = components.get(Position);

            position.x = clamp(position.x + velocity.x, 0, 797);
            position.y = clamp(position.y + velocity.y, 0, 797);
        }
    }
}
