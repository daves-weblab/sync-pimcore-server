import Prompt from "@sps/console/Prompt";
import DatabaseConfigurationInterface from "@sps/state/context/DatabaseConfigurationInterface";

export default class DatabasePrompt {
    private cliPrompt: Prompt = new Prompt();

    constructor() {
        this.cliPrompt
            .addField("host", {
                required: true,
                description: "Host"
            })
            .addField("port", {
                type: "number",
                description: "Port",
                default: 3306
            })
            .addField("user", {
                required: true
            })
            .addField("password", {
                hidden: true
            })
            .addField("database", {
                required: true
            });
    }

    async prompt(): Promise<DatabaseConfigurationInterface> {
        return await this.cliPrompt.prompt();
    }
}