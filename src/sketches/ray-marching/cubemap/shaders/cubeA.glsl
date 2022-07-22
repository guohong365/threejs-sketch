void mainCubemap(out vec4 fragColor,in vec2 fragCoord,in vec3 rayOri,in vec3 rayDir)
{
    vec3 ro=normalize(rayDir);
    vec3 rd=-normalize(rayDir);
    
    vec2 res=raycast(ro,rd);
    
    float t=res.x;
    float m=res.y;
    
    vec3 nor=vec3(0.);
    
    if(m>-.5){
        vec3 pos=ro+t*rd;
        
        nor=(m<1.5)?vec3(0.,1.,0.):calcNormal(pos);
    }
    
    fragColor.w=t;
    fragColor.rgb=nor;
}