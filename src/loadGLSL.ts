import { ExtensionType, LoaderParser, LoaderParserPriority, checkExtension, settings } from 'pixi.js';

const validGLSL1 = ".frag";
const validGLSL2 = ".vert";

export const loadGLSL = {
    name: 'loadGLSL',
    
    extension: {
        type: ExtensionType.LoadParser,
        priority: LoaderParserPriority.High,
    },

    test(url: string): boolean
    { 
        return checkExtension(url, validGLSL1)
        || checkExtension(url, validGLSL2);
    },

    async load(url: string): Promise<string>
    {
        const response = await settings.ADAPTER.fetch(url);
        
        const txt = await response.text();

        return txt;
    },
} as LoaderParser