import { Body } from "../Components/Body";
import { System } from "../Engine/System";

export class Renderer extends System {
    componentsRequired = new Set<Function>([Body]);
    update(entities: Set<number>): void {
        for (const entity of entities) {
            const components = this.engine.getComponents(entity);
            const body = components.get(Body);

            const ctx = this.engine.getContext();
            ctx.fillStyle = body.colour;
            ctx.fillRect(
                body.position.x,
                body.position.y,
                body.shape.w,
                body.shape.h
            );
        }
    }
}
