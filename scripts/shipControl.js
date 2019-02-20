/*
	Space Shooter Game, shipControl Javascript
	Clark Rossi
	Game and Moble App Dev
	9/20/16
*/
var speed = 40;
var frameWidth = window.innerWidth;
var frameHeight = window.innerHeight;
var laserNum = 0;
var asteroidSpawnSetInt;
var emenyShipSpawnSetInt;

function laser()
{
  /*Finds the center location of the playerShip and moves the laser
	to that location.*/	
	
	//Locates the playerShip css width style and turns it into an int
	var getShipPosition = parseInt(playerShip.style.left);
	var getShipBottom = parseInt(playerShip.style.bottom);
     
	//Adds half the width of the ships left position to the lasers position and turns it into css format
	var laserX = getShipPosition + 30 + "px";
	var laserLeftPos = "left:" + laserX + ";";
    
	//Gets the bottom position of the ship adds 50 and turns it into css format
    var laserY = getShipBottom + 50;
	var laserBottomPos = "bottom:" + laserY + "px;"; 

/*------------------------------------------------------------------------------*/
		
	//increment numbers
	laserNum++;
	
	//give bullet object a name property
	this.name = "laser_"+laserNum;

	//write html for a new bullet with new id
	document.getElementById('laserSpawner').innerHTML +="<img src='assets/laser.png' class='laser' id='"+this.name+"' style='position:absolute;"+ laserBottomPos +""+ laserLeftPos +"'/>";
	
	//give bullet object a clearMe property to clear
	//passing 'this' is passing this instance of the bullet Object
	this.clearMe = setInterval(laserMove,10, this);
}

function laserMove(newLaser)
{
	//Gets the x and y positions for each laser
	var x = document.getElementById(newLaser.name).offsetLeft - document.getElementById(newLaser.name).scrollLeft +  document.getElementById(newLaser.name).clientLeft;
	var y = document.getElementById(newLaser.name).offsetTop - document.getElementById(newLaser.name).scrollTop +  document.getElementById(newLaser.name).clientTop;

	//Causes the laser to move when fired
	newLaser.y = parseInt(document.getElementById(newLaser.name).style.bottom);
	document.getElementById(newLaser.name).style.bottom = (newLaser.y + 10)+'px';	

	for(var i = 0; i < asteroidArray.length; i++)
	{
		//Gets the x and y values for the asteroids
		var x1=parseInt(asteroidArray[i].x);
		var y1=parseInt(asteroidArray[i].y);
	
		//Gets the random width and height of the asteroids
		var x2 = x1 + asteroidArray[i].w;
		var y2 = y1 + asteroidArray[i].h;			
			
		if ((x > x1) && (x < x2) && (y > y1) && (y < y2))
		{ 
			//Adds a point to score when asteroid is hit
			score += 1;
			document.getElementById("scoreBoard").innerHTML = "";
			document.getElementById("scoreBoard").innerHTML += "Score: " + score;
		
			//Removes hit laser
			var laserParent = document.getElementById(newLaser.name);
			laserParent.parentNode.removeChild(laserParent);
       		clearInterval(newLaser.clearMe);
			
			//Removes hit asteroid 
			var myParent = document.getElementById(asteroidArray[i].name);
			clearInterval(asteroidArray[i].clearMe);
			myParent.parentNode.removeChild(myParent);
			var currentIndex = asteroidArray.indexOf(asteroidArray[i]);
			asteroidArray.splice(currentIndex, 1);
			break;
		} 	
	}
	if(newLaser.y > frameHeight)
	{
		//clear the HTML element you just wrote
		var laserParent = document.getElementById(newLaser.name);
		laserParent.parentNode.removeChild(laserParent);
		clearInterval(newLaser.clearMe);
	}
}

//Initiates lasers to spawn 
function shipAttack()
{
     var newLaser = new laser();
}

//Moves the player ship to the left 
function shipLeft()
{
	//Creates a variable for the playerShip styles
	var ship = document.getElementById("playerShip");
	
	//If the playerShip's left style is empty run code
	if (ship.style.left != "")
	{
		//If the playerShip left style is greater than 20, move ship left by the value of speed 
		if (parseInt(ship.style.left) > 20)
		{
			var currentLeft = parseInt(ship.style.left);
			ship.style.left = (currentLeft - speed) + "px";
		}
	}

	//Prevent playerShip from going beyond spencified value on the left of html page 
	else 
	{
		ship.style.left = "5px"; 
	}	
}

//Moves the player ship to the right
function shipRight()
{
	//Creates a variable for the playerShip styles
	var ship = document.getElementById("playerShip");
	
	//If the playerShip's left style is empty run code
	if (ship.style.left != "")
	{
		//If playerShip is within the width of the window, move ship to the right
		if (parseInt(ship.style.left) < frameWidth - 40)
		{
			var currentLeft = parseInt(ship.style.left);
			ship.style.left = (currentLeft + speed) + "px";
		}
	} 
	
	//Prevents playerShip from going beyond specified value on the right of html page 
	else 
	{
		ship.style.left = "20px";
	}
}

//Sets the default position of the ship to the center of the page
function initalize()
{
	var ship = document.getElementById("playerShip");
	
	var centerX = (frameWidth / 2) - 35;
	ship.style.left = centerX + "px";
	ship.style.bottom = "100px";
	
	//Sets the spawn speed of the asteroids and enemies
	asteroidSpawnSetInt = setInterval(asteroidSpawner, 1000);
	//enemyShipSpawnSetInt = setInterval(enemyShipSpawner, 1000); 
}

//Detects if playerShip is alive if not displays deadMenu page
function shipStatus()
{
	if(playerHealth <= 0)
	{
		window.location.href = "deadMenu.html";
	}
}