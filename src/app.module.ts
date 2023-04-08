import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Author } from './typeorm/entities/Author';
import { Book } from './typeorm/entities/Book';
import { BookStock } from './typeorm/entities/BookStock';
import { Distributor } from './typeorm/entities/Distributor';
import { Genre } from './typeorm/entities/Genre';
import { Notification } from './typeorm/entities/Notification';
import { Publisher } from './typeorm/entities/Publisher';
import { Reservation } from './typeorm/entities/Reservation';
import { Role } from './typeorm/entities/Roles';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { BooksModule } from './books/books.module';
import { PublishersModule } from './publishers/publishers.module';
import { DistributorsModule } from './distributors/distributors.module';
import { GenresModule } from './genres/genres.module';
import { AuthorsModule } from './authors/authors.module';
import { BookStocksModule } from './book-stocks/book-stocks.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/role.guard';
import { JwtAuthGuard } from './auth';
import { Audit } from './typeorm/entities/Audit';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'MODAyam1',
      database: 'slbms',
      entities: [
        Author,
        Book,
        Distributor,
        Genre,
        Notification,
        Publisher,
        Reservation,
        Role,
        User,
        BookStock,
        Audit,
      ],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    BooksModule,
    PublishersModule,
    DistributorsModule,
    GenresModule,
    AuthorsModule,
    BookStocksModule,
    ReservationsModule,
    AuthModule,
    LoggerModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule {}
