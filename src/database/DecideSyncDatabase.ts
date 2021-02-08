import AbstractState from "@sps/state/AbstractState";
import StateInterface from "@sps/state/StateInterface";
import Output from "@sps/console/Output";
import Context from "@sps/state/Context";
import StateResult from "@sps/state/StateResult";
import Prompt, {decision} from "@sps/console/Prompt";
import SyncDatabase from "@sps/database/SyncDatabase";

export default class DecideSyncDatabase extends AbstractState {
    public async handle(output: Output, context: Context): Promise<StateResult> {
        const result = new StateResult();

        if (context.syncDatabase !== null) {
            output.writeln(`Sync database decision taken from sync-config: (${context.syncDatabase ? "yes" : "no"})`);
            return result;
        }

        const prompt = new Prompt().addField("syncDatabase", decision("Should the database be synced?"));
        const promptResult = await prompt.prompt();

        context.syncDatabase = !!promptResult.syncDatabase;

        return result;
    }

    public next(context: Context): StateInterface | null {
        return context.syncDatabase ? new SyncDatabase() : null;
    }
}