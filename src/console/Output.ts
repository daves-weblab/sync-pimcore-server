export default class Output {
    private console: Console;

    constructor() {
        this.console = console;
    }

    writeln(...args) {
        this.console.log(...args);
    }

    error(...args) {
        this.console.error(...args);
    }
}