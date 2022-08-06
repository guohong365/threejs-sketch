#if USE_BUFFER_TEXTURE==1
vec2 map(in vec3 pos)
{
    vec2 res=vec2(1e10,0.);
    
    {
        vec3 d1p=pos;
        float d1=mapTex(iChannel0,d1p);
        res=opUnion(res,vec2(d1,114514.));
    }
    
    return res;
}
#endif

vec2 raycast(in vec3 ro,in vec3 rd){
    vec2 res=vec2(-1.,-1.);
    float t=0.;
    for(int i=0;i<64;i++)
    {
        vec3 p=ro+t*rd;
        vec2 h=map(p);
        if(abs(h.x)<.001*t)
        {
            res=vec2(t,h.y);
            break;
        };
        t+=h.x;
    }
    return res;
}

vec3 calcNormal(vec3 pos,float eps){
    const vec3 v1=vec3(1.,-1.,-1.);
    const vec3 v2=vec3(-1.,-1.,1.);
    const vec3 v3=vec3(-1.,1.,-1.);
    const vec3 v4=vec3(1.,1.,1.);
    
    return normalize(v1*map(pos+v1*eps).x+
    v2*map(pos+v2*eps).x+
    v3*map(pos+v3*eps).x+
    v4*map(pos+v4*eps).x);
}

vec3 calcNormal(vec3 pos){
    return calcNormal(pos,.002);
}

vec3 drawIsoline(vec3 col,vec3 pos){
    float d=map(pos).x;
    col*=1.-exp(-6.*abs(d));
    col*=.8+.2*cos(150.*d);
    col=mix(col,vec3(1.),1.-smoothstep(0.,.01,abs(d)));
    return col;
}

vec3 material(in vec3 col,in vec3 pos,in float m,in vec3 nor){
    col=vec3(1.);
    
    if(m==114514.){
        if(SHOW_ISOLINE==1){
            col=drawIsoline(col,vec3(pos.x*1.,pos.y*0.,pos.z*1.));
        }
    }
    
    return col;
}

vec3 lighting(in vec3 col,in vec3 pos,in vec3 rd,in vec3 nor){
    vec3 lin=col;
    
    {
        vec3 lig=normalize(vec3(1.,2.,3.));
        float dif=dot(nor,lig)*.5+.5;
        lin=col*dif;
    }
    
    return lin;
}

vec3 render(in vec3 ro,in vec3 rd){
    vec3 col=vec3(0.);
    
    vec2 res=raycast(ro,rd);
    float t=res.x;
    float m=res.y;
    
    if(m>-.5){
        vec3 pos=ro+t*rd;
        
        vec3 nor=(m<1.5)?vec3(0.,1.,0.):calcNormal(pos);
        
        col=material(col,pos,m,nor);
        
        col=lighting(col,pos,rd,nor);
    }
    
    return col;
}

vec3 getSceneColor(vec2 fragCoord){
    vec2 p=normalizeScreenCoords(fragCoord,iResolution.xy);
    
    // vec3 ro=vec3(0.,4.,8.);
    vec3 ro=vec3(0.,0.,6.);
    vec3 ta=vec3(0.,0.,0.);
    const float fl=2.;
    
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
            tot+=getSceneColor(fragCoord+vec2(aaX,aaY)/AA_size);
            count+=1.;
        }
    }
    tot/=count;
    
    fragColor=vec4(tot,1.);
}
