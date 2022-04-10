// all sdfs
#pragma glslify:sdBox=require(glsl-sdf/3d/primitives/sdBox)

// sdf ops
#pragma glslify:opUnion=require(glsl-sdf/3d/combinations/opUnion)
#pragma glslify:opRound=require(glsl-sdf/3d/alterations/opRound)

// ray
#pragma glslify:normalizeScreenCoords=require(glsl-takara/vector/normalizeScreenCoords)
#pragma glslify:getRayDirection=require(glsl-takara/vector/getRayDirection)

// lights
#pragma glslify:diffuse=require(glsl-takara/light/diffuse)

// gamma
#pragma glslify:toGamma=require(glsl-takara/gamma/out)

vec2 map(in vec3 pos)
{
    vec2 res=vec2(1e10,0.);
    
    {
        vec3 q=pos;
        float dt=sdBox(q,vec3(.5,.5,.5));
        dt=opRound(dt,.1);
        res=opUnion(res,vec2(dt,26.9));
    }
    
    return res;
}

vec2 raycast(in vec3 ro,in vec3 rd,float end){
    vec2 res=vec2(-1.,-1.);
    float t=7.;
    for(int i=0;i<64;i++)
    {
        vec3 p=ro+t*rd;
        vec2 h=map(p);
        if(abs(h.x)<(.001*t)||t>end)
        {
            res=vec2(t,h.y);
            break;
        };
        t+=h.x;
    }
    return res;
}

#pragma glslify:calcNormal=require(glsl-sdf/utils/normal,map=map)
#pragma glslify:calcSoftshadow=require(glsl-sdf/utils/softshadow,map=map)

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec3 tot=vec3(0.);
    
    vec2 p=normalizeScreenCoords(fragCoord,iResolution.xy);
    
    vec3 ro=vec3(6.,6.,6.);
    vec3 ta=vec3(0.,0.,0.);
    const float fl=2.5;
    vec3 rd=getRayDirection(p,ro,ta,fl);
    
    vec3 col=vec3(0.);
    
    float end=32.;
    vec2 res=raycast(ro,rd,end);
    float t=res.x;
    float m=res.y;
    
    if(t<end)
    {
        col=vec3(1.);
        
        // material
        if(m==26.9){
            col=vec3(153.,204.,255.)/255.;
        }
        
        // light
        vec3 pos=ro+t*rd;
        vec3 nor=calcNormal(pos);
        vec3 lig=normalize(vec3(1.,.8,-.2));
        
        // ambient
        float amb=.5+.5*nor.y;
        col*=amb;
        
        // diffuse
        float dif=diffuse(nor,lig);
        col+=dif;
    }
    
    col=toGamma(col);
    tot+=col;
    
    fragColor=vec4(tot,1.);
}