import inquirer from "inquirer";

export const info = async (extras?: any[]) => await inquirer.prompt([
    {
        name: "crudClass",
        type: "input",
        message: "what is the class name to crud service?",
        default: "SequelizeCrudService"
    }, {
        name: "singularObject",
        type: "input",
        message: "what is the singular name to crud",
    }, {
        name: "pluralObject",
        type: "input",
        message: "what is the plural name to crud",
    }, {
        name: "path",
        type: "input",
        message: "what is the path where the files are located",
        default: "/"
    },
    ...extras || []
])