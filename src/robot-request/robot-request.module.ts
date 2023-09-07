import { Module } from '@nestjs/common';
import { RobotRequestController } from './robot-request.controller';
import { RobotRequestService } from './robot-request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RobotRequest, RobotRequestSchema } from './schemas/robot-request.schemas';

@Module({
  imports: [MongooseModule.forFeature([{name: 'RobotRequest', schema: RobotRequestSchema}])],
  controllers: [RobotRequestController],
  providers: [RobotRequestService]
})
export class RobotRequestModule {}
