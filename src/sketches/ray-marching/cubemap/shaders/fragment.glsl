#define IS_IN_SHADERTOY 0
#if IS_IN_SHADERTOY==1
#define iChannel0Cube iChannel0
#endif

float sdCubemap(vec3 p){
    float d=texture(iChannel0Cube,p).w;
    d-=1.-length(p);
    d*=.3;
    return d;
}

vec2 mapCubemap(in vec3 pos)
{
    vec2 res=vec2(1e10,0.);
    
    {
        vec3 d1p=pos;
        float d1=sdCubemap(d1p);
        res=opUnion(res,vec2(d1,114514.));
    }
    
    return res;
}

vec2 raycastCubemap(in vec3 ro,in vec3 rd){
    vec2 res=vec2(-1.,-1.);
    float t=0.;
    for(int i=0;i<64;i++)
    {
        vec3 p=ro+t*rd;
        vec2 h=mapCubemap(p);
        if(abs(h.x)<.001*t)
        {
            res=vec2(t,h.y);
            break;
        };
        t+=h.x;
    }
    return res;
}

vec3 calcNormalCubemap(vec3 p){
    return texture(iChannel0Cube,p).rgb;
}

vec3 renderCubemap(in vec3 ro,in vec3 rd){
    vec3 col=vec3(10.,10.,10.)/255.;
    
    vec2 res=raycastCubemap(ro,rd);
    float t=res.x;
    float m=res.y;
    
    if(m>-.5){
        vec3 pos=ro+t*rd;
        
        vec3 nor=(m<1.5)?vec3(0.,1.,0.):calcNormalCubemap(pos);
        
        col=material(col,pos,m,nor);
        
        col=lighting(col,pos,rd,nor);
    }
    
    return col;
}

vec3 getSceneColorCubemap(vec2 fragCoord){
    vec2 p=normalizeScreenCoords(fragCoord,iResolution.xy);
    
    vec3 ro=vec3(0.,4.,8.);
    vec3 ta=vec3(0.,0.,0.);
    const float fl=4.5;
    
    vec2 m=iMouse.xy/iResolution.xy;
    ro.yz=rotate(ro.yz,-m.y*PI+1.);
    ro.xz=rotate(ro.xz,-m.x*TWO_PI);
    
    vec3 rd=getRayDirection(p,ro,ta,fl);
    
    // render
    vec3 col=renderCubemap(ro,rd);
    
    // gamma
    col=toGamma(col);
    
    return col;
}

vec3 getSceneColor(vec2 fragCoord){
    vec2 p=normalizeScreenCoords(fragCoord,iResolution.xy);
    
    vec3 ro=vec3(0.,4.,8.);
    vec3 ta=vec3(0.,0.,0.);
    const float fl=4.5;
    
    vec2 m=iMouse.xy/iResolution.xy;
    ro.yz=rotate(ro.yz,-m.y*PI+1.);
    ro.xz=rotate(ro.xz,-m.x*TWO_PI);
    
    vec3 rd=getRayDirection(p,ro,ta,fl);
    
    // render
    vec3 col=render(ro,rd);
    
    // gamma
    col=toGamma(col);
    
    return col;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec3 tot=vec3(0.);
    
    float AA_size=1.;
    float count=0.;
    for(float aaY=0.;aaY<AA_size;aaY++)
    {
        for(float aaX=0.;aaX<AA_size;aaX++)
        {
            tot+=getSceneColorCubemap(fragCoord+vec2(aaX,aaY)/AA_size);
            count+=1.;
        }
    }
    tot/=count;
    
    fragColor=vec4(tot,1.);
}