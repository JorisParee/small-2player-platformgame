function setup() {
  // put setup code here
  this.height = 500;
  this.width = 500
  createCanvas(this.height, this.width);
  
  platformarray = [];
  vuurbalarray = [];
  player1 = new player(30,10,1,false, color(255,0,0) );
  player2 = new player(this.width - 60, 10,2,true, color(0,255,0) );
  playerarray = [];
  playerarray.push(player1); playerarray.push(player2);
  
  drawplatformspos()

}

function draw() {
	background(220);

	keyboardcheck();
	
	
	for(i=0; i<vuurbalarray.length;i++){
		vuurbalarray[i].update();
	}
	for(i=0; i<playerarray.length;i++){
		playerarray[i].update();		
	}
	
	
	checkcollisions();
	
	
	for(i=0; i<playerarray.length;i++){
		playerarray[i].move();		
	}
	for(i=0; i<vuurbalarray.length;i++){
		vuurbalarray[i].move();
	}
	
	
	for(i=0;i<platformarray.length;i++){
		platformarray[i].show();
	}
	for(i=0; i<playerarray.length;i++){
		playerarray[i].show();		
	}
	for(i=0; i<vuurbalarray.length;i++){
		vuurbalarray[i].show();
	}

	text(player1.point + " - " + player2.point, this.width/2,30)


}

function keyPressed(){
	if(key == 's'){
		newvuurbal(player1.x + player1.w/2, player1.y + player1.h/2, player1.linkslook, player1.col, player1.num)
	}
	if(key == 'ArrowDown'){
		newvuurbal(player2.x + player2.w/2, player2.y + player2.h/2, player2.linkslook, player2.col, player2.num)
	}
	
	if(key == 'w'){
		player1.keydown('Up');
	}
	if(key == 'ArrowUp'){
		player2.keydown('Up');
	}
}

function keyboardcheck(){
	player1.left = keyIsDown(65);
	player1.right = keyIsDown(68);
	player2.left = keyIsDown(LEFT_ARROW);
	player2.right = keyIsDown(RIGHT_ARROW);
	
}

function checkcollisions(){
	for(i=0;i<vuurbalarray.length;i++){
		for(j=0;j<platformarray.length;j++){
			vuurbalarray[i].bounce(collision(platformarray[j], vuurbalarray[i])); 
		}
	}
	for(i=0;i<platformarray.length;i++){
		for(j=0; j<playerarray.length;j++){
			playerarray[j].collide(collision(platformarray[i],playerarray[j]));	
		}
	}
	for(i=0;i<playerarray.length;i++){
		for(j=0; j<vuurbalarray.length;j++){
			if(collision(playerarray[i], vuurbalarray[j]) != 0 && playerarray[i].num != vuurbalarray[j].num){
				playerarray[i].hit;
				playerarray[vuurbalarray[j].num-1].point++;
				removebal(j);
				
			}
		}
	}
	for(i=0;i<vuurbalarray.length-1;i++){
		for(j=i+1;j<vuurbalarray.length;j++){
			if(collision(vuurbalarray[i],vuurbalarray[j]) == 1 && vuurbalarray[i].num != vuurbalarray[j].num ){
				removebal(j);
				removebal(i);
			}
		}
	}
}


function removebal(pos){
	vuurbalarray.splice(pos,1);
}

function mouseClicked(){
	vuurbal_ = new vuurbal(mouseX, mouseY, true);
	vuurbalarray.push( vuurbal_ );
}

function newvuurbal(newx, newy, left, col, nr){
	vuurbal_ = new vuurbal(newx, newy, left, col, nr);
	vuurbalarray.push( vuurbal_ );
}

function drawplatformspos(){
	var haray = new Array(100, 200, 300, 400);
	for (var j = 0; j < haray.length; j++){
		var y = haray[j];
		var w = 0;
		var h = 10;
		var x = Math.random() * 100;
		for (var i = 1; i < width; i++){
			w = Math.random() * 150 + 50;
			
			bgplatform_ = new bgplatform(x, y, w, h);
			platformarray.push( bgplatform_ )
			
			x += w + Math.random() * 200 + 50;
			i = x;
		}
	}
	
	platformarray.push( new bgplatform(0,0,this.width, 10) )
	platformarray.push( new bgplatform(0,0,10,this.height) )
	platformarray.push( new bgplatform(this.height - 10,0,10,this.height) )
	platformarray.push( new bgplatform(0, this.height - 10,this.width / 2 -30, 10) )
	platformarray.push( new bgplatform(this.width/2 + 30 ,this.height - 10,this.width / 2 -30, 10) )
}



function collision(sprite1, sprite2){
	// return direction assumes first sprite is immovable
	// direction does not work with two circles
	var intersect = false;
	var newdir = "0";
	// 0 = not; 1 = yes; L = left; R = right; U = up; D = down;
	
	
	if(sprite1.circle){ // is it a circle?
		// set circle values
		var spr1_circle = true;		// it is a circle
		var spr1_r = sprite1.r/2;  	// radius
		var spr1_hw = sprite1.w/2; 	// radius horizontal
		var spr1_hh = sprite1.h/2; 	// radius vartical
		var spr1_cx = sprite1.x;   	// center x
		var spr1_cy = sprite1.y;   	// center y
	}else{ // else it is a square
		// set square values
		var spr1_circle = false;	// it is a square
		var spr1_x = sprite1.x;		// left up x
		var spr1_y = sprite1.y;		// left up y
		var spr1_w = sprite1.w;		// width
		var spr1_h = sprite1.h;		// height
		             
		var spr1_cx = sprite1.x + sprite1.w/2; // centre x
		var spr1_cy = sprite1.y + sprite1.h/2; // centre y
		var spr1_hw = sprite1.w/2; 	// half width
		var spr1_hh = sprite1.h/2	// half height
		var spr1_l = sprite1.x;		// left side
		var spr1_r = sprite1.x + sprite1.w; // right side
		var spr1_t = sprite1.y;		// top side
		var spr1_b = sprite1.y + sprite1.h;	// botom side
	}
	
	//repeat for second sprite
	if(sprite2.circle){ // is it a cirle
		// set circle values
		var spr2_circle = true;
		var spr2_r = sprite2.r/2;
		var spr2_hw = sprite2.w/2;
		var spr2_hh = sprite2.h/2;
		var spr2_cx = sprite2.x;
		var spr2_cy = sprite2.y;
	}else{ // else it is a square
		// set square values
		var spr2_circle = false;     
		var spr2_x = sprite2.x;
		var spr2_y = sprite2.y;
		var spr2_w = sprite2.w;
		var spr2_h = sprite2.h;
		             
		var spr2_cx = sprite2.x + sprite2.w/2;
		var spr2_cy = sprite2.y + sprite2.h/2;
		var spr2_hw = sprite2.w/2;
		var spr2_hh = sprite2.h/2
		var spr2_l = sprite2.x;
		var spr2_r = sprite2.x + sprite2.w;
		var spr2_t = sprite2.y;
		var spr2_b = sprite2.y + sprite2.h;
	}


	

	
	//if 2 squares or circle and square
	if( (!spr1_circle && spr2_circle) || (spr1_circle && !spr2_circle) || (!spr1_circle && !spr2_circle) ){
		// check the side boxes and inner box
		
		//	  box width inside extra width					  box inside height of square
		//	  side + half width <  middlepoint spr2	 < innerside	 side     <	middlepoint spr2   <  other side
		if( ((spr1_l - spr2_hw) < spr2_cx && spr2_cx < (spr1_l)) && ((spr1_t) < spr2_cy && spr2_cy < (spr1_b)) )  //out left
		{
			intersect = true;
			newdir = "L";
		} else
		if( ((spr1_r + spr2_hw) > spr2_cx && spr2_cx > (spr1_r)) && ((spr1_t) < spr2_cy && spr2_cy < (spr1_b)) )  //out right
		{
			intersect = true;
			newdir = "R";
		} else
		if( ((spr1_t - spr2_hh) < spr2_cy && spr2_cy < (spr1_t)) && ((spr1_l) < spr2_cx && spr2_cx < (spr1_r)) )  //outtop
		{
			intersect = true;
			newdir = "U";
		} else
		if( ((spr1_b + spr2_hh) > spr2_cy && spr2_cy > (spr1_b)) && ((spr1_l) < spr2_cx && spr2_cx < (spr1_r)) )  //outbottom
		{
			intersect = true;
			newdir = "D";
		} else
		if( ((spr1_l) <= spr2_cx && spr2_cx <= (spr1_r)) && ((spr1_t) <= spr2_cy && spr2_cy <= (spr1_b)) )  //inside
		{
		intersect = true;
		newdir = "U";
		}
	}
	
		
	
	//if one circle and one square check round corners
	if( (!spr1_circle && spr2_circle) || (spr1_circle && !spr2_circle) ){
		//if there is one circle and one square
		//check the corners of the square
		//direction is made assuming that the square is immovable
		if(spr1_circle){ // sprite one is the circle
			cir_x = spr1_cx;
			cir_y = spr1_cy;
			cir_r = spr1_r;
			
			sqr_l = spr2_l;
			sqr_r = spr2_r;
			sqr_t = spr2_t;
			sqr_b = spr2_b;
		}else{	// sprite two is the circle
			cir_x = spr2_cx;
			cir_y = spr2_cy;
			cir_r = spr2_r;
			
			sqr_l = spr1_l;
			sqr_r = spr1_r;
			sqr_t = spr1_t;
			sqr_b = spr1_b;
		}
		
		// 	if inside a round corner around the corners of the square
		if( (dist(sqr_l, sqr_t, cir_x, cir_y) < cir_r) && ( ((cir_x) < (sqr_l)) && ((cir_y) < (sqr_t)) ) )
		{ //leftup
			intersect = true;
			// check on which side circle is of diagonal line
			if( (cir_y - cir_x) > (sqr_t - sqr_l) )
			{ // from left
				newdir = "L";
			} else 
			{ // from above
				newdir = "U";
			}
		} else
		if( (dist(sqr_r, sqr_t, cir_x, cir_y) < cir_r) && ( ((cir_x) > (sqr_r)) && ((cir_y) < (sqr_t)) ) )
		{ //rightup
			intersect = true;
			if( (cir_y + cir_x) > (sqr_t + sqr_r) )
			{ // from right
				newdir = "R";
			}else
			{ // from above
				newdir = "U";
			}
		} else
		if( (dist(sqr_l, sqr_b, cir_x, cir_y) < cir_r) && ( ((cir_x) < (sqr_l)) && ((cir_y) > (sqr_b)) ) )
		{ //leftdown
			intersect = true;
			if( (cir_y + cir_x) < (sqr_b + sqr_l) )
			{ // from left
				newdir = "L";
			}else
			{ // form below
				newdir = "D";
			}
		} else
		if( (dist(sqr_r, sqr_b, cir_x, cir_y) < cir_r) && ( ((cir_x) > (sqr_r)) && ((cir_y) > (sqr_b)) ) )
		{ //rightdown
			intersect = true;
			if( (cir_y - cir_x) < (sqr_b - sqr_r) )
			{ // from right
				newdir = "R";
			}else
			{ // from below
				newdir = "D";
			}
		}
	}
	
	
		
	// if it are two squares
	if(!spr1_circle && !spr2_circle){
		// 	if inside a squre corner 
		if( ( (spr2_cx > (spr1_l - spr2_hw)) && (spr2_cx < (spr1_l          )) && (spr2_cy > (spr1_t - spr2_hh)) && (spr2_cy < (spr1_t          )) ) )
		{ //leftup
			intersect = true;
			// check on which side circle is of diagonal line
			if( (spr2_cy * spr2_w - spr2_cx * spr2_h) > (spr1_t * spr2_w - spr1_l * spr2_h) )
			{ // from left
				newdir = "L";
			} else 
			{ // from above
				newdir = "U";
			}
		} else
		if( (spr2_cx < (spr1_r + spr2_hw) && spr2_cx > (spr1_r          ) && spr2_cy > (spr1_t - spr2_hh) && spr2_cy < (spr1_t          )) )
		{ //rightup
			intersect = true;
			if( (spr2_cy * spr2_w + spr2_cx * spr2_h) > (spr1_t * spr2_w + spr1_r * spr2_h) )
			{ // from right
				newdir = "R";
			}else
			{ // from above
				newdir = "U";
			}
		} else
		if( (spr2_cx > (spr1_l - spr2_hw) && spr2_cx < (spr1_l          ) && spr2_cy < (spr1_b + spr2_hh) && spr2_cy > (spr1_b          )) )
		{ //leftdown
			intersect = true;
			if( (spr2_cy * spr2_w + spr2_cx * spr2_h) < (spr1_b * spr2_w + spr1_l * spr2_h) )
			{ // from left
				newdir = "L";
			}else
			{ // form below
				newdir = "D";
			}
		} else
		if( (spr2_cx < (spr1_r + spr2_hw) && spr2_cx > (spr1_r          ) && spr2_cy < (spr1_b + spr2_hh) && spr2_cy > (spr1_b          )) )
		{ //rightdown
			intersect = true;
			if( (spr2_cy * spr2_w - spr2_cx * spr2_h) < (spr1_b * spr2_w - spr1_r * spr2_h) )
			{ // from right
				newdir = "R";
			}else
			{ // from below
				newdir = "D";
			}
		}
	}
	
	
	// if it are two circles
	if(spr1_circle && spr2_circle){
		// if distance between two circles is smaller than the sum of both radia
		if(dist(spr1_cx, spr1_cy, spr2_cx, spr2_cy) <= spr1_r + spr2_r)
		{
			// do intersect
			newdir = "1"	
		}
	
	}
	
	
	return newdir;
}

