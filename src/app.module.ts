import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './database/typeorm.config';
import { JobsModule } from './modules/jobs/jobs.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CitiesModule } from './modules/cities/cities.module';
import { DomainesModule } from './modules/domaines/domaines.module';
import { CandidaturesModule } from './modules/candidatures/candidatures.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { EntreprisesModule } from './modules/entreprises/entreprises.module';




@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UsersModule,
    JobsModule,
    CitiesModule,
    EntreprisesModule,
    DomainesModule,
    AuthModule,
    CandidaturesModule,
    ProfilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
