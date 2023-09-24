import { Body, getBodySpecs } from "../Components/Body";
import { Engine } from "../Engine/Engine";
import { System } from "../Engine/System";

export class CollisionDetection extends System {
    componentsRequired = new Set<Function>([Body]);
    update(entities: Set<number>): void {
        const COLUMNS = 10;

        drawDebugLines(this.engine, COLUMNS);

        const partition = spatialPartitioning(entities, this.engine, COLUMNS);
        let i = 0;

        for (const entity of entities) {
            const component = this.engine.getComponents(entity);
            const body = component.get(Body);
            const rect = getBodyBoundingRect(body);
            const { x, y } = getSpatialPos(
                this.engine.getCanvas().height,
                this.engine.getCanvas().width,
                body,
                COLUMNS
            );
            partition.get(x + "-" + y)?.flatMap((e) => {
                if (e === entity) {
                    return [];
                }
                const b = getBodySpecs(this.engine.getComponents(e).get(Body));
                console.log(entity,e,
                    rect.left < b.left,
                    rect.right > b.left,
                    rect.bottom > b.top,
                    rect.top > b.bottom
                );

                if (
                    rect.left >= b.right &&
                    rect.right >= b.left &&
                    rect.bottom >= b.top &&
                    rect.top > b.bottom
                )
                    console.log("rect left or right");

                return b;
            });
        }
        console.log();
    }
}

function spatialPartitioning(
    entities: Set<number>,
    engine: Engine,
    columns: number
) {
    const partitions = new Map<any, number[]>();
    for (const entity of entities) {
        const component = engine.getComponents(entity);
        const body = component.get(Body);
        const { x, y } = getSpatialPos(
            engine.getCanvas().height,
            engine.getCanvas().width,
            body,
            columns
        );
        const pos = partitions.get(x + "-" + y);
        if (pos === undefined) {
            partitions.set(x + "-" + y, [entity]);
        } else {
            pos.push(entity);
        }
    }
    return partitions;
}

function getSpatialPos(
    height: number,
    width: number,
    body: Body,
    columns: number
) {
    const x = Math.floor(body.position.x / (width / columns));
    const y = Math.floor(body.position.y / (height / columns));
    return { x, y };
}

function drawDebugLines(engine: Engine, n: number) {
    const context = engine.getContext();
    const canvas = engine.getCanvas();
    context.beginPath();

    for (let i = 0; i < n; i++) {
        context.strokeStyle = "red";

        const column = Math.floor(canvas.width / n) * i;
        context.moveTo(column, 0);
        context.lineTo(column, canvas.height);

        const row = Math.floor(canvas.height / n) * i;
        context.moveTo(0, row);
        context.lineTo(canvas.width, row);
    }
    context.stroke();
}

function getBodyBoundingRect(body: Body) {
    return {
        left: body.position.x,
        right: body.position.x + body.shape.w,
        top: body.position.y,
        bottom: body.position.y + body.shape.h,
    };
}
