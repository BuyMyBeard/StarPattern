import { Application, Assets, Mesh, Program, QuadUv, Shader, extensions } from 'pixi.js'
import { loadGLSL } from './loadGLSL';
import { Star } from './Star';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x333333,
	width: screen.availWidth,
	height: screen.availHeight
});
// const scriptTag = document.getElementById("shader");
// if (scriptTag) shader = scriptTag.innerHTML;
extensions.add(loadGLSL);

const vert = Assets.load("StarPattern.vert");
const frag = Assets.load("StarPattern.frag");
Promise.all([vert, frag]).then(() => initialize())

function generateStars(x : number, y : number, scale : number, rotation = 0)
{

}

function initialize()
{
	const star1 = new Star(app);
	star1.position.set(500, 500)
	star1.scale.set(1000)
	star1.rotation = 20;

	const star2 = new Star(app);
	star2.position.set(800, 300);
	star2.scale.set(500);
}
