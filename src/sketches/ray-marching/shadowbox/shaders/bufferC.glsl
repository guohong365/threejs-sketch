float sdZProfile(vec2 p,float scale)
{
    p/=scale;
    
    vec2 d1p=p;
    d1p-=vec2(0.,.1);
    float d1=sdBox(d1p,vec2(.16,.3));
    
    vec2 d2p=p;
    d2p-=vec2(0.,-.25);
    float d2=sdBox(d2p,vec2(.1,.3));
    
    d1=opSubtraction(d2,d1);
    
    vec2 d3p=p;
    d3p-=vec2(.1,.4);
    float d3=sdBox(d3p,vec2(.19,.3));
    
    d1=opSubtraction(d3,d1);
    
    float dZProfile=d1;
    
    dZProfile*=scale;
    
    return dZProfile;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    
    vec2 p=uv;
    p-=.5;
    p*=iResolution.x/iResolution.y;
    
    float d=sdZProfile(p,1.);
    
    vec3 col=vec3(d);
    
    fragColor=vec4(col,1.);
}