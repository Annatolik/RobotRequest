import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { RobotRequestService } from './robot-request.service';
import { RobotRequest } from './schemas/robot-request.schemas';
import { LocalAuthGuard } from 'src/user/local-auth.guard';

@Controller('robot-request')
export class RobotRequestController {
    constructor(private robotRequestService: RobotRequestService){}

    @Get()
    async getAllRequests(): Promise<RobotRequest[]> {
        return this.robotRequestService.findAll()
    }

    @UseGuards(LocalAuthGuard)
    @Post()
    async createRobotRequest(
        @Body() robotRequest: RobotRequest,
        @Request() req,
    ): Promise<RobotRequest> {
        const operatorId = req.user.operatorId;


        if (robotRequest.command === 'Move to the coordinate') {
            const isEngineOn = this.robotRequestService.checkEngineStatus(); 

            if (!isEngineOn) {
                throw new Error('The engine is turned off. The robot cannot move.');
            }
        } else if(robotRequest.command === 'Turn off the engine'){
            this.robotRequestService.turnEngineOff();
        } else if(robotRequest.command === 'Start the engine'){
            this.robotRequestService.turnEngineOn();
        }

        robotRequest.operatorId = operatorId;

        return this.robotRequestService.create(robotRequest);
    }
}

