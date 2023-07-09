import { XYPair, type Keys } from "./types";
import { Body } from "../Components/Body";

type DirectionsValues = (typeof DIRECTIONS)[DirectionKeys];
type DirectionKeys = Keys<typeof DIRECTIONS>;

const DIAGONAL = 0.7071; // 0.7071 is an approximation of sqrt(2) / 2

export const DIRECTIONS = {
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    UP_LEFT: { x: -DIAGONAL, y: -DIAGONAL },
    UP_RIGHT: { x: DIAGONAL, y: -DIAGONAL },
    DOWN_LEFT: { x: -DIAGONAL, y: DIAGONAL },
    DOWN_RIGHT: { x: DIAGONAL, y: DIAGONAL },
    STATIONARY: { x: 0, y: 0 },
} as const;

const fourthQ = [DIRECTIONS.RIGHT, DIRECTIONS.UP_RIGHT, DIRECTIONS.UP];
const thirdQ = [DIRECTIONS.UP, DIRECTIONS.UP_LEFT, DIRECTIONS.LEFT];
const secondQ = [DIRECTIONS.LEFT, DIRECTIONS.DOWN_LEFT, DIRECTIONS.DOWN];
const firstQ = [DIRECTIONS.DOWN, DIRECTIONS.DOWN_RIGHT, DIRECTIONS.RIGHT];

export function calculateRelativeQuadrant(
    reference: XYPair,
    target: XYPair
): DirectionKeys {
    const deltaX = target.x - reference.x;
    const deltaY = target.y - reference.y;

    if (deltaX > 0 && deltaY > 0) {
        return "DOWN_RIGHT";
    }
    if (deltaX < 0 && deltaY > 0) {
        return "DOWN_LEFT";
    }
    if (deltaX < 0 && deltaY < 0) {
        return "UP_LEFT";
    }
    if (deltaX > 0 && deltaY < 0) {
        return "UP_RIGHT";
    } else {
        return "STATIONARY";
    }
}

export function getVelocity(key: DirectionKeys, scalar: number) {
    const { x, y } = DIRECTIONS[key];
    return { x: x * scalar, y: y * scalar };
}

