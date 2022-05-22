// all sdfs
#pragma glslify:sdBox=require(glsl-sdf/3d/primitives/sdBox)
#pragma glslify:sdSphere=require(glsl-sdf/3d/primitives/sdSphere)
#pragma glslify:sdCylinder=require(glsl-sdf/3d/primitives/sdCylinder)
#pragma glslify:sdHexPrism=require(glsl-sdf/3d/primitives/sdHexPrism)
#pragma glslify:sdOctogonPrism=require(glsl-sdf/3d/primitives/sdOctogonPrism)
#pragma glslify:sdTriPrism=require(glsl-sdf/3d/primitives/sdTriPrism)
#pragma glslify:sdCapsule=require(glsl-sdf/3d/primitives/sdCapsule)
#pragma glslify:sdBezier3D=require(glsl-sdf/extra/primitives/sdBezier3D)
#pragma glslify:sdUberprim=require(glsl-sdf/extra/primitives/sdUberprim)
#pragma glslify:sdStar3D=require(glsl-sdf/extra/primitives/sdStar3D)

// sdf ops
#pragma glslify:opElongate=require(glsl-sdf/3d/alterations/opElongate)
#pragma glslify:opRound=require(glsl-sdf/3d/alterations/opRound)
#pragma glslify:opOnion=require(glsl-sdf/3d/alterations/opOnion)
#pragma glslify:opExtrusion=require(glsl-sdf/3d/alterations/opExtrusion)
#pragma glslify:opRevolution=require(glsl-sdf/3d/alterations/opRevolution)
#pragma glslify:length2=require(glsl-sdf/3d/alterations/length2)
#pragma glslify:length4=require(glsl-sdf/3d/alterations/length4)
#pragma glslify:length6=require(glsl-sdf/3d/alterations/length6)
#pragma glslify:length8=require(glsl-sdf/3d/alterations/length8)
#pragma glslify:opUnion=require(glsl-sdf/3d/combinations/opUnion)
#pragma glslify:opIntersection=require(glsl-sdf/3d/combinations/opIntersection)
#pragma glslify:opSubtraction=require(glsl-sdf/3d/combinations/opSubtraction)
#pragma glslify:opSmoothUnion=require(glsl-sdf/3d/combinations/opSmoothUnion)
#pragma glslify:opSmoothIntersection=require(glsl-sdf/3d/combinations/opSmoothIntersection)
#pragma glslify:opSmoothSubtraction=require(glsl-sdf/3d/combinations/opSmoothSubtraction)
#pragma glslify:opRep=require(glsl-sdf/3d/positioning/opRep)
#pragma glslify:opRepLim=require(glsl-sdf/3d/positioning/opRepLim)
#pragma glslify:opSymX=require(glsl-sdf/3d/positioning/opSymX)
#pragma glslify:opSymY=require(glsl-sdf/3d/positioning/opSymY)
#pragma glslify:opSymZ=require(glsl-sdf/3d/positioning/opSymZ)
#pragma glslify:opTx=require(glsl-sdf/3d/positioning/opTx)
#pragma glslify:opTwist=require(glsl-sdf/3d/deformations/opTwist)
#pragma glslify:opCheapBend=require(glsl-sdf/3d/deformations/opCheapBend)
#pragma glslify:opHalfX=require(glsl-sdf/extra/alterations/opHalfX)
#pragma glslify:opHalfY=require(glsl-sdf/extra/alterations/opHalfY)
#pragma glslify:opHalfZ=require(glsl-sdf/extra/alterations/opHalfZ)

// ray
#pragma glslify:normalizeScreenCoords=require(glsl-takara/vector/normalizeScreenCoords)
#pragma glslify:getRayDirection=require(glsl-takara/vector/getRayDirection)

// lighting
#pragma glslify:saturate=require(glsl-takara/light/saturate)
#pragma glslify:diffuse=require(glsl-takara/light/diffuse)
#pragma glslify:specular=require(glsl-takara/light/specular)
#pragma glslify:fresnel=require(glsl-takara/light/fresnel)

// rotate
#pragma glslify:rotate=require(glsl-takara/rotate/rotate)
#pragma glslify:rotateX=require(glsl-takara/rotate/rotateX)
#pragma glslify:rotateY=require(glsl-takara/rotate/rotateY)
#pragma glslify:rotateZ=require(glsl-takara/rotate/rotateZ)

// gamma
#pragma glslify:toGamma=require(glsl-takara/gamma/out)

// consts
#pragma glslify:PI=require(glsl-takara/constants/PI)
#pragma glslify:TWO_PI=require(glsl-takara/constants/TWO_PI)

vec2 map(in vec3 pos)
{
    vec2 res=vec2(1e10,0.);
    
    {
        vec3 q=pos;
        float dt=sdBox(q,vec3(.5));
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
    vec3 lin=col;
    
    // sun
    {
        vec3 lig=normalize(vec3(1.,1.,1.));
        float dif=diffuse(nor,lig);
        float spe=specular(nor,lig,3.);
        lin+=col*dif*spe;
    }
    
    // sky
    {
        lin*=col*.7;
    }
    
    return lin;
}

vec3 render(in vec3 ro,in vec3 rd){
    // skybox
    vec3 col=vec3(10.,10.,10.)/255.;
    
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
    
    vec3 ro=vec3(0.,4.,8.);
    vec3 ta=vec3(0.,0.,0.);
    const float fl=2.5;
    
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