uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

varying vec2 vUv;

vec3 distort(vec3 p){
    float freq=.25;
    float angle=(iTime*10.+uv.x*20.-uv.y*10.)*freq;
    float amp=10.;
    float strength=sin(angle)*amp;
    p.z+=strength;
    return p;
}

void main(){
    vec3 p=position;
    p=distort(p);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    
    vUv=uv;
}