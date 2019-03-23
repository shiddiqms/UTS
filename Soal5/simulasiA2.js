/*
	program simulasi A2 
	oleh 
	Muhammad Shiddiq
	10216042
*/

// Define global variables
var btn, ta, can;
var proc, Tproc;
var tbeg, tend, dt, t;
var m, kx, ky, Lx, Ly, x0, y0, v0x, v0y;
var xo, yo, x, y, vx, vy;
var xmin, ymin, xmax, ymax;

// Execute main function
main();

// Define main function
function main() {
	// Create and arrange elements
	createAndArrangeElements();
	
	// Initialize parameters
	initParams();
}

// Initialize parameters
function initParams() {
	// Set iteration parameters
	Tproc = 100;
	tbeg = 0;
	tend = 1;
	dt = 0.01;
	t = tbeg;
	
	// Set physical system parameters
	m = 0.1;
	kx = 100;
	ky = 100;
	Lx = 0.4;
	Ly = 0.4;
	xo = 0;
	yo = 0;
	x0 = xo;
	y0 = yo;
	v0x = 5;
	v0y = 0;
	
	// Set initial conditions
	x = x0;
	y = y0
	vx = v0x;
	vy = v0y;
	
	// Set drawing area
	xmin = -0.5;
	ymin = -0.5;
	xmax = 0.5;
	ymax = 0.5;
	
	// Display header information
	ta.value = "# t\tx\ty\tvx\tvy\n";
}

// Perform simulation
function simulate() {
	// Display results on textarea
	ta.value += t.toFixed(3) + "\t" 
		+ x.toFixed(3) + "\t" + y.toFixed(3) + "\t"
		+ vx.toFixed(3) + "\t" + vy.toFixed(3) + "\n";
	ta.scrollTop = ta.scrollHeight;
	
	// Display mass position of canvas
	clearCanvas(can);
	drawMassOnCanvas(x, y, can);
	
	// Implement Euler method
	var wx = Math.sqrt(kx/m);
	var sxx = x - xo + Lx;
	var sxy = y - yo;
	var ax = -(wx*wx) * (Math.sqrt(sxx*sxx + sxy*sxy) - Lx);
	vx = vx + ax*dt;
	x = x + vx*dt;
	
	var wy = Math.sqrt(ky/m);
	var syx = x - xo;
	var syy = y - yo + Ly;
	var ay = -(wy*wy) * (Math.sqrt(syx*syx + syy*syy) - Ly);
	vy = vy + ay*dt;
	y = y + vy*dt;
	
	// Terminate simulation if condition meets		
	if(t >= tend - dt) {
		clearInterval(proc);
		btn.innerHTML = "Start";
		btn.disabled = true;
	} else {
		t +=dt;
	}
}

// Clear canvas
function clearCanvas(can) {
	var cx = can.getContext("2d");
	cx.clearRect(0, 0, can.width, can.height);
}

// Display mass position of canvas
function drawMassOnCanvas(x, y, can) {
	var cx = can.getContext("2d");
	
	// Get canvas coordinate
	var XMIN = 0;
	var YMIN = can.height;
	var XMAX = can.width;
	var YMAX = 0;
	
	// Draw spring kx
	cx.beginPath();
	cx.strokeStyle = "#f00";
	cx.moveTo(tx(x), ty(y));
	cx.lineTo(tx(xo - Lx), ty(yo));
	cx.stroke();
	cx.beginPath();
	cx.strokeStyle = "#f00";
	cx.arc(tx(xo - Lx), ty(yo), 2, 0, 2*Math.PI);
	cx.stroke();
	cx.fillStyle = "#f00";
	cx.fill();
	
	// Draw spring ky
	cx.beginPath();
	cx.strokeStyle = "#00f";
	cx.moveTo(tx(x), ty(y));
	cx.lineTo(tx(xo), ty(yo - Ly));
	cx.stroke();
	cx.beginPath();
	cx.strokeStyle = "#00f";
	cx.arc(tx(xo), ty(yo - Ly), 2, 0, 2*Math.PI);
	cx.stroke();
	cx.fillStyle = "#00f";
	cx.fill();
	
	// Draw mass
	var R = 10;
	cx.beginPath();
	cx.strokeStyle = "#000";
	cx.arc(tx(x), ty(y), R, 0, 2*Math.PI);
	cx.stroke();
	cx.fillStyle = "#ccc";
	cx.fill();
	cx.beginPath();
	cx.strokeStyle = "#000";
	cx.arc(tx(x), ty(y), 2, 0, 2*Math.PI);
	cx.stroke();
	cx.fillStyle = "#000";
	cx.fill();
	
	// Transform x from real coordinate to canvas coordinate
	function tx(x) {
		var xx = (x - xmin) / (xmax - xmin) * (XMAX - XMIN) + XMIN;
		return xx;
	}
	
	// Transform y from real coordinate to canvas coordinate
	function ty(y) {
		var yy = (y - ymin) / (ymax - ymin) * (YMAX - YMIN) + YMIN;
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
	ta.style.height = "296px";
	ta.style.overflowY = "scroll";
	
	// Create a canvas
	can = document.createElement("canvas");
	can.width = "300";
	can.height = "300";
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
	

