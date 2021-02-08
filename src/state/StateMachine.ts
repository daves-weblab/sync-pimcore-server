import Output from "@sps/console/Output";
import StateInterface from "@sps/state/StateInterface";
import Context from "@sps/state/Context";

export default class StateMachine {
    private output: Output;
    private initialState: StateInterface;

    constructor(output: Output, initialState: StateInterface) {
        this.output = output;
        this.initialState = initialState;
    }

    public async execute(): Promise<Context> {
        let state = this.initialState;
        const context = new Context();

        while (state) {
            const result = await state.handle(this.output, context);

            if (result.hasError) {
                this.output.error(result.error);
            }

            if (result.abort) {
                this.output.error("State aborted execution.");
                return;
            }

            state = state.next(context);
        }

        return context;
    }
}