#pragma glslify:sdPlane=require(glsl-sdf-primitives-all/sdPlane)
#pragma glslify:sdSphere=require(glsl-sdf-primitives-all/sdSphere)
#pragma glslify:sdBox=require(glsl-sdf-primitives-all/sdBox)
#pragma glslify:sdBoxFrame=require(glsl-sdf-primitives-all/sdBoxFrame)
#pragma glslify:sdEllipsoid=require(glsl-sdf-primitives-all/sdEllipsoid)
#pragma glslify:sdTorus=require(glsl-sdf-primitives-all/sdTorus)
#pragma glslify:sdCappedTorus=require(glsl-sdf-primitives-all/sdCappedTorus)
#pragma glslify:sdHexPrism=require(glsl-sdf-primitives-all/sdHexPrism)
#pragma glslify:sdOctogonPrism=require(glsl-sdf-primitives-all/sdOctogonPrism)
#pragma glslify:sdCapsule=require(glsl-sdf-primitives-all/sdCapsule)
#pragma glslify:sdRoundCone=require(glsl-sdf-primitives-all/sdRoundCone)
#pragma glslify:sdTriPrism=require(glsl-sdf-primitives-all/sdTriPrism)
#pragma glslify:sdCylinder=require(glsl-sdf-primitives-all/sdCylinder)
#pragma glslify:sdCone=require(glsl-sdf-primitives-all/sdCone)
#pragma glslify:sdCappedCone=require(glsl-sdf-primitives-all/sdCappedCone)
#pragma glslify:sdSolidAngle=require(glsl-sdf-primitives-all/sdSolidAngle)
#pragma glslify:sdOctahedron=require(glsl-sdf-primitives-all/sdOctahedron)
#pragma glslify:sdPyramid=require(glsl-sdf-primitives-all/sdPyramid)
#pragma glslify:sdRhombus=require(glsl-sdf-primitives-all/sdRhombus)
#pragma glslify:opU=require(glsl-sdf-ops/union)
#pragma glslify:setCamera=require(glsl-takara/setCamera)
#pragma glslify:getRayDirection=require(glsl-takara/getRayDirection)
#pragma glslify:centerUv=require(glsl-takara/centerUv)
#pragma glslify:saturate=require(glsl-takara/saturate)
#pragma glslify:diffuse=require(glsl-takara/diffuse)
#pragma glslify:specular=require(glsl-takara/specular)
#pragma glslify:fresnel=require(glsl-takara/fresnel)
#pragma glslify:checkersGradBox=require(glsl-takara/checkersGradBox)
#pragma glslify:toGamma=require(glsl-gamma/out)
#pragma glslify:triplanarMapping=require(glsl-takara/triplanarMapping)
#pragma glslify:normalizeScreenCoords=require(glsl-takara/normalizeScreenCoords)

vec2 map(in vec3 pos)
{
    vec2 res=vec2(1e10,0.);
    
    res=opU(res,vec2(sdPlane(pos,vec3(0.,1.,0.),0.),114514.));
    
    res=opU(res,vec2(sdSphere(pos-vec3(-2.,.25,0.),.25),26.9));
    
    res=opU(res,vec2(sdBoxFrame(pos-vec3(0.,.25,0.),vec3(.3,.25,.2),.025),16.9));
    res=opU(res,vec2(sdTorus((pos-vec3(0.,.30,1.)).xzy,vec2(.25,.05)),25.));
    res=opU(res,vec2(sdCone(pos-vec3(0.,.45,-1.),vec2(.6,.8),.45),55.));
    res=opU(res,vec2(sdCappedCone(pos-vec3(0.,.25,-2.),.25,.25,.1),13.67));
    res=opU(res,vec2(sdSolidAngle(pos-vec3(0.,0.,-3.),vec2(3,4)/5.,.4),49.13));
    
    res=opU(res,vec2(sdCappedTorus((pos-vec3(1.,.30,1.))*vec3(1,-1,1),vec2(.866025,-.5),.25,.05),8.5));
    res=opU(res,vec2(sdBox(pos-vec3(1.,.25,0.),vec3(.3,.25,.1)),3.));
    res=opU(res,vec2(sdCapsule(pos-vec3(1.,0.,-1.),vec3(-.1,.1,-.1),vec3(.2,.4,.2),.1),31.9));
    res=opU(res,vec2(sdCylinder(pos-vec3(1.,.25,-2.),vec2(.15,.25)),8.));
    res=opU(res,vec2(sdHexPrism(pos-vec3(1.,.2,-3.),vec2(.2,.05)),18.4));
    
    res=opU(res,vec2(sdPyramid(pos-vec3(-1.,-.6,-3.),1.),13.56));
    res=opU(res,vec2(sdOctahedron(pos-vec3(-1.,.15,-2.),.35),23.56));
    res=opU(res,vec2(sdTriPrism(pos-vec3(-1.,.15,-1.),vec2(.3,.05)),43.5));
    res=opU(res,vec2(sdEllipsoid(pos-vec3(-1.,.25,0.),vec3(.2,.25,.05)),43.17));
    res=opU(res,vec2(sdRhombus((pos-vec3(-1.,.34,1.)).xzy,.15,.25,.04,.08),17.));
    
    res=opU(res,vec2(sdOctogonPrism(pos-vec3(2.,.2,-3.),.2,.05),51.8));
    res=opU(res,vec2(sdCylinder(pos-vec3(2.,.15,-2.),vec3(.1,-.1,0.),vec3(-.2,.35,.1),.08),31.2));
    res=opU(res,vec2(sdCappedCone(pos-vec3(2.,.10,-1.),vec3(.1,0.,0.),vec3(-.2,.40,.1),.15,.05),46.1));
    res=opU(res,vec2(sdRoundCone(pos-vec3(2.,.15,0.),vec3(.1,0.,0.),vec3(-.1,.35,.1),.15,.05),51.7));
    res=opU(res,vec2(sdRoundCone(pos-vec3(2.,.20,1.),.2,.1,.3),37.));
    
    return res;
}

vec2 raycast(in vec3 ro,in vec3 rd)
{
    vec2 res=vec2(-1.,-1.);
    
    float t=1.;
    for(int i=0;i<70;i++)
    {
        vec2 h=map(ro+rd*t);
        if(abs(h.x)<(.0001*t))
        {
            res=vec2(t,h.y);
            break;
        }
        t+=h.x;
    }
    
    return res;
}

#pragma glslify:calcNormal=require(glsl-sdf-normal,map=map)
#pragma glslify:calcSoftshadow=require(glsl-sdf-ops/softshadow,map=map)
#pragma glslify:calcAO=require(glsl-sdf-ops/ao,map=map)

vec3 render(in vec3 ro,in vec3 rd)
{
    // skybox
    vec3 col=vec3(.7,.7,.9)-max(rd.y,0.)*.3;
    
    // raymarching
    vec2 res=raycast(ro,rd);
    float t=res.x;
    float m=res.y;
    
    // position
    vec3 pos=ro+t*rd;
    // normal
    vec3 nor=calcNormal(pos);
    // reflection
    vec3 ref=reflect(rd,nor);
    // ao
    float occ=calcAO(pos,nor);
    
    if(m>-.5){
        
        // common material
        col=.2+.2*sin(m*2.+vec3(0.,1.,2.));
        
        // give material by material ID
        if(m==114514.){
            float grid=checkersGradBox(pos.xz);
            col=vec3(grid);
        }
        
        // triplanar mapping
        if(m==23.56){
            vec3 triMap=triplanarMapping(iChannel0,nor,pos);
            col=triMap;
        }
        
        // lighting
        vec3 lin=vec3(0.);
        
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
            // occ
            dif*=occ;
            // apply
            lin+=col*.55*dif*vec3(.25,.25,.25);
        }
        // sss
        {
            // fresnel
            float dif=fresnel(0.,1.,2.,rd,nor);
            // occ
            dif*=occ;
            // apply
            lin+=col*.25*dif*vec3(1.,1.,1.);
        }
        
        col=lin;
    }
    
    return col;
}

vec3 getSceneColor(vec2 fragCoord){
    // pixel coordinates
    vec2 p=normalizeScreenCoords(fragCoord,iResolution.xy);
    
    // mouse
    // vec2 mo=vec2(iResolution.x/2.,0.);
    vec2 mo=iMouse.xy/iResolution.xy;
    
    // camera
    // look-at target
    vec3 ta=vec3(.5,-.5,-.6);
    
    // ray origin
    vec3 ro=ta+vec3(4.5*cos(7.*mo.x),1.3+2.*mo.y,4.5*sin(7.*mo.x));
    
    // focal length
    const float fl=2.5;
    
    // ray direction
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