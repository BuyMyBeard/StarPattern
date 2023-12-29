import { Application, Filter, Graphics, Program, Shader } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x333333,
	width: screen.availWidth,
	height: screen.availHeight
});
let shader = "";
const scriptTag = document.getElementById("shader");
if (scriptTag) shader = scriptTag.innerHTML;


// console.log(shader);
const uniforms = {
	iTime: 0,
	iResolution: [innerWidth, innerHeight],
	speed: .25,
};
const shader2 = new Shader(Program.from(undefined, shader, "stars"));

const filter = new Filter(undefined, shader, uniforms);

app.stage.filterArea = app.renderer.screen;
app.stage.filters = [filter];

app.ticker.add((delta) => {
	filter.uniforms.iTime += delta / 60;
});
//const starShader = new Shader(new Program(undefined, shader));
// const mesh = new Mesh(new PlaneGeometry(), starShader);

// app.stage.addChild(mesh);

const graphics = new Graphics();
graphics.beginFill("white");
graphics.drawRect(0, 0, 500, 500);
graphics.endFill();
graphics.shader = shader2;

app.stage.addChild(graphics);
