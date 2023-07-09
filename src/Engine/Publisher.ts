import { Subscriber } from "./Subscriber";

export type SubscriberClass<T extends Subscriber> = new (...args: any[]) => T;
export type PublisherClass<T extends Publisher> = new (...args: any[]) => T;

export abstract class Publisher {
    #subs: Array<Subscriber> = [];

    subscribe(sub: Subscriber) {
        this.#subs.push(sub);
    }
    publish(e:any){
        for (const sub of this.#subs){
            sub.update(e)
        }
    } 
}
