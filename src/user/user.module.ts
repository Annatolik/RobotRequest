import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schemas';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
  JwtModule.register({ secret: 'your-secret-key' }),
  PassportModule.register({ defaultStrategy: 'local' })],
  controllers: [UserController],
  providers: [UserService, LocalStrategy]
})
export class UserModule {}
