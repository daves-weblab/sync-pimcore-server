import prompt from "prompt";

export function initPrompt() {
    prompt.message = "";
    prompt.delimiter = "";

    prompt.start();
}

export function decision(description: string): Field {
    return {
        description: `${description} (yes, no)`,
        default: "yes",
        type: "string",
        before: (value) => {
            if (!value) {
                return true;
            }

            return value.toLowerCase().charAt(0) !== "n";
        }
    }
}

export interface Field {
    description?: string;
    type?: string;
    pattern?: RegExp,
    message?: string;
    hidden?: boolean;
    replace?: string,
    default?: string | number | boolean;
    required?: boolean;
    before?: (value) => number | string | boolean
}

export default class Prompt {
    private fields: { [key: string]: Field } = {};

    public addField(name: string, field: Field): Prompt {
        this.fields[name] = field;

        return this;
    }

    public getFields(): { [key: string]: Field } {
        return this.fields;
    }

    public prompt(): Promise<{ [key: string]: string | number | boolean }> {
        return new Promise<{ [key: string]: string | number | boolean }>((resolve, reject) => {
            prompt.get({properties: this.getFields()}, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }
}