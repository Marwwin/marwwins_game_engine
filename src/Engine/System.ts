import { Engine } from "./Engine";
import { Entity } from "./Entity";

export abstract class System {
    abstract componentsRequired: Set<Function>;

    abstract update(entities: Set<Entity>): void;

    engine!: Engine;
}
