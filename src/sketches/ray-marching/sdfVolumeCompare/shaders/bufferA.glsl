#if USE_BUFFER_TEXTURE==0
vec2 map(in vec3 pos)
{
    vec2 res=vec2(1e10,0.);
    
    return res;
}
#endif

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord.xy/iResolution.xy;
    
    vec3 p0=texToSpace(uv)[0].xyz;
    vec3 p1=texToSpace(uv)[1].xyz;
    vec3 p2=texToSpace(uv)[2].xyz;
    vec3 p3=texToSpace(uv)[3].xyz;
    
    fragColor=vec4(
        map(p0).x,
        map(p1).x,
        map(p2).x,
        map(p3).x
    );
}