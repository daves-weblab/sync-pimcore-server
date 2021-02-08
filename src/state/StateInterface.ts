import Output from "@sps/console/Output";
import Context from "@sps/state/Context";
import StateResult from "@sps/state/StateResult";

export default interface StateInterface {
    handle(output: Output, context: Context): Promise<StateResult>

    next(context: Context): StateInterface | null
}