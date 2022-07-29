#pragma glslify:cnoise3=require(glsl-noise/classic/3d)

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

uniform float uIntensity;

varying vec2 vUv;

varying float vNoise;

vec3 distort(vec3 p){
    float n=cnoise3(p+iTime);
    
    vNoise=n;
    
    vec3 result=p+normal*n*uIntensity;
    
    return result;
}

void main(){
    vec3 p=position;
    
    vec3 dp=distort(p);
    
    csm_Position=dp;
    
    vUv=uv;
}