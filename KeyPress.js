//Please go to http://www.theasciicode.com.ar/ascii-printable-characters/single-quote-apostrophe-ascii-code-39.html for the key ids.
var keyPresses = {}
var keys = []
var key = ""

function keyUp(Key) {
	key = ""
	keyPresses[Key.keyCode] = false
	//var i = 0
	//while(i < keys.length) {
	//	var keyID = keys[i]
	//	if (Key.keyCode == keyID) {
	//		keyPresses[keyID] = False
	//	}
	//	var i = i + 1
	//}
}

function keyDown(Key) {
	key = Key.keyCode
	keyPresses[Key.keyCode] = true
	//var i = 0
	//while(i < keys.length) {
	//	var keyID = keys[i]
	//	if (Key.keyCode == keyID) {
	//		keyPresses[keyID] = True
	//	}
	//	var i = i + 1
	//}
}

function keyPressed() {
	return key
}

function keysDown() {
	var down = []
	var i = 0 
	while(i < keys.length) {
		if (keyPresses[keys[i]]) {
			down[down.length] = keys[i]
		}
		i = i + 1
	}
	return down
}

function newKey(ID) {
	keys[keys.length] = ID
}

document.addEventListener("keyup", keyUp, false);
document.addEventListener("keydown", keyDown, false);