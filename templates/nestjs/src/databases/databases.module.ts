import { Module } from "@nestjs/common";
import { sequelizeProvider } from "./providers/sequelize";

@Module({
  providers: [sequelizeProvider],
  exports: [sequelizeProvider],
})
export class DatabasesModule {}
