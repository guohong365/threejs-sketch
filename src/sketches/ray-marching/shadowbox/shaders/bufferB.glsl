float sdYFace(vec2 p,float scale)
{
    p/=scale;
    
    vec2 d1p=p;
    float d1=sdBox(p,vec2(.2,.15));
    
    float dYFace=d1;
    
    dYFace*=scale;
    
    return dYFace;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    
    // vec2 p=uv;
    vec2 p=(2.*fragCoord-iResolution.xy)/iResolution.y;
    
    float d=sdYFace(p,1.);
    
    vec3 col=vec3(d);
    
    fragColor=vec4(col,1.);
}