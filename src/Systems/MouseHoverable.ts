import { Hoverable } from "../Components/Hoverable";
import { MouseMoveListener } from "../Components/MouseMoveListener";
import { Body } from "../Components/Body";
import { System } from "../Engine/System";

export class MouseHoverable extends System {
    componentsRequired = new Set<Function>([
        Hoverable,
        Body,
        MouseMoveListener,
    ]);
    update(entities: Set<number>): void {
        for (const entity of entities) {
            const components = this.engine.getComponents(entity);
            const body = components.get(Body);
            const mouse = components.get(MouseMoveListener);
            const widthOffset = body.shape.h;
            const heightOffset = body.shape.w;
            if (mouse.state) {
                if (
                    mouse.state.x > body.position.x &&
                    mouse.state.x < body.position.x + widthOffset &&
                    mouse.state.y > body.position.y &&
                    mouse.state.y < body.position.y + heightOffset
                ) {
                    const ctx = this.engine.getContext();
                    ctx.fillStyle = "black";
                    const { position, shape } = body;
                    const lines = [
                        `Entity: ${entity}`,
                        `x: ${position.x}`,
                        `y: ${position.y}`,
                    ];
                    const lineHeight = 15;
                    for (let i = 0; i < lines.length; i++) {
                        ctx.fillText(
                            lines[i],
                            mouse.state.x + 15,
                            mouse.state.y + i * lineHeight
                        );
                    }

                    ctx.strokeRect(position.x,position.y,shape.h,shape.w)
                }
            }
        }
    }
}
