export class EventEmitter {
    event = {} as EventTarget
    constructor() {
        this.event = new EventTarget()
    }

    emit<T>(name: string | number, data: T) {
        this.event.dispatchEvent(new CustomEvent(name.toString(), {
            detail: data
        }))
    }

    on<T>(name: string | number, callback: (params: T) => void) {
        this.event.addEventListener(name.toString(), (event: Event) => {
            const e = event as CustomEvent
            callback.bind(this)(e.detail)
        })
    }
}


