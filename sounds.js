document.addEventListener("DOMContentLoaded", function () {
	const red = document.getElementById("red");
	red.addEventListener("click", key);
	const blue = document.getElementById("blue");
	blue.addEventListener("click", key);
	const green = document.getElementById("green");
	green.addEventListener("click", key);
	const yellow = document.getElementById("yellow");
	yellow.addEventListener("click", key);
	const playButton = document.getElementById("play");
	playButton.addEventListener("click", play);
	const ne = document.getElementById("new");
	ne.addEventListener("click", restart);
});

const NOTE_HZ = 440;
const NOTE_C = 261;
const NOTE_E = 329;
const NOTE_G = 392;
const NOTE_B = 493;
const possibleNotes = [NOTE_C, NOTE_E, NOTE_G, NOTE_B];
let song = [NOTE_C, NOTE_E, NOTE_G, NOTE_B];
let played = [];
let checkTimeout;
let audioBuffer;

function key(e) {
	const id = e.target.id;
	const mapping = {
		"red": NOTE_C,
		"blue": NOTE_E,
		"green": NOTE_G,
		"yellow": NOTE_B,
	};
	const hertz = mapping[id];
	played.push(hertz);
	const pitch = pitchHz(hertz);
	playNote(pitch);
	console.log(played);
	clearTimeout(checkTimeout);
	checkTimeout = setTimeout(verify, 3000);
}

function verify() {
	console.log(played);
	console.log(song);
	if (JSON.stringify(played) === JSON.stringify(song)) {
		console.log("win");
		alert("You should become a musician!");
	} else {
		console.log("loose");
		alert("No that's not it. Keep on practicing!");
	}
	played = [];
}

function restart(e) {
	function randomTone() {
		const random = Math.floor(Math.random() * possibleNotes.length);
		return possibleNotes[random];
	}
	song = [];
	for (let i = 0; i < 5; i++) {
		song.push(randomTone());
	}
}

function play(e) {
	function delayedNote(index) {
		setTimeout(function () {
			const note = song[index];
			const pitch = pitchHz(note);
			playNote(pitch);
		}, 500 * index);
	}
	for (let i = 0; i < song.length; i++) {
		delayedNote(i);
	}
}

function pitchHz(hertz) {
	return hertz / NOTE_HZ;
}
async function playNote(pitch) {
	console.log(pitch);
	const context = await download();
	const source = context.createBufferSource();
	source.buffer = audioBuffer;
	source.playbackRate.value = pitch
	source.connect(context.destination);
	source.start();
}
async function download() {
	const note = "note.mp3";
	const context = new AudioContext();
	if (!audioBuffer) {
		audioBuffer = await fetch(note)
			.then(res => res.arrayBuffer())
			.then(ArrayBuffer => context.decodeAudioData(ArrayBuffer));
	}
	return context;
}