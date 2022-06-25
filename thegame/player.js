class player{
	
	constructor(x,y,nr,kijklinks, col){
		this.num= nr;
		this.x = x;
		this.y = y;
		this.w = 30;
		this.h = 50;
		this.cx = this.x + this.w/2;
		this.cy = this.y + this.h/2;
		this.movespeed = 2;
		this.jumpspeed = 3;
		this.secondjumpspeed = 6;
		this.fallaccaleration = 0.1;
		this.maxfallspeed = 6;
		this.ground = false;
		this.secondjump = false;
		this.xmove = 0;
		this.ymove = 0;
		this.up = false;
		this.down = false;
		this.linkslook = kijklinks;
		this.right = false;
		this.left = false;
		this.col = col;
		this.point = 0;
	}
	
	show(){
		push()
		fill(this.col)
		rect(this.x,this.y,this.w,this.h);
		pop()
		
	}
	
	update(){
		this.keycheck();
		this.ymove += this.fallaccaleration;
		if(this.ymove >= this.maxfallspeed){
			this.ymove = this.maxfallspeed;
		}
	}
	
	move(){
		this.x += this.xmove;
		this.y += this.ymove;
	}
	
	keycheck(){
		if( this.left ){
			this.linkslook = true;
			this.xmove = this.movespeed * -1;
		}else if( this.right ){
			this.linkslook = false;
			this.xmove = this.movespeed;
		}else{
			this.xmove = 0;
		}
		
	}
	keydown(keyed){
		if(keyed == 'Up'){
			if(this.ground){
				this.ymove += this.jumpspeed * -1;	
				this.ground = false;
			}else if(this.secondjump) {
				this.ymove += this.jumpspeed * -1;				
				this.secondjump = false;
			}
			
		}
	
	}
	
	hit(){
		
	}

	
	collide(side){
		// 0 = not; L = left; R = right; U = up; D = down;

		if(side == "0"){
			
		}else{
			if(side == "L")
			{
				if(this.xmove > 0){
					this.xmove = 0;
				}
			}else if(side == "R")
			{
				if(this.xmove < 0){
					this.xmove = 0;	
				}
			}else if(side == "U")
			{
				this.ground = true;
				this.secondjump = true;
				if(this.ymove > 0){
					this.ymove = 0;
				}
			}else if(side == "D")
			{
				if(this.ymove < 0){
					this.ymove = 0;
				}
			}
		}

	}

	
}