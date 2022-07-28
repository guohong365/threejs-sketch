float sdXFace(vec2 p,float scale)
{
    p/=scale;
    
    vec2 d1p=p;
    d1p-=vec2(0.,.1);
    float d1=sdBox(d1p,vec2(.16,.3));
    
    vec2 d2p=p;
    d2p-=vec2(0.,-.25);
    float d2=sdBox(d2p,vec2(.1,.3));
    
    d1=opSubtraction(d2,d1);
    
    float dXFace=d1;
    
    dXFace*=scale;
    
    return dXFace;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    
    // vec2 p=uv;
    vec2 p=(2.*fragCoord-iResolution.xy)/iResolution.y;
    
    float d=sdXFace(p,1.);
    
    vec3 col=vec3(d);
    
    fragColor=vec4(col,1.);
}