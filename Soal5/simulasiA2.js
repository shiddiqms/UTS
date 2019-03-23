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
var m1 , D1 , x1 , y1 , v1 , cL1 , cF1 ;
var m2 , D2 , x2 , y2 , v2 , cL2 , cF2 ;
var kN , gammaN ;
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
	
	// Set physical system parameters of mass m1 and m2
	m1 = 0.01; 
	D1 = 0.01; 
	m2 = 0.01; 
	D2 = 0.01;
	
	// Set color of m1 and m2
	cL1 = "#f00";
	cF1 = "#fcc";
	cL2 = "#00f";
	cF2 = "#ccf";
	
	// Set initial conditions
	x1 = -0.01; // m
	y1 = 0; // m
	v1 = 0.1; // m/s
	x2 = 0.01; // m
	v2 = -0.1; // m/s
	y2 = 0; // m

	// Set drawing area
	xmin = -0.02; // m
	ymin = -0.05; // m
	xmax = 0.02; // m
	ymax = 0.05; // m

	// Display header information
	ta.value = "# t\tx1\tx2\tv1\tv2\n";
}

// Perform simulation
function simulate() {

	if(idata == Ndata){
	
		// Display results on textarea
		ta.value += t.toFixed(3) + "\t"	
		 + x1.toFixed(4) + "\t" + x2.toFixed(4) + "\t"
		 + v1.toFixed(3) + "\t" + v2.toFixed(3) + "\n";
		ta.scrollTop = ta.scrollHeight;
	
		// Display mass position of canvas
		clearCanvas(can);	
		drawMassOnCanvas(x1, y1, 0.5*D1, cL1, cF1, can);
		drawMassOnCanvas(x2, y2, 0.5*D2, cL2, cF2, can);

		idata = 0;
	}

	// Calculate overlap
	var l12 = Math.abs(x1-x2);
	var xi = Math.max(0,0.5*(D1 + D2)- l12 );
	var xidot = -Math.abs(v1 - v2)*Math.sign(xi);

	// Calculate normal force
	var F1 = (kN*xi + gammaN*xidot )*(-1);
	var F2 = -F1;

	// Use Newton 2nd law of motion
	var a1 = F1/m1;
	var a2 = F2/m2;

	// Implement Euler method
	v1 = v1 + a1*dt;
	x1 = x1 + v1*dt;

	v2 = v2 + a2*dt;
	x2 = x2 + v2*dt;

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
	
	// Create start button
	btn = document.createElement("button");
	btn.innerHTML = "Start";
	btn.style.width = "48px";
	btn.style.float = "left";
	btn.addEventListener("click", btnClick);
		
	// Create output textarea
	ta = document.createElement("textarea");
	ta.style.width = "300px";
	ta.style.height = "146px";
	ta.style.overflowY = "scroll";
	
	// Create a canvas
	can = document.createElement("canvas");
	can.width = "300";
	can.height = "150";
	can.style.width = can.width + "px";
	can.style.height = can.height + "px";
	can.style.border = "1px solid #ccc";
	
	// Arrange elements
	
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
	
