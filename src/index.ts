import { Application, Assets, extensions, Text, TextStyle } from 'pixi.js'
import { loadGLSL } from './loadGLSL';
import { Generator } from './Generator';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x333333,
	width: window.innerWidth,
	height: window.innerHeight,
});
// const scriptTag = document.getElementById("shader");
// if (scriptTag) shader = scriptTag.innerHTML;

const loadingString = "Currently loading";
const loadingText = new Text(loadingString, new TextStyle({
	fontSize: 72,
	align: "center",
	fill: "white",
}));
app.stage.addChild(loadingText);

app.render();


loadingText.anchor.set(.5, .5);
loadingText.position.set(innerWidth / 2, innerHeight / 2);


extensions.add(loadGLSL);
const vert = Assets.load("StarPattern.vert");
const frag = Assets.load("StarPattern.frag");
Promise.all([vert, frag]).then(() => initialize());

function initialize()
{
	new Generator(app, 100, "Red");
	app.stage.removeChild(loadingText);
}

const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;

let recording = false;
let mediaRecorder : MediaRecorder;
let recordedChunks : BlobPart[];

canvas.addEventListener("click", () => {
  recording = !recording;
    if(recording){
            const stream = canvas.captureStream(25);
            mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp9',
            });
            recordedChunks = [];
            mediaRecorder.ondataavailable = e => {
                if(e.data.size > 0){
                    recordedChunks.push(e.data);
                }
            };
            mediaRecorder.start();
        } else {
            mediaRecorder.stop();
            setTimeout(() => {
                const blob = new Blob(recordedChunks, {
                    type: "video/webm"
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "recording.webm";
                a.click();
                URL.revokeObjectURL(url);
            },0);
        }
});
