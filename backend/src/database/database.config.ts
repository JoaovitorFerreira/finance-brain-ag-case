import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/modules/user/entities/user.entity";

export const postgressConnection: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'simform',
  username: 'postgres',
  entities: [User],
  database: 'farmcase',
  synchronize: true,
  logging: true,
}
