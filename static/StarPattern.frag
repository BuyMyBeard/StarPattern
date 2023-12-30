precision mediump float;

#define PI 3.14159
#define starCount 4

uniform float iTime;
uniform vec2 iResolution;
uniform float speed;
uniform float offset;
uniform vec3 col1;
uniform vec3 col2;
varying vec2 vUvs;

// SDF function taken from https://www.shadertoy.com/view/4fs3zf
float star(vec2 p, float radius, float inset)
{
    const float n = 5.0;
    mat2 rot1 = mat2(cos(1.256637), sin(1.256637), -sin(1.256637), cos(1.256637));
    // mat2 rot1 = mat2(0.999759, 0.021931, -0.021931, 0.999759);
	vec2 p1 = vec2(0.0, radius);
	vec2 p2 = vec2(sin(1.256637 * .5), cos(1.256637 * .5))*radius*inset;
	
	float tetaP = PI + atan(-p.x, -p.y);
	tetaP = mod(tetaP + PI / n, 2.0 * PI);
	for(float i = 1.256637; i < 10000.; i+= 1.256637)
    {
        if (i >= tetaP) break;
		p = rot1 *p;
    }
	
	p.x = abs(p.x);
	
	// sdf segment
	vec2 ba = p2-p1;
	vec2 pa = p - p1;
	float h =clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
	float d = length(pa-h*ba);
	d *= sign(dot(p - p1, -vec2(ba.y, -ba.x)));
	return d;

}

float starPattern(vec2 p)
{
	float colSum = 0.;
	float outerShape = 1. - smoothstep(-.008, -.001, star(p, 1., .6));
	for (int i = 0; i < starCount * 2; i += 1)
	{
		float delta = float(i) - (2. * fract(iTime * speed) - 1.);
		float radius = 1. - delta / float(starCount * 2);
		float star = 1. - smoothstep(-.008, -.001, star(p, radius, .6));
		
		colSum = mod(float(i), 2.) == 0. ? colSum + star: colSum - star;
	}
	float innerStarDelta = 2. * fract(iTime * speed + offset) - 1.;
	float innerStarRadius = innerStarDelta / float(starCount * 2);
	if (innerStarRadius > 0.)
	{
		float innerStar = 1. - smoothstep(-.008, -.001, star(p, innerStarRadius, .6));
		colSum += innerStar;
	}

	colSum *= outerShape;

	return colSum;
}


void main()
{
	vec2 uv = vUvs * 2. - 1.;
	uv.y *= -1.;
	
	float starCol = starPattern(uv);
	//vec3 outputCol = mix(col1, col2, starCol);
	float alpha = 1. - smoothstep(-.008, -.001, star(uv, 1., .6));
	//gl_FragColor = vec4(outputCol , alpha);
	gl_FragColor = vec4(uv, 0., 1.);
}