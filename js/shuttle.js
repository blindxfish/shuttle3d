//Shuttle is a device running in the aisles collecting the orders from the locations
import * as THREE from 'three';

//The look of the shuttle
const shuttle_geo = new THREE.BoxGeometry( 1, 0.2 , 1);
const shuttle_mat = new THREE.MeshBasicMaterial(
    {
        color:"red", 
        map: new THREE.TextureLoader().load('./images/Shuttle_texture.jpg'),        
});

//Shuttle factory class
export default class Shuttle extends THREE.Mesh{

    constructor(aisle_number,level_number,speed,numberOfLevels,numerOfLocations,shuttleNumber=0){
        super(shuttle_geo, shuttle_mat);
        this.aisle_number = aisle_number;
        this.level_number = level_number;
        this.speed = speed;
        this.numberOfLevels = numberOfLevels;
        this.numerOfLocations = numerOfLocations;
        this.busy = false;
        this.orders = []
        this.orderInProgress = false;
        this.shuttleNumber = shuttleNumber;
        this.position.x = 1;
        this.position.y = level_number;
        this.position.z = aisle_number*1*3-1+3;

    }

    //Method for receive order and put it into the orders list
    receiveOrder(){

    }

    //Method to pull out and work on the orders one by one
        /*     STEPS
        -check if there is orders in the orders array
        -take the first one
        -check the validity of the order, order is invalid if:
            -order is in another AISLE
            -order is not understandable
        -move the shuttle to the location:
            -check the level of the order
            -if order is on other level:
                -check if the level is free:
                    -if free go to lift and pass the level number
                    -if not free - give error ( level is occupied by shuttle XX - passing the order to it )
                -receive the arrival from the lift
                -restart the same order or continue
        -if arrived to the location:
            -do the operation:
                -if deposit, clear the order, start nex one or stay in idle if there is no more
                -if pickup - do the pickup

        */
    workOnOrders(){
        this.move();
    }

    //check if the level of the order is free
    checkIfLevelIsFree(){

    }

    move(){
        this.position.x+=this.speed;
        if(this.position.x-0.5 >= this.numerOfLocations-1 || this.position.x-0.5 <=0){
            this.speed=this.speed*(-1);
            console.log('change direction');
        }
    }
}