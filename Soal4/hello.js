var  ta;

main();

function main() {
  // createAndArrangeElements
  createAndArrangeElements();
    
 }

function createAndArrangeElements() {
	// Create output textarea
	var ta = document.createElement("textarea");
	ta.style.width = "300px";
	ta.style.height = "100px";
	ta.style.overflowY = "scroll";
	ta.value += "Nama	: Muhammad Shiddiq \n"+"Nim	: 10216042 \n" 
	document.body.append(ta);
}
