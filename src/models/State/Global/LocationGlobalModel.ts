import { LocationStateModel } from "../LocationStateModel";

export class LocationGlobalModel extends Object {
    constructor() {
        super();
        this.LocationList = new Array<LocationStateModel>();    
    }

    LocationList!: LocationStateModel[]; 
}
