import {enumDatabaseProviders} from "../../config/constants";
import {Sequelize} from "sequelize-typescript";
import {GetEnv} from "../../config/config";

export const sequelizeProvider = {
    provide: enumDatabaseProviders.sequelize,
    useFactory: async () => {
        console.log(GetEnv("SEQUELIZE_TYPE"));
        const sequelize = new Sequelize(
            GetEnv("SEQUELIZE_DATABASE"),
            GetEnv("SEQUELIZE_USERNAME"),
            GetEnv("SEQUELIZE_PASSWORD"),
            {
                dialect: GetEnv("SEQUELIZE_TYPE") as any,
                port: parseInt(GetEnv("SEQUELIZE_PORT")),
                host: GetEnv("SEQUELIZE_HOST"),
                logging: false
            }
        );
        sequelize.addModels([]);
        await sequelize.sync();
        return sequelize;
    }
};
