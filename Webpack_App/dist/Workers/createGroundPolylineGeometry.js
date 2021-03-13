define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-bddc1162","./Transforms-43808565","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-49698167","./EncodedCartesian3-e9c71cf0","./IntersectionTests-60a97ecf","./Plane-c946480f","./WebMercatorProjection-df58d479","./arrayRemoveDuplicates-ebc732b0","./ArcType-dc1c5aee","./EllipsoidRhumbLine-c704bf4c","./EllipsoidGeodesic-30fae80b"],function(j,e,He,Be,je,a,t,Ge,Ve,Ye,G,i,n,V,Y,F,E){"use strict";function r(e){e=j.defaultValue(e,j.defaultValue.EMPTY_OBJECT),this._ellipsoid=j.defaultValue(e.ellipsoid,Be.Ellipsoid.WGS84),this._rectangle=j.defaultValue(e.rectangle,Be.Rectangle.MAX_VALUE),this._projection=new je.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=j.defaultValue(e.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=j.defaultValue(e.numberOfLevelZeroTilesY,1)}Object.defineProperties(r.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),r.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},r.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},r.prototype.rectangleToNativeRectangle=function(e,a){var t=He.CesiumMath.toDegrees(e.west),n=He.CesiumMath.toDegrees(e.south),r=He.CesiumMath.toDegrees(e.east),i=He.CesiumMath.toDegrees(e.north);return j.defined(a)?(a.west=t,a.south=n,a.east=r,a.north=i,a):new Be.Rectangle(t,n,r,i)},r.prototype.tileXYToNativeRectangle=function(e,a,t,n){var r=this.tileXYToRectangle(e,a,t,n);return r.west=He.CesiumMath.toDegrees(r.west),r.south=He.CesiumMath.toDegrees(r.south),r.east=He.CesiumMath.toDegrees(r.east),r.north=He.CesiumMath.toDegrees(r.north),r},r.prototype.tileXYToRectangle=function(e,a,t,n){var r=this._rectangle,i=this.getNumberOfXTilesAtLevel(t),s=this.getNumberOfYTilesAtLevel(t),o=r.width/i,l=e*o+r.west,u=(e+1)*o+r.west,c=r.height/s,C=r.north-a*c,p=r.north-(a+1)*c;return j.defined(n)||(n=new Be.Rectangle(l,p,u,C)),n.west=l,n.south=p,n.east=u,n.north=C,n},r.prototype.positionToTileXY=function(e,a,t){var n=this._rectangle;if(Be.Rectangle.contains(n,e)){var r=this.getNumberOfXTilesAtLevel(a),i=this.getNumberOfYTilesAtLevel(a),s=n.width/r,o=n.height/i,l=e.longitude;n.east<n.west&&(l+=He.CesiumMath.TWO_PI);var u=(l-n.west)/s|0;r<=u&&(u=r-1);var c=(n.north-e.latitude)/o|0;return(i<=c&&(c=i-1),j.defined(t))?(t.x=u,t.y=c,t):new Be.Cartesian2(u,c)}};var u=new Be.Cartesian3,c=new Be.Cartesian3,C=new Be.Cartographic,p=new Be.Cartesian3,d=new Be.Cartesian3,o=new je.BoundingSphere,h=new r,g=[new Be.Cartographic,new Be.Cartographic,new Be.Cartographic,new Be.Cartographic],f=new Be.Cartesian2,Fe={};function m(e){Be.Cartographic.fromRadians(e.east,e.north,0,g[0]),Be.Cartographic.fromRadians(e.west,e.north,0,g[1]),Be.Cartographic.fromRadians(e.east,e.south,0,g[2]),Be.Cartographic.fromRadians(e.west,e.south,0,g[3]);for(var a=0,t=0,n=0,r=0,i=Fe._terrainHeightsMaxLevel,s=0;s<=i;++s){for(var o=!1,l=0;l<4;++l){var u=g[l];if(h.positionToTileXY(u,s,f),0===l)n=f.x,r=f.y;else if(n!==f.x||r!==f.y){o=!0;break}}if(o)break;a=n,t=r}if(0!==s)return{x:a,y:t,level:i<s?i:s-1}}Fe.initialize=function(){var e=Fe._initPromise;return j.defined(e)?e:(e=je.Resource.fetchJson(je.buildModuleUrl("Assets/approximateTerrainHeights.json")).then(function(e){Fe._terrainHeights=e}),Fe._initPromise=e)},Fe.getMinimumMaximumHeights=function(e,a){a=j.defaultValue(a,Be.Ellipsoid.WGS84);var t,n,r,i,s=m(e),o=Fe._defaultMinTerrainHeight,l=Fe._defaultMaxTerrainHeight;return j.defined(s)&&(t=s.level+"-"+s.x+"-"+s.y,n=Fe._terrainHeights[t],j.defined(n)&&(o=n[0],l=n[1]),a.cartographicToCartesian(Be.Rectangle.northeast(e,C),u),a.cartographicToCartesian(Be.Rectangle.southwest(e,C),c),Be.Cartesian3.midpoint(c,u,p),r=a.scaleToGeodeticSurface(p,d),o=j.defined(r)?(i=Be.Cartesian3.distance(p,r),Math.min(o,-i)):Fe._defaultMinTerrainHeight),{minimumTerrainHeight:o=Math.max(Fe._defaultMinTerrainHeight,o),maximumTerrainHeight:l}},Fe.getBoundingSphere=function(e,a){a=j.defaultValue(a,Be.Ellipsoid.WGS84);var t,n,r=m(e),i=Fe._defaultMaxTerrainHeight;j.defined(r)&&(t=r.level+"-"+r.x+"-"+r.y,n=Fe._terrainHeights[t],j.defined(n)&&(i=n[1]));var s=je.BoundingSphere.fromRectangle3D(e,a,0);return je.BoundingSphere.fromRectangle3D(e,a,i,o),je.BoundingSphere.union(s,o,s)},Fe._terrainHeightsMaxLevel=6,Fe._defaultMaxTerrainHeight=9e3,Fe._defaultMinTerrainHeight=-1e5,Fe._terrainHeights=void 0,Fe._initPromise=void 0,Object.defineProperties(Fe,{initialized:{get:function(){return j.defined(Fe._terrainHeights)}}});var q=[je.GeographicProjection,n.WebMercatorProjection],s=q.length,qe=Math.cos(He.CesiumMath.toRadians(30)),w=Math.cos(He.CesiumMath.toRadians(150)),X=0,W=1e3;function v(e){var a=(e=j.defaultValue(e,j.defaultValue.EMPTY_OBJECT)).positions;this.width=j.defaultValue(e.width,1),this._positions=a,this.granularity=j.defaultValue(e.granularity,9999),this.loop=j.defaultValue(e.loop,!1),this.arcType=j.defaultValue(e.arcType,Y.ArcType.GEODESIC),this._ellipsoid=Be.Ellipsoid.WGS84,this._projectionIndex=0,this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}Object.defineProperties(v.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+Be.Ellipsoid.packedLength+1+1}}}),v.setProjectionAndEllipsoid=function(e,a){for(var t=0,n=0;n<s;n++)if(a instanceof q[n]){t=n;break}e._projectionIndex=t,e._ellipsoid=a.ellipsoid};var y=new Be.Cartesian3,M=new Be.Cartesian3,T=new Be.Cartesian3;function U(e,a,t,n,r){var i=J(n,e,0,y),s=J(n,e,t,M),o=J(n,a,0,T),l=Xe(s,i,M),u=Xe(o,i,T);return Be.Cartesian3.cross(u,l,r),Be.Cartesian3.normalize(r,r)}var _=new Be.Cartographic,O=new Be.Cartesian3,b=new Be.Cartesian3,P=new Be.Cartesian3;function Z(e,a,t,n,r,i,s,o,l,u,c){if(0!==r){var C;i===Y.ArcType.GEODESIC?C=new E.EllipsoidGeodesic(e,a,s):i===Y.ArcType.RHUMB&&(C=new F.EllipsoidRhumbLine(e,a,s));var p=C.surfaceDistance;if(!(p<r))for(var d=U(e,a,n,s,P),h=Math.ceil(p/r),g=p/h,f=g,m=h-1,w=o.length,v=0;v<m;v++){var y=C.interpolateUsingSurfaceDistance(f,_),M=J(s,y,t,O),T=J(s,y,n,b);Be.Cartesian3.pack(d,o,w),Be.Cartesian3.pack(M,l,w),Be.Cartesian3.pack(T,u,w),c.push(y.latitude),c.push(y.longitude),w+=3,f+=g}}}var l=new Be.Cartographic;function J(e,a,t,n){return Be.Cartographic.clone(a,l),l.height=t,Be.Cartographic.toCartesian(l,e,n)}function Xe(e,a,t){return Be.Cartesian3.subtract(e,a,t),Be.Cartesian3.normalize(t,t),t}function k(e,a,t,n){return n=Xe(e,a,n),n=Be.Cartesian3.cross(n,t,n),n=Be.Cartesian3.normalize(n,n),n=Be.Cartesian3.cross(t,n,n)}v.pack=function(e,a,t){var n=j.defaultValue(t,0),r=e._positions,i=r.length;a[n++]=i;for(var s=0;s<i;++s){var o=r[s];Be.Cartesian3.pack(o,a,n),n+=3}return a[n++]=e.granularity,a[n++]=e.loop?1:0,a[n++]=e.arcType,Be.Ellipsoid.pack(e._ellipsoid,a,n),n+=Be.Ellipsoid.packedLength,a[n++]=e._projectionIndex,a[n++]=e._scene3DOnly?1:0,a},v.unpack=function(e,a,t){for(var n=j.defaultValue(a,0),r=e[n++],i=new Array(r),s=0;s<r;s++)i[s]=Be.Cartesian3.unpack(e,n),n+=3;var o=e[n++],l=1===e[n++],u=e[n++],c=Be.Ellipsoid.unpack(e,n);n+=Be.Ellipsoid.packedLength;var C=e[n++],p=1===e[n++];return j.defined(t)||(t=new v({positions:i})),t._positions=i,t.granularity=o,t.loop=l,t.arcType=u,t._ellipsoid=c,t._projectionIndex=C,t._scene3DOnly=p,t};var A=new Be.Cartesian3,L=new Be.Cartesian3,S=new Be.Cartesian3,I=new Be.Cartesian3;function Q(e,a,t,n,r){var i=Xe(t,a,I),s=k(e,a,i,A),o=k(n,a,i,L);if(He.CesiumMath.equalsEpsilon(Be.Cartesian3.dot(s,o),-1,He.CesiumMath.EPSILON5))return r=Be.Cartesian3.cross(i,s,r),r=Be.Cartesian3.normalize(r,r);r=Be.Cartesian3.add(o,s,r),r=Be.Cartesian3.normalize(r,r);var l=Be.Cartesian3.cross(i,r,S);return Be.Cartesian3.dot(o,l)<0&&(r=Be.Cartesian3.negate(r,r)),r}var K=i.Plane.fromPointNormal(Be.Cartesian3.ZERO,Be.Cartesian3.UNIT_Y),$=new Be.Cartesian3,ee=new Be.Cartesian3,ae=new Be.Cartesian3,te=new Be.Cartesian3,ne=new Be.Cartesian3,re=new Be.Cartesian3,ie=new Be.Cartographic,se=new Be.Cartographic,oe=new Be.Cartographic;v.createGeometry=function(e){var a,t,n,r,i,s=!e._scene3DOnly,o=e.loop,l=e._ellipsoid,u=e.granularity,c=e.arcType,C=new q[e._projectionIndex](l),p=X,d=W,h=e._positions,g=h.length;2===g&&(o=!1);for(var f,m,w,v=new F.EllipsoidRhumbLine(void 0,void 0,l),y=[h[0]],M=0;M<g-1;M++)t=h[M],n=h[M+1],f=G.IntersectionTests.lineSegmentPlane(t,n,K,re),!j.defined(f)||Be.Cartesian3.equalsEpsilon(f,t,He.CesiumMath.EPSILON7)||Be.Cartesian3.equalsEpsilon(f,n,He.CesiumMath.EPSILON7)||(e.arcType===Y.ArcType.GEODESIC?y.push(Be.Cartesian3.clone(f)):e.arcType===Y.ArcType.RHUMB&&(w=l.cartesianToCartographic(f,ie).longitude,r=l.cartesianToCartographic(t,ie),i=l.cartesianToCartographic(n,se),v.setEndPoints(r,i),m=v.findIntersectionWithLongitude(w,oe),f=l.cartographicToCartesian(m,re),!j.defined(f)||Be.Cartesian3.equalsEpsilon(f,t,He.CesiumMath.EPSILON7)||Be.Cartesian3.equalsEpsilon(f,n,He.CesiumMath.EPSILON7)||y.push(Be.Cartesian3.clone(f)))),y.push(n);o&&(t=h[g-1],n=h[0],f=G.IntersectionTests.lineSegmentPlane(t,n,K,re),!j.defined(f)||Be.Cartesian3.equalsEpsilon(f,t,He.CesiumMath.EPSILON7)||Be.Cartesian3.equalsEpsilon(f,n,He.CesiumMath.EPSILON7)||(e.arcType===Y.ArcType.GEODESIC?y.push(Be.Cartesian3.clone(f)):e.arcType===Y.ArcType.RHUMB&&(w=l.cartesianToCartographic(f,ie).longitude,r=l.cartesianToCartographic(t,ie),i=l.cartesianToCartographic(n,se),v.setEndPoints(r,i),m=v.findIntersectionWithLongitude(w,oe),f=l.cartographicToCartesian(m,re),!j.defined(f)||Be.Cartesian3.equalsEpsilon(f,t,He.CesiumMath.EPSILON7)||Be.Cartesian3.equalsEpsilon(f,n,He.CesiumMath.EPSILON7)||y.push(Be.Cartesian3.clone(f)))));var T=y.length,E=new Array(T);for(M=0;M<T;M++){var _=Be.Cartographic.fromCartesian(y[M],l);_.height=0,E[M]=_}if(!((T=(E=V.arrayRemoveDuplicates(E,Be.Cartographic.equalsEpsilon)).length)<2)){var O=[],b=[],P=[],k=[],A=$,L=ee,S=ae,I=te,x=ne,N=E[0],R=E[1];for(A=J(l,E[T-1],p,A),I=J(l,R,p,I),L=J(l,N,p,L),S=J(l,N,d,S),x=o?Q(A,L,S,I,x):U(N,R,d,l,x),Be.Cartesian3.pack(x,b,0),Be.Cartesian3.pack(L,P,0),Be.Cartesian3.pack(S,k,0),O.push(N.latitude),O.push(N.longitude),Z(N,R,p,d,u,c,l,b,P,k,O),M=1;M<T-1;++M){A=Be.Cartesian3.clone(L,A),L=Be.Cartesian3.clone(I,L);var D=E[M];J(l,D,d,S),J(l,E[M+1],p,I),Q(A,L,S,I,x),a=b.length,Be.Cartesian3.pack(x,b,a),Be.Cartesian3.pack(L,P,a),Be.Cartesian3.pack(S,k,a),O.push(D.latitude),O.push(D.longitude),Z(E[M],E[M+1],p,d,u,c,l,b,P,k,O)}var z,H=E[T-1],B=E[T-2],L=J(l,H,p,L),S=J(l,H,d,S);if(x=o?(z=E[0],Q(A=J(l,B,p,A),L,S,I=J(l,z,p,I),x)):U(B,H,d,l,x),a=b.length,Be.Cartesian3.pack(x,b,a),Be.Cartesian3.pack(L,P,a),Be.Cartesian3.pack(S,k,a),O.push(H.latitude),O.push(H.longitude),o){for(Z(H,N,p,d,u,c,l,b,P,k,O),a=b.length,M=0;M<3;++M)b[a+M]=b[M],P[a+M]=P[M],k[a+M]=k[M];O.push(N.latitude),O.push(N.longitude)}return function(e,a,t,n,r,i,s){var o,l,u,c,C,p,d=a._ellipsoid,h=t.length/3-1,g=8*h,f=4*g,m=36*h,w=new(65535<g?Uint32Array:Uint16Array)(m),v=new Float64Array(3*g),y=new Float32Array(f),M=new Float32Array(f),T=new Float32Array(f),E=new Float32Array(f),_=new Float32Array(f);s&&(u=new Float32Array(f),c=new Float32Array(f),C=new Float32Array(f),p=new Float32Array(2*g));var O=i.length/2,b=0,P=Qe;P.height=0;var k=Ke;k.height=0;var A=$e,L=ea;if(s)for(l=0,o=1;o<O;o++)P.latitude=i[l],P.longitude=i[l+1],k.latitude=i[l+2],k.longitude=i[l+3],A=a.project(P,A),L=a.project(k,L),b+=Be.Cartesian3.distance(A,L),l+=2;var S=n.length/3;L=Be.Cartesian3.unpack(n,0,L);var I,x=0;for(l=3,o=1;o<S;o++)A=Be.Cartesian3.clone(L,A),L=Be.Cartesian3.unpack(n,l,L),x+=Be.Cartesian3.distance(A,L),l+=3;l=3;var N=0,R=0,D=0,z=0,H=!1,B=Be.Cartesian3.unpack(t,0,ta),j=Be.Cartesian3.unpack(n,0,ea),G=Be.Cartesian3.unpack(r,0,ra);{var V;e&&(V=Be.Cartesian3.unpack(t,t.length-6,aa),We(G,V,B,j)&&(G=Be.Cartesian3.negate(G,G)))}var Y,F,q,X,W,U,Z,J=0,Q=0,K=0;for(o=0;o<h;o++){var $,ee,ae=Be.Cartesian3.clone(B,aa),te=Be.Cartesian3.clone(j,$e),ne=Be.Cartesian3.clone(G,na);H&&(ne=Be.Cartesian3.negate(ne,ne)),B=Be.Cartesian3.unpack(t,l,ta),j=Be.Cartesian3.unpack(n,l,ea),G=Be.Cartesian3.unpack(r,l,ra),H=We(G,ae,B,j),P.latitude=i[N],P.longitude=i[N+1],k.latitude=i[N+2],k.longitude=i[N+3],s&&($=function(e,a){var t=Math.abs(e.longitude),n=Math.abs(a.longitude);{if(He.CesiumMath.equalsEpsilon(t,He.CesiumMath.PI,He.CesiumMath.EPSILON11)){var r=He.CesiumMath.sign(a.longitude);return e.longitude=r*(t-He.CesiumMath.EPSILON11),1}if(He.CesiumMath.equalsEpsilon(n,He.CesiumMath.PI,He.CesiumMath.EPSILON11)){var i=He.CesiumMath.sign(e.longitude);return a.longitude=i*(n-He.CesiumMath.EPSILON11),2}}return 0}(P,k),Y=a.project(P,Ca),(ee=Xe(F=a.project(k,pa),Y,Ea)).y=Math.abs(ee.y),q=da,X=ha,0===$||Be.Cartesian3.dot(ee,Be.Cartesian3.UNIT_Y)>qe?(q=Ue(a,P,ne,Y,da),X=Ue(a,k,G,F,ha)):1===$?(X=Ue(a,k,G,F,ha),q.x=0,q.y=He.CesiumMath.sign(P.longitude-Math.abs(k.longitude)),q.z=0):(q=Ue(a,P,ne,Y,da),X.x=0,X.y=He.CesiumMath.sign(P.longitude-k.longitude),X.z=0));var re=Be.Cartesian3.distance(te,j),ie=Ye.EncodedCartesian3.fromCartesian(ae,Ma),se=Be.Cartesian3.subtract(B,ae,ga),oe=Be.Cartesian3.normalize(se,wa),le=Be.Cartesian3.subtract(te,ae,fa);le=Be.Cartesian3.normalize(le,le);var ue=Be.Cartesian3.cross(oe,le,wa);ue=Be.Cartesian3.normalize(ue,ue);var ce=Be.Cartesian3.cross(le,ne,va);ce=Be.Cartesian3.normalize(ce,ce);var Ce=Be.Cartesian3.subtract(j,B,ma);Ce=Be.Cartesian3.normalize(Ce,Ce);var pe=Be.Cartesian3.cross(G,Ce,ya);pe=Be.Cartesian3.normalize(pe,pe);var de,he=re/x,ge=J/x,fe=0,me=0,we=0;for(s&&(fe=Be.Cartesian3.distance(Y,F),W=Ye.EncodedCartesian3.fromCartesian(Y,Ta),U=Be.Cartesian3.subtract(F,Y,Ea),de=(Z=Be.Cartesian3.normalize(U,_a)).x,Z.x=Z.y,Z.y=-de,me=fe/b,we=Q/b),I=0;I<8;I++){var ve=z+4*I,ye=R+2*I,Me=ve+3,Te=I<4?1:-1,Ee=2===I||3===I||6===I||7===I?1:-1;Be.Cartesian3.pack(ie.high,y,ve),y[Me]=se.x,Be.Cartesian3.pack(ie.low,M,ve),M[Me]=se.y,Be.Cartesian3.pack(ce,T,ve),T[Me]=se.z,Be.Cartesian3.pack(pe,E,ve),E[Me]=he*Te,Be.Cartesian3.pack(ue,_,ve);var _e=ge*Ee;0===_e&&Ee<0&&(_e=9),_[Me]=_e,s&&(u[ve]=W.high.x,u[ve+1]=W.high.y,u[ve+2]=W.low.x,u[ve+3]=W.low.y,C[ve]=-q.y,C[ve+1]=q.x,C[ve+2]=X.y,C[ve+3]=-X.x,c[ve]=U.x,c[ve+1]=U.y,c[ve+2]=Z.x,c[ve+3]=Z.y,p[ye]=me*Te,0===(_e=we*Ee)&&Ee<0&&(_e=9),p[ye+1]=_e)}var Oe=ua,be=ca,Pe=oa,ke=la,Ae=Be.Rectangle.fromCartographicArray(ia,sa),Le=Fe.getMinimumMaximumHeights(Ae,d),Se=Le.minimumTerrainHeight,Ie=Le.maximumTerrainHeight;K+=Se,K+=Ie,Ze(ae,te,Se,Ie,Oe,Pe),Ze(B,j,Se,Ie,be,ke);var xe=Be.Cartesian3.multiplyByScalar(ue,He.CesiumMath.EPSILON5,Oa);Be.Cartesian3.add(Oe,xe,Oe),Be.Cartesian3.add(be,xe,be),Be.Cartesian3.add(Pe,xe,Pe),Be.Cartesian3.add(ke,xe,ke),Je(Oe,be),Je(Pe,ke),Be.Cartesian3.pack(Oe,v,D),Be.Cartesian3.pack(be,v,D+3),Be.Cartesian3.pack(ke,v,D+6),Be.Cartesian3.pack(Pe,v,D+9),xe=Be.Cartesian3.multiplyByScalar(ue,-2*He.CesiumMath.EPSILON5,Oa),Be.Cartesian3.add(Oe,xe,Oe),Be.Cartesian3.add(be,xe,be),Be.Cartesian3.add(Pe,xe,Pe),Be.Cartesian3.add(ke,xe,ke),Je(Oe,be),Je(Pe,ke),Be.Cartesian3.pack(Oe,v,D+12),Be.Cartesian3.pack(be,v,D+15),Be.Cartesian3.pack(ke,v,D+18),Be.Cartesian3.pack(Pe,v,D+21),N+=2,l+=3,R+=16,D+=24,z+=32,J+=re,Q+=fe}var Ne=l=0;for(o=0;o<h;o++){for(I=0;I<ka;I++)w[l+I]=Pa[I]+Ne;Ne+=8,l+=ka}var Re=ba;je.BoundingSphere.fromVertices(t,Be.Cartesian3.ZERO,3,Re[0]),je.BoundingSphere.fromVertices(n,Be.Cartesian3.ZERO,3,Re[1]);var De=je.BoundingSphere.fromBoundingSpheres(Re);De.radius+=K/(2*h);var ze={position:new Ve.GeometryAttribute({componentDatatype:Ge.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:v}),startHiAndForwardOffsetX:Aa(y),startLoAndForwardOffsetY:Aa(M),startNormalAndForwardOffsetZ:Aa(T),endNormalAndTextureCoordinateNormalizationX:Aa(E),rightNormalAndTextureCoordinateNormalizationY:Aa(_)};s&&(ze.startHiLo2D=Aa(u),ze.offsetAndRight2D=Aa(c),ze.startEndNormals2D=Aa(C),ze.texcoordNormalization2D=new Ve.GeometryAttribute({componentDatatype:Ge.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:p}));return new Ve.Geometry({attributes:ze,indices:w,boundingSphere:De})}(o,C,P,k,b,O,s)}};var x=new Be.Cartesian3,N=new je.Matrix3,R=new je.Quaternion;function We(e,a,t,n){var r=Xe(t,a,x),i=Be.Cartesian3.dot(r,e);if(qe<i||i<w){var s=Xe(n,t,I),o=i<w?He.CesiumMath.PI_OVER_TWO:-He.CesiumMath.PI_OVER_TWO,l=je.Quaternion.fromAxisAngle(s,o,R),u=je.Matrix3.fromQuaternion(l,N);return je.Matrix3.multiplyByVector(u,e,e),!0}return!1}var D=new Be.Cartographic,z=new Be.Cartesian3,H=new Be.Cartesian3;function Ue(e,a,t,n,r){var i=Be.Cartographic.toCartesian(a,e._ellipsoid,z),s=Be.Cartesian3.add(i,t,H),o=!1,l=e._ellipsoid,u=l.cartesianToCartographic(s,D);Math.abs(a.longitude-u.longitude)>He.CesiumMath.PI_OVER_TWO&&(o=!0,s=Be.Cartesian3.subtract(i,t,H),u=l.cartesianToCartographic(s,D)),u.height=0;var c=e.project(u,r);return(r=Be.Cartesian3.subtract(c,n,r)).z=0,r=Be.Cartesian3.normalize(r,r),o&&Be.Cartesian3.negate(r,r),r}var B=new Be.Cartesian3,le=new Be.Cartesian3;function Ze(e,a,t,n,r,i){var s=Be.Cartesian3.subtract(a,e,B);Be.Cartesian3.normalize(s,s);var o=t-X,l=Be.Cartesian3.multiplyByScalar(s,o,le);Be.Cartesian3.add(e,l,r);var u=n-W,l=Be.Cartesian3.multiplyByScalar(s,u,le);Be.Cartesian3.add(a,l,i)}var ue=new Be.Cartesian3;function Je(e,a){var t=i.Plane.getPointDistance(K,e),n=i.Plane.getPointDistance(K,a),r=ue;He.CesiumMath.equalsEpsilon(t,0,He.CesiumMath.EPSILON2)?(r=Xe(a,e,r),Be.Cartesian3.multiplyByScalar(r,He.CesiumMath.EPSILON2,r),Be.Cartesian3.add(e,r,e)):He.CesiumMath.equalsEpsilon(n,0,He.CesiumMath.EPSILON2)&&(r=Xe(e,a,r),Be.Cartesian3.multiplyByScalar(r,He.CesiumMath.EPSILON2,r),Be.Cartesian3.add(a,r,a))}var Qe=new Be.Cartographic,Ke=new Be.Cartographic,$e=new Be.Cartesian3,ea=new Be.Cartesian3,aa=new Be.Cartesian3,ta=new Be.Cartesian3,na=new Be.Cartesian3,ra=new Be.Cartesian3,ia=[Qe,Ke],sa=new Be.Rectangle,oa=new Be.Cartesian3,la=new Be.Cartesian3,ua=new Be.Cartesian3,ca=new Be.Cartesian3,Ca=new Be.Cartesian3,pa=new Be.Cartesian3,da=new Be.Cartesian3,ha=new Be.Cartesian3,ga=new Be.Cartesian3,fa=new Be.Cartesian3,ma=new Be.Cartesian3,wa=new Be.Cartesian3,va=new Be.Cartesian3,ya=new Be.Cartesian3,Ma=new Ye.EncodedCartesian3,Ta=new Ye.EncodedCartesian3,Ea=new Be.Cartesian3,_a=new Be.Cartesian3,Oa=new Be.Cartesian3,ba=[new je.BoundingSphere,new je.BoundingSphere],Pa=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],ka=Pa.length;function Aa(e){return new Ve.GeometryAttribute({componentDatatype:Ge.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}return v._projectNormal=Ue,function(e,a){return Fe.initialize().then(function(){return j.defined(a)&&(e=v.unpack(e,a)),v.createGeometry(e)})}});