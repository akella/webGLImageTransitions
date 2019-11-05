// planetary
let sketch = new Sketch({
	debug: false,
	uniforms: {
		intensity: {value: 50., type:'f', min:1., max:100}
	},
	fragment: `
		uniform float time;
		uniform float progress;
		uniform float intensity;
		uniform float width;
		uniform float scaleX;
		uniform float scaleY;
		uniform float transition;
		uniform float radius;
		uniform float swipe;
		uniform sampler2D texture1;
		uniform sampler2D texture2;
		uniform sampler2D displacement;
		uniform vec4 resolution;
		varying vec2 vUv;
		mat2 rotate(float a) {
			float s = sin(a);
			float c = cos(a);
			return mat2(c, -s, s, c);
		}
		const float PI = 3.1415;
		const float angle1 = PI *0.25;
		const float angle2 = -PI *0.75;

		const float noiseSeed = 2.;

		float random() { 
			return fract(sin(noiseSeed + dot(gl_FragCoord.xy / resolution.xy / 10.0, vec2(12.9898, 4.1414))) * 43758.5453);
		}

		float hash(float n) { return fract(sin(n) * 1e4); }
		float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

		float hnoise(vec2 x) {
			vec2 i = floor(x);
			vec2 f = fract(x);

			float a = hash(i);
			float b = hash(i + vec2(1.0, 0.0));
			float c = hash(i + vec2(0.0, 1.0));
			float d = hash(i + vec2(1.0, 1.0));

			vec2 u = f * f * (3.0 - 2.0 * f);
			return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
		}


		void main()	{

			vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
			
			float hn = hnoise(newUV.xy * resolution.xy / 100.0);

			vec2 d = vec2(0.,normalize(vec2(0.5,0.5) - newUV.xy).y);

			vec2 uv1 = newUV + d * progress / 5.0 * (1.0 + hn / 2.0);
			vec2 uv2 = newUV - d * (1.0 - progress) / 5.0 * (1.0 + hn / 2.0);

			vec4 t1 = texture2D(texture1,uv1);
			vec4 t2 = texture2D(texture2,uv2);

			gl_FragColor = mix(t1, t2, progress);

		}

	`
});


