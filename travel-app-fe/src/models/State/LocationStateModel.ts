import { Location } from '../Location';

export class LocationStateModel extends Object implements Location {
    id!: number;
    name!: string;
    description!: string;
    visited!: boolean;
    tag!: string;
}
