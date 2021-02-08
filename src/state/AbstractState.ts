import StateInterface from "@sps/state/StateInterface";
import Output from "@sps/console/Output";
import Context from "@sps/state/Context";
import StateResult from "@sps/state/StateResult";

export default abstract class AbstractState implements StateInterface {
    public abstract handle(output: Output, context: Context): Promise<StateResult>;

    public abstract next(context: Context): StateInterface | null;
}