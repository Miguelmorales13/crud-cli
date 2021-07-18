#!/usr/bin/env node
import inquirer from "inquirer";
import {IndexNestjs} from "./nestjs";

const init = async () => {
    const types = await inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Type field',
            choices: ['nestjs', 'react', 'java']
        },
    ])
    switch (types.type) {
        case 'nestjs':
            const index = new IndexNestjs()
            await index.init()
            break
        default:
            break;
    }

}
init().then().catch(console.log)
