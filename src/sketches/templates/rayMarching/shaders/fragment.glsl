#pragma glslify:sdPlane=require(glsl-sdf-primitives-all/sdPlane)
#pragma glslify:sdSphere=require(glsl-sdf-primitives-all/sdSphere)
#pragma glslify:sdBox=require(glsl-sdf-primitives-all/sdBox)
#pragma glslify:sdBoundingBox=require(glsl-sdf-primitives-all/sdBoundingBox)
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
#pragma glslify:getRayDirection=require(glsl-takara/getRayDirection)
#pragma glslify:centerUv=require(glsl-takara/centerUv)
#pragma glslify:diffuse=require(glsl-takara/diffuse)

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

varying vec2 vUv;

vec2 map(in vec3 pos)
{
    vec2 res=vec2(1e10,0.);
    
    res=opU(res,vec2(sdSphere(pos-vec3(-2.,.25,0.),.25),26.9));
    
    res=opU(res,vec2(sdBoundingBox(pos-vec3(0.,.25,0.),vec3(.3,.25,.2),.025),16.9));
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

vec3 render(in vec3 ro,in vec3 rd)
{
    // skybox
    vec3 col=vec3(.30,.36,.60)-(rd.y*.7);
    
    vec2 res=raycast(ro,rd);
    float t=res.x;
    float m=res.y;
    
    if(m>-.5){
        vec3 pos=ro+t*rd;
        // normal
        vec3 nor=calcNormal(pos);
        
        // common material
        col=.2+.2*sin(m*2.+vec3(0.,1.,2.));
        
        // give material by material ID
        if(m==26.9){
            col=vec3(0.,.4,.6);
        }
        
        // diffuse
        vec3 lightDir=vec3(-.5,.5,.5);
        float dif=diffuse(lightDir,nor,2.);
        col*=dif;
        
        // gamma
        col=pow(col,vec3(.4545));
    }
    
    return col;
}

void main()
{
    // pixel coordinates
    vec2 p=centerUv(vUv,uResolution);
    
    // camera
    // ray origin
    vec3 ro=vec3(-4.5,1.3,-4.5);
    // look-at target
    vec3 ta=vec3(1.,0.,0.);
    
    // focal length
    const float fl=2.5;
    
    // ray direction
    vec3 rd=getRayDirection(p,ro,ta,fl);
    
    // render
    vec3 col=render(ro,rd);
    
    gl_FragColor=vec4(col,1.);
}