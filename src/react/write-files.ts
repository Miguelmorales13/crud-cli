import {capitalize, importsNextValidations, readFile, ValidationsNestJs, writeFile} from "../utils";
import {IWriteFiles} from "../models/i-write-files";
import path from "path";


export class WriteFiles implements IWriteFiles {
    className: string;
    path: string;
    plural: string;
    singular: string;
    fields: any[];

    constructor(className: string, path: string, plural: string, singular: string, fields: any[]) {
        this.className = className;
        this.path = path;
        this.plural = plural;
        this.singular = singular;
        this.fields = fields;
    }

    async generateAll() {
        await this.writeProvider()
        await this.writeService()
        await this.writeEntity()
        await this.writeCreateDto()
        await this.writeUpdateDto()
        await this.writeModule()
    }

    async writeProvider() {
        await writeFile(path.join(this.path, `${this.plural}.provider.ts`), `
import { ${capitalize(this.singular)} } from './entities/${this.singular}.entity';

export const ${this.plural}Providers = [
    {
        provide: '${this.plural.toUpperCase()}_PROVIDER',
        useValue: ${capitalize(this.singular)},
    },
];
        `)
    }

    async writeCreateDto(): Promise<any> {
        const fieldsGenerated = this.fields.map(({type, field}) => {
            return `
    ${ValidationsNestJs[type]}
    @ApiProperty()
    @Expose() ${field}?: ${type};`
        }).join("")
        await writeFile(path.join(this.path, 'dto', `create-${this.singular}.dto.ts`), `
import { Expose } from 'class-transformer';
import { Create${capitalize(this.singular)}Dto } from './create-${this.singular}.dto';
${importsNextValidations(this.fields)}
import { ApiProperty } from '@nestjs/swagger';

export class Create${capitalize(this.singular)}Dto  {
    ${fieldsGenerated}
}
        `,)
    }

    async writeEntity(): Promise<any> {
        const fieldsGenerated = this.fields.map(field => {
            return `
    @Column${field.required ? '({allowNull:false})' : ''}
    ${field.field}?: ${field.type};`
        }).join("")
        await writeFile(path.join(this.path, 'entities', `${this.singular}.entity.ts`), `
import { Column, Table } from 'sequelize-typescript';
import { Base } from '../../../databases/entities/base';

@Table({
  underscored: true,
  paranoid: true,
  timestamps: true,
})

export class ${capitalize(this.singular)} extends Base<${capitalize(this.singular)}> {
  ${fieldsGenerated}
}
`)
    }

    async writeModule(): Promise<any> {
        let content: string = await readFile(path.join(this.path, `${this.plural}.module.ts`))
        content = content.replace(/.controller';/g, `.controller';
import { ${this.plural}Providers } from './${this.plural}.provider';`)
        content = content.replace(/Service\]/g, `Service,...${this.plural}Providers]`)
        await writeFile(path.join(this.path, `${this.plural}.module.ts`), content)
    }

    async writeService(): Promise<any> {
        await writeFile(path.join(this.path, `${this.plural}.service.ts`), `
import { Inject, Injectable } from '@nestjs/common';
import { Create${capitalize(this.singular)}Dto } from './dto/create-${this.singular}.dto';
import { Update${capitalize(this.singular)}Dto } from './dto/update-${this.singular}.dto';
import { ${this.className} } from '../crud/${this.className}';
import { ${capitalize(this.singular)} } from './entities/${this.singular}.entity';

@Injectable()
export class ${capitalize(this.plural)}Service extends ${this.className}<
  ${capitalize(this.singular)},
  Create${capitalize(this.singular)}Dto,
  Update${capitalize(this.singular)}Dto
> {
  constructor(
    @Inject('${this.plural.toUpperCase()}_PROVIDER') private readonly ${this.plural}: typeof ${capitalize(this.singular)},
  ) {
    super(${this.plural});
  }
}
`)
    }

    async writeUpdateDto(): Promise<any> {
        await writeFile(path.join(this.path, 'dto', `update-${this.singular}.dto.ts`), `
import { Create${capitalize(this.singular)}Dto } from './create-${this.singular}.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Update${capitalize(this.singular)}Dto extends Create${capitalize(this.singular)}Dto {
    @IsNumber()
    @ApiProperty()
    id?: number;
    createdAt?: string;
    updatedAt?: string;
}
        `)
    }

}
