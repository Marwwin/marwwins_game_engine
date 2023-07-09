import { Component } from "./Component";

export abstract class Subscriber extends Component{
    abstract update(e: any): void;
}
