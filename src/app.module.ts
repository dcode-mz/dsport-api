import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SportModule } from './sport/sport.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClubModule } from './club/club.module';
import { LeagueModule } from './league/league.module';
import { CupModule } from './cup/cup.module';
import { SeasonModule } from './season/season.module';
import { AthleteModule } from './athlete/athlete.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/GlobalExceptionFilter';

@Module({
  imports: [
    SportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ClubModule,
    LeagueModule,
    CupModule,
    SeasonModule,
    AthleteModule,
    NewsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
