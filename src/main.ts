import { Body } from "./Components/Body";
import * as System from "./Systems/index";
import { Engine } from "./Engine/Engine";
import { ERRORS } from "./scripts/Errors";
import "./style.css";
import { MouseClickListener } from "./Components/MouseClickListener";
import { MouseMoveListener } from "./Components/MouseMoveListener";
import { Hoverable } from "./Components/Hoverable";

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
    engine.addSystem(new System.BackgroundRenderer());
    engine.addSystem(new System.Renderer());
    engine.addSystem(new System.CollisionDetection())
    engine.addSystem(new System.MouseFollower());
    engine.addSystem(new System.MouseHoverable());
    engine.addSystem(new System.Move());
}

function createEntities(engine: Engine) {
    // Create entity for rendering screen

    engine.addComponents(engine.addEntity(), [
        new Body({ x: 270, y: 500 }),
        new MouseClickListener(),
        new Hoverable(),
        new MouseMoveListener(),
    ]);
    engine.addComponents(engine.addEntity(), [
        new Body({ x: 240, y: 530 }),
        new MouseClickListener(),
        new Hoverable(),
        new MouseMoveListener(),
    ]);
    //engine.addComponents(engine.addEntity(), [
    //    new Body({ x: 680, y: 490 }),
    //    new MouseClickListener(),
    //    new Hoverable(),
    //    new MouseMoveListener(),
    //]);

   // engine.addComponents(engine.addEntity(), [
   //     new Body({ x: 111, y: 200 }),
   //     new Hoverable(),
   //     new MouseMoveListener(),
   // ]);
}

function loop() {
    engine.update();
    window.requestAnimationFrame(loop);
}

setup();

window.requestAnimationFrame(loop);
