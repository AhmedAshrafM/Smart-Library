import { Controller, Dependencies, Bind, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Dependencies(AuthService)
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Bind(Request())
  async login(req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Bind(Request())
  getProfile(req) {
    return req.user;
  }
}