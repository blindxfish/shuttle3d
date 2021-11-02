import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Shuttle from './shuttle';
import Warehouse from './warehouse';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Add some light to the scene
let light = new THREE.AmbientLight(0xffffff, 0.5);
let light2 = new THREE.PointLight(0xffffff,0.5);

//base geometry and material for the warehouse and locations
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial(
    {
        color:"white", 
        transparent: 0.01, 
        opacity: 0.07
}
);
const cube = new THREE.Mesh( geometry, material );
//base geometry and material for the shuttle
const shuttle_geo = new THREE.BoxGeometry( 1, 0.2 , 1);
const shuttle_mat = new THREE.MeshBasicMaterial();

//the example cube *************************************************
cube.position.x = -5
cube.position.y = 5
cube.position.z = -10
cube.material.wireframe = true;
scene.add( cube );
//****************************************************************** */

//Camera position
camera.position.z = 5;

//Controls
const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( -17, 2, 7 );
controls.update();

// Generate the warehouse, aisles, levels, locations 
let numberOfAisles = 9;
let lengthOfAisles = 20;
let heightOfAisles = 14;
const levelGeometry = new THREE.BoxGeometry( lengthOfAisles, 1, 1, lengthOfAisles );

let warehouse = new Warehouse(numberOfAisles,lengthOfAisles,heightOfAisles);    
warehouse.aislesArray.forEach(aisles => {
        
 //   console.log(aisles)
    aisles.ownLevels.forEach(lev=>{

        lev.ownLocations.forEach(loc=>{
            
        let l = new THREE.Mesh( levelGeometry, material ); 
            l.position.x = lengthOfAisles/2
            l.position.y = loc.y
            l.position.z = loc.z
            l.numberOfSegments = lengthOfAisles
            
        scene.add(l)
        })
    })
});

// Generate the shuttles to the levels where they has to be
//create the shuttle holder array
let shuttleHolder = [];

addShuttle(12,0,1,0.01);
addShuttle(11,4,3,0.05);
addShuttle(9,4,2,0.2);
addShuttle(1,8,10);
addShuttle(51,0,3,0.01);
addShuttle(52,0,4,0.02);
addShuttle(53,0,5,0.04);
addShuttle(54,0,6,0.03);
addShuttle(55,0,7,0.04);
addShuttle(56,0,0,0.02);
addShuttle(57,0,8,0.05);
addShuttle(58,0,9,0.05);
addShuttle(59,0,10,0.03);
addShuttle(60,0,11,0.02);
addShuttle(61,0,12,0.06);
addShuttle(62,0,13,0.03);
addShuttle(99,9,1,0.04)
addShuttle(2,0,2,0.02)
addShuttle(3,1,13,0.09)
addShuttle(4,2,13,0.05)
addShuttle(5,6,13)
addShuttle(6,9,2)
//addShuttle(66,9,1)

//console.log(warehouse.aislesArray[0].ownLevels[0].ownLocations[0])
//console.log(shuttle.numberOfLevels, shuttle.numerOfLocations);

//add all the shutles to the scene
shuttleHolder.forEach(shut=>{
    scene.add(shut);
})

//Add the shuttle to the level
function addShuttle(shuttleNumber,aisle,level,speed=0.08){

    //check if shuttle number is used and if level is free
    let shutNumBusy = false;
    shuttleHolder.forEach(shut=>{
        if(shut.shuttleNumber == shuttleNumber || warehouse.aislesArray[aisle].ownLevels[level].shuttle == true){
            shutNumBusy = true;
        }
    })  

    if(shutNumBusy==false){
        let shuttle = new Shuttle(aisle,level,speed,heightOfAisles,lengthOfAisles,shuttleNumber);
        warehouse.aislesArray[aisle].ownLevels[level].shuttle = true;
        warehouse.aislesArray[aisle].ownLevels[level].shuttleNumber = shuttleNumber;
        shuttleHolder.push(shuttle);

    }else{
        alert("Shuttle number "+ shuttleNumber +" already in use, Or Level " + level + " is occupied")
    }
}

function animate() {
	requestAnimationFrame( animate );

    shuttleHolder.forEach(shut=>{
        shut.workOnOrders();
    })
    cube.rotation.y += 0.005;
    controls.update();

	renderer.render( scene, camera );
}
animate();


