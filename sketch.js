//Declaring variables
var dog, happyDog, database, foodS, foodStock, dogImg1, dogImg2;

function preload(){

	//Loading images
  dogImg1 = loadImage("images/dogImg.png");
	dogImg2 = loadImage("images/dogImg1.png");

}

function setup() {
	//Canvas
	createCanvas(500, 500);

	//Dog sprite
	dog = createSprite(250, 250);
	dog.addImage(dogImg1);
	dog.scale = 0.1;

	//Database stuff
  database = firebase.database();
  foodStock = database.ref("Food");
	foodStock.on("value", readStock);

	//Styling
	textAlign(CENTER);
	textSize(20);
	fill(255);
	stroke(0);
}

// read and write stock functions

function readStock(data){

	//Taking the number of bottles from the database and setting its value to a variable
	foodS = data.val();

}

function writeStock(x){

	//Decrease the food only if it is not zero. Otherwise it will become an integer
	if(x != 0){
		x--;
	}

	//Updating the database
	database.ref("/").update({Food:x});

}

function draw() {

	//Setting the background and its colour
  background(46, 139, 87);

  //Feed the dog
  if(keyWentDown(UP_ARROW)){
		writeStock(foodS);
		dog.addImage(dogImg2);
  }

	//Displaying the number of bottles left. The if statement fixes a bug where the number of bottles is undefined at the beggining
	if(foodS){
		text("Bottles left: " + foodS, 250, 100);
  }

	//Instructions
	text("Press the up arrow key to feed the dog", 250, 400);

	//Showing the sprites
  drawSprites();
}
