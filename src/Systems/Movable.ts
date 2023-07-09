import { Body } from "../Components/Body";
import { System } from "../Engine/System";
import { clamp } from "../utils/utils";

export class Move extends System {
    componentsRequired = new Set<Function>([Body]);
    update(entities: Set<number>): void {
        for (const entity of entities) {
            const components = this.engine.getComponents(entity);
            const body = components.get(Body);
            body.position.x = clamp(body.position.x + body.velocity.x, 0, 797);
            body.position.y = clamp(body.position.y + body.velocity.y, 0, 797);
        }
    }
}
