import { MouseClickListener } from "../Components/MouseClickListener";
import { Position } from "../Components/Position";
import { Shape } from "../Components/Shape";
import { Velocity, calculateRelativeQuadrant } from "../Components/Velocity";
import { System } from "../Engine/System";

export class MouseFollower extends System {
    componentsRequired = new Set<Function>([
        Velocity,
        Position,
        Shape,
        MouseClickListener,
    ]);
    update(entities: Set<number>): void {
        for (const entity of entities) {
            const components = this.engine.getComponents(entity);
            const mouse = components.get(MouseClickListener);
            if (mouse.state === undefined) {
                return;
            }

            const velocity = components.get(Velocity);
            const position = components.get(Position);
            const shape = components.get(Shape);

            const newP = {
                x: position.x + shape.size.w / 2,
                y: position.y + shape.size.h / 2,
            };
            
            const direction = calculateRelativeQuadrant(newP, mouse.state);
            velocity.setDirection(direction);
        }
    }
}
