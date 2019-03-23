/*
	program simulasi A2 
	oleh 
	Muhammad Shiddiq
	10216042
*/


var btn, ta, can;
var proc, Tproc;
var tbeg, tend, dt, t;
var Tdata , Ndata , idata ;
var m1 , D1 , x1 , y1 , vx1, vy1, cL1 , cF1 ;
var m2 , D2 , x2 , y2 , vx2, vy2, cL2 , cF2 ;
var kN , gammaN, eps;
var xmin , ymin , xmax , ymax ;

// Execute main function
main ();

// Define main function
function main(){
	// Create and arrange elements
	createAndArrangeElements();
	
	// Initialize parameters
	initParams();
}

// Initialize parameters
function initParams(){
	// Set iteration parameters
	Tproc = 1;
	tbeg = 0;
	tend = 0.1;
	dt = 0.0001;
	t = tbeg;
	Tdata = 0.001;
	Ndata = Math.round(Tdata/dt);
	idata = Ndata ;
	
	// Set collision parameters
	kN = 10000;
	gammaN = 8;
	eps = 1;
	
	// Set physical system parameters of mass m1 and m2
	m1 = 0.01; 
	D1 = 0.02; 
	m2 = 0.02; 
	D2 = 0.02;
	
	// Set color of m1 and m2
	cL1 = "#f00";
	cF1 = "#fcc";
	cL2 = "#00f";
	cF2 = "#ccf";
	
	// Set initial conditions
	x1 = -0.01; // m
	y1 = 0.01; // m
	vx1 = 0; // m/s
	vy1 = 0; // m/s
	x2 = 0.01; // m
	vx2 = 0; // m/s
	vy2 = 0; // m/s
	y2 = 0; // m

	// Set drawing area
	xmin = -0.1; // m
	ymin = -0.1; // m
	xmax = 0.1; // m
	ymax = 0.1; // m

	// Display header information
	ta.value = "# t\tx1\tx2\ty1\ty2\tvx1\tvx2\tvy1\tvy2\n";
}

// Perform simulation
function simulate() {

	if(idata == Ndata){
	
		// Display results on textarea
		ta.value += t.toFixed(3) + "\t"	
		 + x1.toFixed(4) + "\t" + x2.toFixed(4) + "\t"
		 + y1.toFixed(4) + "\t" + y2.toFixed(4) + "\t"
		 + vx1.toFixed(3) + "\t" + vx2.toFixed(3) + "\t"
		 + vx1.toFixed(3) + "\t" + vx2.toFixed(3) + "\n";
		ta.scrollTop = ta.scrollHeight;
	
		// Display mass position of canvas
		clearCanvas(can);	
		drawMassOnCanvas(x1, y1, 0.5*D1, cL1, cF1, can);
		drawMassOnCanvas(x2, y2, 0.5*D2, cL2, cF2, can);

		idata = 0;
	}

	// Calculate overlap
	//var l12 = Math.abs(x1-x2);
	//var xi = Math.max(0,0.5*(D1 + D2)- l12 );
	//var xidot = -Math.abs(vx1 - vx2)*Math.sign(xi);
	
	var l12x = -(x1-x2);
	var l12y = -(y1-y2);
	var r = Math.sqrt(l12x*l12x+ l12y*l12y);
	var sigma = (D1+D2)/2;

	// Calculate normal force
	//var Fx1 = (kN*xi + gammaN*xidot )*(-1);
	//var Fx2 = -Fx1;

	// Calculate normal force
	var Fx1 = ((24*eps/r)*((2*(sigma/r)^12)-(sigma/r)^6))*l12x;
	var Fx2 = -Fx1;
	var Fy1 = ((24*eps/r)*((2*(sigma/r)^12)-(sigma/r)^6))*l12y;
	var Fy2 = -Fy1;
	
	// Use Newton 2nd law of motion
	var ax1 = Fx1/m1;
	var ax2 = Fx2/m2;
	var ay1 = Fy1/m1;
	var ay2 = Fy2/m2;
	
	// Implement Euler method
	vx1 = vx1 + ax1*dt;
	x1 = x1 + vx1*dt;
	vy1 = vy1 + ay1*dt;
	y1 = y1 + vy1*dt;

	vx2 = vx2 + ax2*dt;
	x2 = x2 + vx2*dt;
	vy2 = vy2 + ay2*dt;
	y2 = y2 + vy2*dt;

	// Terminate simulation if condition meets
	if(t>=tend){
		clearInterval(proc);
		btn.innerHTML = "Start";
		btn.disabled = true ;
	} else {
		t +=dt;
		idata++;
	}
}

// Clear canvas
function clearCanvas(can) {
	var cx = can.getContext("2d");
	cx.clearRect (0,0,can.width,can.height);
}

// Display mass position of canvas
function drawMassOnCanvas(x, y, R, cLine , cFill , can) {
	var cx = can.getContext("2d");

	// Get canvas coordinate
	var XMIN = 0;
	var YMIN = can.height ;
	var XMAX = can.width ;
	var YMAX = 0;

	// Draw mass
	var RR = tx(2*R) -tx(R);
	cx.beginPath();
	cx.strokeStyle = cLine;
	cx.lineWidth = 4;
	cx.arc(tx(x), ty(y), RR, 0, 2*Math.PI);
	cx.stroke();
	cx.fillStyle = cFill;
	cx.fill();
	
	//Transform x from real coordinate to canvas coordinate
	function tx(x){
		var xx = (x - xmin)/(xmax - xmin)*(XMAX - XMIN)+ XMIN;
		return xx;
	}
	
	// Transform y from real coordinate to canvas coordinate
	function ty(y) {
		var yy = (y - ymin)/(ymax - ymin)*(YMAX - YMIN)+ YMIN;
		return yy;
	}
}

// Create and arrange elements
function createAndArrangeElements() {
	// Create text with style h1
	h1 = document.createElement("h1");

	
	// Create start button
	btn = document.createElement("button");
	btn.innerHTML = "Start";
	btn.style.width = "48px";
	btn.style.float = "left";
	btn.addEventListener("click", btnClick);
		
	// Create output textarea
	ta = document.createElement("textarea");
	ta.style.width = "550px";
	ta.style.height = "200px";
	ta.style.overflowY = "scroll";
	
	// Create a canvas
	can = document.createElement("canvas");
	can.width = "400";
	can.height = "400";
	can.style.width = can.width + "px";
	can.style.height = can.height + "px";
	can.style.border = "1px solid #ccc";
	
	// Arrange elements
	document.body.append(h1);
	document.body.append(btn);
	document.body.append(ta);
	document.body.append(can);
}

// Handle button click event
function btnClick() {
	var cap = event.target.innerHTML;
	if(cap == "Start") {
		console.log("Start");
		event.target.innerHTML = "Stop";
		proc = setInterval(simulate, Tproc);
	} else {
		console.log("Stop");
		event.target.innerHTML = "Start";
		clearInterval(proc);
	}
}
	
