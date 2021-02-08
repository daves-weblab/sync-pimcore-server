import DatabaseConfigurationInterface from "@sps/state/context/DatabaseConfigurationInterface";

export default class Context {
    syncDatabase?: boolean = null;
    sourceDatabase?: DatabaseConfigurationInterface
    targetDatabase?: DatabaseConfigurationInterface
}