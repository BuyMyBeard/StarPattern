import { Application, Assets, BLEND_MODES, Color, ColorSource, Mesh, Program, QuadUv, Shader } from 'pixi.js';
import { StarMaterial } from './StarMaterial';

export class Star extends Mesh<Shader>
{
    public constructor(app : Application, material : StarMaterial)
    {      
        const quad = new QuadUv();
        super(quad, material);
        this.blendMode = BLEND_MODES.NORMAL_NPM;
        
        app.stage.addChild(this);
    }
}