// all sdfs
#pragma glslify:sdBox=require(glsl-sdf/3d/primitives/sdBox)

// sdf ops
#pragma glslify:opUnion=require(glsl-sdf/3d/combinations/opUnion)
#pragma glslify:opRound=require(glsl-sdf/3d/alterations/opRound)

// ray
#pragma glslify:normalizeScreenCoords=require(glsl-takara/vector/normalizeScreenCoords)
#pragma glslify:getRayDirection=require(glsl-takara/vector/getRayDirection)

// lighting
#pragma glslify:saturate=require(glsl-takara/light/saturate)
#pragma glslify:diffuse=require(glsl-takara/light/diffuse)
#pragma glslify:specular=require(glsl-takara/light/specular)
#pragma glslify:fresnel=require(glsl-takara/light/fresnel)

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

vec2 raycast(in vec3 ro,in vec3 rd){
    vec2 res=vec2(-1.,-1.);
    float t=0.;
    for(int i=0;i<64;i++)
    {
        vec3 p=ro+t*rd;
        vec2 h=map(p);
        if(abs(h.x)<(.001*t))
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
#pragma glslify:calcAO=require(glsl-sdf/utils/ao,map=map)

vec3 material(in vec3 col,in vec3 pos,in float m,in vec3 nor){
    // common material
    col=.2+.2*sin(m*2.+vec3(0.,1.,2.));
    
    // material
    if(m==26.9){
        col=vec3(153.,204.,255.)/255.;
    }
    
    return col;
}

vec3 lighting(in vec3 col,in vec3 pos,in vec3 rd,in vec3 nor){
    vec3 lin=vec3(0.);
    
    // reflection
    vec3 ref=reflect(rd,nor);
    
    // ao
    float occ=calcAO(pos,nor);
    
    // sun
    {
        // pos
        vec3 lig=normalize(vec3(-.5,.4,-.6));
        // dir
        vec3 hal=normalize(lig-rd);
        // diffuse
        float dif=diffuse(nor,lig);
        // softshadow
        dif*=calcSoftshadow(pos,lig,.02,2.5);
        // specular
        float spe=specular(nor,hal,16.);
        spe*=dif;
        // fresnel
        spe*=fresnel(.04,.96,5.,-lig,hal);
        // apply
        lin+=col*2.20*dif*vec3(1.30,1.,.70);
        lin+=5.*spe*vec3(1.30,1.,.70);
    }
    // sky
    {
        // diffuse
        float dif=sqrt(saturate(.5+.5*nor.y));
        // ao
        dif*=occ;
        // specular
        float spe=smoothstep(-.2,.2,ref.y);
        spe*=dif;
        // fresnel
        spe*=fresnel(.04,.96,5.,rd,nor);
        // softshadow
        spe*=calcSoftshadow(pos,ref,.02,2.5);
        // apply
        lin+=col*.60*dif*vec3(.40,.60,1.15);
        lin+=2.*spe*vec3(.40,.60,1.30);
    }
    // back
    {
        // diff
        float dif=diffuse(nor,normalize(vec3(.5,0.,.6)))*saturate(1.-pos.y);
        // ao
        dif*=occ;
        // apply
        lin+=col*.55*dif*vec3(.25,.25,.25);
    }
    // sss
    {
        // fresnel
        float dif=fresnel(0.,1.,2.,rd,nor);
        // ao
        dif*=occ;
        // apply
        lin+=col*.25*dif*vec3(1.,1.,1.);
    }
    
    return lin;
}

vec3 render(in vec3 ro,in vec3 rd){
    // skybox
    vec3 col=vec3(.7,.7,.9)-max(rd.y,0.)*.3;
    
    // raymarching
    vec2 res=raycast(ro,rd);
    float t=res.x;
    float m=res.y;
    
    if(m>-.5){
        // position
        vec3 pos=ro+t*rd;
        // normal
        vec3 nor=(m<1.5)?vec3(0.,1.,0.):calcNormal(pos);
        
        // material
        col=material(col,pos,m,nor);
        
        // lighting
        col=lighting(col,pos,rd,nor);
    }
    
    return col;
}

vec3 getSceneColor(vec2 fragCoord){
    vec2 p=normalizeScreenCoords(fragCoord,iResolution.xy);
    
    vec3 ro=vec3(3.,3.,3.);
    vec3 ta=vec3(0.,0.,0.);
    const float fl=2.5;
    vec3 rd=getRayDirection(p,ro,ta,fl);
    
    // render
    vec3 col=render(ro,rd);
    
    // gamma
    col=toGamma(col);
    
    return col;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec3 col=getSceneColor(fragCoord);
    
    fragColor=vec4(col,1.);
}