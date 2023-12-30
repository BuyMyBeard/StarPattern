import { Application, Assets, Filter, Geometry, Graphics, Mesh, Program, Quad, QuadUv, Rectangle, Shader, extensions } from 'pixi.js'
import { loadGLSL } from './loadGLSL';

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
Promise.all([vert, frag]).then((values) => {

	const uniforms = {
		iTime: 0,
		speed: .25,
		offset: 0,
	};
	
	const starShader = new Shader(new Program(values[0], values[1], "StarShader"), uniforms);
	
	app.ticker.add((delta) => {
		starShader.uniforms.iTime += delta / 60;
	});
	
	const quad = new QuadUv();

	const star = new Mesh(quad, starShader);


	app.stage.addChild(star);
	star.position.set(800, 500);
	star.scale.set(300);
	star.rotation = 10;
});

