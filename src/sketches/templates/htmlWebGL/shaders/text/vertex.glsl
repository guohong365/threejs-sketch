#pragma glslify:cnoise=require(glsl-noise/classic/3d)

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

varying vec2 vUv;

vec3 distort(vec3 p){
    p.xy+=cnoise(vec3(vec2(p.xy),iTime))*3.;
    return p;
}

void main(){
    vec3 p=position;
    p=distort(p);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    
    vUv=uv;
}