import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { Screen } from "./Components/Screen";
import * as System from "./Systems/index";
import { Engine } from "./Engine/Engine";
import { ERRORS } from "./scripts/Errors";
import "./style.css";
import { Shape } from "./Components/Shape";
import { MousePositionListener } from "./EventListeners/MousePositionListener";
import { MousePosition } from "./Components/MousePosition";

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

    canvas.addEventListener("click",(e)=>{
        console.log(e.x,e.y);
    })

    engine = new Engine(canvas, context);

    createSystems(engine);

    createEntities(engine);
}

function createSystems(engine: Engine) {
    engine.addSystem(new System.Screen());
    engine.addSystem(new System.MouseFollower());
    engine.addSystem(new System.Renderer());
    //const clicker = new MousePositionListener();
    //const mouseInp = new System.MouseInput();
    //clicker.addObserver(mouseInp);
    //engine.addSystem(mouseInp);
}

function createEntities(engine: Engine) {
    // Create entity for rendering screen
    engine.addComponent(engine.addEntity(), new Screen());

    engine.addComponents(engine.addEntity(), [
        new Position(500, 500),
        new Velocity(),
        new Shape("Aqua", { h: 5, w: 5 }),
        new MousePosition()
    ]);

    engine.addComponents(engine.addEntity(), [
        new Position(111, 600),
        new Velocity(),
        new Shape("Coral", { h: 5, w: 5 }),
    ]);
}

function loop() {
    engine.update();
    window.requestAnimationFrame(loop);
}

setup();

window.requestAnimationFrame(loop);
