import { ERRORS } from "../scripts/Errors";
import { Component } from "./Component";
import { ComponentContainer } from "./ComponentContainer";
import { Entity } from "./Entity";
import { System } from "./System";

export class Engine {
    #entities = new Map<Entity, ComponentContainer>();
    #systems = new Map<System, Set<Entity>>();

    #nextEntityID = 0;
    #entitiesToDestroy = new Array<Entity>();

    #canvas: HTMLCanvasElement;
    #context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.#canvas = canvas;
        this.#context = context;
    }

    // API: Entities

    addEntity(): Entity {
        let entity = this.#nextEntityID;
        this.#nextEntityID++;
        this.#entities.set(entity, new ComponentContainer());
        return entity;
    }

    removeEntity(entity: Entity): void {
        this.#entitiesToDestroy.push(entity);
    }

    numberOfEntities(): number {
        return this.#entities.size;
    }
    // API: Components

    addComponent(entity: Entity, component: Component): void {
        this.#entities.get(entity)?.add(component);
        this.#checkE(entity);
    }

    addComponents(entity: Entity, components: Component[]): void {
        for (const component of components) {
            this.#entities.get(entity)?.add(component);
            this.#checkE(entity);
        }
    }

    getComponents(entity: Entity): ComponentContainer {
        const comp = this.#entities.get(entity);
        if (comp === undefined) {
            throw new Error(ERRORS.NO_COMPONENT_FOUND);
        }
        return comp;
    }

    removeComponent(entity: Entity, componentClass: Function): void {
        this.#entities.get(entity)?.delete(componentClass);
        this.#checkE(entity);
    }

    // API: Systems

    addSystem(system: System): void {
        if (system.componentsRequired.size === 0) {
            console.warn("System not added: empty Components list.");
            console.warn(system);
            return;
        }
        system.engine = this;

        this.#systems.set(system, new Set());
        for (const entity of this.#entities.keys()) {
            this.#checkES(entity, system);
        }
    }

    removeSystem(system: System): void {
        this.#systems.delete(system);
    }

    update(): void {
        for (const [system, entites] of this.#systems.entries()) {
            system.update(entites);
        }

        while (this.#entitiesToDestroy.length > 0) {
            const next = this.#entitiesToDestroy.pop();
            if (next !== undefined) this.#destroyEntity(next);
        }
    }


    // Internal state checks and mutations

    #destroyEntity(entity: Entity): void {
        this.#entities.delete(entity);
        for (const entities of this.#systems.values()) {
            entities.delete(entity);
        }
    }

    #checkE(entity: Entity): void {
        for (const system of this.#systems.keys()) {
            this.#checkES(entity, system);
        }
    }
    #checkES(entity: Entity, system: System): void {
        const have = this.#entities.get(entity);
        const need = system.componentsRequired;
        if (have?.hasAll(need)) {
            this.#systems.get(system)?.add(entity);
        } else {
            this.#systems.get(system)?.delete(entity);
        }
    }

    getContext() {
        return this.#context;
    }

    getCanvas() {
        return this.#canvas;
    }
}
