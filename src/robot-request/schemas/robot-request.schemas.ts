import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Commands{
    START = 'Start the engine',
    STOP = 'Turn off the engine',
    GO = 'Move to the coordinate',
}

@Schema({
    timestamps: true
})
export class RobotRequest{

    @Prop()
    operatorId: number;

    @Prop()
    command: Commands;

}

export const RobotRequestSchema = SchemaFactory.createForClass(RobotRequest)
