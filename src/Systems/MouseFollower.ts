import { MouseClickListener } from "../Components/MouseClickListener";
import { Body } from "../Components/Body";
import { calculateRelativeQuadrant, getVelocity } from "../utils/velocity";
import { System } from "../Engine/System";

export class MouseFollower extends System {
    componentsRequired = new Set<Function>([
        Body,
        MouseClickListener,
    ]);
    update(entities: Set<number>): void {
        for (const entity of entities) {
            const components = this.engine.getComponents(entity);
            const mouse = components.get(MouseClickListener);
            if (mouse.state === undefined) {
                return;
            }

            const body = components.get(Body);

            const newP = {
                x: body.position.x + body.shape.w / 2,
                y: body.position.y + body.shape.h / 2,
            };
            const canvas = this.engine.getCanvas().getBoundingClientRect();

            const newM = {
                x: mouse.state.x - canvas.left,
                y: mouse.state.y - canvas.top,
            };

            const direction = calculateRelativeQuadrant(newP, newM);
            body.velocity = getVelocity(direction, body.speed);
        }
    }
}
