import { userOptions } from '../model/optionsTypes';

// type ObserverCallbackArgs = Record<string, unknown>;
type ObserverCallback = (data: userOptions) => void;

export default class Observer {
  private callbacks: ObserverCallback[];

  constructor() {
    this.callbacks = [];
  }

  public subscribe(fn: ObserverCallback):void {
    this.callbacks.push(fn);
  }

  public unsubscribe(fn: ObserverCallback):void {
    this.callbacks = this.callbacks.filter((callback) => callback !== fn);
  }

  public emit(data: userOptions): void {
    // console.log(args[0]);
    this.callbacks.forEach((callback: ObserverCallback) => callback(data));
  }

  public getCallbacks(): ObserverCallback[] {
    return this.callbacks;
  }
}
