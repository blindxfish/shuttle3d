// Level defines a horizontal floor in the Aisle, 
// Every level can contains a shuttle, and every level contains two rows of locations and n-"length" of locations from each side.

import Location from './location';

export default class Level{
    constructor(length,height,depth,sides,shuttle,aisle){
        this.length = length;
        this.height = height;
        this.depth = depth;
        this.sides = 2;
        this.aisle = aisle;
        this.shuttle = false;
        this.shuttlenumber = 0;
        this.totelift = false;
        this.ownLocations = []
        this.zed = 3;
        this.locationConstruct();
    }

    locationConstruct(){
        for(let s=1; s<=this.zed; s++){
              
            if(s%2!=0){
            
                //for(let i=0; i<=this.length; i++){
                    let loc = new Location(this.length,this.height,s+this.aisle*3,this.length,s,this.aisle,this.height);
                    this.ownLocations.push(loc)
                //};
            }
            
        }
    }

    constructRack(){
        let rack = {
            sides:2,

        }
    }

    getLocations(){
        return this.locationArray;
    }
}