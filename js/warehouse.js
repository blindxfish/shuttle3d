import Aisle from "./aisle";

export default class Warehouse{

    constructor(numberOfAisles,lengthOfAisles,heightOfAisles){
        this.numberOfAisles = numberOfAisles;
        this.lengthOfAisles = lengthOfAisles;
        this.heightOfAisles = heightOfAisles;
        this.aislesArray = [];
        this.aisleConstruct();
    }

    aisleConstruct(){

        for(let a=0; a<=this.numberOfAisles; a++){

            let aisle = new Aisle(this.heightOfAisles, this.lengthOfAisles, a);
            this.aislesArray.push(aisle)
        }
    }


}