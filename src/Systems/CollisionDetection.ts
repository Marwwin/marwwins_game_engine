import { Body } from "../Components/Body";
import { System } from "../Engine/System";

export class CollisionDetection extends System{
    componentsRequired = new Set<Function>([Body]);
    update(entities: Set<number>): void {
        const 
        for (const entity of entities){
            const body = this.engine.getComponents(entity);

        }
    }

}

function getBodyBoundingRect(body:Body){
    return {
        left: body.position.x,
        right: body.position.x + body.shape.w,
        top: body.position.y,
        bottom: body.position.y + body.shape.h
    }
}