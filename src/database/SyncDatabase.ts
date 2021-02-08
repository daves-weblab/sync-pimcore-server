import AbstractState from "@sps/state/AbstractState";
import Output from "@sps/console/Output";
import Context from "@sps/state/Context";
import StateResult from "@sps/state/StateResult";
import StateInterface from "@sps/state/StateInterface";
import DatabaseConfigurationInterface from "@sps/state/context/DatabaseConfigurationInterface";
import DatabasePrompt from "@sps/database/sync/DatabasePrompt";
import chalk from "chalk";

export default class SyncDatabase extends AbstractState {
    public async handle(output: Output, context: Context): Promise<StateResult> {
        const result = new StateResult();

        output.writeln();
        output.writeln(chalk.bold("Sync database:"));
        output.writeln("==============");

        await this.promptDatabase(output, context, "sourceDatabase", "source");
        await this.promptDatabase(output, context, "targetDatabase", "target");

        return result;
    }

    public next(context: Context): StateInterface | null {
        return undefined;
    }

    private async promptDatabase(output: Output, context: Context, key: string, title: string) {
        output.writeln();

        if (this.isDatabaseConfigurationValid(context[key])) {
            output.writeln(`${chalk.underline.bold(title)} database config taken from sync-config: ${SyncDatabase.printDatabaseConfiguration(context[key])}`);
        } else {
            output.writeln(chalk.underline(`Please provide the database config for the ${chalk.underline.bold(title)} database.`));
            context[key] = await new DatabasePrompt().prompt();

            output.writeln();
            output.writeln(`Given ${chalk.underline.bold(title)} database config: ${SyncDatabase.printDatabaseConfiguration(context[key])}`);
        }
    }

    private isDatabaseConfigurationValid(configuration: DatabaseConfigurationInterface | null): boolean {
        if (!configuration) {
            return false;
        }

        const invalidFields = Object.keys(configuration).filter(key => !configuration[key]);

        return invalidFields.length === 0;
    }

    private static printDatabaseConfiguration(configuration: DatabaseConfigurationInterface) {
        return chalk.underline.bold(`${configuration.user}@${configuration.host}:${configuration.port}/${configuration.database}`);
    }
}