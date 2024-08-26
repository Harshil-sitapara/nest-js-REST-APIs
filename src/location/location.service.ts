import { Injectable } from '@nestjs/common';
import { Location } from './Schemas/locations.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel('geo')
    private locationModel = mongoose.Model<Location>,
  ) {}

  async findAllLocations(): Promise<Location[]> {
    const locations = await this.locationModel.find();
    return locations;
  }

  async findNearestLoc(long: number, lat: number,maxDis:number): Promise<Location[]> {
    var numLong:number = Number(long)
    var numLat:number = Number(lat)
    var maxDis:number = Number(maxDis)
    const nearestLocation = await this.locationModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [numLong, numLat],
          },
          $maxDistance:maxDis,
        },
      },
    });
    return nearestLocation;
  }
}