
let sketch = new Sketch({
	uniforms: {
		width: {value: 0.35, type:'f', min:0., max:1},
	},
	fragment: `
		uniform float time;
		uniform float progress;
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


		void main()	{
		  vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
		 float intensity = 0.3;

         float displace1 = texture2D(texture1, newUV).r;
         float displace2 = texture2D(texture2, newUV).r;
         
         vec4 t1 = texture2D(texture1, vec2(newUV.x, newUV.y + progress * (displace2 * intensity)));

         vec4 t2 = texture2D(texture2, vec2(newUV.x, newUV.y + (1.0 - progress) * (displace1 * intensity)));

         gl_FragColor = mix(t1, t2, progress);

		}

	`
});
sketch.play();


