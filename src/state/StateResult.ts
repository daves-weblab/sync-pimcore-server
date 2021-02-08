export default class StateResult {
    hasError: boolean = false;
    error?: Error = null;
    abort: boolean = false;
    body?: object = null;
}