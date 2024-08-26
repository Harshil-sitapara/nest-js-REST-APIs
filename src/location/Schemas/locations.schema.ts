import { Prop, SchemaFactory } from "@nestjs/mongoose";

export class Location {
    @Prop({
      type: {
        coordinates: [Number],
        type: { type: String, enum: ['Point'], default: 'Point' },
      },
      required: true,
    })
    location: {
      coordinates: [number, number];
      type: string;
    };
  
    @Prop({ type: String, required: true })
    name: string;
  }

export const LocationSchema = SchemaFactory.createForClass(Location)
