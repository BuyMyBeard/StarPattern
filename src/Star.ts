import { Application, Assets, BLEND_MODES, Color, ColorSource, Mesh, Program, QuadUv, Shader } from 'pixi.js';

export class Star extends Mesh<Shader>
{
    private static id = 0;
    public constructor(app : Application, color1 : ColorSource = "black" , color2 : ColorSource = "white", speed = .25, offset = 0)
    {
        Star.id++;

        const uniforms = {
            iTime: 0,
            speed: speed,
            offset: offset,
            col1: new Color(color1).toRgbArray(),
            col2: new Color(color2).toRgbArray(),
        };

        const vert = Assets.get("StarPattern.vert");
        const frag = Assets.get("StarPattern.frag");

        if (vert === undefined || frag === undefined)
            throw "Shaders have not been loaded yet";
        
        const starShader = new Shader(new Program(vert, frag, "StarShader" + Star.id), uniforms);
        
        app.ticker.add((delta) => {
            starShader.uniforms.iTime += delta / 60;
        });
        
        const quad = new QuadUv();
        super(quad, starShader);
        this.blendMode = BLEND_MODES.NORMAL_NPM;
        
        app.stage.addChild(this);
    }
}