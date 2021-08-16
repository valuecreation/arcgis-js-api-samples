"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[0],{1154:(e,t,r)=>{r.d(t,{D:()=>H,b:()=>E});var i=r(56031),o=r(12130),a=r(59121),n=r(47413),s=r(62907),l=r(83620),c=r(18219),d=r(36589),u=r(53574),h=r(4944),p=r(48242),m=r(16364),f=r(58002),v=r(27464),g=r(68145),x=r(12951),b=r(83988),_=r(10790),y=r(11053),T=r(79107),w=r(89799),M=r(68264),S=r(23969),C=r(46918),A=r(23447),P=r(70014),F=r(45616),O=r(84439);function E(e){const t=new O.kG,r=t.vertex.code,E=t.fragment.code;return t.include(A.a,{name:"Default Material Shader",output:e.output}),t.vertex.uniforms.add("proj","mat4").add("view","mat4").add("camPos","vec3").add("localOrigin","vec3"),t.include(c.f),t.varyings.add("vpos","vec3"),t.include(S.kl,e),t.include(s.f,e),t.include(m.LC,e),0!==e.output&&7!==e.output||(t.include(l.O,e),t.include(n.w,{linearDepth:!1}),0===e.normalType&&e.offsetBackfaces&&t.include(o.w),t.include(g.Q,e),t.include(p.B,e),e.instancedColor&&t.attributes.add("instanceColor","vec4"),t.varyings.add("localvpos","vec3"),t.include(u.D,e),t.include(i.q,e),t.include(d.R,e),t.include(h.c,e),t.vertex.uniforms.add("externalColor","vec4"),t.varyings.add("vcolorExt","vec4"),e.multipassTerrainEnabled&&t.varyings.add("depth","float"),r.add(F.H`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${e.instancedColor?"vcolorExt *= instanceColor;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${F.H.float(C.bf)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        }
        else {
          vpos = calculateVPos();
          localvpos = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${0===e.normalType?F.H`
          vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${e.vertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, vpos);
          ${0===e.normalType&&e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, camPos);":""}
        }

        ${e.multipassTerrainEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
      }
    `)),7===e.output&&(t.include(a.p2,e),t.include(C.sj,e),e.multipassTerrainEnabled&&(t.fragment.include(v.S),t.include(_.l,e)),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("opacity","float").add("layerOpacity","float"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.fragment.include(P.y),E.add(F.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${e.hasColorTexture?F.H`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:F.H`vec4 texColor = vec4(1.0);`}
        ${e.attributeColor?F.H`
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:F.H`
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        gl_FragColor = vec4(opacity_);
      }
    `)),0===e.output&&(t.include(a.p2,e),t.include(b.X,e),t.include(x.K,e),t.include(C.sj,e),e.receiveShadows&&t.include(M.hX,e),e.multipassTerrainEnabled&&(t.fragment.include(v.S),t.include(_.l,e)),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("ambient","vec3").add("diffuse","vec3").add("opacity","float").add("layerOpacity","float"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.include(w.jV,e),t.include(T.T,e),t.fragment.include(P.y),t.include(y.k,e),E.add(F.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${e.hasColorTexture?F.H`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:F.H`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - camPos);
        ${3===e.normalType?F.H`
        vec3 normal = screenDerivativeNormal(localvpos);`:F.H`
        shadingParams.normalView = vNormalWorld;
        vec3 normal = shadingNormal(shadingParams);`}
        ${1===e.pbrMode?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":1===e.viewingMode?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.attributeColor?F.H`
        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:F.H`
        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        ${e.hasNormalTexture?F.H`
              mat3 tangentSpace = ${e.vertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
              vec3 shadedNormal = computeTextureNormal(tangentSpace, vuv0);`:"vec3 shadedNormal = normal;"}
        ${1===e.pbrMode||2===e.pbrMode?1===e.viewingMode?F.H`vec3 normalGround = normalize(vpos + localOrigin);`:F.H`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:F.H``}
        ${1===e.pbrMode||2===e.pbrMode?F.H`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];
            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:"vec3 shadedColor = evaluateSceneLighting(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight);"}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.OITEnabled?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
      }
    `)),t.include(f.s,e),t}var H=Object.freeze({__proto__:null,build:E})},84974:(e,t,r)=>{r.d(t,{R:()=>P,b:()=>A});var i=r(56031),o=r(12130),a=r(59121),n=r(47413),s=r(62907),l=r(83620),c=r(18219),d=r(36589),u=r(53574),h=r(4944),p=r(16364),m=r(58002),f=r(27464),v=r(12951),g=r(83988),x=r(10790),b=r(79107),_=r(89799),y=r(68264),T=r(23969),w=r(46918),M=r(70014),S=r(45616),C=r(84439);function A(e){const t=new C.kG,r=t.vertex.code,A=t.fragment.code;return t.vertex.uniforms.add("proj","mat4").add("view","mat4").add("camPos","vec3").add("localOrigin","vec3"),t.include(c.f),t.varyings.add("vpos","vec3"),t.include(T.kl,e),t.include(s.f,e),t.include(p.LC,e),0!==e.output&&7!==e.output||(t.include(l.O,e),t.include(n.w,{linearDepth:!1}),e.offsetBackfaces&&t.include(o.w),e.instancedColor&&t.attributes.add("instanceColor","vec4"),t.varyings.add("vNormalWorld","vec3"),t.varyings.add("localvpos","vec3"),e.multipassTerrainEnabled&&t.varyings.add("depth","float"),t.include(u.D,e),t.include(i.q,e),t.include(d.R,e),t.include(h.c,e),t.vertex.uniforms.add("externalColor","vec4"),t.varyings.add("vcolorExt","vec4"),r.add(S.H`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${e.instancedColor?"vcolorExt *= instanceColor;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${S.H.float(w.bf)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          }
          else {
            vpos = calculateVPos();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, camPos);":""}
          }
          ${e.multipassTerrainEnabled?S.H`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),7===e.output&&(t.include(a.p2,e),t.include(w.sj,e),e.multipassTerrainEnabled&&(t.fragment.include(f.S),t.include(x.l,e)),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("opacity","float").add("layerOpacity","float"),t.fragment.uniforms.add("view","mat4"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.fragment.include(M.y),A.add(S.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?S.H`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${e.hasColorTexture?S.H`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:S.H`vec4 texColor = vec4(1.0);`}
        ${e.attributeColor?S.H`
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:S.H`
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}

        gl_FragColor = vec4(opacity_);
      }
    `)),0===e.output&&(t.include(a.p2,e),t.include(g.X,e),t.include(v.K,e),t.include(w.sj,e),e.receiveShadows&&t.include(y.hX,e),e.multipassTerrainEnabled&&(t.fragment.include(f.S),t.include(x.l,e)),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("ambient","vec3").add("diffuse","vec3").add("opacity","float").add("layerOpacity","float"),t.fragment.uniforms.add("view","mat4"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.include(_.jV,e),t.include(b.T,e),t.fragment.include(M.y),A.add(S.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?S.H`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${e.hasColorTexture?S.H`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:S.H`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - camPos);
        ${1===e.pbrMode?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":1===e.viewingMode?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.attributeColor?S.H`
        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:S.H`
        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        ${S.H`
        vec3 shadedNormal = normalize(vNormalWorld);
        albedo_ *= 1.2;
        vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
        float alignmentLightView = clamp(dot(viewForward, -lightingMainDirection), 0.0, 1.0);
        float transmittance = 1.0 - clamp(dot(viewForward, shadedNormal), 0.0, 1.0);
        float treeRadialFalloff = vColor.r;
        float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
        additionalLight += backLightFactor * lightingMainIntensity;`}
        ${1===e.pbrMode||2===e.pbrMode?1===e.viewingMode?S.H`vec3 normalGround = normalize(vpos + localOrigin);`:S.H`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:S.H``}
        ${1===e.pbrMode||2===e.pbrMode?S.H`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];
            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:"vec3 shadedColor = evaluateSceneLighting(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight);"}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.OITEnabled?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
      }
    `)),t.include(m.s,e),t}var P=Object.freeze({__proto__:null,build:A})},47950:(e,t,r)=>{function i(){return[1,0,0,0,1,0,0,0,1]}function o(e,t){return new Float64Array(e,t,9)}r.d(t,{a:()=>o,c:()=>i}),Object.freeze({__proto__:null,create:i,clone:function(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]]},fromValues:function(e,t,r,i,o,a,n,s,l){return[e,t,r,i,o,a,n,s,l]},createView:o})},45396:(e,t,r)=>{function i(){const e=new Float32Array(16);return e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}r.d(t,{c:()=>i});const o=i();Object.freeze({__proto__:null,create:i,clone:function(e){const t=new Float32Array(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t},fromValues:function(e,t,r,i,o,a,n,s,l,c,d,u,h,p,m,f){const v=new Float32Array(16);return v[0]=e,v[1]=t,v[2]=r,v[3]=i,v[4]=o,v[5]=a,v[6]=n,v[7]=s,v[8]=l,v[9]=c,v[10]=d,v[11]=u,v[12]=h,v[13]=p,v[14]=m,v[15]=f,v},createView:function(e,t){return new Float32Array(e,t,16)},IDENTITY:o})},67829:(e,t,r)=>{function i(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function o(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]]}function a(e,t){return new Float64Array(e,t,16)}r.d(t,{I:()=>n,a:()=>a,b:()=>o,c:()=>i});const n=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];Object.freeze({__proto__:null,create:i,clone:o,fromValues:function(e,t,r,i,o,a,n,s,l,c,d,u,h,p,m,f){return[e,t,r,i,o,a,n,s,l,c,d,u,h,p,m,f]},createView:a,IDENTITY:n})},2150:(e,t,r)=>{r.d(t,{c:()=>p,g:()=>d,j:()=>P,k:()=>f,m:()=>u,s:()=>c});var i=r(47950),o=r(57250),a=r(86591),n=r(78571),s=r(55545),l=r(99491);function c(e,t,r){r*=.5;const i=Math.sin(r);return e[0]=i*t[0],e[1]=i*t[1],e[2]=i*t[2],e[3]=Math.cos(r),e}function d(e,t){const r=2*Math.acos(t[3]),i=Math.sin(r/2);return i>n.E?(e[0]=t[0]/i,e[1]=t[1]/i,e[2]=t[2]/i):(e[0]=1,e[1]=0,e[2]=0),r}function u(e,t,r){const i=t[0],o=t[1],a=t[2],n=t[3],s=r[0],l=r[1],c=r[2],d=r[3];return e[0]=i*d+n*s+o*c-a*l,e[1]=o*d+n*l+a*s-i*c,e[2]=a*d+n*c+i*l-o*s,e[3]=n*d-i*s-o*l-a*c,e}function h(e,t,r,i){const o=t[0],a=t[1],s=t[2],l=t[3];let c,d,u,h,p,m=r[0],f=r[1],v=r[2],g=r[3];return d=o*m+a*f+s*v+l*g,d<0&&(d=-d,m=-m,f=-f,v=-v,g=-g),1-d>n.E?(c=Math.acos(d),u=Math.sin(c),h=Math.sin((1-i)*c)/u,p=Math.sin(i*c)/u):(h=1-i,p=i),e[0]=h*o+p*m,e[1]=h*a+p*f,e[2]=h*s+p*v,e[3]=h*l+p*g,e}function p(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e}function m(e,t){const r=t[0]+t[4]+t[8];let i;if(r>0)i=Math.sqrt(r+1),e[3]=.5*i,i=.5/i,e[0]=(t[5]-t[7])*i,e[1]=(t[6]-t[2])*i,e[2]=(t[1]-t[3])*i;else{let r=0;t[4]>t[0]&&(r=1),t[8]>t[3*r+r]&&(r=2);const o=(r+1)%3,a=(r+2)%3;i=Math.sqrt(t[3*r+r]-t[3*o+o]-t[3*a+a]+1),e[r]=.5*i,i=.5/i,e[3]=(t[3*o+a]-t[3*a+o])*i,e[o]=(t[3*o+r]+t[3*r+o])*i,e[a]=(t[3*a+r]+t[3*r+a])*i}return e}function f(e,t,r,i){const o=.5*Math.PI/180;t*=o,r*=o,i*=o;const a=Math.sin(t),n=Math.cos(t),s=Math.sin(r),l=Math.cos(r),c=Math.sin(i),d=Math.cos(i);return e[0]=a*l*d-n*s*c,e[1]=n*s*d+a*l*c,e[2]=n*l*c-a*s*d,e[3]=n*l*d+a*s*c,e}const v=l.c,g=l.s,x=l.a,b=u,_=l.b,y=l.d,T=l.l,w=l.e,M=w,S=l.f,C=S,A=l.n,P=l.g,F=l.h,O=(0,a.c)(),E=(0,a.f)(1,0,0),H=(0,a.f)(0,1,0),D=(0,o.a)(),I=(0,o.a)(),z=(0,i.c)();Object.freeze({__proto__:null,identity:function(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e},setAxisAngle:c,getAxisAngle:d,multiply:u,rotateX:function(e,t,r){r*=.5;const i=t[0],o=t[1],a=t[2],n=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l+n*s,e[1]=o*l+a*s,e[2]=a*l-o*s,e[3]=n*l-i*s,e},rotateY:function(e,t,r){r*=.5;const i=t[0],o=t[1],a=t[2],n=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l-a*s,e[1]=o*l+n*s,e[2]=a*l+i*s,e[3]=n*l-o*s,e},rotateZ:function(e,t,r){r*=.5;const i=t[0],o=t[1],a=t[2],n=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l+o*s,e[1]=o*l-i*s,e[2]=a*l+n*s,e[3]=n*l-a*s,e},calculateW:function(e,t){const r=t[0],i=t[1],o=t[2];return e[0]=r,e[1]=i,e[2]=o,e[3]=Math.sqrt(Math.abs(1-r*r-i*i-o*o)),e},slerp:h,random:function(e){const t=(0,n.R)(),r=(0,n.R)(),i=(0,n.R)(),o=Math.sqrt(1-t),a=Math.sqrt(t);return e[0]=o*Math.sin(2*Math.PI*r),e[1]=o*Math.cos(2*Math.PI*r),e[2]=a*Math.sin(2*Math.PI*i),e[3]=a*Math.cos(2*Math.PI*i),e},invert:function(e,t){const r=t[0],i=t[1],o=t[2],a=t[3],n=r*r+i*i+o*o+a*a,s=n?1/n:0;return e[0]=-r*s,e[1]=-i*s,e[2]=-o*s,e[3]=a*s,e},conjugate:p,fromMat3:m,fromEuler:f,str:function(e){return"quat("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+")"},copy:v,set:g,add:x,mul:b,scale:_,dot:y,lerp:T,length:w,len:M,squaredLength:S,sqrLen:C,normalize:A,exactEquals:P,equals:F,rotationTo:function(e,t,r){const i=(0,s.d)(t,r);return i<-.999999?((0,s.c)(O,E,t),(0,s.u)(O)<1e-6&&(0,s.c)(O,H,t),(0,s.n)(O,O),c(e,O,Math.PI),e):i>.999999?(e[0]=0,e[1]=0,e[2]=0,e[3]=1,e):((0,s.c)(O,t,r),e[0]=O[0],e[1]=O[1],e[2]=O[2],e[3]=1+i,A(e,e))},sqlerp:function(e,t,r,i,o,a){return h(D,t,o,a),h(I,r,i,a),h(e,D,I,2*a*(1-a)),e},setAxes:function(e,t,r,i){const o=z;return o[0]=r[0],o[3]=r[1],o[6]=r[2],o[1]=i[0],o[4]=i[1],o[7]=i[2],o[2]=-t[0],o[5]=-t[1],o[8]=-t[2],A(e,m(e,o))}})},57250:(e,t,r)=>{function i(){return[0,0,0,1]}function o(e){return[e[0],e[1],e[2],e[3]]}function a(e,t){return new Float64Array(e,t,4)}r.d(t,{I:()=>n,a:()=>i,b:()=>o,c:()=>a});const n=[0,0,0,1];Object.freeze({__proto__:null,create:i,clone:o,fromValues:function(e,t,r,i){return[e,t,r,i]},createView:a,IDENTITY:n})},68945:(e,t,r)=>{r.d(t,{a:()=>a,b:()=>l,n:()=>s,s:()=>n,t:()=>o});var i=r(40906);function o(e,t,r){if(e.count!==t.count)return void i.k.error("source and destination buffers need to have the same number of elements");const o=e.count,a=r[0],n=r[1],s=r[2],l=r[4],c=r[5],d=r[6],u=r[8],h=r[9],p=r[10],m=r[12],f=r[13],v=r[14],g=e.typedBuffer,x=e.typedBufferStride,b=t.typedBuffer,_=t.typedBufferStride;for(let e=0;e<o;e++){const t=e*x,r=e*_,i=b[r],o=b[r+1],y=b[r+2];g[t]=a*i+l*o+u*y+m,g[t+1]=n*i+c*o+h*y+f,g[t+2]=s*i+d*o+p*y+v}}function a(e,t,r){if(e.count!==t.count)return void i.k.error("source and destination buffers need to have the same number of elements");const o=e.count,a=r[0],n=r[1],s=r[2],l=r[3],c=r[4],d=r[5],u=r[6],h=r[7],p=r[8],m=e.typedBuffer,f=e.typedBufferStride,v=t.typedBuffer,g=t.typedBufferStride;for(let e=0;e<o;e++){const t=e*f,r=e*g,i=v[r],o=v[r+1],x=v[r+2];m[t]=a*i+l*o+u*x,m[t+1]=n*i+c*o+h*x,m[t+2]=s*i+d*o+p*x}}function n(e,t,r){const i=Math.min(e.count,t.count),o=e.typedBuffer,a=e.typedBufferStride,n=t.typedBuffer,s=t.typedBufferStride;for(let e=0;e<i;e++){const t=e*a,i=e*s;o[t]=r*n[i],o[t+1]=r*n[i+1],o[t+2]=r*n[i+2]}}function s(e,t){const r=Math.min(e.count,t.count),i=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,n=t.typedBufferStride;for(let e=0;e<r;e++){const t=e*o,r=e*n,s=a[r],l=a[r+1],c=a[r+2],d=Math.sqrt(s*s+l*l+c*c);if(d>0){const e=1/d;i[t]=e*s,i[t+1]=e*l,i[t+2]=e*c}}}function l(e,t,r){const i=Math.min(e.count,t.count),o=e.typedBuffer,a=e.typedBufferStride,n=t.typedBuffer,s=t.typedBufferStride;for(let e=0;e<i;e++){const t=e*a,i=e*s;o[t]=n[i]>>r,o[t+1]=n[i+1]>>r,o[t+2]=n[i+2]>>r}}Object.freeze({__proto__:null,transformMat4:o,transformMat3:a,scale:n,normalize:s,shiftRight:l})},92730:(e,t,r)=>{function i(e,t,r){const i=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,n=t.typedBufferStride,s=r?r.count:t.count;let l=(r&&r.dstIndex?r.dstIndex:0)*o,c=(r&&r.srcIndex?r.srcIndex:0)*n;for(let e=0;e<s;++e)i[l]=a[c],i[l+1]=a[c+1],i[l+2]=a[c+2],l+=o,c+=n}function o(e,t,r,i,o){var a,n;const s=e.typedBuffer,l=e.typedBufferStride,c=null!=(a=null==o?void 0:o.count)?a:e.count;let d=(null!=(n=null==o?void 0:o.dstIndex)?n:0)*l;for(let e=0;e<c;++e)s[d]=t,s[d+1]=r,s[d+2]=i,d+=l}r.d(t,{c:()=>i,f:()=>o}),Object.freeze({__proto__:null,copy:i,fill:o})},35701:(e,t,r)=>{function i(){return new Float32Array(3)}function o(e,t,r){const i=new Float32Array(3);return i[0]=e,i[1]=t,i[2]=r,i}function a(){return i()}function n(){return o(1,1,1)}function s(){return o(1,0,0)}function l(){return o(0,1,0)}function c(){return o(0,0,1)}r.d(t,{c:()=>i,f:()=>o});const d=a(),u=n(),h=s(),p=l(),m=c();Object.freeze({__proto__:null,create:i,clone:function(e){const t=new Float32Array(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t},fromValues:o,createView:function(e,t){return new Float32Array(e,t,3)},zeros:a,ones:n,unitX:s,unitY:l,unitZ:c,ZEROS:d,ONES:u,UNIT_X:h,UNIT_Y:p,UNIT_Z:m})},40906:(e,t,r)=>{r.d(t,{k:()=>i});const i=r(20337).Z.getLogger("esri.views.3d.support.buffer.math")},50603:(e,t,r)=>{r.d(t,{t:()=>o});var i=r(57603);async function o(e,t){const{data:r}=await(0,i.default)(e,{responseType:"image",...t});return r}},8e4:(e,t,r)=>{r.r(t),r.d(t,{fetch:()=>Zt,gltfToEngineResources:()=>Yt,parseUrl:()=>Kt});var i=r(16192),o=r(43388),a=r(40341),n=r(47950),s=r(87059),l=r(67829),c=r(55545),d=r(86591),u=r(16862),h=r(38747),p=r(68945),m=r(19540),f=r(95916),v=r(45280),g=r(98624),x=r(17185),b=r(57603),_=r(913),y=r(76877),T=r(20337),w=r(19955),M=r(38192),S=r(50603),C=r(27946),A=r(94934);class P{constructor(e,t,r,i){this.primitiveIndices=e,this._numIndexPerPrimitive=t,this.indices=r,this.position=i,this.center=(0,d.c)(),(0,A.hu)(e.length>=1),(0,A.hu)(r.length%this._numIndexPerPrimitive==0),(0,A.hu)(r.length>=e.length*this._numIndexPerPrimitive),(0,A.hu)(3===i.size||4===i.size);const{data:o,size:a}=i,n=e.length;let s=a*r[this._numIndexPerPrimitive*e[0]];F.clear(),F.push(s),this.bbMin=(0,d.f)(o[s],o[s+1],o[s+2]),this.bbMax=(0,d.a)(this.bbMin);for(let t=0;t<n;++t){const i=this._numIndexPerPrimitive*e[t];for(let e=0;e<this._numIndexPerPrimitive;++e){s=a*r[i+e],F.push(s);let t=o[s];this.bbMin[0]=Math.min(t,this.bbMin[0]),this.bbMax[0]=Math.max(t,this.bbMax[0]),t=o[s+1],this.bbMin[1]=Math.min(t,this.bbMin[1]),this.bbMax[1]=Math.max(t,this.bbMax[1]),t=o[s+2],this.bbMin[2]=Math.min(t,this.bbMin[2]),this.bbMax[2]=Math.max(t,this.bbMax[2])}}(0,c.e)(this.center,this.bbMin,this.bbMax,.5),this.radius=.5*Math.max(Math.max(this.bbMax[0]-this.bbMin[0],this.bbMax[1]-this.bbMin[1]),this.bbMax[2]-this.bbMin[2]);let l=this.radius*this.radius;for(let e=0;e<F.length;++e){s=F.getItemAt(e);const t=o[s]-this.center[0],r=o[s+1]-this.center[1],i=o[s+2]-this.center[2],a=t*t+r*r+i*i;if(a<=l)continue;const n=Math.sqrt(a),c=.5*(n-this.radius);this.radius=this.radius+c,l=this.radius*this.radius;const d=c/n;this.center[0]+=t*d,this.center[1]+=r*d,this.center[2]+=i*d}F.clear()}getCenter(){return this.center}getBSRadius(){return this.radius}getBBMin(){return this.bbMin}getBBMax(){return this.bbMax}getChildren(){if(this._children)return this._children;if((0,c.h)(this.bbMin,this.bbMax)>1){const e=(0,c.e)((0,d.c)(),this.bbMin,this.bbMax,.5),t=this.primitiveIndices.length,r=new Uint8Array(t),i=new Array(8);for(let e=0;e<8;++e)i[e]=0;const{data:o,size:a}=this.position;for(let n=0;n<t;++n){let t=0;const s=this._numIndexPerPrimitive*this.primitiveIndices[n];let l=a*this.indices[s],c=o[l],d=o[l+1],u=o[l+2];for(let e=1;e<this._numIndexPerPrimitive;++e){l=a*this.indices[s+e];const t=o[l],r=o[l+1],i=o[l+2];t<c&&(c=t),r<d&&(d=r),i<u&&(u=i)}c<e[0]&&(t|=1),d<e[1]&&(t|=2),u<e[2]&&(t|=4),r[n]=t,++i[t]}let n=0;for(let e=0;e<8;++e)i[e]>0&&++n;if(n<2)return;const s=new Array(8);for(let e=0;e<8;++e)s[e]=i[e]>0?new Uint32Array(i[e]):void 0;for(let e=0;e<8;++e)i[e]=0;for(let e=0;e<t;++e){const t=r[e];s[t][i[t]++]=this.primitiveIndices[e]}this._children=new Array(8);for(let e=0;e<8;++e)void 0!==s[e]&&(this._children[e]=new P(s[e],this._numIndexPerPrimitive,this.indices,this.position))}return this._children}static prune(){F.prune()}}const F=new C.Z({deallocator:null});var O=r(91844);class E{constructor(){this.id=(0,O.D)()}unload(){}}var H=r(24083);class D extends E{constructor(e,t=[],r=0,i=-1){super(),this._primitiveType=r,this.edgeIndicesLength=i,this.type=2,this._vertexAttributes=new Map,this._indices=new Map,this._boundingInfo=null;for(const[t,r]of e)r&&this._vertexAttributes.set(t,{...r});if(null==t||0===t.length){const e=function(e){const t=e.values().next().value;return null==t?0:t.data.length/t.size}(this._vertexAttributes),t=(0,H.p)(e);this.edgeIndicesLength=this.edgeIndicesLength<0?e:this.edgeIndicesLength;for(const e of this._vertexAttributes.keys())this._indices.set(e,t)}else for(const[e,r]of t)r&&(this._indices.set(e,I(r)),"position"===e&&(this.edgeIndicesLength=this.edgeIndicesLength<0?this._indices.get(e).length:this.edgeIndicesLength))}get vertexAttributes(){return this._vertexAttributes}getMutableAttribute(e){const t=this._vertexAttributes.get(e);return t&&!t.exclusive&&(t.data=Array.from(t.data),t.exclusive=!0),t}get indices(){return this._indices}get indexCount(){const e=this._indices.values().next().value;return e?e.length:0}get primitiveType(){return this._primitiveType}get faceCount(){return this.indexCount/3}get boundingInfo(){return(0,o.Wi)(this._boundingInfo)&&(this._boundingInfo=this._calculateBoundingInfo()),this._boundingInfo}computeAttachmentOrigin(e){return 0===this.primitiveType?this.computeAttachmentOriginTriangles(e):this.computeAttachmentOriginPoints(e)}computeAttachmentOriginTriangles(e){const t=this.indices.get("position"),r=this.vertexAttributes.get("position");return(0,H.cM)(r,t,e)}computeAttachmentOriginPoints(e){const t=this.indices.get("position"),r=this.vertexAttributes.get("position");return(0,H.NO)(r,t,e)}invalidateBoundingInfo(){this._boundingInfo=null}_calculateBoundingInfo(){const e=this.indices.get("position");if(0===e.length)return null;const t=0===this.primitiveType?3:1;(0,A.hu)(e.length%t==0,"Indexing error: "+e.length+" not divisible by "+t);const r=(0,H.p)(e.length/t),i=this.vertexAttributes.get("position");return new P(r,t,e,i)}}function I(e){if(e.BYTES_PER_ELEMENT===Uint16Array.BYTES_PER_ELEMENT)return e;for(const t of e)if(t>=65536)return e;return new Uint16Array(e)}var z=r(79546),R=r(79001),L=r(19776),N=r(71919),B=r(2364),V=r(16875),U=r(22818);let G;var W=r(16820),q=r(7057);let k=null,$=null;async function j(){return(0,o.Wi)($)&&($=function(){if((0,o.Wi)(G)){const e=e=>(0,U.V)(`esri/libs/basisu/${e}`);G=r.e(4983).then(r.bind(r,84983)).then((function(e){return e.b})).then((({default:t})=>t({locateFile:e}).then((e=>(e.initializeBasis(),delete e.then,e)))))}return G}(),k=await $),$}function X(e,t,r,i,o){const a=(0,q.RG)(t?37496:37492),n=o&&e>1?(4**e-1)/(3*4**(e-1)):1;return Math.ceil(r*i*a*n)}function Z(e){return e.getNumImages()>=1&&!e.isUASTC()}function K(e){return e.getFaces()>=1&&e.isETC1S()}function Y(e,t,r,i,o,a,n,s){const{compressedTextureETC:l,compressedTextureS3TC:c}=e.capabilities,[d,u]=l?i?[1,37496]:[0,37492]:c?i?[3,33779]:[2,33776]:[13,6408],h=t.hasMipmap?r:Math.min(1,r),p=[];for(let e=0;e<h;e++)p.push(new Uint8Array(n(e,d))),s(e,d,p[e]);const m=p.length>1,f=m?9987:9729,v={...t,samplingMode:f,hasMipmap:m,internalFormat:u,width:o,height:a};return new W.Z(e,v,{type:"compressed",levels:p})}const Q=T.Z.getLogger("esri.views.3d.webgl-engine.lib.DDSUtil");function J(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}const ee=J("DXT1"),te=J("DXT3"),re=J("DXT5");const ie=new Map([["position",0],["normal",1],["uv0",2],["color",3],["size",4],["tangent",4],["auxpos1",5],["symbolColor",5],["auxpos2",6],["featureAttribute",6],["instanceFeatureAttribute",6],["instanceColor",7],["model",8],["modelNormal",12],["modelOriginHi",11],["modelOriginLo",15]]),oe=[{name:"position",count:2,type:5126,offset:0,stride:8,normalized:!1}],ae=[{name:"position",count:2,type:5126,offset:0,stride:16,normalized:!1},{name:"uv0",count:2,type:5126,offset:8,stride:16,normalized:!1}];var ne=r(60663),se=r(65585),le=r(79830),ce=r(88384);class de extends E{constructor(e,t){super(),this.data=e,this.type=4,this.glTexture=null,this.powerOfTwoStretchInfo=null,this.loadingPromise=null,this.loadingController=null,this.events=new R.Z,this.params=t||{},this.params.mipmap=!1!==this.params.mipmap,this.params.noUnpackFlip=this.params.noUnpackFlip||!1,this.params.preMultiplyAlpha=this.params.preMultiplyAlpha||!1,this.params.wrap=this.params.wrap||{s:10497,t:10497},this.params.powerOfTwoResizeMode=this.params.powerOfTwoResizeMode||1,this.estimatedTexMemRequired=de.estimateTexMemRequired(this.data,this.params),this.startPreload()}startPreload(){const e=this.data;(0,o.Wi)(e)||(e instanceof HTMLVideoElement?this.startPreloadVideoElement(e):e instanceof HTMLImageElement&&this.startPreloadImageElement(e))}startPreloadVideoElement(e){(0,B.jc)(e.src)||"auto"===e.preload&&e.crossOrigin||(e.preload="auto",e.crossOrigin="anonymous",e.src=e.src)}startPreloadImageElement(e){(0,B.HK)(e.src)||(0,B.jc)(e.src)||e.crossOrigin||(e.crossOrigin="anonymous",e.src=e.src)}static getDataDimensions(e){return e instanceof HTMLVideoElement?{width:e.videoWidth,height:e.videoHeight}:e}static estimateTexMemRequired(e,t){if((0,o.Wi)(e))return 0;if((0,N.eP)(e)||(0,N.lq)(e))return t.encoding===de.KTX2_ENCODING?function(e,t){if((0,o.Wi)(k))return e.byteLength;const r=new k.KTX2File(new Uint8Array(e)),i=K(r)?X(r.getLevels(),r.getHasAlpha(),r.getWidth(),r.getHeight(),t):0;return r.close(),r.delete(),i}(e,t.mipmap):t.encoding===de.BASIS_ENCODING?function(e,t){if((0,o.Wi)(k))return e.byteLength;const r=new k.BasisFile(new Uint8Array(e)),i=Z(r)?X(r.getNumLevels(0),r.getHasAlpha(),r.getImageWidth(0,0),r.getImageHeight(0,0),t):0;return r.close(),r.delete(),i}(e,t.mipmap):e.byteLength;const{width:r,height:i}=e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement?de.getDataDimensions(e):t;return(t.mipmap?4/3:1)*r*i*(t.components||4)||0}dispose(){this.data=void 0}get width(){return this.params.width}get height(){return this.params.height}createDescriptor(e){var t;return{target:3553,pixelFormat:6408,dataType:5121,wrapMode:this.params.wrap,flipped:!this.params.noUnpackFlip,samplingMode:this.params.mipmap?9987:9729,hasMipmap:this.params.mipmap,preMultiplyAlpha:this.params.preMultiplyAlpha,maxAnisotropy:null!=(t=this.params.maxAnisotropy)?t:this.params.mipmap?e.parameters.maxMaxAnisotropy:1}}load(e,t){if((0,o.pC)(this.glTexture))return this.glTexture;if((0,o.pC)(this.loadingPromise))return this.loadingPromise;const r=this.data;return(0,o.Wi)(r)?(this.glTexture=new W.Z(e,this.createDescriptor(e),null),this.glTexture):"string"==typeof r?this.loadFromURL(e,t,r):r instanceof Image?this.loadFromImageElement(e,t,r):r instanceof HTMLVideoElement?this.loadFromVideoElement(e,t,r):r instanceof ImageData||r instanceof HTMLCanvasElement?this.loadFromImage(e,r,t):((0,N.eP)(r)||(0,N.lq)(r))&&this.params.encoding===de.DDS_ENCODING?this.loadFromDDSData(e,r):((0,N.eP)(r)||(0,N.lq)(r))&&this.params.encoding===de.KTX2_ENCODING?this.loadFromKTX2(e,r):((0,N.eP)(r)||(0,N.lq)(r))&&this.params.encoding===de.BASIS_ENCODING?this.loadFromBasis(e,r):(0,N.lq)(r)?this.loadFromPixelData(e,r):(0,N.eP)(r)?this.loadFromPixelData(e,new Uint8Array(r)):null}get requiresFrameUpdates(){return this.data instanceof HTMLVideoElement}frameUpdate(e,t,r){if(!(this.data instanceof HTMLVideoElement)||(0,o.Wi)(this.glTexture))return r;if(this.data.readyState<2||r===this.data.currentTime)return r;if((0,o.pC)(this.powerOfTwoStretchInfo)){const{framebuffer:r,vao:i,sourceTexture:o}=this.powerOfTwoStretchInfo;o.setData(this.data),this.drawStretchedTexture(e,t,r,i,o,this.glTexture)}else{const{width:e,height:t}=this.data,{width:r,height:i}=this.glTexture.descriptor;e!==r||t!==i?this.glTexture.updateData(0,0,0,Math.min(e,r),Math.min(t,i),this.data):this.glTexture.setData(this.data)}return this.glTexture.descriptor.hasMipmap&&this.glTexture.generateMipmap(),this.data.currentTime}loadFromDDSData(e,t){return this.glTexture=function(e,t,r){const{textureData:i,internalFormat:o,width:a,height:n}=function(e,t){const r=new Int32Array(e,0,31);if(542327876!==r[0])return Q.error("Invalid magic number in DDS header"),null;if(!(4&r[20]))return Q.error("Unsupported format, must contain a FourCC code"),null;const i=r[21];let o,a;switch(i){case ee:o=8,a=33776;break;case te:o=16,a=33778;break;case re:o=16,a=33779;break;default:return Q.error("Unsupported FourCC code:",function(e){return String.fromCharCode(255&e,e>>8&255,e>>16&255,e>>24&255)}(i)),null}let n=1,s=r[4],l=r[3];0==(3&s)&&0==(3&l)||(Q.warn("Rounding up compressed texture size to nearest multiple of 4."),s=s+3&-4,l=l+3&-4);const c=s,d=l;let u,h;131072&r[2]&&!1!==t&&(n=Math.max(1,r[7])),1===n||(0,L.wt)(s)&&(0,L.wt)(l)||(Q.warn("Ignoring mipmaps of non power of two sized compressed texture."),n=1);let p=r[1]+4;const m=[];for(let t=0;t<n;++t)h=(s+3>>2)*(l+3>>2)*o,u=new Uint8Array(e,p,h),m.push(u),p+=h,s=Math.max(1,s>>1),l=Math.max(1,l>>1);return{textureData:{type:"compressed",levels:m},internalFormat:a,width:c,height:d}}(r,t.hasMipmap);return t.samplingMode=i.levels.length>1?9987:9729,t.hasMipmap=i.levels.length>1,t.internalFormat=o,t.width=a,t.height=n,new W.Z(e,t,i)}(e,this.createDescriptor(e),t),this.glTexture}loadFromKTX2(e,t){return this.loadAsync((()=>async function(e,t,r){(0,o.Wi)(k)&&(k=await j());const i=new k.KTX2File(new Uint8Array(r));if(!K(i))return null;i.startTranscoding();const a=Y(e,t,i.getLevels(),i.getHasAlpha(),i.getWidth(),i.getHeight(),((e,t)=>i.getImageTranscodedSizeInBytes(e,0,0,t)),((e,t,r)=>i.transcodeImage(r,e,0,0,t,0,-1,-1)));return i.close(),i.delete(),a}(e,this.createDescriptor(e),t).then((e=>(this.glTexture=e,e)))))}loadFromBasis(e,t){return this.loadAsync((()=>async function(e,t,r){(0,o.Wi)(k)&&(k=await j());const i=new k.BasisFile(new Uint8Array(r));if(!Z(i))return null;i.startTranscoding();const a=Y(e,t,i.getNumLevels(0),i.getHasAlpha(),i.getImageWidth(0,0),i.getImageHeight(0,0),((e,t)=>i.getImageTranscodedSizeInBytes(0,e,t)),((e,t,r)=>i.transcodeImage(r,0,e,t,0,0)));return i.close(),i.delete(),a}(e,this.createDescriptor(e),t).then((e=>(this.glTexture=e,e)))))}loadFromPixelData(e,t){(0,A.hu)(this.params.width>0&&this.params.height>0);const r=this.createDescriptor(e);return r.pixelFormat=1===this.params.components?6409:3===this.params.components?6407:6408,r.width=this.params.width,r.height=this.params.height,this.glTexture=new W.Z(e,r,t),this.glTexture}loadAsync(e){const t=(0,w.yi)();this.loadingController=t;const r=e(t.signal);this.loadingPromise=r;const i=()=>{this.loadingController===t&&(this.loadingController=null),this.loadingPromise===r&&(this.loadingPromise=null)};return r.then(i,i),r}loadFromURL(e,t,r){return this.loadAsync((async i=>{const o=await(0,S.t)(r,{signal:i});return this.loadFromImage(e,o,t)}))}loadFromImageElement(e,t,r){return r.complete?this.loadFromImage(e,r,t):this.loadAsync((async i=>{const o=await(0,V.f)(r,r.src,!1,i);return this.loadFromImage(e,o,t)}))}loadFromVideoElement(e,t,r){return r.readyState>=2?this.loadFromImage(e,r,t):this.loadFromVideoElementAsync(e,t,r)}loadFromVideoElementAsync(e,t,r){return this.loadAsync((i=>new Promise(((a,n)=>{const s=()=>{r.removeEventListener("loadeddata",l),r.removeEventListener("error",c),(0,o.pC)(d)&&d.remove()},l=()=>{r.readyState>=2&&(s(),a(this.loadFromImage(e,r,t)))},c=e=>{s(),n(e||new y.Z("Failed to load video"))};r.addEventListener("loadeddata",l),r.addEventListener("error",c);const d=(0,w.fu)(i,(()=>c((0,w.zE)())))}))))}loadFromImage(e,t,r){const i=de.getDataDimensions(t);this.params.width=i.width,this.params.height=i.height;const o=this.createDescriptor(e);return o.pixelFormat=3===this.params.components?6407:6408,!this.requiresPowerOfTwo(e,o)||(0,L.wt)(i.width)&&(0,L.wt)(i.height)?(o.width=i.width,o.height=i.height,this.glTexture=new W.Z(e,o,t),this.glTexture):(this.glTexture=this.makePowerOfTwoTexture(e,t,i,o,r),this.glTexture)}requiresPowerOfTwo(e,t){const r=33071,i="number"==typeof t.wrapMode?t.wrapMode===r:t.wrapMode.s===r&&t.wrapMode.t===r;return!(0,ce.Z)(e.gl)&&(t.hasMipmap||!i)}makePowerOfTwoTexture(e,t,r,i,o){const{width:a,height:n}=r,s=(0,L.Sf)(a),l=(0,L.Sf)(n);let c;switch(i.width=s,i.height=l,this.params.powerOfTwoResizeMode){case 2:i.textureCoordinateScaleFactor=[a/s,n/l],c=new W.Z(e,i),c.updateData(0,0,0,a,n,t);break;case 1:case null:case void 0:c=this.stretchToPowerOfTwo(e,t,i,o);break;default:(0,z.Bg)(this.params.powerOfTwoResizeMode)}return i.hasMipmap&&c.generateMipmap(),c}stretchToPowerOfTwo(e,t,r,i){const o=new W.Z(e,r),a=new le.Z(e,{colorTarget:0,depthStencilTarget:0},o),n=new W.Z(e,{target:3553,pixelFormat:r.pixelFormat,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!!r.flipped,maxAnisotropy:8,preMultiplyAlpha:r.preMultiplyAlpha},t),s=function(e,t=oe,r=ie,i=-1,o=1){let a=null;switch(t){case ae:a=new Float32Array([i,i,0,0,o,i,1,0,i,o,0,1,o,o,1,1]);break;case oe:default:a=new Float32Array([i,i,o,i,i,o,o,o])}return new se.Z(e,r,{geometry:t},{geometry:ne.Z.createVertex(e,35044,a)})}(e);return this.drawStretchedTexture(e,i,a,s,n,o),this.requiresFrameUpdates?this.powerOfTwoStretchInfo={vao:s,sourceTexture:n,framebuffer:a}:(s.dispose(!0),n.dispose(),a.detachColorTexture(),e.bindFramebuffer(null),a.dispose()),o}drawStretchedTexture(e,t,r,i,o,a){e.bindFramebuffer(r);const n=e.getViewport();e.setViewport(0,0,a.descriptor.width,a.descriptor.height);const s=t.program;e.useProgram(s),s.setUniform4f("color",1,1,1,1),s.bindTexture(o,"tex"),e.bindVAO(i),e.setPipelineState(t.pipeline),e.drawArrays(5,0,(0,q._V)(i,"geometry")),e.bindFramebuffer(null),e.setViewport(n.x,n.y,n.width,n.height)}unload(){if((0,o.pC)(this.powerOfTwoStretchInfo)){const{framebuffer:e,vao:t,sourceTexture:r}=this.powerOfTwoStretchInfo;t.dispose(!0),r.dispose(),e.dispose(),this.glTexture=null,this.powerOfTwoStretchInfo=null}if((0,o.pC)(this.glTexture)&&(this.glTexture.dispose(),this.glTexture=null),(0,o.pC)(this.loadingController)){const e=this.loadingController;this.loadingController=null,this.loadingPromise=null,e.abort()}this.events.emit("unloaded")}}de.DDS_ENCODING="image/vnd-ms.dds",de.KTX2_ENCODING="image/ktx2",de.BASIS_ENCODING="image/x.basis";var ue=r(86363),he=r(46918);const pe=e=>class extends e{constructor(){super(...arguments),this._isDisposed=!1}dispose(){for(const t of null!=(e=this._managedDisposables)?e:[]){var e;const r=this[t];this[t]=null,r&&"function"==typeof r.dispose&&r.dispose()}this._isDisposed=!0}get isDisposed(){return this._isDisposed}};class me extends(pe(class{})){}const fe=class extends me{constructor(e){super(),this._material=e.material,this._techniqueRep=e.techniqueRep,this._output=e.output}get technique(){return this._technique}getPipelineState(e,t){return this.technique.pipeline}ensureResources(e){return 2}ensureParameters(e){}},ve=class extends fe{constructor(e){super(e),this._textureIDs=new Set,this._textureRepository=e.textureRep,this._textureId=e.textureId,this._initTransparent=!!e.initTextureTransparent,this._texture=this._acquire(this._textureId),this._textureNormal=this._acquire(e.normalTextureId),this._textureEmissive=this._acquire(e.emissiveTextureId),this._textureOcclusion=this._acquire(e.occlusionTextureId),this._textureMetallicRoughness=this._acquire(e.metallicRoughnessTextureId)}dispose(){this._textureIDs.forEach((e=>this._textureRepository.release(e))),this._textureIDs.clear()}updateTexture(e){e!==this._textureId&&(this._release(this._textureId),this._textureId=e,this._texture=this._acquire(this._textureId))}bindTextures(e){(0,o.pC)(this._texture)&&e.bindTexture(this._texture.glTexture,"tex"),(0,o.pC)(this._textureNormal)&&e.bindTexture(this._textureNormal.glTexture,"normalTexture"),(0,o.pC)(this._textureEmissive)&&e.bindTexture(this._textureEmissive.glTexture,"texEmission"),(0,o.pC)(this._textureOcclusion)&&e.bindTexture(this._textureOcclusion.glTexture,"texOcclusion"),(0,o.pC)(this._textureMetallicRoughness)&&e.bindTexture(this._textureMetallicRoughness.glTexture,"texMetallicRoughness")}bindTextureScale(e){const t=(0,o.pC)(this._texture)&&this._texture.glTexture;t&&t.descriptor.textureCoordinateScaleFactor?e.setUniform2fv("textureCoordinateScaleFactor",t.descriptor.textureCoordinateScaleFactor):e.setUniform2f("textureCoordinateScaleFactor",1,1)}_acquire(e){if(!(0,o.Wi)(e))return this._textureIDs.add(e),this._textureRepository.acquire(e,this._initTransparent)}_release(e){(0,o.Wi)(e)||(this._textureIDs.delete(e),this._textureRepository.release(e))}};var ge=r(11110);class xe extends E{constructor(e,t){super(),this.type=3,this.supportsEdges=!1,this._visible=!0,this._renderPriority=0,this._insertOrder=0,this._vertexAttributeLocations=ie,this._params=(0,ge.Uf)(e,t),this.validateParameterValues(this._params)}dispose(){}get params(){return this._params}update(e){return!1}setParameterValues(e){(0,ge.LO)(this._params,e)&&(this.validateParameterValues(this._params),this.parametersChanged())}validateParameterValues(e){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.parametersChanged())}isVisibleInPass(e){return!0}get renderOccluded(){return this.params.renderOccluded}get renderPriority(){return this._renderPriority}set renderPriority(e){e!==this._renderPriority&&(this._renderPriority=e,this.parametersChanged())}get insertOrder(){return this._insertOrder}set insertOrder(e){e!==this._insertOrder&&(this._insertOrder=e,this.parametersChanged())}get vertexAttributeLocations(){return this._vertexAttributeLocations}isVisible(){return this._visible}parametersChanged(){(0,o.pC)(this.materialRepository)&&this.materialRepository.materialChanged(this)}}var be=r(83612);const _e=(0,be.wK)(770,1,771,771),ye=(0,be.if)(1,1),Te=(0,be.if)(0,771);const we={factor:-1,units:-2};function Me(e){return e?we:null}function Se(e){return 3===e||2===e?513:515}var Ce=r(2150),Ae=r(57250),Pe=r(35701),Fe=r(45494),Oe=(r(32780),r(99491)),Ee=r(90594),He=r(51320);new Ee.x((function(){return{origin:null,direction:null}})),(0,d.c)(),(0,d.c)();const De=T.Z.getLogger("esri.geometry.support.sphere");function Ie(){return(0,Fe.c)()}function ze(e,t=Ie()){return(0,Oe.c)(t,e)}function Re(e){return Array.isArray(e)?e[3]:e}function Le(e){return Array.isArray(e)?e:ke}function Ne(e,t,r){if((0,o.Wi)(t))return!1;const i=(0,c.f)(He.WM.get(),t.origin,Le(e)),a=(0,c.d)(t.direction,t.direction),n=2*(0,c.d)(t.direction,i),s=n*n-4*a*((0,c.d)(i,i)-e[3]*e[3]);if(s<0)return!1;const l=Math.sqrt(s);let d=(-n-l)/(2*a);const u=(-n+l)/(2*a);return(d<0||u<d&&u>0)&&(d=u),!(d<0||(r&&(0,c.b)(r,t.origin,(0,c.a)(He.WM.get(),t.direction,d)),0))}function Be(e,t,r){const i=He.WM.get(),o=He.MP.get();(0,c.c)(i,t.origin,t.direction);const a=Re(e);(0,c.c)(r,i,t.origin),(0,c.a)(r,r,1/(0,c.l)(r)*a);const n=Ue(e,t.origin),l=function(e,t){const r=(0,c.d)(e,t)/((0,c.l)(e)*(0,c.l)(t));return-(0,L.ZF)(r)}(t.origin,r);return(0,s.i)(o),(0,s.c)(o,o,l+n,i),(0,c.m)(r,r,o),r}function Ve(e,t,r){const i=(0,c.f)(He.WM.get(),t,Le(e)),o=(0,c.a)(He.WM.get(),i,e[3]/(0,c.l)(i));return(0,c.b)(r,o,Le(e))}function Ue(e,t){const r=(0,c.f)(He.WM.get(),t,Le(e)),i=(0,c.l)(r),o=Re(e),a=o+Math.abs(o-i);return(0,L.ZF)(o/a)}const Ge=(0,d.c)();function We(e,t,r,i){const o=(0,c.f)(Ge,t,Le(e));switch(r){case 0:{const e=(0,L.jE)(o,Ge)[2];return(0,c.s)(i,-Math.sin(e),Math.cos(e),0)}case 1:{const e=(0,L.jE)(o,Ge),t=e[1],r=e[2],a=Math.sin(t);return(0,c.s)(i,-a*Math.cos(r),-a*Math.sin(r),Math.cos(t))}case 2:return(0,c.n)(i,o);default:return}}function qe(e,t){const r=(0,c.f)($e,t,Le(e));return(0,c.l)(r)-e[3]}const ke=(0,d.c)(),$e=(0,d.c)();Object.freeze({__proto__:null,create:Ie,copy:ze,fromCenterAndRadius:function(e,t){return(0,Fe.f)(e[0],e[1],e[2],t)},wrap:function(e){return e},clear:function(e){e[0]=e[1]=e[2]=e[3]=0},fromRadius:function(e){return e},getRadius:Re,getCenter:Le,fromValues:function(e,t,r,i){return(0,Fe.f)(e,t,r,i)},elevate:function(e,t,r){return e!==r&&(0,c.g)(r,e),r[3]=e[3]+t,r},setExtent:function(e,t,r){return De.error("sphere.setExtent is not yet supported"),e===r?r:ze(e,r)},intersectRay:Ne,intersectsRay:function(e,t){return Ne(e,t,null)},intersectRayClosestSilhouette:function(e,t,r){if(Ne(e,t,r))return r;const i=Be(e,t,He.WM.get());return(0,c.b)(r,t.origin,(0,c.a)(He.WM.get(),t.direction,(0,c.i)(t.origin,i)/(0,c.l)(t.direction))),r},closestPointOnSilhouette:Be,closestPoint:function(e,t,r){return Ne(e,t,r)?r:(function(e,t,r){const i=(0,c.d)(e.direction,(0,c.f)(r,t,e.origin));(0,c.b)(r,e.origin,(0,c.a)(r,e.direction,i))}(t,Le(e),r),Ve(e,r,r))},projectPoint:Ve,distanceToSilhouette:function(e,t){const r=(0,c.f)(He.WM.get(),t,Le(e)),i=(0,c.p)(r),o=e[3]*e[3];return Math.sqrt(Math.abs(i-o))},angleToSilhouette:Ue,axisAt:We,altitudeAt:qe,setAltitudeAt:function(e,t,r,i){const o=qe(e,t),a=We(e,t,2,$e),n=(0,c.a)($e,a,r-o);return(0,c.b)(i,t,n)}});const je=new class{constructor(e=0){this.offset=e,this.sphere=Ie(),this.tmpVertex=(0,d.c)()}applyToVertex(e,t,r){const i=this.objectTransform.transform;let o=i[0]*e+i[4]*t+i[8]*r+i[12],a=i[1]*e+i[5]*t+i[9]*r+i[13],n=i[2]*e+i[6]*t+i[10]*r+i[14];const s=this.offset/Math.sqrt(o*o+a*a+n*n);o+=o*s,a+=a*s,n+=n*s;const l=this.objectTransform.inverse;return this.tmpVertex[0]=l[0]*o+l[4]*a+l[8]*n+l[12],this.tmpVertex[1]=l[1]*o+l[5]*a+l[9]*n+l[13],this.tmpVertex[2]=l[2]*o+l[6]*a+l[10]*n+l[14],this.tmpVertex}applyToMinMax(e,t){const r=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*r,e[1]+=e[1]*r,e[2]+=e[2]*r;const i=this.offset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]+=t[0]*i,t[1]+=t[1]*i,t[2]+=t[2]*i}applyToAabb(e){const t=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*t,e[1]+=e[1]*t,e[2]+=e[2]*t;const r=this.offset/Math.sqrt(e[3]*e[3]+e[4]*e[4]+e[5]*e[5]);return e[3]+=e[3]*r,e[4]+=e[4]*r,e[5]+=e[5]*r,e}applyToBoundingSphere(e){const t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),r=this.offset/t;return this.sphere[0]=e[0]+e[0]*r,this.sphere[1]=e[1]+e[1]*r,this.sphere[2]=e[2]+e[2]*r,this.sphere[3]=e[3]+e[3]*this.offset/t,this.sphere}};new class{constructor(e=0){this.offset=e,this.componentLocalOriginLength=0,this.tmpVertex=(0,d.c)(),this.mbs=(0,Fe.c)(),this.obb={center:(0,d.c)(),halfSize:(0,Pe.c)(),quaternion:null}}set localOrigin(e){this.componentLocalOriginLength=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2])}applyToVertex(e,t,r){const i=e,o=t,a=r+this.componentLocalOriginLength,n=this.offset/Math.sqrt(i*i+o*o+a*a);return this.tmpVertex[0]=e+i*n,this.tmpVertex[1]=t+o*n,this.tmpVertex[2]=r+a*n,this.tmpVertex}applyToAabb(e){const t=e[0],r=e[1],i=e[2]+this.componentLocalOriginLength,o=e[3],a=e[4],n=e[5]+this.componentLocalOriginLength,s=this.offset/Math.sqrt(t*t+r*r+i*i);e[0]+=t*s,e[1]+=r*s,e[2]+=i*s;const l=this.offset/Math.sqrt(o*o+a*a+n*n);return e[3]+=o*l,e[4]+=a*l,e[5]+=n*l,e}applyToMbs(e){const t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),r=this.offset/t;return this.mbs[0]=e[0]+e[0]*r,this.mbs[1]=e[1]+e[1]*r,this.mbs[2]=e[2]+e[2]*r,this.mbs[3]=e[3]+e[3]*this.offset/t,this.mbs}applyToObb(e){const t=e.center,r=this.offset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);this.obb.center[0]=t[0]+t[0]*r,this.obb.center[1]=t[1]+t[1]*r,this.obb.center[2]=t[2]+t[2]*r,(0,c.q)(this.obb.halfSize,e.halfSize,e.quaternion),(0,c.b)(this.obb.halfSize,this.obb.halfSize,e.center);const i=this.offset/Math.sqrt(this.obb.halfSize[0]*this.obb.halfSize[0]+this.obb.halfSize[1]*this.obb.halfSize[1]+this.obb.halfSize[2]*this.obb.halfSize[2]);return this.obb.halfSize[0]+=this.obb.halfSize[0]*i,this.obb.halfSize[1]+=this.obb.halfSize[1]*i,this.obb.halfSize[2]+=this.obb.halfSize[2]*i,(0,c.f)(this.obb.halfSize,this.obb.halfSize,e.center),(0,Ce.c)(Xe,e.quaternion),(0,c.q)(this.obb.halfSize,this.obb.halfSize,Xe),this.obb.halfSize[0]*=this.obb.halfSize[0]<0?-1:1,this.obb.halfSize[1]*=this.obb.halfSize[1]<0?-1:1,this.obb.halfSize[2]*=this.obb.halfSize[2]<0?-1:1,this.obb.quaternion=e.quaternion,this.obb}},new class{constructor(e=0){this.offset=e,this.tmpVertex=(0,d.c)()}applyToVertex(e,t,r){const i=e+this.localOrigin[0],o=t+this.localOrigin[1],a=r+this.localOrigin[2],n=this.offset/Math.sqrt(i*i+o*o+a*a);return this.tmpVertex[0]=e+i*n,this.tmpVertex[1]=t+o*n,this.tmpVertex[2]=r+a*n,this.tmpVertex}applyToAabb(e){const t=e[0]+this.localOrigin[0],r=e[1]+this.localOrigin[1],i=e[2]+this.localOrigin[2],o=e[3]+this.localOrigin[0],a=e[4]+this.localOrigin[1],n=e[5]+this.localOrigin[2],s=this.offset/Math.sqrt(t*t+r*r+i*i);e[0]+=t*s,e[1]+=r*s,e[2]+=i*s;const l=this.offset/Math.sqrt(o*o+a*a+n*n);return e[3]+=o*l,e[4]+=a*l,e[5]+=n*l,e}};const Xe=(0,Ae.a)();function Ze(e,t,r,i){const o=r.typedBuffer,a=r.typedBufferStride,n=e.length;i*=a;for(let r=0;r<n;++r){const n=2*e[r];o[i]=t[n],o[i+1]=t[n+1],i+=a}}function Ke(e,t,r,i,o){const a=r.typedBuffer,n=r.typedBufferStride,s=e.length;if(i*=n,null==o||1===o)for(let r=0;r<s;++r){const o=3*e[r];a[i]=t[o],a[i+1]=t[o+1],a[i+2]=t[o+2],i+=n}else for(let r=0;r<s;++r){const s=3*e[r];for(let e=0;e<o;++e)a[i]=t[s],a[i+1]=t[s+1],a[i+2]=t[s+2],i+=n}}function Ye(e,t,r,i,o,a=1){if(!r)return void Ke(e,t,i,o,a);const n=i.typedBuffer,s=i.typedBufferStride,l=e.length,c=r[0],d=r[1],u=r[2],h=r[4],p=r[5],m=r[6],f=r[8],v=r[9],g=r[10],x=r[12],b=r[13],_=r[14];if(o*=s,1===a)for(let r=0;r<l;++r){const i=3*e[r],a=t[i],l=t[i+1],y=t[i+2];n[o]=c*a+h*l+f*y+x,n[o+1]=d*a+p*l+v*y+b,n[o+2]=u*a+m*l+g*y+_,o+=s}else for(let r=0;r<l;++r){const i=3*e[r],l=t[i],y=t[i+1],T=t[i+2],w=c*l+h*y+f*T+x,M=d*l+p*y+v*T+b,S=u*l+m*y+g*T+_;for(let e=0;e<a;++e)n[o]=w,n[o+1]=M,n[o+2]=S,o+=s}}function Qe(e,t,r,i,o,a=1){if(!r)return void Ke(e,t,i,o,a);const n=r,l=i.typedBuffer,c=i.typedBufferStride,d=e.length,u=n[0],h=n[1],p=n[2],m=n[4],f=n[5],v=n[6],g=n[8],x=n[9],b=n[10],_=!(0,s.p)(n),y=1e-6,T=1-y;if(o*=c,1===a)for(let r=0;r<d;++r){const i=3*e[r],a=t[i],n=t[i+1],s=t[i+2];let d=u*a+m*n+g*s,w=h*a+f*n+x*s,M=p*a+v*n+b*s;if(_){const e=d*d+w*w+M*M;if(e<T&&e>y){const t=1/Math.sqrt(e);d*=t,w*=t,M*=t}}l[o+0]=d,l[o+1]=w,l[o+2]=M,o+=c}else for(let r=0;r<d;++r){const i=3*e[r],n=t[i],s=t[i+1],d=t[i+2];let w=u*n+m*s+g*d,M=h*n+f*s+x*d,S=p*n+v*s+b*d;if(_){const e=w*w+M*M+S*S;if(e<T&&e>y){const t=1/Math.sqrt(e);w*=t,M*=t,S*=t}}for(let e=0;e<a;++e)l[o+0]=w,l[o+1]=M,l[o+2]=S,o+=c}}function Je(e,t,r,i,o,a=1){if(!r)return void function(e,t,r,i,o=1){const a=r.typedBuffer,n=r.typedBufferStride,s=e.length;if(i*=n,1===o)for(let r=0;r<s;++r){const o=4*e[r];a[i]=t[o],a[i+1]=t[o+1],a[i+2]=t[o+2],a[i+3]=t[o+3],i+=n}else for(let r=0;r<s;++r){const s=4*e[r];for(let e=0;e<o;++e)a[i]=t[s],a[i+1]=t[s+1],a[i+2]=t[s+2],a[i+3]=t[s+3],i+=n}}(e,t,i,o,a);const n=r,l=i.typedBuffer,c=i.typedBufferStride,d=e.length,u=n[0],h=n[1],p=n[2],m=n[4],f=n[5],v=n[6],g=n[8],x=n[9],b=n[10],_=!(0,s.p)(n),y=1e-6,T=1-y;if(o*=c,1===a)for(let r=0;r<d;++r){const i=4*e[r],a=t[i],n=t[i+1],s=t[i+2],d=t[i+3];let w=u*a+m*n+g*s,M=h*a+f*n+x*s,S=p*a+v*n+b*s;if(_){const e=w*w+M*M+S*S;if(e<T&&e>y){const t=1/Math.sqrt(e);w*=t,M*=t,S*=t}}l[o+0]=w,l[o+1]=M,l[o+2]=S,l[o+3]=d,o+=c}else for(let r=0;r<d;++r){const i=4*e[r],n=t[i],s=t[i+1],d=t[i+2],w=t[i+3];let M=u*n+m*s+g*d,S=h*n+f*s+x*d,C=p*n+v*s+b*d;if(_){const e=M*M+S*S+C*C;if(e<T&&e>y){const t=1/Math.sqrt(e);M*=t,S*=t,C*=t}}for(let e=0;e<a;++e)l[o+0]=M,l[o+1]=S,l[o+2]=C,l[o+3]=w,o+=c}}function et(e,t,r,i,o,a=1){const n=i.typedBuffer,s=i.typedBufferStride,l=e.length;if(o*=s,1===a){if(4===r)for(let r=0;r<l;++r){const i=4*e[r];n[o]=t[i],n[o+1]=t[i+1],n[o+2]=t[i+2],n[o+3]=t[i+3],o+=s}else if(3===r)for(let r=0;r<l;++r){const i=3*e[r];n[o]=t[i],n[o+1]=t[i+1],n[o+2]=t[i+2],n[o+3]=255,o+=s}}else if(4===r)for(let r=0;r<l;++r){const i=4*e[r];for(let e=0;e<a;++e)n[o]=t[i],n[o+1]=t[i+1],n[o+2]=t[i+2],n[o+3]=t[i+3],o+=s}else if(3===r)for(let r=0;r<l;++r){const i=3*e[r];for(let e=0;e<a;++e)n[o]=t[i],n[o+1]=t[i+1],n[o+2]=t[i+2],n[o+3]=255,o+=s}}var tt=r(23324),rt=r(59121),it=r(62907),ot=r(16364),at=r(26698),nt=r(10790),st=r(89799),lt=r(68264),ct=r(23969),dt=r(77720);const ut=(0,r(45396).c)();class ht{constructor(e,t){this._module=e,this._loadModule=t}get(){return this._module}async reload(){return this._module=await this._loadModule(),this._module}}function pt(e={}){return(t,r)=>{var i,o;t._parameterNames=null!=(i=t._parameterNames)?i:[],t._parameterNames.push(r);const a=t._parameterNames.length-1,n=e.count||2,s=Math.ceil((0,L.k3)(n)),l=null!=(o=t._parameterBits)?o:[0];let c=0;for(;l[c]+s>16;)c++,c>=l.length&&l.push(0);t._parameterBits=l;const d=l[c],u=(1<<s)-1<<d;l[c]+=s,Object.defineProperty(t,r,{get(){return this[a]},set(e){if(this[a]!==e&&(this[a]=e,this._keyDirty=!0,this._parameterBits[c]=this._parameterBits[c]&~u|+e<<d&u,"number"!=typeof e&&"boolean"!=typeof e))throw"Configuration value for "+r+" must be boolean or number, got "+typeof e}})}}var mt=r(1549),ft=r(61605);class vt extends mt.${constructor(e,t,r){super(e,t.generateSource("vertex"),t.generateSource("fragment"),r),this._textures=new Map,this._freeTextureUnits=new C.Z({deallocator:null}),this._fragmentUniforms=(0,ft.hZ)()?t.fragmentUniforms.entries:null}stop(){this._textures.clear(),this._freeTextureUnits.clear()}bindTexture(e,t){if((0,o.Wi)(e)||null==e.glName){const e=this._textures.get(t);return e&&(this._context.bindTexture(null,e.unit),this._freeTextureUnit(e),this._textures.delete(t)),null}let r=this._textures.get(t);return null==r?(r=this._allocTextureUnit(e),this._textures.set(t,r)):r.texture=e,this._context.useProgram(this),this.setUniform1i(t,r.unit),this._context.bindTexture(e,r.unit),r.unit}rebindTextures(){this._context.useProgram(this),this._textures.forEach(((e,t)=>{this._context.bindTexture(e.texture,e.unit),this.setUniform1i(t,e.unit)})),(0,o.pC)(this._fragmentUniforms)&&this._fragmentUniforms.forEach((e=>{if(("sampler2D"===e.type||"samplerCube"===e.type)&&!this._textures.has(e.name))throw new Error(`Texture sampler ${e.name} has no bound texture`)}))}_allocTextureUnit(e){return{texture:e,unit:0===this._freeTextureUnits.length?this._textures.size:this._freeTextureUnits.pop()}}_freeTextureUnit(e){this._freeTextureUnits.push(e.unit)}}const gt={mask:255},xt={function:{func:519,ref:2,mask:2},operation:{fail:7680,zFail:7680,zPass:0}},bt={function:{func:519,ref:2,mask:2},operation:{fail:7680,zFail:7680,zPass:7681}};var _t=r(1154);class yt extends class{constructor(e,t,r=(()=>this.dispose())){this.release=r,t&&(this._config=t.snapshot()),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}dispose(){this._program=(0,o.O3)(this._program),this._pipeline=this._config=null}reload(e){(0,o.O3)(this._program),this._program=this.initializeProgram(e)}get program(){return this._program}get pipeline(){return this._pipeline}get key(){return this._config.key}get configuration(){return this._config}bindPass(e,t){}bindMaterial(e,t){}bindDraw(e,t,r){}bindPipelineState(e){e.setPipelineState(this.pipeline)}ensureAttributeLocations(e){this.program.assertCompatibleVertexAttributeLocations(e)}get primitiveType(){return 4}}{initializeProgram(e){const t=yt.shader.get(),r=this.configuration,i=t.build({OITEnabled:0===r.transparencyPassType,output:r.output,viewingMode:e.viewingMode,receiveShadows:r.receiveShadows,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:r.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,symbolColor:r.symbolColors,vvSize:r.vvSize,vvColor:r.vvColor,vvInstancingEnabled:!0,instanced:r.instanced,instancedColor:r.instancedColor,instancedDoublePrecision:r.instancedDoublePrecision,pbrMode:r.usePBR?r.isSchematic?2:1:0,hasMetalnessAndRoughnessTexture:r.hasMetalnessAndRoughnessTexture,hasEmissionTexture:r.hasEmissionTexture,hasOcclusionTexture:r.hasOcclusionTexture,hasNormalTexture:r.hasNormalTexture,hasColorTexture:r.hasColorTexture,receiveAmbientOcclusion:r.receiveAmbientOcclusion,useCustomDTRExponentForWater:!1,normalType:r.normalsTypeDerivate?3:0,doubleSidedMode:r.doubleSidedMode,vertexTangents:r.vertexTangents,attributeTextureCoordinates:r.hasMetalnessAndRoughnessTexture||r.hasEmissionTexture||r.hasOcclusionTexture||r.hasNormalTexture||r.hasColorTexture?1:0,textureAlphaPremultiplied:r.textureAlphaPremultiplied,attributeColor:r.vertexColors,screenSizePerspectiveEnabled:r.screenSizePerspective,verticalOffsetEnabled:r.verticalOffset,offsetBackfaces:r.offsetBackfaces,doublePrecisionRequiresObfuscation:(0,dt.I)(e.rctx),alphaDiscardMode:r.alphaDiscardMode,supportsTextureAtlas:!1,multipassTerrainEnabled:r.multipassTerrainEnabled,cullAboveGround:r.cullAboveGround});return new vt(e.rctx,i,ie)}bindPass(e,t){var r,i;!function(e,t){e.setUniformMatrix4fv("proj",t)}(this.program,t.camera.projectionMatrix);const o=this.configuration.output;(1===this.configuration.output||t.multipassTerrainEnabled||3===o)&&this.program.setUniform2fv("cameraNearFar",t.camera.nearFar),t.multipassTerrainEnabled&&(this.program.setUniform2fv("inverseViewport",t.inverseViewport),(0,nt.p)(this.program,t)),7===o&&(this.program.setUniform1f("opacity",e.opacity),this.program.setUniform1f("layerOpacity",e.layerOpacity),this.program.setUniform4fv("externalColor",e.externalColor),this.program.setUniform1i("colorMixMode",ge.FZ[e.colorMixMode])),0===o?(t.lighting.setUniforms(this.program,!1),this.program.setUniform3fv("ambient",e.ambient),this.program.setUniform3fv("diffuse",e.diffuse),this.program.setUniform4fv("externalColor",e.externalColor),this.program.setUniform1i("colorMixMode",ge.FZ[e.colorMixMode]),this.program.setUniform1f("opacity",e.opacity),this.program.setUniform1f("layerOpacity",e.layerOpacity),this.configuration.usePBR&&(0,st.nW)(this.program,e,this.configuration.isSchematic)):4===o&&(0,at.wW)(this.program,t),(0,ct.uj)(this.program,e),(0,ot.Mo)(this.program,e,t),(0,ge.bj)(e.screenSizePerspective,this.program,"screenSizePerspectiveAlignment"),2!==e.textureAlphaMode&&3!==e.textureAlphaMode||this.program.setUniform1f("textureAlphaCutoff",e.textureAlphaCutoff),null==(r=t.shadowMap)||r.bind(this.program),null==(i=t.ssaoHelper)||i.bind(this.program)}bindDraw(e){const t=this.configuration.instancedDoublePrecision?(0,d.f)(e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]):e.origin;(function(e,t,r){(0,s.t)(ut,r,t),e.setUniform3fv("localOrigin",t),e.setUniformMatrix4fv("view",ut)})(this.program,t,e.camera.viewMatrix),this.program.rebindTextures(),(0===this.configuration.output||7===this.configuration.output||1===this.configuration.output&&this.configuration.screenSizePerspective||2===this.configuration.output&&this.configuration.screenSizePerspective||4===this.configuration.output&&this.configuration.screenSizePerspective)&&function(e,t,r){e.setUniform3f("camPos",r[3]-t[0],r[7]-t[1],r[11]-t[2])}(this.program,t,e.camera.viewInverseTransposeMatrix),2===this.configuration.output&&this.program.setUniformMatrix4fv("viewNormal",e.camera.viewInverseTransposeMatrix),this.configuration.instancedDoublePrecision&&it.f.bindCustomOrigin(this.program,t),(0,rt.Vv)(this.program,this.configuration,e.slicePlane,t),0===this.configuration.output&&(0,lt.vL)(this.program,e,t)}setPipeline(e,t){const r=this.configuration,i=3===e,o=2===e;return(0,be.sm)({blending:0!==r.output&&7!==r.output||!r.transparent?null:i?_e:(a=e,2===a?null:1===a?Te:ye),culling:Tt(r)&&(0,be.zp)(r.cullFace),depthTest:{func:Se(e)},depthWrite:i||o?r.writeDepth&&be.LZ:null,colorWrite:be.BK,stencilWrite:r.sceneHasOcludees?gt:null,stencilTest:r.sceneHasOcludees?t?bt:xt:null,polygonOffset:i||o?null:Me(r.enableOffset)});var a}initializePipeline(){return this._occludeePipelineState=this.setPipeline(this.configuration.transparencyPassType,!0),this.setPipeline(this.configuration.transparencyPassType,!1)}getPipelineState(e){return e?this._occludeePipelineState:this.pipeline}}function Tt(e){return e.cullFace?0!==e.cullFace:!e.slicePlaneEnabled&&!e.transparent&&!e.doubleSidedMode}yt.shader=new ht(_t.D,(()=>r.e(9600).then(r.bind(r,69600))));class wt extends class{constructor(){this._key="",this._keyDirty=!1,this._parameterBits=this._parameterBits.map((()=>0))}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=String.fromCharCode.apply(String,this._parameterBits)),this._key}snapshot(){const e=this._parameterNames,t={key:this.key};for(const r of e)t[r]=this[r];return t}}{constructor(){super(...arguments),this.output=0,this.alphaDiscardMode=1,this.doubleSidedMode=0,this.isSchematic=!1,this.vertexColors=!1,this.offsetBackfaces=!1,this.symbolColors=!1,this.vvSize=!1,this.vvColor=!1,this.verticalOffset=!1,this.receiveShadows=!1,this.slicePlaneEnabled=!1,this.sliceHighlightDisabled=!1,this.receiveAmbientOcclusion=!1,this.screenSizePerspective=!1,this.textureAlphaPremultiplied=!1,this.hasColorTexture=!1,this.usePBR=!1,this.hasMetalnessAndRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.instanced=!1,this.instancedColor=!1,this.instancedDoublePrecision=!1,this.vertexTangents=!1,this.normalsTypeDerivate=!1,this.writeDepth=!0,this.sceneHasOcludees=!1,this.transparent=!1,this.enableOffset=!0,this.cullFace=0,this.transparencyPassType=3,this.multipassTerrainEnabled=!1,this.cullAboveGround=!1}}(0,tt._)([pt({count:8})],wt.prototype,"output",void 0),(0,tt._)([pt({count:4})],wt.prototype,"alphaDiscardMode",void 0),(0,tt._)([pt({count:3})],wt.prototype,"doubleSidedMode",void 0),(0,tt._)([pt()],wt.prototype,"isSchematic",void 0),(0,tt._)([pt()],wt.prototype,"vertexColors",void 0),(0,tt._)([pt()],wt.prototype,"offsetBackfaces",void 0),(0,tt._)([pt()],wt.prototype,"symbolColors",void 0),(0,tt._)([pt()],wt.prototype,"vvSize",void 0),(0,tt._)([pt()],wt.prototype,"vvColor",void 0),(0,tt._)([pt()],wt.prototype,"verticalOffset",void 0),(0,tt._)([pt()],wt.prototype,"receiveShadows",void 0),(0,tt._)([pt()],wt.prototype,"slicePlaneEnabled",void 0),(0,tt._)([pt()],wt.prototype,"sliceHighlightDisabled",void 0),(0,tt._)([pt()],wt.prototype,"receiveAmbientOcclusion",void 0),(0,tt._)([pt()],wt.prototype,"screenSizePerspective",void 0),(0,tt._)([pt()],wt.prototype,"textureAlphaPremultiplied",void 0),(0,tt._)([pt()],wt.prototype,"hasColorTexture",void 0),(0,tt._)([pt()],wt.prototype,"usePBR",void 0),(0,tt._)([pt()],wt.prototype,"hasMetalnessAndRoughnessTexture",void 0),(0,tt._)([pt()],wt.prototype,"hasEmissionTexture",void 0),(0,tt._)([pt()],wt.prototype,"hasOcclusionTexture",void 0),(0,tt._)([pt()],wt.prototype,"hasNormalTexture",void 0),(0,tt._)([pt()],wt.prototype,"instanced",void 0),(0,tt._)([pt()],wt.prototype,"instancedColor",void 0),(0,tt._)([pt()],wt.prototype,"instancedDoublePrecision",void 0),(0,tt._)([pt()],wt.prototype,"vertexTangents",void 0),(0,tt._)([pt()],wt.prototype,"normalsTypeDerivate",void 0),(0,tt._)([pt()],wt.prototype,"writeDepth",void 0),(0,tt._)([pt()],wt.prototype,"sceneHasOcludees",void 0),(0,tt._)([pt()],wt.prototype,"transparent",void 0),(0,tt._)([pt()],wt.prototype,"enableOffset",void 0),(0,tt._)([pt({count:3})],wt.prototype,"cullFace",void 0),(0,tt._)([pt({count:4})],wt.prototype,"transparencyPassType",void 0),(0,tt._)([pt()],wt.prototype,"multipassTerrainEnabled",void 0),(0,tt._)([pt()],wt.prototype,"cullAboveGround",void 0);var Mt=r(84974);class St extends yt{initializeProgram(e){const t=St.shader.get(),r=this.configuration,i=t.build({OITEnabled:0===r.transparencyPassType,output:r.output,viewingMode:e.viewingMode,receiveShadows:r.receiveShadows,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:r.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,symbolColor:r.symbolColors,vvSize:r.vvSize,vvColor:r.vvColor,vvInstancingEnabled:!0,instanced:r.instanced,instancedColor:r.instancedColor,instancedDoublePrecision:r.instancedDoublePrecision,pbrMode:r.usePBR?1:0,hasMetalnessAndRoughnessTexture:!1,hasEmissionTexture:!1,hasOcclusionTexture:!1,hasNormalTexture:!1,hasColorTexture:r.hasColorTexture,receiveAmbientOcclusion:r.receiveAmbientOcclusion,useCustomDTRExponentForWater:!1,normalType:0,doubleSidedMode:2,vertexTangents:!1,attributeTextureCoordinates:r.hasColorTexture?1:0,textureAlphaPremultiplied:r.textureAlphaPremultiplied,attributeColor:r.vertexColors,screenSizePerspectiveEnabled:r.screenSizePerspective,verticalOffsetEnabled:r.verticalOffset,offsetBackfaces:r.offsetBackfaces,doublePrecisionRequiresObfuscation:(0,dt.I)(e.rctx),alphaDiscardMode:r.alphaDiscardMode,supportsTextureAtlas:!1,multipassTerrainEnabled:r.multipassTerrainEnabled,cullAboveGround:r.cullAboveGround});return new vt(e.rctx,i,ie)}}St.shader=new ht(Mt.R,(()=>r.e(921).then(r.bind(r,60921))));class Ct extends xe{constructor(e){super(e,Pt),this.supportsEdges=!0,this.techniqueConfig=new wt,this.vertexBufferLayout=Ct.getVertexBufferLayout(this.params),this.instanceBufferLayout=e.instanced?Ct.getInstanceBufferLayout(this.params):null}isVisibleInPass(e){return 4!==e&&6!==e&&7!==e||this.params.castShadows}isVisible(){const e=this.params;if(!super.isVisible()||0===e.layerOpacity)return!1;const t=e.instanced,r=e.vertexColors,i=e.symbolColors,o=!!t&&t.indexOf("color")>-1,a=e.vvColorEnabled,n="replace"===e.colorMixMode,s=e.opacity>0,l=e.externalColor&&e.externalColor[3]>0;return r&&(o||a||i)?!!n||s:r?n?l:s:o||a||i?!!n||s:n?l:s}getTechniqueConfig(e,t){return this.techniqueConfig.output=e,this.techniqueConfig.hasNormalTexture=!!this.params.normalTextureId,this.techniqueConfig.hasColorTexture=!!this.params.textureId,this.techniqueConfig.vertexTangents=this.params.vertexTangents,this.techniqueConfig.instanced=!!this.params.instanced,this.techniqueConfig.instancedDoublePrecision=this.params.instancedDoublePrecision,this.techniqueConfig.vvSize=this.params.vvSizeEnabled,this.techniqueConfig.verticalOffset=null!==this.params.verticalOffset,this.techniqueConfig.screenSizePerspective=null!==this.params.screenSizePerspective,this.techniqueConfig.slicePlaneEnabled=this.params.slicePlaneEnabled,this.techniqueConfig.sliceHighlightDisabled=this.params.sliceHighlightDisabled,this.techniqueConfig.alphaDiscardMode=this.params.textureAlphaMode,this.techniqueConfig.normalsTypeDerivate="screenDerivative"===this.params.normals,this.techniqueConfig.transparent=this.params.transparent,this.techniqueConfig.writeDepth=this.params.writeDepth,this.techniqueConfig.sceneHasOcludees=this.params.sceneHasOcludees,this.techniqueConfig.cullFace=this.params.slicePlaneEnabled?0:this.params.cullFace,this.techniqueConfig.multipassTerrainEnabled=!!t&&t.multipassTerrainEnabled,this.techniqueConfig.cullAboveGround=!!t&&t.cullAboveGround,0!==e&&7!==e||(this.techniqueConfig.vertexColors=this.params.vertexColors,this.techniqueConfig.symbolColors=this.params.symbolColors,this.params.treeRendering?this.techniqueConfig.doubleSidedMode=2:this.techniqueConfig.doubleSidedMode=this.params.doubleSided&&"normal"===this.params.doubleSidedType?1:this.params.doubleSided&&"winding-order"===this.params.doubleSidedType?2:0,this.techniqueConfig.instancedColor=!!this.params.instanced&&this.params.instanced.indexOf("color")>-1,this.techniqueConfig.receiveShadows=this.params.receiveShadows&&this.params.shadowMappingEnabled,this.techniqueConfig.receiveAmbientOcclusion=!(!t||!t.ssaoEnabled)&&this.params.receiveSSAO,this.techniqueConfig.vvColor=this.params.vvColorEnabled,this.techniqueConfig.textureAlphaPremultiplied=!!this.params.textureAlphaPremultiplied,this.techniqueConfig.usePBR=this.params.usePBR,this.techniqueConfig.hasMetalnessAndRoughnessTexture=!!this.params.metallicRoughnessTextureId,this.techniqueConfig.hasEmissionTexture=!!this.params.emissiveTextureId,this.techniqueConfig.hasOcclusionTexture=!!this.params.occlusionTextureId,this.techniqueConfig.offsetBackfaces=!(!this.params.transparent||!this.params.offsetTransparentBackfaces),this.techniqueConfig.isSchematic=this.params.usePBR&&this.params.isSchematic,this.techniqueConfig.transparencyPassType=t?t.transparencyPassType:3,this.techniqueConfig.enableOffset=!t||t.camera.relativeElevation<5e5),this.techniqueConfig}intersect(e,t,r,i,a,n,s){if(null!==this.params.verticalOffset){const e=i.camera;(0,c.s)(zt,r[12],r[13],r[14]);let t=null;switch(i.viewingMode){case 1:t=(0,c.n)(Dt,zt);break;case 2:t=(0,c.g)(Dt,Ht)}let o=0;if(null!==this.params.verticalOffset){const r=(0,c.f)(Rt,zt,e.eye),i=(0,c.l)(r),a=(0,c.a)(r,r,1/i);let n=null;this.params.screenSizePerspective&&(n=(0,c.d)(t,a)),o+=(0,ge.Hx)(e,i,this.params.verticalOffset,n,this.params.screenSizePerspective)}(0,c.a)(t,t,o),(0,c.t)(It,t,i.transform.inverseRotation),a=(0,c.f)(Ot,a,It),n=(0,c.f)(Et,n,It)}var l;(0,ge.Bw)(e,t,i,a,n,(l=i.verticalOffset,(0,o.pC)(l)?(je.offset=l,je):null),s)}getGLMaterial(e){if(0===e.output||7===e.output||1===e.output||2===e.output||3===e.output||4===e.output)return new At(e)}createBufferWriter(){return new Ft(this.vertexBufferLayout,this.instanceBufferLayout)}static getVertexBufferLayout(e){const t=e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId,r=(0,ue.U$)().vec3f("position").vec3f("normal");return e.vertexTangents&&r.vec4f("tangent"),t&&r.vec2f("uv0"),e.vertexColors&&r.vec4u8("color"),e.symbolColors&&r.vec4u8("symbolColor"),r}static getInstanceBufferLayout(e){let t=(0,ue.U$)();return t=e.instancedDoublePrecision?t.vec3f("modelOriginHi").vec3f("modelOriginLo").mat3f("model").mat3f("modelNormal"):t.mat4f("model").mat4f("modelNormal"),e.instanced&&e.instanced.indexOf("color")>-1&&(t=t.vec4f("instanceColor")),e.instanced&&e.instanced.indexOf("featureAttribute")>-1&&(t=t.vec4f("instanceFeatureAttribute")),t}}class At extends ve{constructor(e){const t=e.material;super({...e,...t.params}),this.updateParameters()}updateParameters(e){const t=this._material.params;this.updateTexture(t.textureId),this._technique=this._techniqueRep.releaseAndAcquire(t.treeRendering?St:yt,this._material.getTechniqueConfig(this._output,e),this._technique)}selectPipelines(){}_updateShadowState(e){e.shadowMappingEnabled!==this._material.params.shadowMappingEnabled&&this._material.setParameterValues({shadowMappingEnabled:e.shadowMappingEnabled})}_updateOccludeeState(e){e.hasOccludees!==this._material.params.sceneHasOcludees&&this._material.setParameterValues({sceneHasOcludees:e.hasOccludees})}ensureParameters(e){0!==this._output&&7!==this._output||(this._updateShadowState(e),this._updateOccludeeState(e)),this.updateParameters(e)}bind(e){this._technique.bindPass(this._material.params,e),this.bindTextures(this._technique.program)}beginSlot(e){return e===(this._material.params.transparent?this._material.params.writeDepth?5:8:3)}getPipelineState(e,t){return this._technique.getPipelineState(t)}}const Pt={textureId:void 0,initTextureTransparent:!1,isSchematic:!1,usePBR:!1,normalTextureId:void 0,vertexTangents:!1,occlusionTextureId:void 0,emissiveTextureId:void 0,metallicRoughnessTextureId:void 0,emissiveFactor:[0,0,0],mrrFactors:[0,1,.5],ambient:[.2,.2,.2],diffuse:[.8,.8,.8],externalColor:[1,1,1,1],colorMixMode:"multiply",opacity:1,layerOpacity:1,vertexColors:!1,symbolColors:!1,doubleSided:!1,doubleSidedType:"normal",cullFace:2,instanced:void 0,instancedDoublePrecision:!1,normals:"default",receiveSSAO:!0,receiveShadows:!0,castShadows:!0,shadowMappingEnabled:!1,verticalOffset:null,screenSizePerspective:null,slicePlaneEnabled:!1,sliceHighlightDisabled:!1,offsetTransparentBackfaces:!1,vvSizeEnabled:!1,vvSizeMinSize:[1,1,1],vvSizeMaxSize:[100,100,100],vvSizeOffset:[0,0,0],vvSizeFactor:[1,1,1],vvSizeValue:[1,1,1],vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],vvSymbolAnchor:[0,0,0],vvSymbolRotationMatrix:(0,n.c)(),transparent:!1,writeDepth:!0,textureAlphaMode:0,textureAlphaCutoff:he.F,textureAlphaPremultiplied:!1,sceneHasOcludees:!1,renderOccluded:1};class Ft{constructor(e,t){this.vertexBufferLayout=e,this.instanceBufferLayout=t}allocate(e){return this.vertexBufferLayout.createBuffer(e)}elementCount(e){return e.indices.get("position").length}write(e,t,r,i){!function(e,t,r,i,o,a){for(const n of t.fieldNames){const t=e.vertexAttributes.get(n),s=e.indices.get(n);if(t&&s)switch(n){case"position":{(0,A.hu)(3===t.size);const e=o.getField(n,h.ct);e&&Ye(s,t.data,r,e,a);break}case"normal":{(0,A.hu)(3===t.size);const e=o.getField(n,h.ct);e&&Qe(s,t.data,i,e,a);break}case"uv0":{(0,A.hu)(2===t.size);const e=o.getField(n,h.Eu);e&&Ze(s,t.data,e,a);break}case"color":{(0,A.hu)(3===t.size||4===t.size);const e=o.getField(n,h.mc);e&&et(s,t.data,t.size,e,a);break}case"symbolColor":{(0,A.hu)(3===t.size||4===t.size);const e=o.getField(n,h.mc);e&&et(s,t.data,t.size,e,a);break}case"tangent":{(0,A.hu)(4===t.size);const e=o.getField(n,h.ek);e&&Je(s,t.data,i,e,a);break}}}}(t,this.vertexBufferLayout,e.transformation,e.invTranspTransformation,r,i)}}const Ot=(0,d.c)(),Et=(0,d.c)(),Ht=(0,d.f)(0,0,1),Dt=(0,d.c)(),It=(0,d.c)(),zt=(0,d.c)(),Rt=(0,d.c)(),Lt=T.Z.getLogger("esri.views.3d.layers.graphics.objectResourceUtils");function Nt(e){throw new y.Z("",`Request for object resource failed: ${e}`)}function Bt(e){const t=e.params,r=t.topology;let i=!0;switch(t.vertexAttributes||(Lt.warn("Geometry must specify vertex attributes"),i=!1),t.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const e=t.faces;if(e){if(t.vertexAttributes)for(const r in t.vertexAttributes){const t=e[r];t&&t.values?(null!=t.valueType&&"UInt32"!==t.valueType&&(Lt.warn(`Unsupported indexed geometry indices type '${t.valueType}', only UInt32 is currently supported`),i=!1),null!=t.valuesPerElement&&1!==t.valuesPerElement&&(Lt.warn(`Unsupported indexed geometry values per element '${t.valuesPerElement}', only 1 is currently supported`),i=!1)):(Lt.warn(`Indexed geometry does not specify face indices for '${r}' attribute`),i=!1)}}else Lt.warn("Indexed geometries must specify faces"),i=!1;break}default:Lt.warn(`Unsupported topology '${r}'`),i=!1}e.params.material||(Lt.warn("Geometry requires material"),i=!1);const o=e.params.vertexAttributes;for(const e in o)o[e].values||(Lt.warn("Geometries with externally defined attributes are not yet supported"),i=!1);return i}function Vt(e){const t=(0,u.cS)();return e.forEach((e=>{const r=e.boundingInfo;(0,o.pC)(r)&&((0,u.pp)(t,r.getBBMin()),(0,u.pp)(t,r.getBBMax()))})),t}async function Ut(e,t){const r=[];for(const i in e){const a=e[i],n=a.images[0].data;if(!n){Lt.warn("Externally referenced texture data is not yet supported");continue}const s=a.encoding+";base64,"+n,l="/textureDefinitions/"+i,c={noUnpackFlip:!0,wrap:{s:10497,t:10497},preMultiplyAlpha:!0},d=(0,o.pC)(t)&&t.disableTextures?Promise.resolve(null):(0,S.t)(s,t);r.push(d.then((e=>({refId:l,image:e,params:c,alphaChannelUsage:"rgba"===a.channels?a.alphaChannelUsage||"transparency":"none"}))))}const i=await Promise.all(r),a={};for(const e of i)a[e.refId]=e;return a}function Gt(e){switch(e){case"mask":return 2;case"maskAndTransparency":return 3;case"none":return 1;case"transparency":default:return 0}}function Wt(e){const t=e.params;return{id:1,material:t.material,texture:t.texture,region:t.texture}}const qt=new M.G(1,2,"wosr");var kt=r(42997),$t=r(68364),jt=r(94234),Xt=r(92730);async function Zt(e,t){const r=Kt((0,i.pJ)(e));if("wosr"===r.fileType){const e=await(t.cache?t.cache.loadWOSR(r.url,t):async function(e,t){const r=await async function(e,t){const r=(0,o.pC)(t)&&t.streamDataRequester;if(r)return async function(e,t,r){const i=await(0,_.q6)(t.request(e,"json",r));if(!0===i.ok)return i.value;(0,w.r9)(i.error),Nt(i.error.details.url)}(e,r,t);const i=await(0,_.q6)((0,b.default)(e,(0,o.Wg)(t)));if(!0===i.ok)return i.value.data;(0,w.r9)(i.error),Nt(i.error)}(e,t);return{resource:r,textures:await Ut(r.textureDefinitions,t)}}(r.url,t)),i=function(e,t){const r=[],i=[],a=[],n=[],s=e.resource,l=M.G.parse(s.version||"1.0","wosr");qt.validate(l);const c=s.model.name,u=s.model.geometries,h=s.materialDefinitions,p=e.textures;let m=0;const f=new Map;for(let e=0;e<u.length;e++){const s=u[e];if(!Bt(s))continue;const l=Wt(s),c=s.params.vertexAttributes,v=[];for(const e in c){const t=c[e],r=t.values;v.push([e,{data:r,size:t.valuesPerElement,exclusive:!0}])}const g=[];if("PerAttributeArray"!==s.params.topology){const e=s.params.faces;for(const t in e)g.push([t,new Uint32Array(e[t].values)])}const x=p&&p[l.texture];if(x&&!f.has(l.texture)){const{image:e,params:t}=x,r=new de(e,t);n.push(r),f.set(l.texture,r)}const b=f.get(l.texture),_=b?b.id:void 0;let y=a[l.material]?a[l.material][l.texture]:null;if(!y){const e=h[l.material.substring(l.material.lastIndexOf("/")+1)].params;1===e.transparency&&(e.transparency=0);const r=x&&x.alphaChannelUsage,i=e.transparency>0||"transparency"===r||"maskAndTransparency"===r,n={ambient:(0,d.d)(e.diffuse),diffuse:(0,d.d)(e.diffuse),opacity:1-(e.transparency||0),transparent:i,textureAlphaMode:x?Gt(x.alphaChannelUsage):void 0,textureAlphaCutoff:.33,textureId:_,initTextureTransparent:!0,doubleSided:!0,cullFace:0,colorMixMode:e.externalColorMixMode||"tint",textureAlphaPremultiplied:!0};(0,o.pC)(t)&&t.materialParamsMixin&&Object.assign(n,t.materialParamsMixin),y=new Ct(n),a[l.material]||(a[l.material]={}),a[l.material][l.texture]=y}i.push(y);const T=new D(v,g);m+=g.position?g.position.length:0,r.push(T)}return{name:c,stageResources:{textures:n,materials:i,geometries:r},pivotOffset:s.model.pivotOffset,boundingBox:Vt(r),numberOfVertices:m,lodThreshold:null}}(e,t);return{lods:[i],referenceBoundingBox:i.boundingBox,isEsriSymbolResource:!1,isWosr:!0,remove:e.remove}}const a=await(t.cache?t.cache.loadGLTF(r.url,t,t.usePBR):(0,g.z)(new v.C(t.streamDataRequester),r.url,t,t.usePBR)),n=(0,o.U2)(a.model.meta,"ESRI_proxyEllipsoid");a.meta.isEsriSymbolResource&&(0,o.pC)(n)&&-1!==a.meta.uri.indexOf("/RealisticTrees/")&&function(e,t){for(let r=0;r<e.model.lods.length;++r){const i=e.model.lods[r];e.customMeta.esriTreeRendering=!0;for(const a of i.parts){const i=a.attributes.normal;if((0,o.Wi)(i))return;const n=a.attributes.position,u=n.count,p=(0,d.c)(),m=(0,d.c)(),v=(0,d.c)(),g=(0,f.gS)(h.mc,u),x=(0,f.gS)(h.ct,u),b=(0,s.a)((0,l.c)(),a.transform);for(let o=0;o<u;o++){n.getVec(o,m),i.getVec(o,p),(0,c.m)(m,m,a.transform),(0,c.f)(v,m,t.center),(0,c.E)(v,v,t.radius);const s=v[2],l=(0,c.l)(v),d=Math.min(.45+.55*l*l,1);(0,c.E)(v,v,t.radius),(0,c.m)(v,v,b),(0,c.n)(v,v),r+1!==e.model.lods.length&&e.model.lods.length>1&&(0,c.e)(v,v,p,s>-1?.2:Math.min(-4*s-3.8,1)),x.setVec(o,v),g.set(o,0,255*d),g.set(o,1,255*d),g.set(o,2,255*d),g.set(o,3,255)}a.attributes.normal=x,a.attributes.color=g}}}(a,n);const u=a.meta.isEsriSymbolResource?{usePBR:t.usePBR,isSchematic:!1,treeRendering:a.customMeta.esriTreeRendering,mrrFactors:[0,1,.2]}:{usePBR:t.usePBR,isSchematic:!1,mrrFactors:[0,1,.5]},p={...t.materialParamsMixin,treeRendering:a.customMeta.esriTreeRendering};if(null!=r.specifiedLodIndex){const e=Yt(a,u,p,r.specifiedLodIndex);let t=e[0].boundingBox;return 0!==r.specifiedLodIndex&&(t=Yt(a,u,p,0)[0].boundingBox),{lods:e,referenceBoundingBox:t,isEsriSymbolResource:a.meta.isEsriSymbolResource,isWosr:!1,remove:a.remove}}const m=Yt(a,u,p);return{lods:m,referenceBoundingBox:m[0].boundingBox,isEsriSymbolResource:a.meta.isEsriSymbolResource,isWosr:!1,remove:a.remove}}function Kt(e){const t=e.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return t?{fileType:"gltf",url:t[1],specifiedLodIndex:null!=t[4]?Number(t[4]):null}:e.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:e,specifiedLodIndex:null}:{fileType:"unknown",url:e,specifiedLodIndex:null}}function Yt(e,t,r,i){const s=e.model,l=(0,n.c)(),c=new Array,d=new Map,v=new Map;return s.lods.forEach(((e,n)=>{if(void 0!==i&&n!==i)return;const g={name:e.name,stageResources:{textures:new Array,materials:new Array,geometries:new Array},lodThreshold:(0,o.pC)(e.lodThreshold)?e.lodThreshold:null,pivotOffset:[0,0,0],numberOfVertices:0,boundingBox:(0,u.cS)()};c.push(g),e.parts.forEach((e=>{const i=e.material+(e.attributes.normal?"_normal":"")+(e.attributes.color?"_color":"")+(e.attributes.texCoord0?"_texCoord0":"")+(e.attributes.tangent?"_tangent":""),n=s.materials.get(e.material),c=(0,o.pC)(e.attributes.texCoord0),b=(0,o.pC)(e.attributes.normal);if(!d.has(i)){if(c){if((0,o.pC)(n.textureColor)&&!v.has(n.textureColor)){const e=s.textures.get(n.textureColor),t={...e.parameters,preMultiplyAlpha:!0};v.set(n.textureColor,new de(e.data,t))}if((0,o.pC)(n.textureNormal)&&!v.has(n.textureNormal)){const e=s.textures.get(n.textureNormal),t={...e.parameters,preMultiplyAlpha:!0};v.set(n.textureNormal,new de(e.data,t))}if((0,o.pC)(n.textureOcclusion)&&!v.has(n.textureOcclusion)){const e=s.textures.get(n.textureOcclusion),t={...e.parameters,preMultiplyAlpha:!0};v.set(n.textureOcclusion,new de(e.data,t))}if((0,o.pC)(n.textureEmissive)&&!v.has(n.textureEmissive)){const e=s.textures.get(n.textureEmissive),t={...e.parameters,preMultiplyAlpha:!0};v.set(n.textureEmissive,new de(e.data,t))}if((0,o.pC)(n.textureMetallicRoughness)&&!v.has(n.textureMetallicRoughness)){const e=s.textures.get(n.textureMetallicRoughness),t={...e.parameters,preMultiplyAlpha:!0};v.set(n.textureMetallicRoughness,new de(e.data,t))}}const a=n.color[0]**(1/kt.K),l=n.color[1]**(1/kt.K),u=n.color[2]**(1/kt.K),h=n.emissiveFactor[0]**(1/kt.K),p=n.emissiveFactor[1]**(1/kt.K),m=n.emissiveFactor[2]**(1/kt.K);d.set(i,new Ct({...t,transparent:"BLEND"===n.alphaMode,textureAlphaMode:Qt(n.alphaMode),textureAlphaCutoff:n.alphaCutoff,diffuse:[a,l,u],ambient:[a,l,u],opacity:n.opacity,doubleSided:n.doubleSided,doubleSidedType:"winding-order",cullFace:n.doubleSided?0:2,vertexColors:!!e.attributes.color,vertexTangents:!!e.attributes.tangent,normals:b?"default":"screenDerivative",castShadows:!0,receiveSSAO:!0,textureId:(0,o.pC)(n.textureColor)&&c?v.get(n.textureColor).id:void 0,colorMixMode:n.colorMixMode,normalTextureId:(0,o.pC)(n.textureNormal)&&c?v.get(n.textureNormal).id:void 0,textureAlphaPremultiplied:!0,occlusionTextureId:(0,o.pC)(n.textureOcclusion)&&c?v.get(n.textureOcclusion).id:void 0,emissiveTextureId:(0,o.pC)(n.textureEmissive)&&c?v.get(n.textureEmissive).id:void 0,metallicRoughnessTextureId:(0,o.pC)(n.textureMetallicRoughness)&&c?v.get(n.textureMetallicRoughness).id:void 0,emissiveFactor:[h,p,m],mrrFactors:[n.metallicFactor,n.roughnessFactor,t.mrrFactors[2]],isSchematic:!1,...r}))}const _=function(e,t){switch(t){case 4:return(0,x.nh)(e);case 5:return(0,x.DA)(e);case 6:return(0,x.jX)(e)}}(e.indices||e.attributes.position.count,e.primitiveType),y=e.attributes.position.count,T=(0,f.gS)(h.ct,y);(0,p.t)(T,e.attributes.position,e.transform);const w=[["position",{data:T.typedBuffer,size:T.elementCount,exclusive:!0}]],M=[["position",_]];if((0,o.pC)(e.attributes.normal)){const t=(0,f.gS)(h.ct,y);(0,a.a)(l,e.transform),(0,p.a)(t,e.attributes.normal,l),w.push(["normal",{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),M.push(["normal",_])}if((0,o.pC)(e.attributes.tangent)){const t=(0,f.gS)(h.ek,y);(0,a.a)(l,e.transform),(0,m.t)(t,e.attributes.tangent,l),w.push(["tangent",{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),M.push(["tangent",_])}if((0,o.pC)(e.attributes.texCoord0)){const t=(0,f.gS)(h.Eu,y);(0,$t.n)(t,e.attributes.texCoord0),w.push(["uv0",{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),M.push(["uv0",_])}if((0,o.pC)(e.attributes.color)){const t=(0,f.gS)(h.mc,y);if(4===e.attributes.color.elementCount)e.attributes.color instanceof h.ek?(0,m.s)(t,e.attributes.color,255):e.attributes.color instanceof h.mc?(0,jt.c)(t,e.attributes.color):e.attributes.color instanceof h.v6&&(0,m.s)(t,e.attributes.color,1/256);else{(0,jt.f)(t,255,255,255,255);const r=new h.ne(t.buffer,0,4);e.attributes.color instanceof h.ct?(0,p.s)(r,e.attributes.color,255):e.attributes.color instanceof h.ne?(0,Xt.c)(r,e.attributes.color):e.attributes.color instanceof h.mw&&(0,p.s)(r,e.attributes.color,1/256)}w.push(["color",{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),M.push(["color",_])}const S=new D(w,M);g.stageResources.geometries.push(S),g.stageResources.materials.push(d.get(i)),c&&((0,o.pC)(n.textureColor)&&g.stageResources.textures.push(v.get(n.textureColor)),(0,o.pC)(n.textureNormal)&&g.stageResources.textures.push(v.get(n.textureNormal)),(0,o.pC)(n.textureOcclusion)&&g.stageResources.textures.push(v.get(n.textureOcclusion)),(0,o.pC)(n.textureEmissive)&&g.stageResources.textures.push(v.get(n.textureEmissive)),(0,o.pC)(n.textureMetallicRoughness)&&g.stageResources.textures.push(v.get(n.textureMetallicRoughness))),g.numberOfVertices+=y;const C=S.boundingInfo;(0,o.pC)(C)&&((0,u.pp)(g.boundingBox,C.getBBMin()),(0,u.pp)(g.boundingBox,C.getBBMax()))}))})),c}function Qt(e){switch(e){case"BLEND":return 0;case"MASK":return 2;case"OPAQUE":return 1;default:return 0}}},86363:(e,t,r)=>{r.d(t,{U$:()=>s});var i=r(38747),o=r(34714);class a{constructor(e,t){this.layout=e,this.buffer="number"==typeof t?new ArrayBuffer(t*e.stride):t;for(const t of e.fieldNames){const r=e.fields.get(t);this[t]=new r.constructor(this.buffer,r.offset,this.stride)}}get stride(){return this.layout.stride}get count(){return this.buffer.byteLength/this.stride}get byteLength(){return this.buffer.byteLength}getField(e,t){const r=this[e];return r&&r.elementCount===t.ElementCount&&r.elementType===t.ElementType?r:null}slice(e,t){return new a(this.layout,this.buffer.slice(e*this.stride,t*this.stride))}copyFrom(e,t,r,i){const o=this.stride;if(o%4==0){const a=new Uint32Array(e.buffer,t*o,i*o/4);new Uint32Array(this.buffer,r*o,i*o/4).set(a)}else{const a=new Uint8Array(e.buffer,t*o,i*o);new Uint8Array(this.buffer,r*o,i*o).set(a)}}}class n{constructor(){this.stride=0,this.fields=new Map,this.fieldNames=[]}vec2f(e,t){return this.appendField(e,i.Eu,t),this}vec2f64(e,t){return this.appendField(e,i.q6,t),this}vec3f(e,t){return this.appendField(e,i.ct,t),this}vec3f64(e,t){return this.appendField(e,i.fP,t),this}vec4f(e,t){return this.appendField(e,i.ek,t),this}vec4f64(e,t){return this.appendField(e,i.Cd,t),this}mat3f(e,t){return this.appendField(e,i.gK,t),this}mat3f64(e,t){return this.appendField(e,i.ey,t),this}mat4f(e,t){return this.appendField(e,i.bj,t),this}mat4f64(e,t){return this.appendField(e,i.O1,t),this}vec4u8(e,t){return this.appendField(e,i.mc,t),this}f32(e,t){return this.appendField(e,i.ly,t),this}f64(e,t){return this.appendField(e,i.oS,t),this}u8(e,t){return this.appendField(e,i.D_,t),this}u16(e,t){return this.appendField(e,i.av,t),this}i8(e,t){return this.appendField(e,i.Hz,t),this}vec2i8(e,t){return this.appendField(e,i.Vs,t),this}vec2i16(e,t){return this.appendField(e,i.or,t),this}vec2u8(e,t){return this.appendField(e,i.xA,t),this}vec4u16(e,t){return this.appendField(e,i.v6,t),this}u32(e,t){return this.appendField(e,i.Nu,t),this}appendField(e,t,r){const i=t.ElementCount*(0,o.n1)(t.ElementType),a=this.stride;this.fields.set(e,{size:i,constructor:t,offset:a,optional:r}),this.stride+=i,this.fieldNames.push(e)}alignTo(e){return this.stride=Math.floor((this.stride+e-1)/e)*e,this}hasField(e){return this.fieldNames.indexOf(e)>=0}createBuffer(e){return new a(this,e)}createView(e){return new a(this,e)}clone(){const e=new n;return e.stride=this.stride,e.fields=new Map,this.fields.forEach(((t,r)=>e.fields.set(r,t))),e.fieldNames=this.fieldNames.slice(),e.BufferType=this.BufferType,e}}function s(){return new n}},56031:(e,t,r)=>{r.d(t,{q:()=>o});var i=r(45616);function o(e,t){0===t.output&&t.receiveShadows?(e.varyings.add("linearDepth","float"),e.vertex.code.add(i.H`void forwardLinearDepth() { linearDepth = gl_Position.w; }`)):1===t.output||3===t.output?(e.varyings.add("linearDepth","float"),e.vertex.uniforms.add("cameraNearFar","vec2"),e.vertex.code.add(i.H`void forwardLinearDepth() {
linearDepth = (-position_view().z - cameraNearFar[0]) / (cameraNearFar[1] - cameraNearFar[0]);
}`)):e.vertex.code.add(i.H`void forwardLinearDepth() {}`)}},12130:(e,t,r)=>{r.d(t,{w:()=>o});var i=r(45616);function o(e){e.vertex.code.add(i.H`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}},59121:(e,t,r)=>{r.d(t,{p2:()=>s,Vv:()=>l});var i=r(43388),o=r(55545),a=r(86591),n=r(45616);function s(e,t){if(t.slicePlaneEnabled){e.extensions.add("GL_OES_standard_derivatives"),t.sliceEnabledForVertexPrograms&&(e.vertex.uniforms.add("slicePlaneOrigin","vec3"),e.vertex.uniforms.add("slicePlaneBasis1","vec3"),e.vertex.uniforms.add("slicePlaneBasis2","vec3")),e.fragment.uniforms.add("slicePlaneOrigin","vec3"),e.fragment.uniforms.add("slicePlaneBasis1","vec3"),e.fragment.uniforms.add("slicePlaneBasis2","vec3");const r=n.H`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
#define rejectBySlice(_pos_) sliceByPlane(_pos_)
#define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }`,i=n.H`vec4 applySliceHighlight(vec4 color, vec3 pos) {
SliceFactors factors = calculateSliceFactors(pos);
if (sliceByFactors(factors)) {
return color;
}
const float HIGHLIGHT_WIDTH = 1.0;
const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);
factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);
factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);
factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);
factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);
factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);
float highlightFactor = (1.0 - step(0.5, factors.front))
* (1.0 - step(0.5, factors.side0))
* (1.0 - step(0.5, factors.side1))
* (1.0 - step(0.5, factors.side2))
* (1.0 - step(0.5, factors.side3));
return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);
}`,o=t.sliceHighlightDisabled?n.H`#define highlightSlice(_color_, _pos_) (_color_)`:n.H`
        ${i}
        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))
      `;t.sliceEnabledForVertexPrograms&&e.vertex.code.add(r),e.fragment.code.add(r),e.fragment.code.add(o)}else{const r=n.H`#define rejectBySlice(_pos_) false
#define discardBySlice(_pos_) {}
#define highlightSlice(_color_, _pos_) (_color_)`;t.sliceEnabledForVertexPrograms&&e.vertex.code.add(r),e.fragment.code.add(r)}}function l(e,t,r,n){t.slicePlaneEnabled&&((0,i.pC)(r)?(n?((0,o.f)(c,r.origin,n),e.setUniform3fv("slicePlaneOrigin",c)):e.setUniform3fv("slicePlaneOrigin",r.origin),e.setUniform3fv("slicePlaneBasis1",r.basis1),e.setUniform3fv("slicePlaneBasis2",r.basis2)):(e.setUniform3fv("slicePlaneBasis1",a.Z),e.setUniform3fv("slicePlaneBasis2",a.Z),e.setUniform3fv("slicePlaneOrigin",a.Z)))}const c=(0,a.c)()},47413:(e,t,r)=>{r.d(t,{w:()=>o});var i=r(45616);function o(e,t){t.linearDepth?e.vertex.code.add(i.H`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = (-eye.z - nearFar[0]) / (nearFar[1] - nearFar[0]) ;
return proj * eye;
}`):e.vertex.code.add(i.H`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}},62907:(e,t,r)=>{r.d(t,{f:()=>l});var i,o=r(86591),a=r(77720),n=r(45616),s=r(66762);function l(e,t){t.instanced&&t.instancedDoublePrecision&&(e.attributes.add("modelOriginHi","vec3"),e.attributes.add("modelOriginLo","vec3"),e.attributes.add("model","mat3"),e.attributes.add("modelNormal","mat3")),t.instancedDoublePrecision&&(e.vertex.include(a.$,t),e.vertex.uniforms.add("viewOriginHi","vec3"),e.vertex.uniforms.add("viewOriginLo","vec3"));const r=[n.H`
    vec3 calculateVPos() {
      ${t.instancedDoublePrecision?"return model * localPosition().xyz;":"return localPosition().xyz;"}
    }
    `,n.H`
    vec3 subtractOrigin(vec3 _pos) {
      ${t.instancedDoublePrecision?n.H`
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -modelOriginHi, -modelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `,n.H`
    vec3 dpNormal(vec4 _normal) {
      ${t.instancedDoublePrecision?"return normalize(modelNormal * _normal.xyz);":"return normalize(_normal.xyz);"}
    }
    `,n.H`
    vec3 dpNormalView(vec4 _normal) {
      ${t.instancedDoublePrecision?"return normalize((viewNormal * vec4(modelNormal * _normal.xyz, 1.0)).xyz);":"return normalize((viewNormal * _normal).xyz);"}
    }
    `,t.vertexTangents?n.H`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${t.instancedDoublePrecision?"return vec4(modelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}

    }
    `:n.H``];e.vertex.code.add(r[0]),e.vertex.code.add(r[1]),e.vertex.code.add(r[2]),2===t.output&&e.vertex.code.add(r[3]),e.vertex.code.add(r[4])}(i=l||(l={})).Uniforms=class{},i.bindCustomOrigin=function(e,t){(0,s.po)(t,c,d,3),e.setUniform3fv("viewOriginHi",c),e.setUniform3fv("viewOriginLo",d)};const c=(0,o.c)(),d=(0,o.c)()},83620:(e,t,r)=>{r.d(t,{O:()=>a});var i=r(45616);function o(e){const t=i.H`vec3 decodeNormal(vec2 f) {
float z = 1.0 - abs(f.x) - abs(f.y);
return vec3(f + sign(f) * min(z, 0.0), z);
}`;e.fragment.code.add(t),e.vertex.code.add(t)}function a(e,t){0===t.normalType&&(e.attributes.add("normal","vec3"),e.vertex.code.add(i.H`vec3 normalModel() {
return normal;
}`)),1===t.normalType&&(e.include(o),e.attributes.add("normalCompressed","vec2"),e.vertex.code.add(i.H`vec3 normalModel() {
return decodeNormal(normalCompressed);
}`)),3===t.normalType&&(e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(i.H`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`))}},18219:(e,t,r)=>{r.d(t,{f:()=>o});var i=r(45616);function o(e){e.attributes.add("position","vec3"),e.vertex.code.add(i.H`vec3 positionModel() { return position; }`)}},36589:(e,t,r)=>{r.d(t,{R:()=>a});var i=r(45616);function o(e){e.vertex.code.add(i.H`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${i.H.int(1)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${i.H.int(3)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${i.H.int(4)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${i.H.int(1)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}function a(e,t){t.symbolColor?(e.include(o),e.attributes.add("symbolColor","vec4"),e.varyings.add("colorMixMode","mediump float")):e.fragment.uniforms.add("colorMixMode","int"),t.symbolColor?e.vertex.code.add(i.H`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`):e.vertex.code.add(i.H`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`)}},53574:(e,t,r)=>{r.d(t,{D:()=>o});var i=r(45616);function o(e,t){1===t.attributeTextureCoordinates&&(e.attributes.add("uv0","vec2"),e.varyings.add("vuv0","vec2"),e.vertex.code.add(i.H`void forwardTextureCoordinates() {
vuv0 = uv0;
}`)),2===t.attributeTextureCoordinates&&(e.attributes.add("uv0","vec2"),e.varyings.add("vuv0","vec2"),e.attributes.add("uvRegion","vec4"),e.varyings.add("vuvRegion","vec4"),e.vertex.code.add(i.H`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`)),0===t.attributeTextureCoordinates&&e.vertex.code.add(i.H`void forwardTextureCoordinates() {}`)}},4944:(e,t,r)=>{r.d(t,{c:()=>o});var i=r(45616);function o(e,t){t.attributeColor?(e.attributes.add("color","vec4"),e.varyings.add("vColor","vec4"),e.vertex.code.add(i.H`void forwardVertexColor() { vColor = color; }`),e.vertex.code.add(i.H`void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }`)):e.vertex.code.add(i.H`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}},48242:(e,t,r)=>{r.d(t,{B:()=>h});var i,o=r(83620),a=r(47950),n=r(67829),s=r(86591),l=r(18219),c=r(77720),d=r(45616);function u(e,t){e.include(l.f),e.vertex.include(c.$,t),e.varyings.add("vPositionWorldCameraRelative","vec3"),e.varyings.add("vPosition_view","vec3"),e.vertex.uniforms.add("uTransform_WorldFromModel_RS","mat3"),e.vertex.uniforms.add("uTransform_WorldFromModel_TH","vec3"),e.vertex.uniforms.add("uTransform_WorldFromModel_TL","vec3"),e.vertex.uniforms.add("uTransform_WorldFromView_TH","vec3"),e.vertex.uniforms.add("uTransform_WorldFromView_TL","vec3"),e.vertex.uniforms.add("uTransform_ViewFromCameraRelative_RS","mat3"),e.vertex.uniforms.add("uTransform_ProjFromView","mat4"),e.vertex.code.add(d.H`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = uTransform_WorldFromModel_RS * positionModel();
vec3 transform_CameraRelativeFromModel = dpAdd(
uTransform_WorldFromModel_TL,
uTransform_WorldFromModel_TH,
-uTransform_WorldFromView_TL,
-uTransform_WorldFromView_TH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}
vec3 position_view() {
return uTransform_ViewFromCameraRelative_RS * positionWorldCameraRelative();
}
void forwardPosition() {
vPositionWorldCameraRelative = positionWorldCameraRelative();
vPosition_view = position_view();
gl_Position = uTransform_ProjFromView * vec4(vPosition_view, 1.0);
}
vec3 positionWorld() {
return uTransform_WorldFromView_TL + vPositionWorldCameraRelative;
}`),e.fragment.uniforms.add("uTransform_WorldFromView_TL","vec3"),e.fragment.code.add(d.H`vec3 positionWorld() {
return uTransform_WorldFromView_TL + vPositionWorldCameraRelative;
}`)}function h(e,t){0===t.normalType||1===t.normalType?(e.include(o.O,t),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("vNormalView","vec3"),e.vertex.uniforms.add("uTransformNormal_GlobalFromModel","mat3"),e.vertex.uniforms.add("uTransformNormal_ViewFromGlobal","mat3"),e.vertex.code.add(d.H`void forwardNormal() {
vNormalWorld = uTransformNormal_GlobalFromModel * normalModel();
vNormalView = uTransformNormal_ViewFromGlobal * vNormalWorld;
}`)):2===t.normalType?(e.include(u,t),e.varyings.add("vNormalWorld","vec3"),e.vertex.code.add(d.H`
    void forwardNormal() {
      vNormalWorld = ${1===t.viewingMode?d.H`normalize(vPositionWorldCameraRelative);`:d.H`vec3(0.0, 0.0, 1.0);`}
    }
    `)):e.vertex.code.add(d.H`void forwardNormal() {}`)}(i=u||(u={})).ModelTransform=class{constructor(){this.worldFromModel_RS=(0,a.c)(),this.worldFromModel_TH=(0,s.c)(),this.worldFromModel_TL=(0,s.c)()}},i.ViewProjectionTransform=class{constructor(){this.worldFromView_TH=(0,s.c)(),this.worldFromView_TL=(0,s.c)(),this.viewFromCameraRelative_RS=(0,a.c)(),this.projFromView=(0,n.c)()}},i.bindModelTransform=function(e,t){e.setUniformMatrix3fv("uTransform_WorldFromModel_RS",t.worldFromModel_RS),e.setUniform3fv("uTransform_WorldFromModel_TH",t.worldFromModel_TH),e.setUniform3fv("uTransform_WorldFromModel_TL",t.worldFromModel_TL)},i.bindViewProjTransform=function(e,t){e.setUniform3fv("uTransform_WorldFromView_TH",t.worldFromView_TH),e.setUniform3fv("uTransform_WorldFromView_TL",t.worldFromView_TL),e.setUniformMatrix4fv("uTransform_ProjFromView",t.projFromView),e.setUniformMatrix3fv("uTransform_ViewFromCameraRelative_RS",t.viewFromCameraRelative_RS)},(h||(h={})).bindUniforms=function(e,t){e.setUniformMatrix4fv("viewNormal",t)}},42929:(e,t,r)=>{r.d(t,{i:()=>n});var i=r(53574),o=r(45616);function a(e){e.extensions.add("GL_EXT_shader_texture_lod"),e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(o.H`#ifndef GL_EXT_shader_texture_lod
float calcMipMapLevel(const vec2 ddx, const vec2 ddy) {
float deltaMaxSqr = max(dot(ddx, ddx), dot(ddy, ddy));
return max(0.0, 0.5 * log2(deltaMaxSqr));
}
#endif
vec4 textureAtlasLookup(sampler2D texture, vec2 textureSize, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
#ifdef GL_EXT_shader_texture_lod
return texture2DGradEXT(texture, uvAtlas, dUVdx, dUVdy);
#else
vec2 dUVdxAuto = dFdx(uvAtlas);
vec2 dUVdyAuto = dFdy(uvAtlas);
float mipMapLevel = calcMipMapLevel(dUVdx * textureSize, dUVdy * textureSize);
float autoMipMapLevel = calcMipMapLevel(dUVdxAuto * textureSize, dUVdyAuto * textureSize);
return texture2D(texture, uvAtlas, mipMapLevel - autoMipMapLevel);
#endif
}`)}function n(e,t){e.include(i.D,t),e.fragment.code.add(o.H`
  struct TextureLookupParameter {
    vec2 uv;
    ${t.supportsTextureAtlas?"vec2 size;":""}
  } vtc;
  `),1===t.attributeTextureCoordinates&&e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, TextureLookupParameter params) {
return texture2D(tex, params.uv);
}`),2===t.attributeTextureCoordinates&&(e.include(a),e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, TextureLookupParameter params) {
return textureAtlasLookup(tex, params.size, params.uv, vuvRegion);
}`))}},16364:(e,t,r)=>{r.d(t,{LC:()=>a,Mo:()=>n});var i=r(45616);function o(e){e.vertex.code.add(i.H`float screenSizePerspectiveMinSize(float size, vec4 factor) {
float nonZeroSize = 1.0 - step(size, 0.0);
return (
factor.z * (
1.0 +
nonZeroSize *
2.0 * factor.w / (
size + (1.0 - nonZeroSize)
)
)
);
}`),e.vertex.code.add(i.H`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(i.H`vec4 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec4 params) {
return vec4(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z,
params.w
);
}`),e.vertex.code.add(i.H`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec4 factor) {
return max(mix(size * factor.x, size, factor.y), screenSizePerspectiveMinSize(size, factor));
}`),e.vertex.code.add(i.H`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(i.H`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec4 factor) {
return mix(size * clamp(factor.x, screenSizePerspectiveMinSize(size.y, factor) / size.y, 1.0), size, factor.y);
}`),e.vertex.code.add(i.H`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function a(e,t){const r=e.vertex.code;t.verticalOffsetEnabled?(e.vertex.uniforms.add("verticalOffset","vec4"),t.screenSizePerspectiveEnabled&&(e.include(o),e.vertex.uniforms.add("screenSizePerspectiveAlignment","vec4")),r.add(i.H`
    vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
      float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
      ${1===t.viewingMode?i.H`vec3 worldNormal = normalize(worldPos + localOrigin);`:i.H`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
      ${t.screenSizePerspectiveEnabled?i.H`
          float cosAngle = dot(worldNormal, normalize(worldPos - camPos));
          float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:i.H`
          float verticalOffsetScreenHeight = verticalOffset.x;`}
      // Screen sized offset in world space, used for example for line callouts
      float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
      return worldNormal * worldOffset;
    }

    vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
      return worldPos + calculateVerticalOffset(worldPos, localOrigin);
    }
    `)):r.add(i.H`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}function n(e,t,r){if(!t.verticalOffset)return;const i=s(t.verticalOffset,r.camera.fovY,r.camera.fullViewport[3]),o=r.camera.pixelRatio||1;e.setUniform4f("verticalOffset",i.screenLength*o,i.perDistance,i.minWorldLength,i.maxWorldLength)}function s(e,t,r,i=l){return i.screenLength=e.screenLength,i.perDistance=Math.tan(.5*t)/(.5*r),i.minWorldLength=e.minWorldLength,i.maxWorldLength=e.maxWorldLength,i}r(11110);const l={screenLength:0,perDistance:0,minWorldLength:0,maxWorldLength:0}},58002:(e,t,r)=>{r.d(t,{s:()=>m});var i=r(59121),o=r(47413),a=r(83620),n=r(53574),s=r(48242),l=r(81800),c=r(45616);function d(e,t){e.fragment.include(l.n),3===t.output?(e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(c.H`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 2.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
float result = depth + SLOPE_SCALE * m + BIAS;
return clamp(result, .0, .999999);
}
void outputDepth(float _linearDepth) {
gl_FragColor = float2rgba(_calculateFragDepth(_linearDepth));
}`)):1===t.output&&e.fragment.code.add(c.H`void outputDepth(float _linearDepth) {
gl_FragColor = float2rgba(_linearDepth);
}`)}var u=r(26698),h=r(23969),p=r(46918);function m(e,t){const r=e.vertex.code,l=e.fragment.code;1!==t.output&&3!==t.output||(e.include(o.w,{linearDepth:!0}),e.include(n.D,t),e.include(h.kl,t),e.include(d,t),e.include(i.p2,t),e.vertex.uniforms.add("cameraNearFar","vec2"),e.varyings.add("depth","float"),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),r.add(c.H`void main(void) {
vpos = calculateVPos();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, cameraNearFar, depth);
forwardTextureCoordinates();
}`),e.include(p.sj,t),l.add(c.H`
      void main(void) {
        discardBySlice(vpos);
        ${t.hasColorTexture?c.H`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}
        outputDepth(depth);
      }
    `)),2===t.output&&(e.include(o.w,{linearDepth:!1}),e.include(a.O,t),e.include(s.B,t),e.include(n.D,t),e.include(h.kl,t),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),e.vertex.uniforms.add("viewNormal","mat4"),e.varyings.add("vPositionView","vec3"),r.add(c.H`
      void main(void) {
        vpos = calculateVPos();
        vpos = subtractOrigin(vpos);
        ${0===t.normalType?c.H`
        vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:""}
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();
      }
    `),e.include(i.p2,t),e.include(p.sj,t),l.add(c.H`
      void main() {
        discardBySlice(vpos);
        ${t.hasColorTexture?c.H`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}

        ${3===t.normalType?c.H`
            vec3 normal = screenDerivativeNormal(vPositionView);`:c.H`
            vec3 normal = normalize(vNormalWorld);
            if (gl_FrontFacing == false) normal = -normal;`}
        gl_FragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);
      }
    `)),4===t.output&&(e.include(o.w,{linearDepth:!1}),e.include(n.D,t),e.include(h.kl,t),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),r.add(c.H`void main(void) {
vpos = calculateVPos();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),e.include(i.p2,t),e.include(p.sj,t),e.include(u.bA),l.add(c.H`
      void main() {
        discardBySlice(vpos);
        ${t.hasColorTexture?c.H`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}
        outputHighlight();
      }
    `))}},26698:(e,t,r)=>{r.d(t,{bA:()=>s,wW:()=>l});var i=r(45494),o=r(45616);const a=(0,i.f)(1,1,0,1),n=(0,i.f)(1,0,1,1);function s(e){e.fragment.uniforms.add("depthTex","sampler2D"),e.fragment.uniforms.add("highlightViewportPixelSz","vec4"),e.fragment.constants.add("occludedHighlightFlag","vec4",a).add("unoccludedHighlightFlag","vec4",n),e.fragment.code.add(o.H`void outputHighlight() {
vec4 fragCoord = gl_FragCoord;
float sceneDepth = texture2D(depthTex, (fragCoord.xy - highlightViewportPixelSz.xy) * highlightViewportPixelSz.zw).r;
if (fragCoord.z > sceneDepth + 5e-7) {
gl_FragColor = occludedHighlightFlag;
}
else {
gl_FragColor = unoccludedHighlightFlag;
}
}`)}function l(e,t){e.bindTexture(t.highlightDepthTexture,"depthTex"),e.setUniform4f("highlightViewportPixelSz",0,0,t.inverseViewport[0],t.inverseViewport[1])}},27464:(e,t,r)=>{r.d(t,{S:()=>a});var i=r(81800),o=r(45616);function a(e){e.include(i.n),e.code.add(o.H`float linearDepthFromFloat(float depth, vec2 nearFar) {
return -(depth * (nearFar[1] - nearFar[0]) + nearFar[0]);
}
float linearDepthFromTexture(sampler2D depthTex, vec2 uv, vec2 nearFar) {
return linearDepthFromFloat(rgba2float(texture2D(depthTex, uv)), nearFar);
}`)}},68145:(e,t,r)=>{r.d(t,{Q:()=>a});var i=r(42929),o=r(45616);function a(e,t){const r=e.fragment;t.vertexTangents?(e.attributes.add("tangent","vec4"),e.varyings.add("vTangent","vec4"),2===t.doubleSidedMode?r.code.add(o.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):r.code.add(o.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):(e.extensions.add("GL_OES_standard_derivatives"),r.code.add(o.H`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`)),0!==t.attributeTextureCoordinates&&(e.include(i.i,t),r.uniforms.add("normalTexture","sampler2D"),r.uniforms.add("normalTextureSize","vec2"),r.code.add(o.H`
    vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
      vtc.uv = uv;
      ${t.supportsTextureAtlas?"vtc.size = normalTextureSize;":""}
      vec3 rawNormal = textureLookup(normalTexture, vtc).rgb * 2.0 - 1.0;
      return tangentSpace * rawNormal;
    }
  `))}},12951:(e,t,r)=>{r.d(t,{K:()=>o});var i=r(45616);function o(e,t){const r=e.fragment;t.receiveAmbientOcclusion?(r.uniforms.add("ssaoTex","sampler2D"),r.uniforms.add("viewportPixelSz","vec4"),r.code.add(i.H`float evaluateAmbientOcclusion() {
return 1.0 - texture2D(ssaoTex, (gl_FragCoord.xy - viewportPixelSz.xy) * viewportPixelSz.zw).a;
}
float evaluateAmbientOcclusionInverse() {
float ssao = texture2D(ssaoTex, (gl_FragCoord.xy - viewportPixelSz.xy) * viewportPixelSz.zw).a;
return viewportPixelSz.z < 0.0 ? 1.0 : ssao;
}`)):r.code.add(i.H`float evaluateAmbientOcclusion() { return 0.0; }
float evaluateAmbientOcclusionInverse() { return 1.0; }`)}},83988:(e,t,r)=>{r.d(t,{X:()=>d});var i=r(45616);function o(e,t){const r=e.fragment,o=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===o?(r.uniforms.add("lightingAmbientSH0","vec3"),r.code.add(i.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===o?(r.uniforms.add("lightingAmbientSH_R","vec4"),r.uniforms.add("lightingAmbientSH_G","vec4"),r.uniforms.add("lightingAmbientSH_B","vec4"),r.code.add(i.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===o&&(r.uniforms.add("lightingAmbientSH0","vec3"),r.uniforms.add("lightingAmbientSH_R1","vec4"),r.uniforms.add("lightingAmbientSH_G1","vec4"),r.uniforms.add("lightingAmbientSH_B1","vec4"),r.uniforms.add("lightingAmbientSH_R2","vec4"),r.uniforms.add("lightingAmbientSH_G2","vec4"),r.uniforms.add("lightingAmbientSH_B2","vec4"),r.code.add(i.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),1!==t.pbrMode&&2!==t.pbrMode||r.code.add(i.H`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}var a=r(12951);function n(e){const t=e.fragment;t.uniforms.add("lightingMainDirection","vec3"),t.uniforms.add("lightingMainIntensity","vec3"),t.uniforms.add("lightingFixedFactor","float"),t.code.add(i.H`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, lightingMainDirection), 0.0, 1.0);
dotVal = mix(dotVal, 1.0, lightingFixedFactor);
return lightingMainIntensity * ((1.0 - shadowing) * dotVal);
}`)}var s=r(79107),l=r(56222),c=r(68264);function d(e,t){const r=e.fragment;e.include(n),e.include(a.K,t),0!==t.pbrMode&&e.include(s.T,t),e.include(o,t),t.receiveShadows&&e.include(c.hX,t),r.uniforms.add("lightingGlobalFactor","float"),r.uniforms.add("ambientBoostFactor","float"),e.include(l.e),r.code.add(i.H`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${0===t.pbrMode?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),r.code.add(i.H`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${1===t.viewingMode?i.H`normalize(vPosWorld)`:i.H`vec3(0.0, 0.0, 1.0)`}, lightingMainDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),r.code.add(i.H`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * lightingMainIntensity;
}`),0===t.pbrMode||4===t.pbrMode?r.code.add(i.H`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight)
{
vec3 mainLighting = evaluateMainLighting(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`):1!==t.pbrMode&&2!==t.pbrMode||(r.code.add(i.H`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 mainLightDirection = lightingMainDirection;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),r.code.add(i.H`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),r.code.add(i.H`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0)? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = abs(dot(normal, ambientDir));
vec3 mainLightIrradianceComponent = inputs.NdotL * (1.0 - shadow) * lightingMainIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * lightingMainIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),r.code.add(i.H`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
vec3 mainLightRadianceComponent = normalDistribution(inputs.NdotH, inputs.roughness) * lightingMainIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * lightingMainIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = calculateAmbientRadiance(ssao) + additionalLight;
inputs.skyRadianceToSurface = ambientLightRadianceComponent + mainLightRadianceComponent + horizonLightRadianceComponent;
inputs.groundRadianceToSurface = GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),r.code.add(i.H`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${2===t.pbrMode?i.H`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`:i.H`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `))}},10790:(e,t,r)=>{r.d(t,{p:()=>a,l:()=>o});var i=r(45616);function o(e,t){e.fragment.uniforms.add("terrainDepthTexture","sampler2D"),e.fragment.uniforms.add("cameraNearFar","vec2"),e.fragment.uniforms.add("inverseViewport","vec2"),e.fragment.code.add(i.H`
    // Compare the linearized depths of fragment and terrain. Discard fragments on the wrong side of the terrain.
    void terrainDepthTest(vec4 fragCoord, float fragmentDepth){

      float terrainDepth = linearDepthFromTexture(terrainDepthTexture, fragCoord.xy * inverseViewport, cameraNearFar);
      if(fragmentDepth ${t.cullAboveGround?">":"<="} terrainDepth){
        discard;
      }
    }
  `)}function a(e,t){t.multipassTerrainEnabled&&t.terrainLinearDepthTexture&&e.bindTexture(t.terrainLinearDepthTexture,"terrainDepthTexture")}},11053:(e,t,r)=>{r.d(t,{k:()=>o});var i=r(45616);function o(e,t){const r=e.fragment;r.code.add(i.H`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),1===t.doubleSidedMode?r.code.add(i.H`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`):2===t.doubleSidedMode?r.code.add(i.H`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`):r.code.add(i.H`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`)}},79107:(e,t,r)=>{r.d(t,{T:()=>n});var i=r(45616);function o(e){const t=e.fragment.code;t.add(i.H`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
{
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),t.add(i.H`float integratedRadiance(float cosTheta2, float roughness)
{
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),t.add(i.H`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
{
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}var a=r(56222);function n(e,t){const r=e.fragment.code;e.include(a.e),3===t.pbrMode||4===t.pbrMode?(r.add(i.H`
    struct PBRShadingWater
    {
        float NdotL;   // cos angle between normal and light direction
        float NdotV;   // cos angle between normal and view direction
        float NdotH;   // cos angle between normal and half vector
        float VdotH;   // cos angle between view direction and half vector
        float LdotH;   // cos angle between light direction and half vector
        float VdotN;   // cos angle between view direction and normal vector
    };

    float dtrExponent = ${t.useCustomDTRExponentForWater?"2.2":"2.0"};
    `),r.add(i.H`vec3 fresnelReflection(float angle, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
}`),r.add(i.H`float normalDistributionWater(float NdotH, float roughness)
{
float r2 = roughness * roughness;
float NdotH2 = NdotH * NdotH;
float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
return r2 / denom;
}`),r.add(i.H`float geometricOcclusionKelemen(float LoH)
{
return 0.25 / (LoH * LoH);
}`),r.add(i.H`vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max)
{
vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
float dSun = normalDistributionWater(props.NdotH, roughness);
float V = geometricOcclusionKelemen(props.LdotH);
float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
float strengthSunHaze  = 1.2;
float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze)*strengthSunHaze;
return ((dSun + dSunHaze) * V) * F;
}
vec3 tonemapACES(const vec3 x) {
return (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
}`)):1!==t.pbrMode&&2!==t.pbrMode||(e.include(o),r.add(i.H`struct PBRShadingInfo
{
float NdotL;
float NdotV;
float NdotH;
float VdotH;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),r.add(i.H`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),r.add(i.H`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`),r.add(i.H`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),r.add(i.H`float gamutMapChanel(float x, vec2 p){
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),r.add(i.H`vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
vec3 outColor;
vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
outColor.x = gamutMapChanel(inColor.x, p) ;
outColor.y = gamutMapChanel(inColor.y, p) ;
outColor.z = gamutMapChanel(inColor.z, p) ;
return outColor;
}`))}},89799:(e,t,r)=>{r.d(t,{jV:()=>n,nW:()=>s});var i=r(35701),o=r(42929),a=r(45616);function n(e,t){const r=e.fragment,i=t.hasMetalnessAndRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture;1===t.pbrMode&&i&&e.include(o.i,t),2!==t.pbrMode?(0===t.pbrMode&&r.code.add(a.H`float getBakedOcclusion() { return 1.0; }`),1===t.pbrMode&&(r.uniforms.add("emissionFactor","vec3"),r.uniforms.add("mrrFactors","vec3"),r.code.add(a.H`vec3 mrr;
vec3 emission;
float occlusion;`),t.hasMetalnessAndRoughnessTexture&&(r.uniforms.add("texMetallicRoughness","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texMetallicRoughnessSize","vec2"),r.code.add(a.H`void applyMetallnessAndRoughness(TextureLookupParameter params) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, params).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`)),t.hasEmissionTexture&&(r.uniforms.add("texEmission","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texEmissionSize","vec2"),r.code.add(a.H`void applyEmission(TextureLookupParameter params) {
emission *= textureLookup(texEmission, params).rgb;
}`)),t.hasOcclusionTexture?(r.uniforms.add("texOcclusion","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texOcclusionSize","vec2"),r.code.add(a.H`void applyOcclusion(TextureLookupParameter params) {
occlusion *= textureLookup(texOcclusion, params).r;
}
float getBakedOcclusion() {
return occlusion;
}`)):r.code.add(a.H`float getBakedOcclusion() { return 1.0; }`),r.code.add(a.H`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;
      ${i?"vtc.uv = vuv0;":""}
      ${t.hasMetalnessAndRoughnessTexture?t.supportsTextureAtlas?"vtc.size = texMetallicRoughnessSize; applyMetallnessAndRoughness(vtc);":"applyMetallnessAndRoughness(vtc);":""}
      ${t.hasEmissionTexture?t.supportsTextureAtlas?"vtc.size = texEmissionSize; applyEmission(vtc);":"applyEmission(vtc);":""}
      ${t.hasOcclusionTexture?t.supportsTextureAtlas?"vtc.size = texOcclusionSize; applyOcclusion(vtc);":"applyOcclusion(vtc);":""}
    }
  `))):r.code.add(a.H`const vec3 mrr = vec3(0.0, 0.6, 0.2);
const vec3 emission = vec3(0.0);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`)}function s(e,t,r=!1){r||(e.setUniform3fv("mrrFactors",t.mrrFactors),e.setUniform3fv("emissionFactor",t.emissiveFactor))}(0,i.f)(0,.6,.2)},56222:(e,t,r)=>{r.d(t,{e:()=>o});var i=r(45616);function o(e){e.vertex.code.add(i.H`const float PI = 3.141592653589793;`),e.fragment.code.add(i.H`const float PI = 3.141592653589793;
const float LIGHT_NORMALIZATION = 1.0 / PI;
const float INV_PI = 0.3183098861837907;
const float HALF_PI = 1.570796326794897;`)}},68264:(e,t,r)=>{r.d(t,{hX:()=>a,vL:()=>n});var i=r(81800),o=r(45616);function a(e){e.fragment.include(i.n),e.fragment.uniforms.add("uShadowMapTex","sampler2D"),e.fragment.uniforms.add("uShadowMapNum","int"),e.fragment.uniforms.add("uShadowMapDistance","vec4"),e.fragment.uniforms.add("uShadowMapMatrix","mat4",4),e.fragment.uniforms.add("uDepthHalfPixelSz","float"),e.fragment.code.add(o.H`int chooseCascade(float _linearDepth, out mat4 mat) {
vec4 distance = uShadowMapDistance;
float depth = _linearDepth;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? uShadowMapMatrix[0] : i == 1 ? uShadowMapMatrix[1] : i == 2 ? uShadowMapMatrix[2] : uShadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, vec3 lvpos) {
return vec2(float(i - 2 * (i / 2)) * 0.5, float(i / 2) * 0.5) + 0.5 * lvpos.xy;
}
float readShadowMapDepth(vec2 uv, sampler2D _depthTex) {
return rgba2float(texture2D(_depthTex, uv));
}
float posIsInShadow(vec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, float halfPixelSize, sampler2D _depthTex) {
float texSize = 0.5 / halfPixelSize;
vec2 st = fract((vec2(halfPixelSize) + uv) * texSize);
float s00 = posIsInShadow(uv + vec2(-halfPixelSize, -halfPixelSize), lvpos, _depthTex);
float s10 = posIsInShadow(uv + vec2(halfPixelSize, -halfPixelSize), lvpos, _depthTex);
float s11 = posIsInShadow(uv + vec2(halfPixelSize, halfPixelSize), lvpos, _depthTex);
float s01 = posIsInShadow(uv + vec2(-halfPixelSize, halfPixelSize), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= uShadowMapNum) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0) { return 0.0; }
if (lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
vec2 uv = cascadeCoordinates(i, lvpos);
return filterShadow(uv, lvpos, uDepthHalfPixelSz, uShadowMapTex);
}`)}function n(e,t,r){t.shadowMappingEnabled&&t.shadowMap.bindView(e,r)}},23969:(e,t,r)=>{r.d(t,{kl:()=>o,uj:()=>a});var i=r(45616);function o(e,t){t.vvInstancingEnabled&&(t.vvSize||t.vvColor)&&e.attributes.add("instanceFeatureAttribute","vec4"),t.vvSize?(e.vertex.uniforms.add("vvSizeMinSize","vec3"),e.vertex.uniforms.add("vvSizeMaxSize","vec3"),e.vertex.uniforms.add("vvSizeOffset","vec3"),e.vertex.uniforms.add("vvSizeFactor","vec3"),e.vertex.uniforms.add("vvSymbolRotationMatrix","mat3"),e.vertex.uniforms.add("vvSymbolAnchor","vec3"),e.vertex.code.add(i.H`vec3 vvScale(vec4 _featureAttribute) {
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),e.vertex.code.add(i.H`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 vvScale = clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize + eps, vvSizeMaxSize);
        return vec4(vvSymbolRotationMatrix * _normal / vvScale, 1.0);
      }

      ${t.vvInstancingEnabled?i.H`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):e.vertex.code.add(i.H`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),t.vvColor?(e.vertex.constants.add("vvColorNumber","int",8),e.vertex.code.add(i.H`
      uniform float vvColorValues[vvColorNumber];
      uniform vec4 vvColorColors[vvColorNumber];

      vec4 vvGetColor(vec4 featureAttribute, float values[vvColorNumber], vec4 colors[vvColorNumber]) {
        float value = featureAttribute.y;
        if (value <= values[0]) {
          return colors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (values[i] >= value) {
            float f = (value - values[i-1]) / (values[i] - values[i-1]);
            return mix(colors[i-1], colors[i], f);
          }
        }
        return colors[vvColorNumber - 1];
      }

      ${t.vvInstancingEnabled?i.H`
      vec4 vvColor() {
        return vvGetColor(instanceFeatureAttribute, vvColorValues, vvColorColors);
      }`:""}
    `)):e.vertex.code.add(i.H`vec4 vvColor() { return vec4(1.0); }`)}function a(e,t){(function(e,t){t.vvSizeEnabled&&(e.setUniform3fv("vvSizeMinSize",t.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",t.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",t.vvSizeOffset),e.setUniform3fv("vvSizeFactor",t.vvSizeFactor)),t.vvColorEnabled&&(e.setUniform1fv("vvColorValues",t.vvColorValues),e.setUniform4fv("vvColorColors",t.vvColorColors))})(e,t),t.vvSizeEnabled&&(e.setUniform3fv("vvSymbolAnchor",t.vvSymbolAnchor),e.setUniformMatrix3fv("vvSymbolRotationMatrix",t.vvSymbolRotationMatrix))}},46918:(e,t,r)=>{r.d(t,{sj:()=>n,F:()=>o,bf:()=>a});var i=r(45616);const o=.1,a=.001;function n(e,t){const r=e.fragment;switch(t.alphaDiscardMode){case 0:r.code.add(i.H`
        #define discardOrAdjustAlpha(color) { if (color.a < ${i.H.float(a)}) { discard; } }
      `);break;case 1:r.code.add(i.H`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case 2:r.uniforms.add("textureAlphaCutoff","float"),r.code.add(i.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case 3:e.fragment.uniforms.add("textureAlphaCutoff","float"),e.fragment.code.add(i.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}},77720:(e,t,r)=>{r.d(t,{$:()=>g,I:()=>x});var i=r(32780),o=r(45616),a=r(43388),n=r(86591),s=r(60663),l=r(79830),c=r(1549),d=(r(62146),r(61605),r(16820),r(65585)),u=r(66762),h=r(94934),p=r(97898);class m{constructor(e){this.context=e,this.svgAlwaysPremultipliesAlpha=!1,this._doublePrecisionRequiresObfuscation=null,(0,p.M)(e).then((e=>this.svgAlwaysPremultipliesAlpha=!e))}get doublePrecisionRequiresObfuscation(){if((0,a.Wi)(this._doublePrecisionRequiresObfuscation)){const e=v(this.context,!1),t=v(this.context,!0);this._doublePrecisionRequiresObfuscation=0!==e&&(0===t||e/t>5)}return this._doublePrecisionRequiresObfuscation}}let f=null;function v(e,t){const r=new l.Z(e,{colorTarget:0,depthStencilTarget:0},{target:3553,wrapMode:33071,pixelFormat:6408,dataType:5121,samplingMode:9728,width:1,height:1}),i=s.Z.createVertex(e,35044,new Uint16Array([0,0,1,0,0,1,1,1])),o=new d.Z(e,new Map([["position",0]]),{geometry:[{name:"position",count:2,type:5123,offset:0,stride:4,normalized:!1}]},{geometry:i}),a=(0,n.f)(5633261.287538229,2626832.878767164,1434988.0495278358),p=(0,n.f)(5633271.46742708,2626873.6381334523,1434963.231608387),m=function(r,i){const o=new c.$(e,`\n\n  precision highp float;\n\n  attribute vec2 position;\n\n  uniform vec3 u_highA;\n  uniform vec3 u_lowA;\n  uniform vec3 u_highB;\n  uniform vec3 u_lowB;\n\n  varying vec4 v_color;\n\n  ${t?"#define DOUBLE_PRECISION_REQUIRES_OBFUSCATION":""}\n\n  #ifdef DOUBLE_PRECISION_REQUIRES_OBFUSCATION\n\n  vec3 dpPlusFrc(vec3 a, vec3 b) {\n    return mix(a, a + b, vec3(notEqual(b, vec3(0))));\n  }\n\n  vec3 dpMinusFrc(vec3 a, vec3 b) {\n    return mix(vec3(0), a - b, vec3(notEqual(a, b)));\n  }\n\n  vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {\n    vec3 t1 = dpPlusFrc(hiA, hiB);\n    vec3 e = dpMinusFrc(t1, hiA);\n    vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;\n    return t1 + t2;\n  }\n\n  #else\n\n  vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {\n    vec3 t1 = hiA + hiB;\n    vec3 e = t1 - hiA;\n    vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;\n    return t1 + t2;\n  }\n\n  #endif\n\n  const float MAX_RGBA_FLOAT =\n    255.0 / 256.0 +\n    255.0 / 256.0 / 256.0 +\n    255.0 / 256.0 / 256.0 / 256.0 +\n    255.0 / 256.0 / 256.0 / 256.0 / 256.0;\n\n  const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);\n\n  vec4 float2rgba(const float value) {\n    // Make sure value is in the domain we can represent\n    float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);\n\n    // Decompose value in 32bit fixed point parts represented as\n    // uint8 rgba components. Decomposition uses the fractional part after multiplying\n    // by a power of 256 (this removes the bits that are represented in the previous\n    // component) and then converts the fractional part to 8bits.\n    vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);\n\n    // Convert uint8 values (from 0 to 255) to floating point representation for\n    // the shader\n    const float toU8AsFloat = 1.0 / 255.0;\n\n    return fixedPointU8 * toU8AsFloat;\n  }\n\n  void main() {\n    vec3 val = dpAdd(u_highA, u_lowA, -u_highB, -u_lowB);\n\n    v_color = float2rgba(val.z / 25.0);\n\n    gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);\n  }\n  `,"\n  precision highp float;\n\n  varying vec4 v_color;\n\n  void main() {\n    gl_FragColor = v_color;\n  }\n  ",new Map([["position",0]])),a=new Float32Array(6);(0,u.LF)(r,a,3);const n=new Float32Array(6);return(0,u.LF)(i,n,3),e.useProgram(o),o.setUniform3f("u_highA",a[0],a[2],a[4]),o.setUniform3f("u_lowA",a[1],a[3],a[5]),o.setUniform3f("u_highB",n[0],n[2],n[4]),o.setUniform3f("u_lowB",n[1],n[3],n[5]),o}(a,p),f=e.getBoundFramebufferObject(),{x:v,y:g,width:x,height:b}=e.getViewport();e.bindFramebuffer(r),e.setViewport(0,0,1,1),e.bindVAO(o),e.drawArrays(5,0,4);const _=new Uint8Array(4);r.readPixels(0,0,1,1,6408,5121,_),m.dispose(),o.dispose(!1),i.dispose(),r.dispose(),e.setViewport(v,g,x,b),e.bindFramebuffer(f);const y=(a[2]-p[2])/25,T=(0,h.vP)(_);return Math.abs(y-T)}function g({code:e},t){t.doublePrecisionRequiresObfuscation?e.add(o.H`vec3 dpPlusFrc(vec3 a, vec3 b) {
return mix(a, a + b, vec3(notEqual(b, vec3(0))));
}
vec3 dpMinusFrc(vec3 a, vec3 b) {
return mix(vec3(0), a - b, vec3(notEqual(a, b)));
}
vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = dpPlusFrc(hiA, hiB);
vec3 e = dpMinusFrc(t1, hiA);
vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
return t1 + t2;
}`):e.add(o.H`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = hiA + hiB;
vec3 e = t1 - hiA;
vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
return t1 + t2;
}`)}function x(e){return!!(0,i.Z)("force-double-precision-obfuscation")||(t=e,((0,a.Wi)(f)||f.context!==t)&&(f=new m(t)),f).doublePrecisionRequiresObfuscation;var t}},23447:(e,t,r)=>{r.d(t,{a:()=>a});var i=r(45616),o=r(61605);function a(e,t){const r=i.H`
  /*
  *  ${t.name}
  *  ${0===t.output?"RenderOutput: Color":1===t.output?"RenderOutput: Depth":3===t.output?"RenderOutput: Shadow":2===t.output?"RenderOutput: Normal":4===t.output?"RenderOutput: Highlight":""}
  */
  `;(0,o.CG)()&&(e.fragment.code.add(r),e.vertex.code.add(r))}},70014:(e,t,r)=>{r.d(t,{y:()=>a});var i=r(45616);function o(e){e.code.add(i.H`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}function a(e){e.include(o),e.code.add(i.H`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${i.H.int(1)}) {
        return allMixed;
      }
      else if (mode == ${i.H.int(2)}) {
        return internalMixed;
      }
      else if (mode == ${i.H.int(3)}) {
        return externalColor;
      }
      else {
        // tint (or something invalid)
        float vIn = rgb2v(internalMixed);
        vec3 hsvTint = rgb2hsv(externalColor);
        vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
        return hsv2rgb(hsvOut);
      }
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${i.H.int(2)}) {
        return internalMixed;
      }
      else if (mode == ${i.H.int(3)}) {
        return externalOpacity;
      }
      else {
        // multiply or tint (or something invalid)
        return allMixed;
      }
    }
  `)}},81800:(e,t,r)=>{r.d(t,{n:()=>o});var i=r(45616);function o(e){e.code.add(i.H`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}
const vec4 RGBA_2_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, RGBA_2_FLOAT_FACTORS);
}`)}},84439:(e,t,r)=>{r.d(t,{kG:()=>a});const i=r(20337).Z.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class o{constructor(){this.includedModules=new Map}include(e,t){this.includedModules.has(e)?this.includedModules.get(e)!==t&&i.error("Trying to include shader module multiple times with different sets of options."):(this.includedModules.set(e,t),e(this.builder,t))}}class a extends o{constructor(){super(...arguments),this.vertex=new l,this.fragment=new l,this.attributes=new c,this.varyings=new d,this.extensions=new u,this.constants=new h}get fragmentUniforms(){return this.fragment.uniforms}get builder(){return this}generateSource(e){const t=this.extensions.generateSource(e),r=this.attributes.generateSource(e),i=this.varyings.generateSource(),o="vertex"===e?this.vertex:this.fragment,a=o.uniforms.generateSource(),n=o.code.generateSource(),s="vertex"===e?m:p,l=this.constants.generateSource().concat(o.constants.generateSource());return`\n${t.join("\n")}\n\n${s}\n\n${l.join("\n")}\n\n${a.join("\n")}\n\n${r.join("\n")}\n\n${i.join("\n")}\n\n${n.join("\n")}`}}class n{constructor(){this._entries=new Map}add(e,t,r){const i=`${e}_${t}_${r}`;return this._entries.set(i,{name:e,type:t,arraySize:r}),this}generateSource(){return Array.from(this._entries.values()).map((e=>{return`uniform ${e.type} ${e.name}${t=e.arraySize,t?`[${t}]`:""};`;var t}))}get entries(){return Array.from(this._entries.values())}}class s{constructor(){this._entries=new Array}add(e){this._entries.push(e)}generateSource(){return this._entries}}class l extends o{constructor(){super(...arguments),this.uniforms=new n,this.code=new s,this.constants=new h}get builder(){return this}}class c{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return"fragment"===e?[]:this._entries.map((e=>`attribute ${e[1]} ${e[0]};`))}}class d{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(){return this._entries.map((e=>`varying ${e[1]} ${e[0]};`))}}class u{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t="vertex"===e?u.ALLOWLIST_VERTEX:u.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter((e=>t.includes(e))).map((e=>`#extension ${e} : enable`))}}u.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],u.ALLOWLIST_VERTEX=[];class h{constructor(){this._entries=[]}add(e,t,r){let i="ERROR_CONSTRUCTOR_STRING";switch(t){case"float":i=h.numberToFloatStr(r);break;case"int":i=h.numberToIntStr(r);break;case"bool":i=r.toString();break;case"vec2":i=`vec2(${h.numberToFloatStr(r[0])},                            ${h.numberToFloatStr(r[1])})`;break;case"vec3":i=`vec3(${h.numberToFloatStr(r[0])},                            ${h.numberToFloatStr(r[1])},                            ${h.numberToFloatStr(r[2])})`;break;case"vec4":i=`vec4(${h.numberToFloatStr(r[0])},                            ${h.numberToFloatStr(r[1])},                            ${h.numberToFloatStr(r[2])},                            ${h.numberToFloatStr(r[3])})`;break;case"ivec2":i=`ivec2(${h.numberToIntStr(r[0])},                             ${h.numberToIntStr(r[1])})`;break;case"ivec3":i=`ivec3(${h.numberToIntStr(r[0])},                             ${h.numberToIntStr(r[1])},                             ${h.numberToIntStr(r[2])})`;break;case"ivec4":i=`ivec4(${h.numberToIntStr(r[0])},                             ${h.numberToIntStr(r[1])},                             ${h.numberToIntStr(r[2])},                             ${h.numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":i=`${t}(${Array.prototype.map.call(r,(e=>h.numberToFloatStr(e))).join(", ")})`}return this._entries.push(`const ${t} ${e} = ${i};`),this}static numberToIntStr(e){return e.toFixed(0)}static numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const p="#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  precision highp sampler2D;\n#else\n  precision mediump float;\n  precision mediump sampler2D;\n#endif",m="precision highp float;\nprecision highp sampler2D;"},45616:(e,t,r)=>{function i(e,...t){let r="";for(let i=0;i<t.length;i++)r+=e[i]+t[i];return r+=e[e.length-1],r}r.d(t,{H:()=>i}),function(e){e.int=function(e){return Math.round(e).toString()},e.float=function(e){return e.toPrecision(8)}}(i||(i={}))},94934:(e,t,r)=>{r.d(t,{hu:()=>o,vP:()=>a}),r(19776),r(87059),r(32622),r(95530),r(86591),r(99491),(0,r(45494).c)();class i{constructor(e){this.message=e}toString(){return`AssertException: ${this.message}`}}function o(e,t){if(!e){t=t||"assert";const e=new Error(t);throw e.stack&&console.log(e.stack),new i(t)}}function a(e,t=0){let r=0;for(let i=0;i<4;i++)r+=e[t+i]*n[i];return r}const n=[1/256,1/65536,1/16777216,1/4294967296];a(new Uint8ClampedArray([255,255,255,255]))},66762:(e,t,r)=>{function i(e,t,r){for(let i=0;i<r;++i)t[2*i]=e[i],t[2*i+1]=e[i]-t[2*i]}function o(e,t,r,o){for(let s=0;s<o;++s)a[0]=e[s],i(a,n,1),t[s]=n[0],r[s]=n[1]}r.d(t,{LF:()=>i,po:()=>o});const a=new Float64Array(1),n=new Float32Array(2)},11110:(e,t,r)=>{r.d(t,{bj:()=>y,FZ:()=>S,Uf:()=>T,Bw:()=>h,LO:()=>w,Hx:()=>_});var i=r(19776),o=r(43388),a=r(55545),n=r(86591),s=r(16862);(0,i.Vl)(10),(0,i.Vl)(12),(0,i.Vl)(70),(0,i.Vl)(40);const l={scale:0,factor:0,minPixelSize:0,paddingPixels:0};var c=r(94934),d=(r(87059),r(67829));r(66762),new Float64Array(3),new Float32Array(6),(0,d.c)();const u=(0,s.Ue)();function h(e,t,r,i,a,n,s){if(!function(e){return!!(0,o.pC)(e)&&!e.visible}(t))if(e.boundingInfo){(0,c.hu)(0===e.primitiveType);const t=r.tolerance;m(e.boundingInfo,i,a,t,n,s)}else{const t=e.indices.get("position"),r=e.vertexAttributes.get("position");v(i,a,0,t.length/3,t,r,void 0,n,s)}}const p=(0,n.c)();function m(e,t,r,i,n,l){if((0,o.Wi)(e))return;const c=function(e,t,r){return(0,a.s)(r,1/(t[0]-e[0]),1/(t[1]-e[1]),1/(t[2]-e[2]))}(t,r,p);if((0,s.op)(u,e.getBBMin()),(0,s.Tn)(u,e.getBBMax()),(0,o.pC)(n)&&n.applyToAabb(u),function(e,t,r,i){return function(e,t,r,i,o){const a=(e[0]-i-t[0])*r[0],n=(e[3]+i-t[0])*r[0];let s=Math.min(a,n),l=Math.max(a,n);const c=(e[1]-i-t[1])*r[1],d=(e[4]+i-t[1])*r[1];if(l=Math.min(l,Math.max(c,d)),l<0)return!1;if(s=Math.max(s,Math.min(c,d)),s>l)return!1;const u=(e[2]-i-t[2])*r[2],h=(e[5]+i-t[2])*r[2];return l=Math.min(l,Math.max(u,h)),!(l<0)&&(s=Math.max(s,Math.min(u,h)),!(s>l)&&s<1/0)}(e,t,r,i)}(u,t,c,i)){const{primitiveIndices:o,indices:a,position:s}=e,c=o?o.length:a.length/3;if(c>C){const o=e.getChildren();if(void 0!==o){for(let e=0;e<8;++e)void 0!==o[e]&&m(o[e],t,r,i,n,l);return}}v(t,r,0,c,a,s,o,n,l)}}const f=(0,n.c)();function v(e,t,r,i,a,n,s,l,c){if(s)return function(e,t,r,i,a,n,s,l,c){const d=n.data,u=n.stride||n.size,h=e[0],p=e[1],m=e[2],v=t[0]-h,g=t[1]-p,x=t[2]-m;for(let e=r;e<i;++e){const t=s[e];let r=3*t,i=u*a[r++],n=d[i++],_=d[i++],y=d[i];i=u*a[r++];let T=d[i++],w=d[i++],M=d[i];i=u*a[r];let S=d[i++],C=d[i++],A=d[i];(0,o.pC)(l)&&([n,_,y]=l.applyToVertex(n,_,y,e),[T,w,M]=l.applyToVertex(T,w,M,e),[S,C,A]=l.applyToVertex(S,C,A,e));const P=T-n,F=w-_,O=M-y,E=S-n,H=C-_,D=A-y,I=g*D-H*x,z=x*E-D*v,R=v*H-E*g,L=P*I+F*z+O*R;if(Math.abs(L)<=Number.EPSILON)continue;const N=h-n,B=p-_,V=m-y,U=N*I+B*z+V*R;if(L>0){if(U<0||U>L)continue}else if(U>0||U<L)continue;const G=B*O-F*V,W=V*P-O*N,q=N*F-P*B,k=v*G+g*W+x*q;if(L>0){if(k<0||U+k>L)continue}else if(k>0||U+k<L)continue;const $=(E*G+H*W+D*q)/L;$>=0&&c($,b(P,F,O,E,H,D,f),t)}}(e,t,r,i,a,n,s,l,c);const d=n.data,u=n.stride||n.size,h=e[0],p=e[1],m=e[2],v=t[0]-h,g=t[1]-p,x=t[2]-m;for(let e=r,t=3*r;e<i;++e){let r=u*a[t++],i=d[r++],n=d[r++],s=d[r];r=u*a[t++];let _=d[r++],y=d[r++],T=d[r];r=u*a[t++];let w=d[r++],M=d[r++],S=d[r];(0,o.pC)(l)&&([i,n,s]=l.applyToVertex(i,n,s,e),[_,y,T]=l.applyToVertex(_,y,T,e),[w,M,S]=l.applyToVertex(w,M,S,e));const C=_-i,A=y-n,P=T-s,F=w-i,O=M-n,E=S-s,H=g*E-O*x,D=x*F-E*v,I=v*O-F*g,z=C*H+A*D+P*I;if(Math.abs(z)<=Number.EPSILON)continue;const R=h-i,L=p-n,N=m-s,B=R*H+L*D+N*I;if(z>0){if(B<0||B>z)continue}else if(B>0||B<z)continue;const V=L*P-A*N,U=N*C-P*R,G=R*A-C*L,W=v*V+g*U+x*G;if(z>0){if(W<0||B+W>z)continue}else if(W>0||B+W<z)continue;const q=(F*V+O*U+E*G)/z;q>=0&&c(q,b(C,A,P,F,O,E,f),e)}}const g=(0,n.c)(),x=(0,n.c)();function b(e,t,r,i,o,n,s){return(0,a.s)(g,e,t,r),(0,a.s)(x,i,o,n),(0,a.c)(s,g,x),(0,a.n)(s,s),s}function _(e,t,r,o,a){let n=(r.screenLength||0)*e.pixelRatio;a&&(n=function(e,t,r,o){return function(e,t){return Math.max((0,i.t7)(e*t.scale,e,t.factor),function(e,t){return 0===e?t.minPixelSize:t.minPixelSize*(1+2*t.paddingPixels/e)}(e,t))}(e,function(e,t,r){const i=r.parameters,o=r.paddingPixelsOverride;return l.scale=Math.min(i.divisor/(t-i.offset),1),l.factor=function(e){return Math.abs(e*e*e)}(e),l.minPixelSize=i.minPixelSize,l.paddingPixels=o,l}(t,r,o))}(n,o,t,a));const s=n*Math.tan(.5*e.fovY)/(.5*e.fullHeight);return(0,i.uZ)(s*t,r.minWorldLength||0,null!=r.maxWorldLength?r.maxWorldLength:1/0)}function y(e,t,r){if(!e)return;const i=e.parameters,o=e.paddingPixelsOverride;t.setUniform4f(r,i.divisor,i.offset,i.minPixelSize,o)}function T(e,t){const r=t?T(t):{};for(const t in e){let i=e[t];i&&i.forEach&&(i=M(i)),null==i&&t in r||(r[t]=i)}return r}function w(e,t){let r=!1;for(const i in t){const o=t[i];void 0!==o&&(r=!0,Array.isArray(o)?e[i]=o.slice():e[i]=o)}return r}function M(e){const t=[];return e.forEach((e=>t.push(e))),t}const S={multiply:1,ignore:2,replace:3,tint:4},C=1e3},16820:(e,t,r)=>{r.d(t,{Z:()=>l});var i=r(19776),o=r(43388),a=r(62146),n=r(88384);class s{constructor(e,t,r=null){this._context=e,this.type="texture",this._glName=null,this._descriptor=void 0,this._samplingModeDirty=!1,this._wrapModeDirty=!1,e.instanceCounter.increment(a._g.Texture,this),this._descriptor={target:3553,samplingMode:9729,wrapMode:10497,flipped:!1,hasMipmap:!1,isOpaque:!1,unpackAlignment:4,preMultiplyAlpha:!1,...t},this.setData(r)}get glName(){return this._glName}get descriptor(){return this._descriptor}dispose(){this._context.gl&&this._glName&&(this._context.unbindTextureAllUnits(this),this._context.gl.deleteTexture(this._glName),this._glName=null,this._context.instanceCounter.decrement(a._g.Texture,this))}release(){this.dispose()}resize(e,t){const r=this._descriptor;r.width===e&&r.height===t||(r.width=e,r.height=t,this.setData(null))}setData(e){if(!this._context||!this._context.gl)return;const t=this._context.gl;this._glName||(this._glName=t.createTexture()),void 0===e&&(e=null),null===e&&(this._descriptor.width=this._descriptor.width||4,this._descriptor.height=this._descriptor.height||4);const r=this._context.bindTexture(this,s.TEXTURE_UNIT_FOR_UPDATES),i=this._descriptor;s._validateTexture(this._context,i),t.pixelStorei(t.UNPACK_ALIGNMENT,i.unpackAlignment),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,i.flipped?1:0),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i.preMultiplyAlpha?1:0);const a=i.pixelFormat;let n=i.internalFormat?i.internalFormat:a;if(e instanceof ImageData||e instanceof HTMLImageElement||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement){let r=e.width,o=e.height;e instanceof HTMLVideoElement&&(r=e.videoWidth,o=e.videoHeight),i.width&&i.height,t.texImage2D(t.TEXTURE_2D,0,n,a,i.dataType,e),i.hasMipmap&&this.generateMipmap(),void 0===i.width&&(i.width=r),void 0===i.height&&(i.height=o)}else{null!=i.width&&null!=i.height||console.error("Width and height must be specified!"),t.DEPTH24_STENCIL8&&n===t.DEPTH_STENCIL&&(n=t.DEPTH24_STENCIL8);let r=i.width,s=i.height;if(function(e){return(0,o.pC)(e)&&"type"in e&&"compressed"===e.type}(e)){const o=Math.round(Math.log(Math.max(r,s))/Math.LN2)+1;i.hasMipmap=i.hasMipmap&&o===e.levels.length;for(let o=0;;++o){const a=e.levels[Math.min(o,e.levels.length-1)];if(t.compressedTexImage2D(t.TEXTURE_2D,o,n,r,s,0,a),1===r&&1===s||!i.hasMipmap)break;r=Math.max(1,r>>1),s=Math.max(1,s>>1)}}else if((0,o.pC)(e))t.texImage2D(t.TEXTURE_2D,0,n,r,s,0,a,i.dataType,e),i.hasMipmap&&this.generateMipmap();else for(let e=0;t.texImage2D(t.TEXTURE_2D,e,n,r,s,0,a,i.dataType,null),(1!==r||1!==s)&&i.hasMipmap;++e)r=Math.max(1,r>>1),s=Math.max(1,s>>1)}s._applySamplingMode(t,this._descriptor),s._applyWrapMode(t,this._descriptor),s._applyAnisotropicFilteringParameters(this._context,this._descriptor),this._context.bindTexture(r,s.TEXTURE_UNIT_FOR_UPDATES)}updateData(e,t,r,i,o,a){a||console.error("An attempt to use uninitialized data!"),this._glName||console.error("An attempt to update uninitialized texture!");const n=this._context.gl,l=this._descriptor,c=this._context.bindTexture(this,s.TEXTURE_UNIT_FOR_UPDATES);(t<0||r<0||i>l.width||o>l.height||t+i>l.width||r+o>l.height)&&console.error("An attempt to update out of bounds of the texture!"),n.pixelStorei(n.UNPACK_ALIGNMENT,l.unpackAlignment),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,l.flipped?1:0),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,l.preMultiplyAlpha?1:0),a instanceof ImageData||a instanceof HTMLImageElement||a instanceof HTMLCanvasElement||a instanceof HTMLVideoElement?n.texSubImage2D(n.TEXTURE_2D,e,t,r,l.pixelFormat,l.dataType,a):n.texSubImage2D(n.TEXTURE_2D,e,t,r,i,o,l.pixelFormat,l.dataType,a),this._context.bindTexture(c,s.TEXTURE_UNIT_FOR_UPDATES)}generateMipmap(){const e=this._descriptor;e.hasMipmap||(e.hasMipmap=!0,this._samplingModeDirty=!0,s._validateTexture(this._context,e)),9729===e.samplingMode?(this._samplingModeDirty=!0,e.samplingMode=9985):9728===e.samplingMode&&(this._samplingModeDirty=!0,e.samplingMode=9984);const t=this._context.bindTexture(this,s.TEXTURE_UNIT_FOR_UPDATES),r=this._context.gl;r.generateMipmap(r.TEXTURE_2D),this._context.bindTexture(t,s.TEXTURE_UNIT_FOR_UPDATES)}setSamplingMode(e){e!==this._descriptor.samplingMode&&(this._descriptor.samplingMode=e,this._samplingModeDirty=!0)}setWrapMode(e){e!==this._descriptor.wrapMode&&(this._descriptor.wrapMode=e,s._validateTexture(this._context,this._descriptor),this._wrapModeDirty=!0)}applyChanges(){const e=this._context.gl,t=this._descriptor;this._samplingModeDirty&&(s._applySamplingMode(e,t),this._samplingModeDirty=!1),this._wrapModeDirty&&(s._applyWrapMode(e,t),this._wrapModeDirty=!1)}static _validateTexture(e,t){(t.width<0||t.height<0)&&console.error("Negative dimension parameters are not allowed!");const r=(0,i.wt)(t.width)&&(0,i.wt)(t.height);(0,n.Z)(e.gl)||r||("number"==typeof t.wrapMode?33071!==t.wrapMode&&console.error("Non-power-of-two textures must have a wrap mode of CLAMP_TO_EDGE!"):33071===t.wrapMode.s&&33071===t.wrapMode.t||console.error("Non-power-of-two textures must have a wrap mode of CLAMP_TO_EDGE!"),t.hasMipmap&&console.error("Mipmapping requires power-of-two textures!"))}static _applySamplingMode(e,t){let r=t.samplingMode,i=t.samplingMode;9985===r||9987===r?(r=9729,t.hasMipmap||(i=9729)):9984!==r&&9986!==r||(r=9728,t.hasMipmap||(i=9728)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i)}static _applyWrapMode(e,t){"number"==typeof t.wrapMode?(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,t.wrapMode),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,t.wrapMode)):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,t.wrapMode.s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,t.wrapMode.t))}static _applyAnisotropicFilteringParameters(e,t){var r;const i=e.capabilities.textureFilterAnisotropic;if(!i)return;const o=e.gl;o.texParameterf(o.TEXTURE_2D,i.TEXTURE_MAX_ANISOTROPY,null!=(r=t.maxAnisotropy)?r:1)}}s.TEXTURE_UNIT_FOR_UPDATES=0;const l=s},88384:(e,t,r)=>{r.d(t,{Z:()=>i});const i=function(e){return window.WebGL2RenderingContext&&e instanceof window.WebGL2RenderingContext}},62146:(e,t,r)=>{r.d(t,{Ld:()=>i,_g:()=>o});const i=33984;var o;!function(e){e[e.Texture=0]="Texture",e[e.Buffer=1]="Buffer",e[e.VAO=2]="VAO",e[e.Program=3]="Program",e[e.Framebuffer=4]="Framebuffer",e[e.Renderbuffer=5]="Renderbuffer",e[e.COUNT=6]="COUNT"}(o||(o={}))},97898:(e,t,r)=>{r.d(t,{M:()=>l});var i=r(60663),o=r(79830),a=r(1549),n=r(16820),s=r(65585);async function l(e){const t=new Image;if(t.src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='5' height='5' version='1.1' viewBox='0 0 5 5' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='5' height='5' fill='%23f00' fill-opacity='.5'/%3E%3C/svg%3E%0A",t.width=5,t.height=5,await t.decode(),!e.gl)return!0;const r=new o.Z(e,{colorTarget:0,depthStencilTarget:0},{target:3553,wrapMode:33071,pixelFormat:6408,dataType:5121,samplingMode:9728,width:1,height:1}),l=i.Z.createVertex(e,35044,new Uint16Array([0,0,1,0,0,1,1,1])),c=new s.Z(e,new Map([["a_pos",0]]),{geometry:[{name:"a_pos",count:2,type:5123,offset:0,stride:4,normalized:!1}]},{geometry:l}),d=new a.$(e,"\n  precision highp float;\n\n  attribute vec2 a_pos;\n  varying vec2 v_uv;\n\n  void main() {\n    v_uv = a_pos;\n    gl_Position = vec4(a_pos * 2.0 - 1.0, 0.0, 1.0);\n  }\n  ","\n  precision highp float;\n\n  varying vec2 v_uv;\n  uniform sampler2D u_texture;\n\n  void main() {\n    gl_FragColor = texture2D(u_texture, v_uv);\n  }\n  ",new Map([["a_pos",0]]));e.useProgram(d);const u=new n.Z(e,{dataType:5121,pixelFormat:6408,preMultiplyAlpha:!1,wrapMode:33071,samplingMode:9729},t);e.bindTexture(u,0),d.setUniform1i("u_texture",0);const h=e.getBoundFramebufferObject(),{x:p,y:m,width:f,height:v}=e.getViewport();e.bindFramebuffer(r),e.setViewport(0,0,1,1),e.bindVAO(c),e.drawArrays(5,0,4);const g=new Uint8Array(4);return r.readPixels(0,0,1,1,6408,5121,g),d.dispose(),c.dispose(!1),l.dispose(),r.dispose(),u.dispose(),e.setViewport(p,m,f,v),e.bindFramebuffer(h),t.src="",255===g[0]}}}]);