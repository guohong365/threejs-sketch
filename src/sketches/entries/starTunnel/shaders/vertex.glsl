#pragma glslify:random=require(glsl-takara/noise/random)

uniform float iTime;

attribute vec2 aSeed;
attribute float aSize;

varying float vRandColor;

void main(){
    vec3 p=position;
    
    float t=iTime*1000.;
    float v=.01;
    float s=v*t;
    // p.z=p.z+s;
    p.z=mod(p.z+s,2000.);
    
    vec4 mvPosition=modelViewMatrix*vec4(p,1.);
    gl_Position=projectionMatrix*mvPosition;
    
    float pSize=aSize*(200./-mvPosition.z);
    gl_PointSize=pSize;
    
    float randColor=random(aSeed);
    vRandColor=randColor;
}