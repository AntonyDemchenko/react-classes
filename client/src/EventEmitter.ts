// import react from "react";

type StateType = {
  [index: string]: Array<{}>;
};

class EventEmitter {
  events: StateType;
  constructor() {
    this.events = {};
  }

  emit(eventName: string, data?: {}): void {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn: any) => {
        fn.call(null, data);
      });
    }
  }

  subscribe(eventName: string, fn: any) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (eventFn) => fn !== eventFn
      );
    };
  }

  unsubscribe(eventName: string, fn?: any) {
    // if (!this.events[eventName]) {
    //   this.events[eventName] = [];
    // }

    // this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (eventFn) => fn === eventFn
      );
    };
  }
}

const emitter = new EventEmitter();

export default emitter;
