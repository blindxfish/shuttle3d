// Base unit of a storage space, those are stacked in different forms to became level, aisle, warehouse

export default class Location{

    constructor(x,y,z,numberOfSegments,side,aisle_number,level_number){
        this.x = x;
        this.y = y;
        this.z = z;
        this.numberOfSegments = numberOfSegments;
        this.side = side;
        this.aisle = aisle_number;
        this.level = level_number;
    }
}