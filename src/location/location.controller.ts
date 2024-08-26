import { Controller, Get, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './Schemas/locations.schema';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  async findLocations(): Promise<Location[]> {
    return this.locationService.findAllLocations();
  }

  @Get('nearBy')
  async findNearestLoc(
    @Body() body: { long: string; lat: string; maxDis: string },
  ): Promise<Location[]> {
    const numLong: number = Number(body.long);
    const numLat: number = Number(body.lat);
    const maxDis: number = Number(body.maxDis);
    const nearestLocation = await this.locationService.findNearestLoc(
      numLong,
      numLat,
      maxDis,
    );
    return nearestLocation;
  }
}
