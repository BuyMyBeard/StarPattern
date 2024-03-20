import { Application, Assets, extensions, Text, TextStyle } from 'pixi.js'
import { loadGLSL } from './loadGLSL';
import { Generator, StarBackgroundType } from './Generator';

const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;

extensions.add(loadGLSL);
const vert = Assets.load("StarPattern.vert");
const frag = Assets.load("StarPattern.frag");
const promise = Promise.all([vert, frag]);

let optionAlreadySelected = false;
let app : Application;

const bt1 = document.getElementById("opt1");
const bt2 = document.getElementById("opt2");
const bt3 = document.getElementById("opt3");
if (bt1)
{
    bt1.onclick = () => 
    {
        if (optionAlreadySelected) return;
        optionAlreadySelected = true;
        renderLoading();
        promise.then(() => initialize('BlackAndGrey'));
    };
} 
if (bt2)
{
    bt2.onclick = () => 
    {
        if (optionAlreadySelected) return;
        optionAlreadySelected = true;
        renderLoading();
        promise.then(() => initialize('Black'));
    };
} 
if (bt3)
{
    bt3.onclick = () => 
    {
        if (optionAlreadySelected) return;
        optionAlreadySelected = true;
        renderLoading();
        promise.then(() => initialize('Red'));
    };
} 

let loadingText : Text;

function renderLoading()
{
    const btns = document.getElementById("buttons");
    const content = document.getElementById("pixi-content"); 
    if (content) content.removeAttribute("style");
    if (btns) btns.remove();

    app = new Application({
        view: canvas,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        backgroundColor: 0x333333,
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const loadingString = "Currently loading";
    loadingText = new Text(loadingString, new TextStyle({
        fontSize: 72,
        align: "center",
        fill: "white",
    }));
    app.stage.addChild(loadingText);
    
    app.render();
    
    loadingText.anchor.set(.5, .5);
    loadingText.position.set(innerWidth / 2, innerHeight / 2);
}    


function initialize(backgroundType : StarBackgroundType)
{
    setTimeout(() => 
    {
        const fullHd = 1500000;
        const phone = 300000;
        const volume = window.innerWidth * window.innerHeight;
        const scale = remap(volume, fullHd, phone, 1, .75);
        const count = remap(volume, fullHd, phone, 120, 60);
        
        new Generator(app, count, backgroundType, scale, 10);
        app.stage.removeChild(loadingText);
        attachRecorder();
    }, 200);
}

function attachRecorder()
{
    const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;
    
    let recording = false;
    let mediaRecorder : MediaRecorder;
    let recordedChunks : BlobPart[];
    
    canvas.addEventListener("click", () => 
    {
      recording = !recording;
        if(recording)
        {
            const stream = canvas.captureStream(25);
            mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9',});
            recordedChunks = [];
            mediaRecorder.ondataavailable = e => 
            {
                if(e.data.size > 0)
                    recordedChunks.push(e.data);
            };
            mediaRecorder.start();
        }
        else 
        {
            mediaRecorder.stop();
            setTimeout(() => 
            {
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
}

function remap(val : number, a : number, b: number, c : number, d : number ) : number {
    return c + (d - c) * ((val - a) / (b - a));
}