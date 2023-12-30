import { Application, Assets, Color, extensions } from 'pixi.js'
import { loadGLSL } from './loadGLSL';
import { Star } from './Star';
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
extensions.add(loadGLSL);

const vert = Assets.load("StarPattern.vert");
const frag = Assets.load("StarPattern.frag");
Promise.all([vert, frag]).then(() => initialize());

function initialize()
{
	new Generator(app, 100, "BlackAndGrey");
}
