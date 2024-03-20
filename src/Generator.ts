import { Application } from 'pixi.js';
import { Star } from './Star';
import { StarMaterial } from './StarMaterial';

const minScale = 200;
const maxScale = 340;

export type StarBackgroundType = "Black" | "BlackAndGrey" | "Red";

function pickRandomly<T>(...elements : Array<T>) : T
{
    return elements[Math.floor(Math.random() * elements.length)];
}

function randomRange(min : number, max : number)
{
    return Math.random() * (max - min) + min;
}

export class Generator
{
    constructor(app : Application, count : number, backgroundType : StarBackgroundType = "BlackAndGrey", globalScale = 1, materialVariantCount = 8)
    {
        const materials : StarMaterial[] = [];
        for (let i = 0; i < materialVariantCount; i++) {
            let color1 = "black";
            let color2 = "white";
            switch (backgroundType)
            {
                case "Black":
                    break;
                    
                    case "BlackAndGrey":
                    color1 = i < materialVariantCount / 2 ? "black" : "grey";
                    break;

                case "Red":
                    color2 = "red";
                    break;
            }
            const speed = i < materialVariantCount / 2 ? .25 : -.25;
            const offset = Math.random() * 100;

            materials.push(new StarMaterial(app, color1, color2, speed, offset));
        }
        for (let i = 0; i < count; i++)
        {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const rotation = Math.random() * 360;
            const scale = randomRange(minScale, maxScale) * globalScale;

            const material = pickRandomly(...materials);
            const star = new Star(app, material);
            star.position.set(x, y);
            star.rotation = rotation;
            star.scale.set(scale);
        }
    }
}