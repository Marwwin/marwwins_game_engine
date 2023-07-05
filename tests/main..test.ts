import { describe, expect, it } from "vitest";
import {ECS} from "../src/ecs/ECS"


describe("test ecs", () => {
  it("create entity", () => {
    const ecs = new ECS();
    const entity = ecs.addEntity();
    expect(entity).toBe(0);
    expect(ecs.numberOfEntities()).toBe(1)
    ecs.removeEntity(entity);
    expect(ecs.numberOfEntities()).toBe(1)
    ecs.update();
    expect(ecs.numberOfEntities()).toBe(0)
  });
});
