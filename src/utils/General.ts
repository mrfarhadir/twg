export function generate_id(): string {
    return Math.random().toString(24).slice(2)
}

export function sleep(second: number): Promise<true> {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), second * 1000)
    })
}