#pragma glslify:rotate=require(glsl-takara/rotate/rotate)
#pragma glslify:map=require(glsl-takara/operation/map)

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

varying vec2 vUv2;

uniform vec2 uTranslate;
uniform vec2 uScale;

vec2 getDisplacementUv(vec2 p){
    float d=1.8;
    float u=fract(map(-.5,.5,0.,1.,p.x));
    float v=fract(map(-d,d,0.,1.,p.y));
    
    vec2 displacementUv=vec2(u,v);
    return displacementUv;
}

vec3 distort(vec3 p){
    // p.z+=sin(p.x*10.)*.4;
    
    // vec2 circleRot=rotate(vec2(0.,1.),uv.x*2.*PI);
    // p.x=circleRot.x;
    // p.z=circleRot.y;
    
    vec2 pos=p.xy*.5*uScale+uTranslate;
    vec2 displacementUv=getDisplacementUv(pos);
    
    float displacement=map(0.,1.,-1.,1.,texture(displacementMap,displacementUv).x);
    float radius=1.4+1.25*displacement;
    vec2 rotatedDisplacement=rotate(vec2(0.,radius),(pos.x)*2.*PI);
    p.x=rotatedDisplacement.x;
    p.y=pos.y;
    p.z=rotatedDisplacement.y;
    
    return p;
}

void main(){
    vec3 p=position;
    
    vec3 dp=distort(p);
    
    csm_Position=dp;
    
    vUv2=uv;
}