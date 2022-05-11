#pragma glslify:circle=require(glsl-takara/pattern/circle.glsl)

uniform vec3 iColor1;
uniform vec3 iColor2;

varying float vRandColor;

void main(){
    vec2 p=gl_PointCoord-.5+.5;
    
    vec3 color=iColor1;
    if(vRandColor>0.&&vRandColor<.5){
        color=iColor2;
    }
    
    float shape=circle(p,1.);
    
    vec3 col=color*shape;
    
    gl_FragColor=vec4(col,1.);
}
