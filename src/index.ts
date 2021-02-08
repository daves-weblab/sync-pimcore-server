import "module-alias/register";
import {initPrompt} from "@sps/console/Prompt";
import StateMachine from "@sps/state/StateMachine";
import Output from "@sps/console/Output";
import DecideSyncDatabase from "@sps/database/DecideSyncDatabase";

(async () => {
    initPrompt();

    const process = new StateMachine(new Output(), new DecideSyncDatabase());
    const context = await process.execute();

    console.log(context);
})().catch((exception) => {
    console.error(exception);
});

