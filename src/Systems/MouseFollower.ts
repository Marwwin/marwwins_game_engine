import { MousePosition } from "../Components/MousePosition";
import { Position } from "../Components/Position";
import { Velocity, calculateRelativeQuadrant } from "../Components/Velocity";
import { System } from "../Engine/System";
import { clamp } from "../utils/utils";

export class MouseFollower extends System {
    componentsRequired = new Set<Function>([Velocity, Position, MousePosition]);
    update(entities: Set<number>): void {
        for (const entity of entities) {
            const components = this.engine.getComponents(entity);
            const { velocity } = components.get(Velocity);
            const position = components.get(Position);
            const mouse = components.get(MousePosition).state;
            if (mouse !== undefined) {
                const n = calculateRelativeQuadrant(position, mouse)[1];
                position.x = clamp(position.x + n.x, 0, 797);
                position.y = clamp(position.y + n.y, 0, 797);
            }
        }
    }
}
