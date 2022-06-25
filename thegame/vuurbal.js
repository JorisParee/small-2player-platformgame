class vuurbal{

constructor(xstart,ystart,links, col,nr){
	this.circle = true;
	this.x = xstart;
	this.y = ystart;
	this.beginfallspeed = 3;
	this.bouncespeed = 3;
	this.ymove = this.beginfallspeed;
	this.maxfallspeed = 8;
	this.fallacceleration = 0.1;
	this.movespeedstart = 2;
	this.xmove = this.movespeedstart 
	if(links){
		this.xmove = this.xmove * -1;
	}
	this.r = 30;
	this.w = this.r;
	this.h = this.r;
	this.col = col
	this.num = nr;
}

update(){

	this.ymove += this.fallacceleration;
	if( Math.abs(this.ymove) > this.maxfallspeed){
		if(this.ymove >0){
			this.ymove = this.maxfallspeed;
		}else{
			this.ymove = this.maxfallspeed *-1
		}
	}
	
}

move(){
	this.x += this.xmove;
	this.y += this.ymove;
}

bounce(dir){
	if(dir == "0")
	{
		
	}else if(dir == "U")
	{
		this.ymove = this.bouncespeed * -1;
	}else if(dir == "L")
	{
		this.xmove = this.movespeedstart * -1;
	}else if(dir == "R")
	{
		this.xmove = this.movespeedstart;
	}else if(dir == "D")
	{
		this.ymove = this.bouncespeed;
	}
}


show(){
	push();
	fill(this.col);
	ellipse(this.x, this.y, this.r, this.r );
	pop();
}

}