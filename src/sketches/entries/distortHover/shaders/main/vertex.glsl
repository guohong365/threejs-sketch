#pragma glslify:deformationCurve=require(glsl-takara/vertex/deformationCurve)

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

uniform vec2 uOffset;

varying vec2 vUv;

void main(){
    vec3 p=position;
    p=deformationCurve(p,uv,uOffset);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    
    vUv=uv;
}