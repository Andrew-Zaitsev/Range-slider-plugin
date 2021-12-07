type ObserverCallback = (arr: number[]) => void;

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

  public execute(...args: any[]): void {
    // console.log(args[0]);
    this.callbacks.forEach((callback: ObserverCallback) => callback(args));
  }

  public getCallbacks(): ObserverCallback[] {
    return this.callbacks;
  }
}
