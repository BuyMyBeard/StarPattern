import { Application, Assets, Color, Mesh, Program, QuadUv, Shader } from 'pixi.js';

export class Star extends Mesh<Shader>
{
    public constructor(app : Application, color1 : Color = new Color("black"), color2 : Color = new Color("white"),  speed = .25, offset = 0)
    {


        const uniforms = {
            iTime: 0,
            speed: speed,
            offset: offset,
            col1: color1.toRgbArray(),
            col2: color2.toRgbArray(),
        };

        console.log(uniforms);

        const vert = Assets.get("StarPattern.frag");
        const frag = Assets.get("StarPattern.vert");

        if (vert === undefined || frag === undefined)
            throw "Shaders have not been loaded yet";
        
        const starShader = new Shader(new Program(vert, frag, "StarShader"), uniforms);
        
        app.ticker.add((delta) => {
            starShader.uniforms.iTime += delta / 60;
        });
        
        const quad = new QuadUv();
        
        super(quad, starShader);
        
        app.stage.addChild(this);
        this.position.set(800, 500);
        this.scale.set(300);
        this.rotation = 10;
    }
}