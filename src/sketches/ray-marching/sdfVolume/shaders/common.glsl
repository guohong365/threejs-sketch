#define SHOW_ISOLINE 0
#define USE_BUFFER_TEXTURE 1

// consts
const float PI=3.14159265359;

const float TWO_PI=6.28318530718;

// sdf ops
float opUnion(float d1,float d2)
{
    return min(d1,d2);
}

vec2 opUnion(vec2 d1,vec2 d2)
{
    return(d1.x<d2.x)?d1:d2;
}

float opIntersection(float d1,float d2)
{
    return max(d1,d2);
}

float opSubtraction(float d1,float d2)
{
    return max(-d1,d2);
}

// ray
vec2 normalizeScreenCoords(vec2 screenCoord,vec2 resolution)
{
    vec2 result=2.*(screenCoord/resolution.xy-.5);
    result.x*=resolution.x/resolution.y;// Correct for aspect ratio
    return result;
}

mat3 setCamera(in vec3 ro,in vec3 ta,float cr)
{
    vec3 cw=normalize(ta-ro);
    vec3 cp=vec3(sin(cr),cos(cr),0.);
    vec3 cu=normalize(cross(cw,cp));
    vec3 cv=(cross(cu,cw));
    return mat3(cu,cv,cw);
}

vec3 getRayDirection(vec2 p,vec3 ro,vec3 ta,float fl){
    mat3 ca=setCamera(ro,ta,0.);
    vec3 rd=ca*normalize(vec3(p,fl));
    return rd;
}

// lighting
// https://learnopengl.com/Lighting/Basic-Lighting

float saturate(float a){
    return clamp(a,0.,1.);
}

float diffuse(vec3 n,vec3 l){
    float diff=saturate(dot(n,l));
    return diff;
}

float specular(vec3 n,vec3 l,float shininess){
    float spec=pow(saturate(dot(n,l)),shininess);
    return spec;
}

// rotate
mat2 rotation2d(float angle){
    float s=sin(angle);
    float c=cos(angle);
    
    return mat2(
        c,-s,
        s,c
    );
}

mat4 rotation3d(vec3 axis,float angle){
    axis=normalize(axis);
    float s=sin(angle);
    float c=cos(angle);
    float oc=1.-c;
    
    return mat4(
        oc*axis.x*axis.x+c,oc*axis.x*axis.y-axis.z*s,oc*axis.z*axis.x+axis.y*s,0.,
        oc*axis.x*axis.y+axis.z*s,oc*axis.y*axis.y+c,oc*axis.y*axis.z-axis.x*s,0.,
        oc*axis.z*axis.x-axis.y*s,oc*axis.y*axis.z+axis.x*s,oc*axis.z*axis.z+c,0.,
        0.,0.,0.,1.
    );
}

vec2 rotate(vec2 v,float angle){
    return rotation2d(angle)*v;
}

vec3 rotate(vec3 v,vec3 axis,float angle){
    return(rotation3d(axis,angle)*vec4(v,1.)).xyz;
}

mat3 rotation3dX(float angle){
    float s=sin(angle);
    float c=cos(angle);
    
    return mat3(
        1.,0.,0.,
        0.,c,s,
        0.,-s,c
    );
}

vec3 rotateX(vec3 v,float angle){
    return rotation3dX(angle)*v;
}

mat3 rotation3dY(float angle){
    float s=sin(angle);
    float c=cos(angle);
    
    return mat3(
        c,0.,-s,
        0.,1.,0.,
        s,0.,c
    );
}

vec3 rotateY(vec3 v,float angle){
    return rotation3dY(angle)*v;
}

mat3 rotation3dZ(float angle){
    float s=sin(angle);
    float c=cos(angle);
    
    return mat3(
        c,s,0.,
        -s,c,0.,
        0.,0.,1.
    );
}

vec3 rotateZ(vec3 v,float angle){
    return rotation3dZ(angle)*v;
}

// gamma
const float gamma=2.2;

float toGamma(float v){
    return pow(v,1./gamma);
}

vec2 toGamma(vec2 v){
    return pow(v,vec2(1./gamma));
}

vec3 toGamma(vec3 v){
    return pow(v,vec3(1./gamma));
}

vec4 toGamma(vec4 v){
    return vec4(toGamma(v.rgb),v.a);
}

// sdf
float sdBox(vec3 p,vec3 b)
{
    vec3 q=abs(p)-b;
    return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);
}

float sdSphere(vec3 p,float s)
{
    return length(p)-s;
}

// Credit: https://www.shadertoy.com/view/wlXGWN
vec2 texSubdivisions=vec2(7,4);

// Divide texture into 3d space coordinates
// uv = 2d texture coordinates 0:1
// c = channel 0:3

// xy is split for each z

// Returns matrix representing three positions in space
// vec3 p0 = mat4[0].xyz;
// vec3 p1 = mat4[1].xyz;
// vec3 p2 = mat4[2].xyz;
// vec3 p3 = mat4[4].xyz;

vec3 texToSpace(vec2 uv,int c){
    vec2 sub=texSubdivisions;
    uv*=sub;
    float z=floor(uv.x)+floor(uv.y)*sub.x+float(c)*sub.x*sub.y;
    z/=sub.x*sub.y*4.-1.;
    uv=mod(uv,1.);
    vec3 p=vec3(uv,z);
    p=p*2.-1.;// range -1:1
    return p;
}

mat4 texToSpace(vec2 uv){
    return mat4(
        vec4(texToSpace(uv,0),0),
        vec4(texToSpace(uv,1),0),
        vec4(texToSpace(uv,2),0),
        vec4(texToSpace(uv,3),0)
    );
}

// uv and channel
vec3 spaceToTex(vec3 p){
    p=clamp(p,-1.,1.);
    p=p*.5+.5;// range 0:1
    vec2 sub=texSubdivisions;
    vec2 uv=clamp(p.xy,0.,1.)/sub;
    float i=floor(p.z*(sub.x*sub.y*4.-1.));
    uv+=vec2(mod(i,sub.x),mod(floor(i/sub.x),sub.y))/sub;
    float c=floor(i/(sub.x*sub.y));
    return vec3(uv,c);
}

float range(float vmin,float vmax,float value){
    return clamp((value-vmin)/(vmax-vmin),0.,1.);
}

float mapTex(sampler2D tex,vec3 p){
    vec2 sub=texSubdivisions;
    float zRange=(sub.x*sub.y*4.-1.)/2.;
    p.z+=.5/zRange;
    float zFloor=floor(p.z*zRange)/zRange;
    float zCeil=ceil(p.z*zRange)/zRange;
    vec3 uvcA=spaceToTex(vec3(p.xy,zFloor));
    vec3 uvcB=spaceToTex(vec3(p.xy,zCeil));
    float a=texture(tex,uvcA.xy)[int(uvcA.z)];
    float b=texture(tex,uvcB.xy)[int(uvcB.z)];
    return mix(a,b,range(zFloor,zCeil,p.z));
}
