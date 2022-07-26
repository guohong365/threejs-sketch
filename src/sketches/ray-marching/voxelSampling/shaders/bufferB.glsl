const vec3 size=vec3(48.);

float packfragcoord2(vec2 p,vec2 s){
    return floor(p.y)*s.x+p.x;
}
vec2 unpackfragcoord2(float p,vec2 s){
    float x=mod(p,s.x);
    float y=(p-x)/s.x+.5;
    return vec2(x,y);
}
float packfragcoord3(vec3 p,vec3 s){
    return floor(p.z)*s.x*s.y+floor(p.y)*s.x+p.x;
}
vec3 unpackfragcoord3(float p,vec3 s){
    float x=mod(p,s.x);
    float y=mod((p-x)/s.x,s.y);
    float z=(p-x-floor(y)*s.x)/(s.x*s.y);
    return vec3(x,y+.5,z+.5);
}

vec4 fetch_rd(vec3 p){
    p=clamp(p,vec3(.5),size-.5);
    float posidx=packfragcoord3(p,size);
    vec2 uv=unpackfragcoord2(posidx,iResolution.xy)/iResolution.xy;
    return texture(iChannel0,uv);
}

vec4 fetch_df(vec3 p){
    p=clamp(p,vec3(.5),size-.5);
    float posidx=packfragcoord3(p,size);
    vec2 uv=unpackfragcoord2(posidx,iResolution.xy)/iResolution.xy;
    return texture(iChannel1,uv);
}

float inrange(float x,float min,float max){
    return abs(.5*(sign(max-x)+sign(x-min)));
}

vec4 max6(vec4 n[6]){
    vec4 m0=max(n[0],n[1]);
    vec4 m1=max(n[2],n[3]);
    vec4 m2=max(n[4],n[5]);
    return max(m0,max(m1,m2));
}

vec4 min6(vec4 n[6]){
    vec4 m0=min(n[0],n[1]);
    vec4 m1=min(n[2],n[3]);
    vec4 m2=min(n[4],n[5]);
    return min(m0,min(m1,m2));
}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec4 n[6];
    vec4 d[6];
    
    float posidx=packfragcoord2(fragCoord.xy,iResolution.xy);
    vec3 pos=unpackfragcoord3(posidx,size);
    vec3 e=vec3(-1.,0.,1.);
    vec4 x=fetch_rd(pos);
    n[0]=fetch_rd(pos+e.xyy);
    n[1]=fetch_rd(pos+e.zyy);
    n[2]=fetch_rd(pos+e.yxy);
    n[3]=fetch_rd(pos+e.yzy);
    n[4]=fetch_rd(pos+e.yyx);
    n[5]=fetch_rd(pos+e.yyz);
    
    d[0]=fetch_df(pos+e.xyy);
    d[1]=fetch_df(pos+e.zyy);
    d[2]=fetch_df(pos+e.yxy);
    d[3]=fetch_df(pos+e.yzy);
    d[4]=fetch_df(pos+e.yyx);
    d[5]=fetch_df(pos+e.yyz);
    
    vec4 rd_max=max6(n);
    vec4 rd_min=min6(n);
    
    vec4 df_min=min6(d);
    
    float contour=.5;
    
    // check if the contour line lies between this voxel and its neighbors
    float r0=inrange(contour,x.x,rd_min.x);
    float r1=inrange(contour,x.x,rd_max.x);
    
    float xminmin=min(x.x,rd_min.x);
    float xminmax=max(x.x,rd_min.x);
    float xmaxmin=min(x.x,rd_max.x);
    float xmaxmax=max(x.x,rd_max.x);
    
    float d0=xminmax-xminmin;
    float d1=xmaxmax-xmaxmin;
    
    const float s=1.;
    
    // anti-alias the distance field by computing distance from the center point to the contour
    float dist=
    (d0==0.?0.:r0*abs(contour-x.x)/d0)+
    (d1==0.?0.:r1*abs(contour-x.x)/d1);
    
    float distance=s*dist+(1.-(r0+r1))*(df_min.x+s);
    
    fragColor=vec4(distance);
}