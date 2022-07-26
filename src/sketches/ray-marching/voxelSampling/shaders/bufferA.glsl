const vec3 size=vec3(48.);

const float timestep=.7;
const float a0=-.1;
const float a1=2.;
const float epsilon=.05;
const float delta=4.;
const float k1=1.;
const float k2=0.;
const float k3=1.;
const float tc=.8;
const float ls=.3;

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

vec4 fetch(vec3 p){
    if((min(p.x,min(p.y,p.z))<.5)||(max(p.x,max(p.y,p.z))>(size.x-.5))){
        // boundary condition for the RD system, semi-arbitrary
        return vec4(-.01,0.,0.,0.);
    }
    float posidx=packfragcoord3(p,size);
    vec2 uv=unpackfragcoord2(posidx,iResolution.xy)/iResolution.xy;
    return texture(iChannel0,uv);
}

vec4 n[6];

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord.xy/iResolution.xy;
    float posidx=packfragcoord2(fragCoord.xy,iResolution.xy);
    vec3 pos=unpackfragcoord3(posidx,size);
    vec3 e=vec3(-1.,0.,1.);
    vec4 x=fetch(pos);
    n[0]=fetch(pos+e.xyy);
    n[1]=fetch(pos+e.zyy);
    n[2]=fetch(pos+e.yxy);
    n[3]=fetch(pos+e.yzy);
    n[4]=fetch(pos+e.yyx);
    n[5]=fetch(pos+e.yyz);
    
    // 7-point 3D laplacian
    // If we used the 27-point laplacian we'd get better isotropy...
    vec4 lapl=-6.*x+n[0]+n[1]+n[2]+n[3]+n[4]+n[5];
    
    float a=x.x;
    float b=x.y;
    float c=x.z;
    float d=x.w;
    
    // update/integration rule
    float d_a=k1*a-k2*a*a-a*a*a-b+ls*lapl.x;
    float d_b=epsilon*(k3*a-a1*b-a0)+ls*delta*lapl.y;
    c=tc*c+(1.-tc)*d_a;
    d=tc*d+(1.-tc)*d_b;
    
    a=a+timestep*c;
    b=b+timestep*d;
    
    // initialize with noise
    if(iFrame<10){
        fragColor=-.5+texture(iChannel1,uv);
    }else{
        fragColor=clamp(vec4(a,b,c,d),-1.,1.);
    }
}