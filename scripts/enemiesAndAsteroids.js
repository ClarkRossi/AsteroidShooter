/*
	Space Shooter Game, enemysAndAsteroids Javascript
	Clark Rossi
	Game and Moble App Dev
	9/20/16
*/
var npcNum = 0;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var asteroidType;

//Initiates NPC's to spawn
function asteroidSpawner()
{
	var newAsteroid = new Asteroid();
}

function Asteroid()
{
	//Creates a random number based on the widows width
	var randomLeft = eval(Math.floor(Math.random() * windowWidth));
	
	//Creates a random size for the asteroids 
	var randomSize = eval(Math.floor(Math.random() * 50 + 40));
	
	//Causes two different asteroid types to spawn at random
	var randomAsteroid = eval(Math.floor(Math.random() * 2));
	if(randomAsteroid === 1)
	{
		asteroidType = "src='assets/astroid.png'";
	}
	else
	{
		asteroidType = "src='assets/astroidTwo.png'"; 
	}
	
	//Adds increment
	npcNum++;
	
	/*---------------------------------*/
	//Gives the asteroid object a name property
	this.name = "asteroid_"+npcNum;
	
	//Gives the asteroid object random size for both width and height
	this.w = randomSize;
	this.h = randomSize;
	
	/*----------------------------------*/
	
	//Only allows the asteroid to spawn if its entirely within the frame
	if((randomLeft + randomSize) < windowWidth)
	{
		//Writes html for a new asteriod with a new id and gives it a random left position
		document.getElementById('npcSpawner').innerHTML +="<img "+asteroidType+"class='asteroid' id='"+this.name+"'style='position:absolute; height:"+randomSize+"px; width:"+randomSize+"px; top: 0px; left:"+randomLeft+"px;'/>";
	}
	
	//Spawns asteroid in new location within the window frame
	else
	{
		//Adds some randomness to the spawn
		var randomValue = eval(Math.floor(Math.random() * 2));
		if(randomValue === 1)
		{
			//Writes html for a new asteriod with a new id and gives it a random left position
			document.getElementById('npcSpawner').innerHTML +="<img "+asteroidType+"class='asteroid' id='"+this.name+"'style='position:absolute; height:"+randomSize+"px; width:"+randomSize+"px; top: 0px; left: 30%;'/>";
		}
		else
		{
			//Writes html for a new asteriod with a new id and gives it a random left position
			document.getElementById('npcSpawner').innerHTML +="<img "+asteroidType+"class='asteroid' id='"+this.name+"'style='position:absolute; height:"+randomSize+"px; width:"+randomSize+"px; top: 0px; left: 60%;'/>";
		}
	}
	
	//Gives asteroid object a y property 
	this.y = document.getElementById(this.name).style.top; 
	//Gives asteroid object a x property 
	this.x = document.getElementById(this.name).style.left; 
	
	//give bullet object a clearMe property to clear
	//passing 'this' is passing this instance of the bullet Object
	this.clearMe = setInterval(asteroidMove,80, this);	
	
	//Pushes the laser into asteroidArray
	asteroidArray.push(this);
}

function asteroidMove(newAsteroid)
{
	//Gets the x and y position of the newAsteroid
	newAsteroid.x = document.getElementById(newAsteroid.name).offsetLeft - document.getElementById(newAsteroid.name).scrollLeft +  document.getElementById(newAsteroid.name).clientLeft;
	newAsteroid.y = parseInt(document.getElementById(newAsteroid.name).style.top);
	
	//Gets the width and height of the newAsteroid
	newAsteroid.w = parseInt(document.getElementById(newAsteroid.name).style.width); 
	newAsteroid.h = parseInt(document.getElementById(newAsteroid.name).style.height);
	//alert(newAsteroid.w);
	
	//Gets the playerShips width and height
	var shipW = document.getElementById('playerShip').clientWidth;
	var shipH = document.getElementById('playerShip').clientHeight;
	
	//Gets the playerShips x and y position
	var shipX = playerShip.offsetLeft - playerShip.scrollLeft +  playerShip.clientLeft;
	var shipY = playerShip.offsetTop - playerShip.scrollTop +  playerShip.clientTop;	
	
	//Causes the newAsteroid to move down the screen by an increment of 10px a second 
	document.getElementById(newAsteroid.name).style.top = (newAsteroid.y + 10)+'px';

	//Removes asteroid if it collides with playerShip and removes health point 
	if((((newAsteroid.x + newAsteroid.x) > shipX) && (newAsteroid.x < (shipX + shipW))) && ((newAsteroid.y > shipY) && (newAsteroid.y < windowHeight)))
	{
		//clear the HTML element you just wrote
		clearInterval(newAsteroid.clearMe);
		var currentIndex = asteroidArray.indexOf(newAsteroid);
		asteroidArray.splice(currentIndex, 1);
		
		var asteroidParent = document.getElementById(newAsteroid.name);
		asteroidParent.parentNode.removeChild(asteroidParent);
		
		//Removes a health point from the playerHealth
		playerHealth -= 25;
		document.getElementById("healthDisplay").innerHTML = "";
		document.getElementById("healthDisplay").innerHTML += "Health: " + playerHealth + "%";
	}
	
	//Subtracts the asteroids height from the windows height.
	var bottomBoundry = windowHeight - newAsteroid.h;

	//Removes asteroids when they reach the bottom of the page
	if(newAsteroid.y >= bottomBoundry)
	{
		//clear the HTML element you just wrote
		clearInterval(newAsteroid.clearMe);
		var currentIndex = asteroidArray.indexOf(newAsteroid);
		asteroidArray.splice(currentIndex, 1);
		
		var asteroidParent = document.getElementById(newAsteroid.name);
		asteroidParent.parentNode.removeChild(asteroidParent);
	}
	
	//Causes the shipStatus function to run
	shipStatus()
}

function enemyShipSpawner()
{
	//Makes a random number out of 8
	var randomSpawnTime = eval(Math.floor(Math.random() * 8 + 1));
	
	//Allows the enemyShip to spawn in a 1/8 ratio.
	if(randomSpawnTime == 8)
	{
		var newEnemyShip = new enemyShip();
	}
}

function enemyShip()
{
	//Creates a random number based on the widows width
	var randomLeft = eval(Math.floor(Math.random() * windowWidth));
	
	//Reduces number
	npcNum++;
	
	//Gives the asteroid object a name property
	this.name = "enemyShip_"+npcNum;
	
	//Only allows the asteroid to spawn if its entirely within the frame
	if((randomLeft + 80) < windowWidth)
	{  
		//Writes html for a new asteriod with a new id and gives it a random left position
		document.getElementById('npcSpawner').innerHTML +="<img src='assets/enemyShip.png' class='enemyShip' id='"+this.name+"'style='position:absolute; height:30px; width:80px; top: 0px; left:"+randomLeft+"px;'/>";
	}
	
	//Gives enemyShip object a y property 
	this.y = document.getElementById(this.name).style.top;
	
	//Gives enemyShip object a x property
	this.x = document.getElementById(this.name).style.left;
	
	//give bullet object a clearMe property to clear
	//passing 'this' is passing this instance of the bullet Object
	this.clearMe = setInterval(enemyShipMove,80, this);	
	
	//Pushes the laser into enemyShipArray
	enemyShipArray.push(this);
}

function enemyShipMove(newEnemyShip)
{
	newEnemyShip.y = parseInt(document.getElementById(newEnemyShip.name).style.top);
	document.getElementById(newEnemyShip.name).style.top = (newEnemyShip.y + 10)+'px';
	if(newEnemyShip.y > windowHeight)
	{
		//clear the HTML element you just wrote
		clearInterval(newEnemyShip.clearMe);
		var currentIndex = enemyShipArray.indexOf(newEnemyShip);
		enemyShipArray.splice(currentIndex, 1);
		
		var enemyShipParent = document.getElementById(newEnemyShip.name);
		enemyShipParent.parentNode.removeChild(enemyShipParent);
	}
}