import { Keys } from "../utils/types";

export const ERRORS = {
    NO_CANVAS: "NO_CANVAS",
    NO_CONTEXT: "NO_CONTEXT",
    NO_COMPONENT_FOUND: "NO COMPONENT FOUND",
    OTHER: "OTHER",
} as const;


export type Errors = Keys<typeof ERRORS>;

export default function error(reason: Errors): Error {
    return new Error(reason);
}
