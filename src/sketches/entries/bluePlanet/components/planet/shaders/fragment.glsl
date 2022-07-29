#pragma glslify:cnoise2=require(glsl-noise/classic/2d)

uniform float u_time;
uniform float u_lacunarity;
uniform float u_gain;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_cloudTint;

varying vec2 v_Uv;

float fbm(vec2 st){
    const int OCTAVES=5;
    
    float value=0.;
    float amplitude=.6;
    
    for(int i=0;i<OCTAVES;i++){
        value+=amplitude*abs(cnoise2(st));
        st*=u_lacunarity;
        amplitude*=u_gain;
    }
    
    return value;
}

void main(){
    vec3 f_color=vec3(0.);
    vec2 st=v_Uv*.250;
    float speed=.1;
    float displace=u_time*speed;
    
    vec2 q=vec2(0.);
    q.x=fbm(st+0.*displace);
    q.y=fbm(st+vec2(1.));
    
    vec2 r=vec2(0.);
    r.x=fbm(st+1.*q+vec2(1.7,9.2)+.15*displace);
    r.y=fbm(st+1.*q+vec2(8.3,2.8)+.126*displace);
    
    float f=fbm(st+r);
    
    f_color=mix(vec3(u_colorA),vec3(u_colorB),saturate((f*f)*4.));
    
    f_color=mix(f_color,u_cloudTint,saturate(length(q)));
    
    f_color*=mix(f_color,u_colorA,saturate(length(r.x)));
    
    vec4 f_colorfrag=vec4(f_color,1.);
    
    return f_colorfrag;
}