// 不用缓存时，用于生成带有distance和normal信息的贴图
// 用缓存时，直接将贴图里的数据作为当前的信息
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 p=normalizeScreenCoords(fragCoord,iResolution.xy);
    
    vec3 ro=vec3(0.,4.,8.);
    vec3 ta=vec3(0.,0.,0.);
    const float fl=4.5;
    
    vec3 rd=getRayDirection(p,ro,ta,fl);
    
    #if USE_TEXTURE_CACHE==1
    fragColor=texture(iChannel0Cube,rd);
    return;
    #endif
    
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