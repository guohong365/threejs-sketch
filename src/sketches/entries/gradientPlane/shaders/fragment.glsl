#pragma glslify:snoise2=require(glsl-noise/simplex/2d)

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 p=fragCoord/iResolution.xy;
    
    vec3 col=vec3(.5686,.1608,.8627);
    
    vec3 colorA=vec3(.1922,.3608,.9137);
    vec3 colorB=vec3(.051,.8275,1.);
    
    float n1=snoise2(p+iTime*sin(iMouse.x*.01)+.2);
    col=mix(col,colorA,n1);
    
    float n2=snoise2(p+iTime*sin(iMouse.y*.01)+.2);
    col=mix(col,colorB,n2);
    
    fragColor=vec4(col,1.);
}
