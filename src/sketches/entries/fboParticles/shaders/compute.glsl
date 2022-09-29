#pragma glslify:curlNoise=require(glsl-takara/noise/curlNoise)

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

uniform sampler2D texturePosition;

uniform float uAmplitude;
uniform float uFrequency;

vec3 distort(vec3 p){
    vec3 noiseP=p*uFrequency+vec3(iTime*.05);
    vec3 noise=curlNoise(noiseP);
    vec3 dp=p+uAmplitude*noise;
    return dp;
}

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 p=texture(texturePosition,uv).xyz;
    
    vec3 dp=distort(p);
    
    gl_FragColor=vec4(dp,1.);
}