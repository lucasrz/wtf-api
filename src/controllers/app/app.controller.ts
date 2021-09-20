import { JwtAuthGuard } from './../../guards/auth.guard';
import { AuthService } from './../../services/auth/auth.service';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
}
