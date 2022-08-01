float sdYProfile(vec2 p,float scale)
{
    p/=scale;
    
    vec2 d1p=p;
    float d1=sdBox(p,vec2(.2,.15));
    
    float dYProfile=d1;
    
    dYProfile*=scale;
    
    return dYProfile;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    
    vec2 p=uv;
    p-=.5;
    p*=iResolution.x/iResolution.y;
    
    float d=sdYProfile(p,1.);
    
    vec3 col=vec3(d);
    
    col=distanceColourMap(d);
    
    fragColor=vec4(col,d);
}