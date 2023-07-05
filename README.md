# Marwwins Game Engine

Based on [A TypesScript ECS in 99 Lines of Code ](https://maxwellforbes.com/posts/typescript-ecs-implementation/)

## High level

*Entities* are things (ID numbers) that you can register any amount of Components to

*Components* are basically POJOs (plain old javascript objects) that "should not" contain any logic only data (this rule might be broken sometimes).

*Systems* is how you can perform logic on entities and their components.

Calling `engine.update()` will in turn call the update function on each System registered in the engine 

## Howto

### Create Engine
```ts
    const engine = new Engine(canvas, context);
```

### Create Entity

An entity is just an id number and can be created by calling `engine.addEntity()`

### Create components

Create a new class that extends the Component class.

```ts
import { Component } from "../Engine/Component";

export class Position extends Component {
    constructor(public x: number, public y: number) {
        super();
    }
}
```

#### Register components

Register components with `engine.addComponent(entity, new Component())`

Multiple components can be registered at the same time using `addComponents()` example:

```ts
    engine.addComponents(engine.addEntity(), [
        new Position(500, 500),
        new Velocity(),
        new Shape("Aqua", { h: 10, w: 10 }),
        new MouseClickListener(),
    ]);
```

### Create System

Create a new system by extending the System class. 

Give the required components for the system as a Set in the `componentsRequired` field.

Write the logic in the `update` method, which takes a list of all the entities that contain the given Components in `componentsRequired`

```ts
export class Move extends System {
    componentsRequired = new Set<Function>([Velocity, Position]);
    update(entities: Set<number>): void {
        for (const entity of entities) {
            const components = this.engine.getComponents(entity);
            const { velocity } = components.get(Velocity);
            const position = components.get(Position);
            position.x = position.x + velocity.x;
            position.y = position.y + velocity.y;
        }
    }
}
```
