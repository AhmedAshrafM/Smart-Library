import {
  Controller,
  Dependencies,
  Bind,
  Get,
  Request,
  Post,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth';

@Dependencies(AuthService)
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  @Bind(Request())
  async login(req) {
    try {
      return await this.authService.login(req.user);
    } catch (error) {
      throw new NotFoundException('Login failed.');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Bind(Request())
  getProfile(req) {
    try {
      return req.user;
    } catch (error) {
      throw new NotFoundException('Failed to retrieve profile.');
    }
  }
}
