var canvasMade = 0
var canvasW = 0
var canvasH = 0
var sprites = {}
var spriteNames = []
var canvasVar = "?"
var name = "?"
var X = "?"
var Y = "?"
var Dir = "?"
var mouseX = "?"
var mouseY = "?"
var timer = 0
var renderTime = 0
var click = 0
var draw = []
var text = []
var textNames = []
var font = "Gloria"
var centred = false

//TODO:
//  + Text. - Doing now. - Fix the bugs. Some sort of infinate loop either in the scripts() or update().
//  + Turtle pen functions.
//  + Box touching.
//  + Clones.

function makeCanvas(W,H) {
	if (canvasMade == 0) {
		document.write(`<canvas id="myCanvas" width=` + '"' + W + '" ' + `height=` + '"' + H + '" ' + `
		>
		Sorry your browser does not seem to support the canvas element.
		</canvas>`)
		var canvas = document.getElementById("myCanvas")
		canvasVar = canvas.getContext("2d")
		console.log("Created canvas")
		console.log("W: " + W)
		console.log("H: " + H)
		canvasW = W
		canvasH = H
		canvasMade = 1
	}
}

//Key Presses
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

function setCos(cos) {
	if (canvasMade == 1) {
		sprites[name]["cos"] = cos
		sprites[name]["cosSet"] = true
	}
}

function DegToRadian(D) {
	return (D * Math.Pi)/180
}

function setWidth(w) {
	if (canvasMade == 1) {
		sprites[name]["w"] = w
	}
}

function changeWidth(w) {
	setWidth(sprites[name]["w"] + w)
}

function changeHeight(h) {
	setHeight(sprites[name]["h"] + h)
}

function setHeight(h) {
	if (canvasMade == 1) {
		sprites[name]["h"] = h
	}
}

function newSprite(name) {
	if (canvasMade == 1) {
		sprites[name] = {}
		sprites[name]["x"] = 0
		sprites[name]["y"] = 0
		sprites[name]["dir"] = 90
		sprites[name]["life"] = 0
		sprites[name]["scripts"] = []
		sprites[name]["cos"] = "?"
		sprites[name]["cosSet"] = false
		sprites[name]["w"] = 100
		sprites[name]["h"] = 100
		spriteNames[spriteNames.length] = name
	}
}



function scripts() {
	var i = 0
	while(i < Object.keys(sprites).length) {
		name = spriteNames[i]
		X = sprites[name]["x"]
		Y = sprites[name]["y"]
		Dir = sprites[name]["dir"]
		var script = 0
		while(script < Object.keys(sprites[name]["scripts"]).length) {
			eval(sprites[name]["scripts"][script])
			var script = script + 1
		}
		sprites[name]["x"] = X
		sprites[name]["y"] = Y
		sprites[name]["dir"] = Dir
		sprites[name]["life"] = sprites[name]["life"] + 1
		var i = i + 1
		
	}
	name = "?"
	X = "?"
	Y = "?"
	Dir = "?"
	var i = 0
	while(i < Object.keys(text).length) {
		name = textNames[i]
		X = text[name]["x"]
		Y = text[name]["y"]
		var script = 0
		while(script < Object.keys(text[name]["scripts"]).length) {
			eval(text[name]["scripts"][script])
			var script = script + 1
			text[name]["x"] = X
			text[name]["y"] = Y
			text[name]["life"] = text[name]["life"] + 1
		}
		var i = i + 1
	}
	name = "?"
	X = "?"
	Y = "?"
}

function newScript(Sprite, Script) {
	sprites[Sprite]["scripts"][Object.keys(sprites[Sprite]["scripts"]).length] = Script
}

function newTextScript(Text, Script) {
	text[Text]["scripts"][Object.keys(text[Text]["scripts"]).length] = Script
}

function runCode(sprite,Code) {
	if (sprite != undefined) {
		name = sprite
		X = sprites[name]["x"]
		Y = sprites[name]["y"]
		Dir = sprites[name]["dir"]
		eval(Code)
		name = "?"
		X = "?"
		Y = "?"
		Dir = "?"
	}
}

function runTextCode(Text,Code) {
	if (Text != undefined) {
		name = Text
		eval(Code)
		name = "?"
	}
}

function setX(xPos) {
	if (canvasMade == 1) {
		sprites[name]["x"] = xPos
		X = xPos
	}
}

function setText(Text) {
	if (canvasMade == 1) {
		text[name]["text"] = Text
	}
}

function setY(yPos) {
	if (canvasMade == 1) {
		sprites[name]["y"] = yPos
		Y = yPos
	}
}

function setDir(Direction) {
	if (canvasMade == 1) {
		sprites[name]["dir"] = Direction
		Dir = Direction
	}
}

function turn(Deg) {
	if (canvasMade == 1) {
		sprites[name]["dir"] = Dir + Deg
		Dir = Dir + Deg
	}
}

function move(Pix) {
	Rad = convertNum(DegToRadian(Dir))
	if (canvasMade == 1) {
		var moveAmount = convertNum(Pix * Math.cos(Rad))
		changeX(moveAmount)
		var moveAmount = convertNum(Pix * Math.sin(Rad))
		changeY(moveAmount)
	}
}

function pointXY(pointX, pointY) {
	if (canvasMade == 1) {
		setDir(Math.degrees(Math.atan(pointY - Y / pointX - X)))
	}
}

function changeX(num) {
	if (canvasMade == 1) {
		sprites[name]["x"] = X + num
		X = X + num
	}
}

function changeY(num) {
	if (canvasMade == 1) {
		sprites[name]["y"] = Y + num
		Y = Y + num
	}
}

function convertNum(number) {
	if (isNaN(number)) {
		return 0
	}
	return number
}

function centre() {
	if (canvasMade == 1) {
		sprites[name]["x"] = sprites[name]["x"] - sprites[name]["w"]/2
		sprites[name]["y"] = sprites[name]["y"] - sprites[name]["h"]/2
	}
}

function centreX() {
	if (canvasMade == 1) {
		sprites[name]["x"] = sprites[name]["x"] - sprites[name]["w"]/2
	}
}

function centreY() {
	if (canvasMade == 1) {
		sprites[name]["y"] = sprites[name]["y"] - sprites[name]["h"]/2
	}
}

function update() {
	if (canvasMade == 1) {
		timer = 0
		var i = 0
		canvasVar.clearRect(0, 0, canvasW, canvasH)
		while(i < Object.keys(sprites).length) {
			name = spriteNames[i]
			if (sprites[name]["cosSet"]) {
				var img = new Image()
				sprites[name]["IMGdata"] = img
				img.src = sprites[name]["cos"]
				var data = sprites[name]
				canvasVar.drawImage(img, data["x"], data["y"], data["w"], data["h"])
			}
			var i = i + 1
			name = "?"
		}
		var i = 0
		while(i < Object.keys(text).length) {
			name = textNames[i]
			canvasVar.textAlign = "start"
			if (text[name]["centre"]) {
				canvasVar.textAlign = "center"
			}
			canvasVar.font = text[name]["size"] + "px " + text[name]["font"]
			canvasVar.fillText(text[name]["text"], text[name]["x"], text[name]["y"])
			var i = i + 1
			name = "?"
		}
		renderTime = timer
	}
}

function loop() {
	scripts()
	update()
}

function tick() {
	timer = timer + 10/1000
}

function keyPressed(Key) {
	return keysDown().indexOf(Key) > -1
}

function newText(Text, xPos, yPos, Size, ID) {
	text[ID] = []
	text[ID]["x"] = xPos
	text[ID]["y"] = yPos
	text[ID]["size"] = Size
	text[ID]["scripts"] = []
	text[ID]["life"] = 0
	text[ID]["text"] = Text
	if (centred) {
		text[ID]["centre"] = true
	}
	else {
		text[ID]["centre"] = false
	}
	textNames[textNames.length] = ID
	
}

function setFont(Font) {
	font = Font
}

function setTextCentre(Centre) {
	centred = Centre
}

function setColour(Colour) {
	canvasVar.fillStyle = Colour
}

function mouse(event) {
	if (canvasMade == 1) {
		mouseX = event.offsetX
		mouseY = event.offsetY
	}
}

function mouseDown(ev) {
    if(ev.which==1) {
        click = 1
    } else if(ev.which==3)  {
        click = 2
    } else {
        click = 3
    }
}

function mouseUp(e) {
	click = 0
}

function leftMouseDown() {
	if (click == 1) {
		return true
	}
	return false
}

function rightMouseDown() {
	if (click == 2) {
		return true
	}
	return false
}

function middleMouseDown() {
	if (click == 3) {
		return true
	}
	return false
}


document.addEventListener("keyup", keyUp, false)
document.addEventListener("keydown", keyDown, false)
document.addEventListener("mousemove", mouse, false)
document.addEventListener("mousedown", mouseDown, false)
document.addEventListener("mouseup", mouseUp, false)
setInterval(loop, 30)
setInterval(tick, 10)