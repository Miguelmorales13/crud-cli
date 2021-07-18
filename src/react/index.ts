import {WriteFiles} from './write-files'
import {info} from "../utils/global-questions";
import inquirer from "inquirer";
import path from "path";
import {WriteConfiguration} from "./write-configuration";

export class IndexReact {
    extras = [
        {
            name: "addAllConfiguration",
            type: "confirm",
            message: "Do you add validation pipe?",
            default: true
        },
    ]


    async init() {
        try {
            const responseInfo = await info(this.extras)
            const {path: relative, crudClass, pluralObject, singularObject, addAllConfiguration} = responseInfo
            if (addAllConfiguration) {
                await this.executeConfiguration()
            }
            const fields = await this.generate()
            const builder = new WriteFiles(crudClass, path.join(process.cwd(), relative), pluralObject, singularObject, fields);
            await builder.generateAll()

        } catch (e) {
            console.log(e)
        }
    }

    async executeConfiguration() {
        const configurations = new WriteConfiguration()
        await configurations.init()

    }

    async generate() {
        let other = true;
        const fields = []
        do {
            if (other) {
                fields.push(await this.generateQuestion())
            }
            const answers = await inquirer.prompt({
                type: 'confirm',
                name: 'name',
                message: 'Do you want to add another field?',
                default: true
            })
            other = answers.name

        } while (other);
        return fields
    }


    async generateQuestion() {
        const questions = [
            {
                type: 'input',
                name: 'field',
                message: 'Field without spaces',
                filter: function (val: string) {
                    return val.toLowerCase();
                },
                validate(value: string) {
                    return value.trim() != ""
                }
            },
            {
                type: 'list',
                name: 'type',
                message: 'Type field',
                choices: ['number', 'string', 'boolean', 'Date',]
            },
            {
                type: 'confirm',
                name: 'required',
                message: 'Is required?',
                default: true
            }
        ]
        return inquirer.prompt(questions)
    }
}

export default {
    WriteFiles
}