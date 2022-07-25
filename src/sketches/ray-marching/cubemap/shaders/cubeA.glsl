// 不用缓存时，用于生成带有distance和normal信息的贴图
// 用缓存时，直接将贴图里的数据作为当前的信息
void mainCubemap(out vec4 fragColor,in vec2 fragCoord,in vec3 rayOri,in vec3 rayDir)
{
    #if USE_CUBEMAP_CACHE==1
    fragColor=texture(iChannel0Cube,rayDir);
    return;
    #endif
    
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