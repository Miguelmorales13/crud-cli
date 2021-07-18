export const capitalize = (value: string) => {
    return `${value.slice(0, 1).toUpperCase()}${value.slice(1, value.length)}`
}
export const ValidationsNestJs: any = {
    'string': '@IsString()',
    'number': '@IsNumber()',
    'Date': '@IsDate()',
    'boolean': '@IsBoolean()'
}

export interface IField {
    required: boolean
    field: string
    type: 'number' | 'string' | 'boolean' | 'Date'
}

export const importsNextValidations = (fields: IField[]) => {
    const newFields = fields.filter(field => field.required)
    const typos = ['number', 'string', 'boolean', 'Date'].filter(type => newFields.find(field => field.field == type))
    // @ts-ignore
    return `import { ${typos.map(typo => ValidationsNestJs[typo]).join(",")} from 'class-validator'`
}

