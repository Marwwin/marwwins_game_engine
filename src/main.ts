import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { Screen } from "./Components/Screen";
import * as System from "./Systems/index";
import { Engine } from "./Engine/Engine";
import { ERRORS } from "./scripts/Errors";
import "./style.css";
import { Shape } from "./Components/Shape";
import { MouseClickListener } from "./Components/MouseClickListener";
import { MouseMoveListener } from "./Components/MouseMoveListener";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

let engine: Engine;

function setup() {
    const canvas = document.querySelector("canvas");
    if (canvas === null) {
        throw new Error(ERRORS.NO_CANVAS);
    }
    const context = canvas.getContext("2d");
    if (context === null) {
        throw new Error(ERRORS.NO_CONTEXT);
    }

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    engine = new Engine(canvas, context);

    createSystems(engine);

    createEntities(engine);
}

function createSystems(engine: Engine) {
    engine.addSystem(new System.Screen());
    engine.addSystem(new System.MouseFollower());
    engine.addSystem(new System.Renderer());
    engine.addSystem(new System.Move());
}

function createEntities(engine: Engine) {
    // Create entity for rendering screen
    engine.addComponent(engine.addEntity(), new Screen());

    engine.addComponents(engine.addEntity(), [
        new Position(500, 500),
        new Velocity(),
        new Shape("Aqua", { h: 10, w: 10 }),
        new MouseClickListener(),
    ]);

    engine.addComponents(engine.addEntity(), [
        new Position(111, 600),
        new Velocity(),
        new Shape("Coral", { h: 5, w: 5 }),
        new MouseClickListener(),
    ]);
}

function loop() {
    engine.update();
    window.requestAnimationFrame(loop);
}

setup();

window.requestAnimationFrame(loop);
