uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 p=fragCoord/iResolution.xy;
    vec3 color=vec3(p,0.);
    fragColor=vec4(color,1.);
}

varying vec2 vUv;

void main(){
    mainImage(gl_FragColor,vUv*iResolution.xy);
}
