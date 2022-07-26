#pragma glslify:cnoise3=require(glsl-noise/classic/3d)

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

// varying vec2 vUv;
// varying vec3 vNormal;
varying float vNoise;

vec3 distort(vec3 p){
    float n=cnoise3(p*1.+iTime);
    
    float noiseArea=sin(smoothstep(-1.,1.,p.y)*PI);
    
    vNoise=n*noiseArea;
    
    float amp=1.4;
    
    vec3 result=p+normal*n*amp*noiseArea;
    
    return result;
}

#pragma glslify:fixNormal=require(glsl-takara/vertex/fixNormal,map=distort)

void main(){
    vec3 p=position;
    
    vec3 dp=distort(p);
    
    csm_Position=dp;
    
    vUv=uv;
    vNormal=fixNormal(p,dp,normal);
}