import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose'; // Import 'mongoose' here
import { User } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>, // Inject the userModel
        private jwtService: JwtService,
    ) {}

    async findOneByUsername(username: string): Promise<User | null> {
        try {
            const user = await this.userModel.findOne({ username }).exec();
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.findOneByUsername(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
