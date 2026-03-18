function makePost() {
	let xhr = new XMLHttpRequest();

	if (!xhr) {
		console.log("Could not create an XMLHttpRequest instance");
		return false;
	}
	
	// arrow function = unique instance of xhr within closure
	// 2 references to xhr: local var xhr, closure
	// won't get garbage collected until all references gone
	xhr.onreadystatechange = () => logResponse(xhr); //values of xhr won't overlap (separate instances b/c anon function)
	
	xhr.open("POST", "/new_item");
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	var data;
	data = `one=${document.getElementById("a").value}&two=${document.getElementById("b").value}&three=${document.getElementById("c").value}`;
	
	xhr.send(data);

	// cannot just manipulate DOM immediately with results because if multiple people sent requests, all 3 would have different pages that
	// wouldn't represent server state
	// NOTE: would need to do a get to get current server state b/f adding to it (and sending back to server?)
}

function logResponse(xhr) {
	console.log(`readyState: ${xhr.readyState}`);
	if (xhr.readyState === XMLHttpRequest.DONE) {
		console.log(`status: ${xhr.status}`);
 		if (xhr.status === 200) {
			console.log("Value sent to server!");
		} else {
			console.log("There was a problem with the request.");
		}
	}
}

function setup() {
	document.getElementById("theButton").addEventListener("click", makePost);
}

window.addEventListener("load", setup);
