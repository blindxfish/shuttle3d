//Aisle represent a vertical stack of levels (see level.js)

import Level from './level';


export default class Aisle{

    constructor (height,length,num){
        this.height = height;
        this.length = length;
        this.num = num;
        this.ownLevels = [];
        this.levelConstruct();
    }

    levelConstruct(){

                for(let i=0; i<this.height;i++){
                    let floor = new Level(1,i,1,2,true,this.num);
                    this.ownLevels.push(floor);
                    
                };

            
        
    }

}