// Modelling

float map(vec3 p){
    vec3 d1p=p;
    // float d1=sdBox(d1p,vec3(.5));
    float d1=sdSphere(d1p,.5);
    return d1;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord.xy/iResolution.xy;
    
    vec3 p0=texToSpace(uv)[0].xyz;
    vec3 p1=texToSpace(uv)[1].xyz;
    vec3 p2=texToSpace(uv)[2].xyz;
    vec3 p3=texToSpace(uv)[3].xyz;
    
    fragColor=vec4(
        map(p0),
        map(p1),
        map(p2),
        map(p3)
    );
}