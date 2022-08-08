#pragma glslify:RGBShift=require(glsl-takara/filter/RGBShift)

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

uniform sampler2D uTexture;

uniform vec2 uOffset;
uniform float uRGBShift;

varying vec2 vUv;

void main(){
    vec2 p=vUv;
    vec4 tex=RGBShift(uTexture,p+uOffset*uRGBShift,p,p,0.);
    vec3 color=tex.rgb;
    gl_FragColor=vec4(color,1.);
}