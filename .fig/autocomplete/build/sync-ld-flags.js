var c="https://app.launchdarkly.com",y="405BFF",v="3DD6F5",F="FF386B",k="A34FDE",g=`fig://template?color=${v}&badge=E`,l=`fig://template?color=${k}&badge=\u2691`,d=`fig://template?color=${y}&badge=P`,m=`fig://template?color=${F}&badge=\u{1F3F7}`,o=(e,t)=>{let n=E(e,t);return n>-1?e[n+1]:""},E=(e,t)=>{for(let n of t.name){let s=e.indexOf(n);if(s>-1)return s}return-1},r={projects:{script:e=>{let t=o(e,i);return`curl -s -X GET       ${o(e,a)||c}/api/v2/projects       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).items.map(n=>({name:n.key,insertValue:n.key,description:n.name,icon:d}))},environments:{script:e=>{let t=o(e,i),n=o(e,p);return`curl -s -X GET       ${o(e,a)||c}/api/v2/projects/${n}       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).environments.map(n=>({name:n.key,insertValue:n.key,description:n.name,icon:`fig://template?color=${n.color}&badge=E`}))},flags:{script:e=>{let t=o(e,i),n=o(e,p),s=o(e,u)||o(e,f),O=o(e,a)||c,h=s?`env=${s}`:"";return`curl -s -X GET       ${O}/api/v2/flags/${n}?${h}       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).items.map(n=>({name:n.key,insertValue:n.key,description:`${n.name} - ${n.description}`,icon:l}))},flagTags:{script:e=>{let t=o(e,i);return`curl -s -X GET       ${o(e,a)||c}/api/v2/tags?kind=flag       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).items.map(n=>({name:n,icon:m}))}},p={name:["-p","--project-key"],description:"Project key",icon:d,priority:800,args:{name:"string",description:"Project key",debounce:!0,generators:r.listProjects}},i={name:["-t","--api-token"],description:"LaunchDarkly personal access token with write-level access.",icon:"fig://icon?type=asterisk",priority:900,args:{name:"string",description:"API access token"}},a={name:["-H","--host"],description:"Hostname override",icon:"fig://template?color=${}badge=\u{1F310}",args:{name:"URI",description:"LaunchDarkly URI"}},u={name:["-s","--source-env"],description:"Source environment",dependsOn:["-p"],icon:g,priority:700,args:{name:"string",description:"Environment key",debounce:!0,generators:r.listEnvironments}},f={name:["-d","--destination-env"],description:"Destination environment",dependsOn:["-p"],icon:g,priority:700,args:{name:"string",description:"Environment key",debounce:!0,generators:r.listEnvironments}},b={name:"sync-ld-flags",description:"Copy flag settings from one environment to another.",options:[{name:["-h","--help"],description:"Show help for sync-ld-flags"},p,u,f,i,{name:["-o","--omit-segments"],description:"Omit segments when syncing"},{name:["-f","--flag"],description:"Sync only the specified flag",icon:l,args:{name:"string",description:"Flag key",debounce:!0,generators:r.listFlags}},{name:["-T","--tag"],description:"Sync flags with the specified tag(s). Only flags with all tags will sync.",icon:m,args:{name:"string",description:"Tag name",isVariadic:!0,optionsCanBreakVariadicArg:!0,debounce:!0,generators:r.listFlagTags}},{name:["--dry-run"],description:"Preview changes"},a,{name:["-v","--verbose"],description:"Enable verbose logging"},{name:["-D","--debug"],description:"Enable HTTP debugging"}]},$=b;export{$ as default};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3N5bmMtbGQtZmxhZ3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImludGVyZmFjZSBCYXNlT2JqZWN0IHtcbiAgbmFtZTogc3RyaW5nLFxuICBrZXk6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgV2l0aENvbG9yIHtcbiAgY29sb3I6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgUHJvamVjdCBleHRlbmRzIEJhc2VPYmplY3QsIFdpdGhDb2xvciB7fVxuaW50ZXJmYWNlIEVudmlyb25tZW50IGV4dGVuZHMgQmFzZU9iamVjdCwgV2l0aENvbG9yIHt9XG5pbnRlcmZhY2UgRmxhZyBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBkZXNjcmlwdGlvbjogc3RyaW5nXG59XG5cbmNvbnN0IERFRkFVTFRfSE9TVCA9ICdodHRwczovL2FwcC5sYXVuY2hkYXJrbHkuY29tJztcblxuLy8gQnJhbmQgY29sb3JzXG5jb25zdCBMRF9CTFVFX0hFWCA9ICc0MDVCRkYnO1xuY29uc3QgTERfQ1lBTl9IRVggPSAnM0RENkY1JztcbmNvbnN0IExEX1BJTktfSEVYID0gJ0ZGMzg2Qic7XG5jb25zdCBMRF9QVVJQTEVfSEVYID0gJ0EzNEZERSc7XG5cbmNvbnN0IElDT05fRU5WID0gYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7TERfQ1lBTl9IRVh9JmJhZGdlPUVgO1xuY29uc3QgSUNPTl9GTEFHID0gYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7TERfUFVSUExFX0hFWH0mYmFkZ2U9XHUyNjkxYDtcbmNvbnN0IElDT05fUFJPSkVDVCA9IGBmaWc6Ly90ZW1wbGF0ZT9jb2xvcj0ke0xEX0JMVUVfSEVYfSZiYWRnZT1QYDtcbmNvbnN0IElDT05fVEFHID0gYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7TERfUElOS19IRVh9JmJhZGdlPVx1RDgzQ1x1REZGN2A7XG5cbmNvbnN0IGdldE9wdGlvbkZyb21Db250ZXh0ID0gKGNvbnRleHQsIG9wdGlvbjogRmlnLk9wdGlvbikgPT4ge1xuICBjb25zdCBpbmRleCA9IGdldE9wdGlvbkluZGV4RnJvbUNvbnRleHQoY29udGV4dCwgb3B0aW9uKTtcbiAgY29uc3QgdmFsdWUgPSBpbmRleCA+IC0xID8gY29udGV4dFtpbmRleCsxXSA6ICcnO1xuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuY29uc3QgZ2V0T3B0aW9uSW5kZXhGcm9tQ29udGV4dCA9IChjb250ZXh0LCBvcHRpb246IEZpZy5PcHRpb24pID0+IHtcbiAgZm9yIChjb25zdCBuYW1lIG9mIG9wdGlvbi5uYW1lKSB7XG4gICAgY29uc3QgaWR4ID0gY29udGV4dC5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbi8vIEdlbmVyYXRvcnMgdGhhdCBxdWVyeSB0aGUgQVBJXG5jb25zdCBhcGlHZW5lcmF0b3JzOiBSZWNvcmQ8c3RyaW5nLCBGaWcuR2VuZXJhdG9yPiA9IHtcbiAgcHJvamVjdHM6IHtcbiAgICBzY3JpcHQ6IChjb250ZXh0KSA9PiB7XG4gICAgICBjb25zdCB0b2tlbiA9IGdldE9wdGlvbkZyb21Db250ZXh0KGNvbnRleHQsIHRva2VuT3B0KTtcbiAgICAgIGNvbnN0IGhvc3QgPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCBob3N0T3B0KSB8fCBERUZBVUxUX0hPU1Q7XG4gIFxuICAgICAgcmV0dXJuIGBjdXJsIC1zIC1YIEdFVCBcXFxuICAgICAgJHtob3N0fS9hcGkvdjIvcHJvamVjdHMgXFxcbiAgICAgIC1IICdBdXRob3JpemF0aW9uOiAke3Rva2VufSdgO1xuICAgIH0sXG4gICAgcG9zdFByb2Nlc3M6IChvdXQpID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3RzOiBQcm9qZWN0W10gPSBKU09OLnBhcnNlKG91dCkuaXRlbXM7XG4gIFxuICAgICAgcmV0dXJuIHByb2plY3RzLm1hcDxGaWcuU3VnZ2VzdGlvbj4oKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBpdGVtLmtleSxcbiAgICAgICAgICBpbnNlcnRWYWx1ZTogaXRlbS5rZXksXG4gICAgICAgICAgZGVzY3JpcHRpb246IGl0ZW0ubmFtZSxcbiAgICAgICAgICBpY29uOiBJQ09OX1BST0pFQ1QsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBlbnZpcm9ubWVudHM6IHtcbiAgICBzY3JpcHQ6IChjb250ZXh0KSA9PiB7XG4gICAgICBjb25zdCB0b2tlbiA9IGdldE9wdGlvbkZyb21Db250ZXh0KGNvbnRleHQsIHRva2VuT3B0KTtcbiAgICAgIGNvbnN0IHByb2plY3QgPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCBwcm9qZWN0T3B0KTtcbiAgICAgIGNvbnN0IGhvc3QgPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCBob3N0T3B0KSB8fCBERUZBVUxUX0hPU1Q7XG4gICAgICBcbiAgICAgIHJldHVybiBgY3VybCAtcyAtWCBHRVQgXFxcbiAgICAgICR7aG9zdH0vYXBpL3YyL3Byb2plY3RzLyR7cHJvamVjdH0gXFxcbiAgICAgIC1IICdBdXRob3JpemF0aW9uOiAke3Rva2VufSdgO1xuICAgIH0sXG4gICAgcG9zdFByb2Nlc3M6IChvdXQpID0+IHtcbiAgICAgIGNvbnN0IGVudnM6IEVudmlyb25tZW50W10gPSBKU09OLnBhcnNlKG91dCkuZW52aXJvbm1lbnRzO1xuICBcbiAgICAgIHJldHVybiBlbnZzLm1hcDxGaWcuU3VnZ2VzdGlvbj4oKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBpdGVtLmtleSxcbiAgICAgICAgICBpbnNlcnRWYWx1ZTogaXRlbS5rZXksXG4gICAgICAgICAgZGVzY3JpcHRpb246IGl0ZW0ubmFtZSxcbiAgICAgICAgICBpY29uOiBgZmlnOi8vdGVtcGxhdGU/Y29sb3I9JHtpdGVtLmNvbG9yfSZiYWRnZT1FYCxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4gIGZsYWdzOiB7XG4gICAgc2NyaXB0OiAoY29udGV4dCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW4gPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCB0b2tlbk9wdCk7XG4gICAgICBjb25zdCBwcm9qZWN0ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgcHJvamVjdE9wdCk7XG4gICAgICBjb25zdCBlbnYgPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCBzb3VyY2VPcHQpIHx8IGdldE9wdGlvbkZyb21Db250ZXh0KGNvbnRleHQsIGRlc3RpbmF0aW9uT3B0KTtcbiAgICAgIGNvbnN0IGhvc3QgPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCBob3N0T3B0KSB8fCBERUZBVUxUX0hPU1Q7XG4gIFxuICAgICAgY29uc3QgcGFyYW1zID0gZW52ID8gYGVudj0ke2Vudn1gOiAnJztcbiAgICAgIFxuICAgICAgcmV0dXJuIGBjdXJsIC1zIC1YIEdFVCBcXFxuICAgICAgJHtob3N0fS9hcGkvdjIvZmxhZ3MvJHtwcm9qZWN0fT8ke3BhcmFtc30gXFxcbiAgICAgIC1IICdBdXRob3JpemF0aW9uOiAke3Rva2VufSdgO1xuICAgIH0sXG4gICAgcG9zdFByb2Nlc3M6IChvdXQpID0+IHtcbiAgICAgIGNvbnN0IGZsYWdzOiBGbGFnW10gPSBKU09OLnBhcnNlKG91dCkuaXRlbXM7XG4gIFxuICAgICAgcmV0dXJuIGZsYWdzLm1hcDxGaWcuU3VnZ2VzdGlvbj4oKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBpdGVtLmtleSxcbiAgICAgICAgICBpbnNlcnRWYWx1ZTogaXRlbS5rZXksXG4gICAgICAgICAgZGVzY3JpcHRpb246IGAke2l0ZW0ubmFtZX0gLSAke2l0ZW0uZGVzY3JpcHRpb259YCxcbiAgICAgICAgICBpY29uOiBJQ09OX0ZMQUcsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBmbGFnVGFnczoge1xuICAgIHNjcmlwdDogKGNvbnRleHQpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgdG9rZW5PcHQpO1xuICAgICAgY29uc3QgaG9zdCA9IGdldE9wdGlvbkZyb21Db250ZXh0KGNvbnRleHQsIGhvc3RPcHQpIHx8IERFRkFVTFRfSE9TVDtcblxuICAgICAgLy8gTk9URTogQVBJIG5vdCBmdWxseSByZWxlYXNlZCB5ZXRcbiAgICAgIC8vIEhvd2V2ZXIsIGlmIGl0IGlzIE5PVCBlbmFibGVkIGZvciB0aGUgZ2l2ZW4gYXBwbGljYXRpb25cbiAgICAgIC8vIGl0IHdpbGwganVzdCByZXR1cm4gbm8gc3VnZ2VzdGlvbnNcbiAgICAgIHJldHVybiBgY3VybCAtcyAtWCBHRVQgXFxcbiAgICAgICR7aG9zdH0vYXBpL3YyL3RhZ3M/a2luZD1mbGFnIFxcXG4gICAgICAtSCAnQXV0aG9yaXphdGlvbjogJHt0b2tlbn0nYDtcbiAgICB9LFxuICAgIHBvc3RQcm9jZXNzOiAob3V0KSA9PiB7XG4gICAgICBjb25zdCB0YWdzOiBzdHJpbmdbXSA9IEpTT04ucGFyc2Uob3V0KS5pdGVtcztcblxuICAgICAgcmV0dXJuIHRhZ3MubWFwPEZpZy5TdWdnZXN0aW9uPigodGFnKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogdGFnLFxuICAgICAgICAgIGljb246IElDT05fVEFHLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IHByb2plY3RPcHQ6IEZpZy5PcHRpb24gPSB7XG4gIG5hbWU6IFtcIi1wXCIsIFwiLS1wcm9qZWN0LWtleVwiXSxcbiAgZGVzY3JpcHRpb246IFwiUHJvamVjdCBrZXlcIixcbiAgaWNvbjogSUNPTl9QUk9KRUNULFxuICBwcmlvcml0eTogODAwLFxuICBhcmdzOiB7XG4gICAgbmFtZTogXCJzdHJpbmdcIixcbiAgICBkZXNjcmlwdGlvbjogXCJQcm9qZWN0IGtleVwiLFxuICAgIGRlYm91bmNlOiB0cnVlLFxuICAgIGdlbmVyYXRvcnM6IGFwaUdlbmVyYXRvcnMubGlzdFByb2plY3RzLFxuICB9XG59O1xuXG5jb25zdCB0b2tlbk9wdDogRmlnLk9wdGlvbiA9IHtcbiAgbmFtZTogW1wiLXRcIiwgXCItLWFwaS10b2tlblwiXSxcbiAgZGVzY3JpcHRpb246IFwiTGF1bmNoRGFya2x5IHBlcnNvbmFsIGFjY2VzcyB0b2tlbiB3aXRoIHdyaXRlLWxldmVsIGFjY2Vzcy5cIixcbiAgaWNvbjogYGZpZzovL2ljb24/dHlwZT1hc3Rlcmlza2AsXG4gIHByaW9yaXR5OiA5MDAsXG4gIGFyZ3M6IHtcbiAgICBuYW1lOiBcInN0cmluZ1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFQSSBhY2Nlc3MgdG9rZW5cIlxuICB9XG59O1xuXG5jb25zdCBob3N0T3B0OiBGaWcuT3B0aW9uID0ge1xuICBuYW1lOiBbXCItSFwiLCBcIi0taG9zdFwiXSxcbiAgZGVzY3JpcHRpb246IFwiSG9zdG5hbWUgb3ZlcnJpZGVcIixcbiAgaWNvbjogXCJmaWc6Ly90ZW1wbGF0ZT9jb2xvcj0ke31iYWRnZT1cdUQ4M0NcdURGMTBcIixcbiAgYXJnczoge1xuICAgIG5hbWU6IFwiVVJJXCIsXG4gICAgZGVzY3JpcHRpb246IFwiTGF1bmNoRGFya2x5IFVSSVwiXG4gIH0sXG59O1xuXG5jb25zdCBzb3VyY2VPcHQ6IEZpZy5PcHRpb24gPSB7XG4gIG5hbWU6IFtcIi1zXCIsIFwiLS1zb3VyY2UtZW52XCJdLFxuICBkZXNjcmlwdGlvbjogXCJTb3VyY2UgZW52aXJvbm1lbnRcIixcbiAgZGVwZW5kc09uOiBbXCItcFwiXSxcbiAgaWNvbjogSUNPTl9FTlYsXG4gIHByaW9yaXR5OiA3MDAsXG4gIGFyZ3M6IHtcbiAgICBuYW1lOiBcInN0cmluZ1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkVudmlyb25tZW50IGtleVwiLFxuICAgIGRlYm91bmNlOiB0cnVlLFxuICAgIGdlbmVyYXRvcnM6IGFwaUdlbmVyYXRvcnMubGlzdEVudmlyb25tZW50cyxcbiAgfSxcbn07XG5cbmNvbnN0IGRlc3RpbmF0aW9uT3B0OiBGaWcuT3B0aW9uID0ge1xuICBuYW1lOiBbXCItZFwiLCBcIi0tZGVzdGluYXRpb24tZW52XCJdLFxuICBkZXNjcmlwdGlvbjogXCJEZXN0aW5hdGlvbiBlbnZpcm9ubWVudFwiLFxuICBkZXBlbmRzT246IFtcIi1wXCJdLFxuICBpY29uOiBJQ09OX0VOVixcbiAgcHJpb3JpdHk6IDcwMCxcbiAgYXJnczoge1xuICAgIG5hbWU6IFwic3RyaW5nXCIsXG4gICAgZGVzY3JpcHRpb246IFwiRW52aXJvbm1lbnQga2V5XCIsXG4gICAgZGVib3VuY2U6IHRydWUsXG4gICAgZ2VuZXJhdG9yczogYXBpR2VuZXJhdG9ycy5saXN0RW52aXJvbm1lbnRzLFxuICB9LFxufTtcblxuY29uc3QgY29tcGxldGlvblNwZWM6IEZpZy5TcGVjID0ge1xuICBuYW1lOiBcInN5bmMtbGQtZmxhZ3NcIixcbiAgZGVzY3JpcHRpb246IFwiQ29weSBmbGFnIHNldHRpbmdzIGZyb20gb25lIGVudmlyb25tZW50IHRvIGFub3RoZXIuXCIsXG4gIG9wdGlvbnM6IFtcbiAgICB7XG4gICAgICBuYW1lOiBbXCItaFwiLCBcIi0taGVscFwiXSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlNob3cgaGVscCBmb3Igc3luYy1sZC1mbGFnc1wiLFxuICAgIH0sXG4gICAgcHJvamVjdE9wdCxcbiAgICBzb3VyY2VPcHQsXG4gICAgZGVzdGluYXRpb25PcHQsXG4gICAgdG9rZW5PcHQsXG4gICAge1xuICAgICAgbmFtZTogW1wiLW9cIiwgXCItLW9taXQtc2VnbWVudHNcIl0sXG4gICAgICBkZXNjcmlwdGlvbjogXCJPbWl0IHNlZ21lbnRzIHdoZW4gc3luY2luZ1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogW1wiLWZcIiwgXCItLWZsYWdcIl0sXG4gICAgICBkZXNjcmlwdGlvbjogXCJTeW5jIG9ubHkgdGhlIHNwZWNpZmllZCBmbGFnXCIsXG4gICAgICBpY29uOiBJQ09OX0ZMQUcsXG4gICAgICBhcmdzOiB7XG4gICAgICAgIG5hbWU6IFwic3RyaW5nXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkZsYWcga2V5XCIsXG4gICAgICAgIGRlYm91bmNlOiB0cnVlLFxuICAgICAgICBnZW5lcmF0b3JzOiBhcGlHZW5lcmF0b3JzLmxpc3RGbGFncyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBbXCItVFwiLCBcIi0tdGFnXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiU3luYyBmbGFncyB3aXRoIHRoZSBzcGVjaWZpZWQgdGFnKHMpLiBPbmx5IGZsYWdzIHdpdGggYWxsIHRhZ3Mgd2lsbCBzeW5jLlwiLFxuICAgICAgaWNvbjogSUNPTl9UQUcsXG4gICAgICBhcmdzOiB7XG4gICAgICAgIG5hbWU6IFwic3RyaW5nXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRhZyBuYW1lXCIsXG4gICAgICAgIGlzVmFyaWFkaWM6IHRydWUsXG4gICAgICAgIG9wdGlvbnNDYW5CcmVha1ZhcmlhZGljQXJnOiB0cnVlLFxuICAgICAgICBkZWJvdW5jZTogdHJ1ZSxcbiAgICAgICAgZ2VuZXJhdG9yczogYXBpR2VuZXJhdG9ycy5saXN0RmxhZ1RhZ3MsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogW1wiLS1kcnktcnVuXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiUHJldmlldyBjaGFuZ2VzXCIsXG4gICAgfSxcbiAgICBob3N0T3B0LFxuICAgIHtcbiAgICAgIG5hbWU6IFtcIi12XCIsIFwiLS12ZXJib3NlXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiRW5hYmxlIHZlcmJvc2UgbG9nZ2luZ1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogW1wiLURcIiwgXCItLWRlYnVnXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiRW5hYmxlIEhUVFAgZGVidWdnaW5nXCIsXG4gICAgfSxcbiAgXSxcbn07XG5leHBvcnQgZGVmYXVsdCBjb21wbGV0aW9uU3BlYzsiXSwKICAibWFwcGluZ3MiOiAiQUFlQSxHQUFNLEdBQWUsK0JBR2YsRUFBYyxTQUNkLEVBQWMsU0FDZCxFQUFjLFNBQ2QsRUFBZ0IsU0FFaEIsRUFBVyx3QkFBd0IsWUFDbkMsRUFBWSx3QkFBd0IsaUJBQ3BDLEVBQWUsd0JBQXdCLFlBQ3ZDLEVBQVcsd0JBQXdCLG9CQUVuQyxFQUF1QixDQUFDLEVBQVMsSUFBdUIsQ0FDNUQsR0FBTSxHQUFRLEVBQTBCLEVBQVMsR0FHakQsTUFGYyxHQUFRLEdBQUssRUFBUSxFQUFNLEdBQUssSUFLMUMsRUFBNEIsQ0FBQyxFQUFTLElBQXVCLENBQ2pFLE9BQVcsS0FBUSxHQUFPLEtBQU0sQ0FDOUIsR0FBTSxHQUFNLEVBQVEsUUFBUSxHQUM1QixHQUFJLEVBQU0sR0FDUixNQUFPLEdBSVgsTUFBTyxJQUlILEVBQStDLENBQ25ELFNBQVUsQ0FDUixPQUFRLEFBQUMsR0FBWSxDQUNuQixHQUFNLEdBQVEsRUFBcUIsRUFBUyxHQUc1QyxNQUFPLHdCQUZNLEVBQXFCLEVBQVMsSUFBWSw4Q0FJbEMsTUFFdkIsWUFBYSxBQUFDLEdBR0wsQUFGcUIsS0FBSyxNQUFNLEdBQUssTUFFNUIsSUFBb0IsQUFBQyxHQUM1QixFQUNMLEtBQU0sRUFBSyxJQUNYLFlBQWEsRUFBSyxJQUNsQixZQUFhLEVBQUssS0FDbEIsS0FBTSxNQUtkLGFBQWMsQ0FDWixPQUFRLEFBQUMsR0FBWSxDQUNuQixHQUFNLEdBQVEsRUFBcUIsRUFBUyxHQUN0QyxFQUFVLEVBQXFCLEVBQVMsR0FHOUMsTUFBTyx3QkFGTSxFQUFxQixFQUFTLElBQVkscUJBRzdCLDhCQUNMLE1BRXZCLFlBQWEsQUFBQyxHQUdMLEFBRnFCLEtBQUssTUFBTSxHQUFLLGFBRWhDLElBQW9CLEFBQUMsR0FDeEIsRUFDTCxLQUFNLEVBQUssSUFDWCxZQUFhLEVBQUssSUFDbEIsWUFBYSxFQUFLLEtBQ2xCLEtB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
