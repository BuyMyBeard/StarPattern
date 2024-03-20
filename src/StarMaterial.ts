import { Application, Assets, Color, ColorSource, Program, Shader } from 'pixi.js';

export class StarMaterial extends Shader {
    private static id = 0;
    public constructor(app : Application, color1 : ColorSource = "black" , color2 : ColorSource = "white", speed = .25, offset = 0)
    {
        StarMaterial.id++;

        const uniforms = {
            iTime: 0 + offset,
            speed: speed,
            col1: new Color(color1).toRgbArray(),
            col2: new Color(color2).toRgbArray(),
        };

        const vert = Assets.get("StarPattern.vert");
        const frag = Assets.get("StarPattern.frag");

        if (vert === undefined || frag === undefined)
            throw "Shaders have not been loaded yet";
         
        app.ticker.add((delta) => {
            this.uniforms.iTime += delta / 60;
        });
        super(new Program(vert, frag, "StarShader" + StarMaterial.id), uniforms);
    }

}