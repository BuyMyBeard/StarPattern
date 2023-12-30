import { Application } from 'pixi.js';
import { Star } from './Star';

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
    constructor(app : Application, count : number, backgroundType : StarBackgroundType = "BlackAndGrey")
    {
        for (let i = 0; i < count; i++)
        {
            let color1 = "black";
            let color2 = "white";
            switch (backgroundType)
            {
                case "Black":
                    break;
                    
                    case "BlackAndGrey":
                    color1 = pickRandomly("black", "grey");
                    break;

                case "Red":
                    color2 = "red";
                    break;
            }
            const speed = pickRandomly(0.25, -0.25);
            //const offset = Math.random() * 1;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const rotation = Math.random() * 360;
            const scale = randomRange(minScale, maxScale);

            const star = new Star(app, color1, color2, speed);
            star.position.set(x, y);
            star.rotation = rotation;
            star.scale.set(scale);
        }
    }
}