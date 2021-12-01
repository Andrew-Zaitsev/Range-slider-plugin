type ObserverCallback = () => void;

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

  public execute(): void {
    this.callbacks.forEach((callback) => callback());
  }

  public getCallbacks(): ObserverCallback[] {
    return this.callbacks;
  }
}
