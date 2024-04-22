import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { City } from "src/entities/city.entity";
import { Domaine } from "src/entities/domaine.entity";
import { Entreprise } from "src/entities/entreprise.entity";
import { Job } from "src/entities/job.entity";

export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        const typeOrmConfig: TypeOrmModuleOptions = {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: String(configService.get('DB_USERNAME'))  ,
            password: configService.get('PASSWORD') ,
            database: configService.get('DATABASE'),
            entities: [Job,City,Domaine,Entreprise],
            synchronize: Boolean(configService.get('TYPEORM_SYNC'))
        }
        return typeOrmConfig;
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configservice: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configservice),
    inject: [ConfigService]
}