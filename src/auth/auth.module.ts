import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'
import { GoogleStrategy } from './strategies/google.strategy'
import { User } from '../user/user.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
	imports: [
		PassportModule,
		SequelizeModule.forFeature([User]),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [AuthService, JwtStrategy, GoogleStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
