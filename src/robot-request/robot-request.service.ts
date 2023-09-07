import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RobotRequest } from './schemas/robot-request.schemas';
import mongoose from 'mongoose';

@Injectable()
export class RobotRequestService {
    constructor(
        @InjectModel(RobotRequest.name)
        private robotRequestModel: mongoose.Model<RobotRequest>
    ){}

    private isEngineOn = false; 

    checkEngineStatus(): boolean {
        return this.isEngineOn;
    }

  turnEngineOn() {
    this.isEngineOn = true;
  }

  turnEngineOff() {
    this.isEngineOn = false;
  }

    async findAll(): Promise<RobotRequest[]> {
        const requests = await this.robotRequestModel.find()
        return requests;
    }

    async create(robotRequest: RobotRequest): Promise<RobotRequest>{
        const request = await this.robotRequestModel.create(robotRequest)
        return request
    }
}
