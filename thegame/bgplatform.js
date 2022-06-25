class bgplatform{
	constructor(posx, posy, width, height){
	this.circle = false;
	this.x = posx;
	this.y = posy;
	this.w = width;
	this.h = height
	}
	
	show(){
		rect(this.x,this.y,this.w,this.h);
	}
	
}