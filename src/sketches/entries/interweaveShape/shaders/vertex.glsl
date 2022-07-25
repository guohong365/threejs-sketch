#pragma glslify:cnoise3=require(glsl-noise/classic/3d)
#pragma glslify:PI=require(glsl-takara/constants/PI)

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

varying vec2 vUv;
varying vec3 vNormal;

vec3 distort(vec3 p){
    float n=cnoise3(p*4.+iTime);
    
    vec3 result=p+normal*n*.1;
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