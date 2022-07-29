#pragma glslify:cnoise3=require(glsl-noise/classic/3d)

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

uniform float uIntensity;
uniform float uHover;

varying vec2 vUv;

varying float vNoise;
varying float vIntensity;

vec3 distort(vec3 p){
    float n=cnoise3(p+iTime);
    
    vNoise=n;
    
    float intensity=mix(uIntensity,uIntensity*3.,uHover);
    vIntensity=intensity;
    
    vec3 result=p+normal*n*intensity;
    
    return result;
}

void main(){
    vec3 p=position;
    
    vec3 dp=distort(p);
    
    csm_Position=dp;
    
    vUv=uv;
}