import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SportModule } from './sport/sport.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClubModule } from './club/club.module';
import { TournamentModule } from './tournament/tournament.module';
import { SeasonModule } from './season/season.module';
import { PlayerModule } from './player/player.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/GlobalExceptionFilter';
import { MatchModule } from './match/match.module';
import { MatchdayModule } from './matchday/matchday.module';
import { StageModule } from './stage/stage.module';

@Module({
  imports: [
    SportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ClubModule,
    TournamentModule,
    SeasonModule,
    PlayerModule,
    NewsModule,
    AuthModule,
    UsersModule,
    MatchModule,
    MatchdayModule,
    StageModule,
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
