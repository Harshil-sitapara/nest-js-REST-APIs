import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from './Schemas/locations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'geo', schema: LocationSchema }]),
  ],
  providers: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
