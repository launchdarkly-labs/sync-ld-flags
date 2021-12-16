var c="https://app.launchdarkly.com",p="405BFF",l="A34FDE",d="FF386B",m="3DD6F5",O=`fig://template?color=${d}&badge=\u{1F3F7}`,o=(e,t)=>{let n=v(e,t);return n>-1?e[n+1]:""},v=(e,t)=>{for(let n of t.name){let s=e.indexOf(n);if(s>-1)return s}return-1},i={listProjects:{script:e=>{let t=o(e,r);return`curl -s -X GET       ${o(e,a)||c}/api/v2/projects       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).items.map(n=>({name:n.key,insertValue:n.key,description:n.name,icon:`fig://template?color=${p}&badge=P`}))},listEnvironments:{script:e=>{let t=o(e,r),n=o(e,g);return`curl -s -X GET       ${o(e,a)||c}/api/v2/projects/${n}       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).environments.map(n=>({name:n.key,insertValue:n.key,description:n.name,icon:`fig://template?color=${n.color}&badge=E`}))},listFlags:{script:e=>{let t=o(e,r),n=o(e,g),s=o(e,u)||o(e,f),h=o(e,a)||c,y=s?`env=${s}`:"";return`curl -s -X GET       ${h}/api/v2/flags/${n}?${y}       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).items.map(n=>({name:n.key,insertValue:n.key,description:`${n.name} - ${n.description}`,icon:`fig://template?color=${l}&badge=\u2691`}))},listFlagTags:{script:e=>{let t=o(e,r);return`curl -s -X GET       ${o(e,a)||c}/api/v2/tags?kind=flag       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).items.map(n=>({name:n,icon:O}))}},g={name:["-p","--project-key"],description:"Project key",icon:`fig://template?color=${p}&badge=P`,priority:800,args:{name:"string",description:"Project key",debounce:!0,generators:i.listProjects}},r={name:["-t","--api-token"],description:"LaunchDarkly personal access token with write-level access.",icon:"fig://icon?type=asterisk",priority:900,args:{name:"string",description:"API access token"}},a={name:["-H","--host"],description:"Hostname override",icon:"fig://template?color=${}badge=\u{1F310}",args:{name:"URI",description:"LaunchDarkly URI"}},u={name:["-s","--source-env"],description:"Source environment",dependsOn:["-p"],icon:`fig://template?color=${m}&badge=E`,priority:700,args:{name:"string",description:"Environment key",debounce:!0,generators:i.listEnvironments}},f={name:["-d","--destination-env"],description:"Destination environment",dependsOn:["-p"],icon:`fig://template?color=${m}&badge=E`,priority:700,args:{name:"string",description:"Environment key",debounce:!0,generators:i.listEnvironments}},F={name:"sync-ld-flags",description:"Copy flag settings from one environment to another.",options:[{name:["-h","--help"],description:"Show help for sync-ld-flags"},g,u,f,r,{name:["-o","--omit-segments"],description:"Omit segments when syncing"},{name:["-f","--flag"],description:"Sync only the specified flag",icon:`fig://template?color=${l}&badge=\u2691`,dependsOn:["-p"],args:{name:"string",description:"Flag key",debounce:!0,generators:i.listFlags}},{name:["-T","--tag"],description:"Sync flags with the specified tag(s). Only flags with all tags will sync.",icon:`fig://template?color=${d}&badge=\u{1F3F7}`,args:{name:"string",description:"Tag name",isVariadic:!0,optionsCanBreakVariadicArg:!0,debounce:!0,generators:i.listFlagTags}},{name:["--dry-run"],description:"Preview changes"},a,{name:["-v","--verbose"],description:"Enable verbose logging"},{name:["-D","--debug"],description:"Enable HTTP debugging"}]},k=F;export{k as default};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3N5bmMtbGQtZmxhZ3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImludGVyZmFjZSBCYXNlT2JqZWN0IHtcbiAgbmFtZTogc3RyaW5nLFxuICBrZXk6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgV2l0aENvbG9yIHtcbiAgY29sb3I6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgUHJvamVjdCBleHRlbmRzIEJhc2VPYmplY3QsIFdpdGhDb2xvciB7fVxuaW50ZXJmYWNlIEVudmlyb25tZW50IGV4dGVuZHMgQmFzZU9iamVjdCwgV2l0aENvbG9yIHt9XG5pbnRlcmZhY2UgRmxhZyBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBkZXNjcmlwdGlvbjogc3RyaW5nXG59XG5cbmNvbnN0IERFRkFVTFRfSE9TVCA9ICdodHRwczovL2FwcC5sYXVuY2hkYXJrbHkuY29tJztcblxuLy8gQnJhbmQgY29sb3JzXG5jb25zdCBMRF9CTFVFX0hFWCA9ICc0MDVCRkYnO1xuY29uc3QgTERfUFVSUExFX0hFWCA9ICdBMzRGREUnO1xuY29uc3QgTERfUElOS19IRVggPSAnRkYzODZCJztcbmNvbnN0IExEX0NZQU5fSEVYID0gJzNERDZGNSc7XG5cbmNvbnN0IElDT05fVEFHID0gYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7TERfUElOS19IRVh9JmJhZGdlPVx1RDgzQ1x1REZGN2A7XG5cbmNvbnN0IGdldE9wdGlvbkZyb21Db250ZXh0ID0gKGNvbnRleHQsIG9wdGlvbjogRmlnLk9wdGlvbikgPT4ge1xuICBjb25zdCBpbmRleCA9IGdldE9wdGlvbkluZGV4RnJvbUNvbnRleHQoY29udGV4dCwgb3B0aW9uKTtcbiAgY29uc3QgdmFsdWUgPSBpbmRleCA+IC0xID8gY29udGV4dFtpbmRleCsxXSA6ICcnO1xuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuY29uc3QgZ2V0T3B0aW9uSW5kZXhGcm9tQ29udGV4dCA9IChjb250ZXh0LCBvcHRpb246IEZpZy5PcHRpb24pID0+IHtcbiAgZm9yIChjb25zdCBuYW1lIG9mIG9wdGlvbi5uYW1lKSB7XG4gICAgY29uc3QgaWR4ID0gY29udGV4dC5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbi8vIEdlbmVyYXRvcnMgdGhhdCBxdWVyeSB0aGUgQVBJXG5jb25zdCBhcGlHZW5lcmF0b3JzOiBSZWNvcmQ8c3RyaW5nLCBGaWcuR2VuZXJhdG9yPiA9IHtcbiAgbGlzdFByb2plY3RzOiB7XG4gICAgc2NyaXB0OiAoY29udGV4dCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW4gPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCB0b2tlbk9wdCk7XG4gICAgICBjb25zdCBob3N0ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgaG9zdE9wdCkgfHwgREVGQVVMVF9IT1NUO1xuICBcbiAgICAgIHJldHVybiBgY3VybCAtcyAtWCBHRVQgXFxcbiAgICAgICR7aG9zdH0vYXBpL3YyL3Byb2plY3RzIFxcXG4gICAgICAtSCAnQXV0aG9yaXphdGlvbjogJHt0b2tlbn0nYDtcbiAgICB9LFxuICAgIHBvc3RQcm9jZXNzOiAob3V0KSA9PiB7XG4gICAgICBjb25zdCBwcm9qZWN0czogUHJvamVjdFtdID0gSlNPTi5wYXJzZShvdXQpLml0ZW1zO1xuICBcbiAgICAgIHJldHVybiBwcm9qZWN0cy5tYXA8RmlnLlN1Z2dlc3Rpb24+KChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogaXRlbS5rZXksXG4gICAgICAgICAgaW5zZXJ0VmFsdWU6IGl0ZW0ua2V5LFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLm5hbWUsXG4gICAgICAgICAgaWNvbjogYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7TERfQkxVRV9IRVh9JmJhZGdlPVBgXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBsaXN0RW52aXJvbm1lbnRzOiB7XG4gICAgc2NyaXB0OiAoY29udGV4dCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW4gPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCB0b2tlbk9wdCk7XG4gICAgICBjb25zdCBwcm9qZWN0ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgcHJvamVjdE9wdCk7XG4gICAgICBjb25zdCBob3N0ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgaG9zdE9wdCkgfHwgREVGQVVMVF9IT1NUO1xuICAgICAgXG4gICAgICByZXR1cm4gYGN1cmwgLXMgLVggR0VUIFxcXG4gICAgICAke2hvc3R9L2FwaS92Mi9wcm9qZWN0cy8ke3Byb2plY3R9IFxcXG4gICAgICAtSCAnQXV0aG9yaXphdGlvbjogJHt0b2tlbn0nYDtcbiAgICB9LFxuICAgIHBvc3RQcm9jZXNzOiAob3V0KSA9PiB7XG4gICAgICBjb25zdCBlbnZzOiBFbnZpcm9ubWVudFtdID0gSlNPTi5wYXJzZShvdXQpLmVudmlyb25tZW50cztcbiAgXG4gICAgICByZXR1cm4gZW52cy5tYXA8RmlnLlN1Z2dlc3Rpb24+KChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogaXRlbS5rZXksXG4gICAgICAgICAgaW5zZXJ0VmFsdWU6IGl0ZW0ua2V5LFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLm5hbWUsXG4gICAgICAgICAgaWNvbjogYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7aXRlbS5jb2xvcn0mYmFkZ2U9RWBcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4gIGxpc3RGbGFnczoge1xuICAgIHNjcmlwdDogKGNvbnRleHQpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgdG9rZW5PcHQpO1xuICAgICAgY29uc3QgcHJvamVjdCA9IGdldE9wdGlvbkZyb21Db250ZXh0KGNvbnRleHQsIHByb2plY3RPcHQpO1xuICAgICAgY29uc3QgZW52ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgc291cmNlT3B0KSB8fCBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCBkZXN0aW5hdGlvbk9wdCk7XG4gICAgICBjb25zdCBob3N0ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgaG9zdE9wdCkgfHwgREVGQVVMVF9IT1NUO1xuICBcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGVudiA/IGBlbnY9JHtlbnZ9YDogJyc7XG4gICAgICBcbiAgICAgIHJldHVybiBgY3VybCAtcyAtWCBHRVQgXFxcbiAgICAgICR7aG9zdH0vYXBpL3YyL2ZsYWdzLyR7cHJvamVjdH0/JHtwYXJhbXN9IFxcXG4gICAgICAtSCAnQXV0aG9yaXphdGlvbjogJHt0b2tlbn0nYDtcbiAgICB9LFxuICAgIHBvc3RQcm9jZXNzOiAob3V0KSA9PiB7XG4gICAgICBjb25zdCBmbGFnczogRmxhZ1tdID0gSlNPTi5wYXJzZShvdXQpLml0ZW1zO1xuICBcbiAgICAgIHJldHVybiBmbGFncy5tYXA8RmlnLlN1Z2dlc3Rpb24+KChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogaXRlbS5rZXksXG4gICAgICAgICAgaW5zZXJ0VmFsdWU6IGl0ZW0ua2V5LFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgJHtpdGVtLm5hbWV9IC0gJHtpdGVtLmRlc2NyaXB0aW9ufWAsXG4gICAgICAgICAgaWNvbjogYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7TERfUFVSUExFX0hFWH0mYmFkZ2U9XHUyNjkxYFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgbGlzdEZsYWdUYWdzOiB7XG4gICAgc2NyaXB0OiAoY29udGV4dCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW4gPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCB0b2tlbk9wdCk7XG4gICAgICBjb25zdCBob3N0ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgaG9zdE9wdCkgfHwgREVGQVVMVF9IT1NUO1xuXG4gICAgICAvLyBOT1RFOiBBUEkgbm90IGZ1bGx5IHJlbGVhc2VkIHlldFxuICAgICAgLy8gSG93ZXZlciwgaWYgaXQgaXMgTk9UIGVuYWJsZWQgZm9yIHRoZSBnaXZlbiBhcHBsaWNhdGlvblxuICAgICAgLy8gaXQgd2lsbCBqdXN0IHJldHVybiBubyBzdWdnZXN0aW9uc1xuICAgICAgcmV0dXJuIGBjdXJsIC1zIC1YIEdFVCBcXFxuICAgICAgJHtob3N0fS9hcGkvdjIvdGFncz9raW5kPWZsYWcgXFxcbiAgICAgIC1IICdBdXRob3JpemF0aW9uOiAke3Rva2VufSdgO1xuICAgIH0sXG4gICAgcG9zdFByb2Nlc3M6IChvdXQpID0+IHtcbiAgICAgIGNvbnN0IHRhZ3M6IHN0cmluZ1tdID0gSlNPTi5wYXJzZShvdXQpLml0ZW1zO1xuXG4gICAgICByZXR1cm4gdGFncy5tYXA8RmlnLlN1Z2dlc3Rpb24+KCh0YWcpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiB0YWcsXG4gICAgICAgICAgaWNvbjogSUNPTl9UQUcsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgcHJvamVjdE9wdDogRmlnLk9wdGlvbiA9IHtcbiAgbmFtZTogW1wiLXBcIiwgXCItLXByb2plY3Qta2V5XCJdLFxuICBkZXNjcmlwdGlvbjogXCJQcm9qZWN0IGtleVwiLFxuICBpY29uOiBgZmlnOi8vdGVtcGxhdGU/Y29sb3I9JHtMRF9CTFVFX0hFWH0mYmFkZ2U9UGAsXG4gIHByaW9yaXR5OiA4MDAsXG4gIGFyZ3M6IHtcbiAgICBuYW1lOiBcInN0cmluZ1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlByb2plY3Qga2V5XCIsXG4gICAgZGVib3VuY2U6IHRydWUsXG4gICAgZ2VuZXJhdG9yczogYXBpR2VuZXJhdG9ycy5saXN0UHJvamVjdHMsXG4gIH1cbn07XG5cbmNvbnN0IHRva2VuT3B0OiBGaWcuT3B0aW9uID0ge1xuICBuYW1lOiBbXCItdFwiLCBcIi0tYXBpLXRva2VuXCJdLFxuICBkZXNjcmlwdGlvbjogXCJMYXVuY2hEYXJrbHkgcGVyc29uYWwgYWNjZXNzIHRva2VuIHdpdGggd3JpdGUtbGV2ZWwgYWNjZXNzLlwiLFxuICBpY29uOiBgZmlnOi8vaWNvbj90eXBlPWFzdGVyaXNrYCxcbiAgcHJpb3JpdHk6IDkwMCxcbiAgYXJnczoge1xuICAgIG5hbWU6IFwic3RyaW5nXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQVBJIGFjY2VzcyB0b2tlblwiXG4gIH1cbn07XG5cbmNvbnN0IGhvc3RPcHQ6IEZpZy5PcHRpb24gPSB7XG4gIG5hbWU6IFtcIi1IXCIsIFwiLS1ob3N0XCJdLFxuICBkZXNjcmlwdGlvbjogXCJIb3N0bmFtZSBvdmVycmlkZVwiLFxuICBpY29uOiBcImZpZzovL3RlbXBsYXRlP2NvbG9yPSR7fWJhZGdlPVx1RDgzQ1x1REYxMFwiLFxuICBhcmdzOiB7XG4gICAgbmFtZTogXCJVUklcIixcbiAgICBkZXNjcmlwdGlvbjogXCJMYXVuY2hEYXJrbHkgVVJJXCJcbiAgfSxcbn07XG5cbmNvbnN0IHNvdXJjZU9wdDogRmlnLk9wdGlvbiA9IHtcbiAgbmFtZTogW1wiLXNcIiwgXCItLXNvdXJjZS1lbnZcIl0sXG4gIGRlc2NyaXB0aW9uOiBcIlNvdXJjZSBlbnZpcm9ubWVudFwiLFxuICBkZXBlbmRzT246IFtcIi1wXCJdLFxuICBpY29uOiBgZmlnOi8vdGVtcGxhdGU/Y29sb3I9JHtMRF9DWUFOX0hFWH0mYmFkZ2U9RWAsXG4gIHByaW9yaXR5OiA3MDAsXG4gIGFyZ3M6IHtcbiAgICBuYW1lOiBcInN0cmluZ1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkVudmlyb25tZW50IGtleVwiLFxuICAgIGRlYm91bmNlOiB0cnVlLFxuICAgIGdlbmVyYXRvcnM6IGFwaUdlbmVyYXRvcnMubGlzdEVudmlyb25tZW50cyxcbiAgfSxcbn07XG5cbmNvbnN0IGRlc3RpbmF0aW9uT3B0OiBGaWcuT3B0aW9uID0ge1xuICBuYW1lOiBbXCItZFwiLCBcIi0tZGVzdGluYXRpb24tZW52XCJdLFxuICBkZXNjcmlwdGlvbjogXCJEZXN0aW5hdGlvbiBlbnZpcm9ubWVudFwiLFxuICBkZXBlbmRzT246IFtcIi1wXCJdLFxuICBpY29uOiBgZmlnOi8vdGVtcGxhdGU/Y29sb3I9JHtMRF9DWUFOX0hFWH0mYmFkZ2U9RWAsXG4gIHByaW9yaXR5OiA3MDAsXG4gIGFyZ3M6IHtcbiAgICBuYW1lOiBcInN0cmluZ1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkVudmlyb25tZW50IGtleVwiLFxuICAgIGRlYm91bmNlOiB0cnVlLFxuICAgIGdlbmVyYXRvcnM6IGFwaUdlbmVyYXRvcnMubGlzdEVudmlyb25tZW50cyxcbiAgfSxcbn07XG5cbmNvbnN0IGNvbXBsZXRpb25TcGVjOiBGaWcuU3BlYyA9IHtcbiAgbmFtZTogXCJzeW5jLWxkLWZsYWdzXCIsXG4gIGRlc2NyaXB0aW9uOiBcIkNvcHkgZmxhZyBzZXR0aW5ncyBmcm9tIG9uZSBlbnZpcm9ubWVudCB0byBhbm90aGVyLlwiLFxuICBvcHRpb25zOiBbXG4gICAge1xuICAgICAgbmFtZTogW1wiLWhcIiwgXCItLWhlbHBcIl0sXG4gICAgICBkZXNjcmlwdGlvbjogXCJTaG93IGhlbHAgZm9yIHN5bmMtbGQtZmxhZ3NcIixcbiAgICB9LFxuICAgIHByb2plY3RPcHQsXG4gICAgc291cmNlT3B0LFxuICAgIGRlc3RpbmF0aW9uT3B0LFxuICAgIHRva2VuT3B0LFxuICAgIHtcbiAgICAgIG5hbWU6IFtcIi1vXCIsIFwiLS1vbWl0LXNlZ21lbnRzXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiT21pdCBzZWdtZW50cyB3aGVuIHN5bmNpbmdcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFtcIi1mXCIsIFwiLS1mbGFnXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiU3luYyBvbmx5IHRoZSBzcGVjaWZpZWQgZmxhZ1wiLFxuICAgICAgaWNvbjogYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7TERfUFVSUExFX0hFWH0mYmFkZ2U9XHUyNjkxYCxcbiAgICAgIGRlcGVuZHNPbjogW1wiLXBcIl0sXG4gICAgICBhcmdzOiB7XG4gICAgICAgIG5hbWU6IFwic3RyaW5nXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkZsYWcga2V5XCIsXG4gICAgICAgIGRlYm91bmNlOiB0cnVlLFxuICAgICAgICBnZW5lcmF0b3JzOiBhcGlHZW5lcmF0b3JzLmxpc3RGbGFncyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBbXCItVFwiLCBcIi0tdGFnXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiU3luYyBmbGFncyB3aXRoIHRoZSBzcGVjaWZpZWQgdGFnKHMpLiBPbmx5IGZsYWdzIHdpdGggYWxsIHRhZ3Mgd2lsbCBzeW5jLlwiLFxuICAgICAgaWNvbjogYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7TERfUElOS19IRVh9JmJhZGdlPVx1RDgzQ1x1REZGN2AsXG4gICAgICBhcmdzOiB7XG4gICAgICAgIG5hbWU6IFwic3RyaW5nXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRhZyBuYW1lXCIsXG4gICAgICAgIGlzVmFyaWFkaWM6IHRydWUsXG4gICAgICAgIG9wdGlvbnNDYW5CcmVha1ZhcmlhZGljQXJnOiB0cnVlLFxuICAgICAgICBkZWJvdW5jZTogdHJ1ZSxcbiAgICAgICAgZ2VuZXJhdG9yczogYXBpR2VuZXJhdG9ycy5saXN0RmxhZ1RhZ3MsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogW1wiLS1kcnktcnVuXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiUHJldmlldyBjaGFuZ2VzXCIsXG4gICAgfSxcbiAgICBob3N0T3B0LFxuICAgIHtcbiAgICAgIG5hbWU6IFtcIi12XCIsIFwiLS12ZXJib3NlXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiRW5hYmxlIHZlcmJvc2UgbG9nZ2luZ1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogW1wiLURcIiwgXCItLWRlYnVnXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiRW5hYmxlIEhUVFAgZGVidWdnaW5nXCIsXG4gICAgfSxcbiAgXSxcbn07XG5leHBvcnQgZGVmYXVsdCBjb21wbGV0aW9uU3BlYzsiXSwKICAibWFwcGluZ3MiOiAiQUFlQSxHQUFNLEdBQWUsK0JBR2YsRUFBYyxTQUNkLEVBQWdCLFNBQ2hCLEVBQWMsU0FDZCxFQUFjLFNBRWQsRUFBVyx3QkFBd0Isb0JBRW5DLEVBQXVCLENBQUMsRUFBUyxJQUF1QixDQUM1RCxHQUFNLEdBQVEsRUFBMEIsRUFBUyxHQUdqRCxNQUZjLEdBQVEsR0FBSyxFQUFRLEVBQU0sR0FBSyxJQUsxQyxFQUE0QixDQUFDLEVBQVMsSUFBdUIsQ0FDakUsT0FBVyxLQUFRLEdBQU8sS0FBTSxDQUM5QixHQUFNLEdBQU0sRUFBUSxRQUFRLEdBQzVCLEdBQUksRUFBTSxHQUNSLE1BQU8sR0FJWCxNQUFPLElBSUgsRUFBK0MsQ0FDbkQsYUFBYyxDQUNaLE9BQVEsQUFBQyxHQUFZLENBQ25CLEdBQU0sR0FBUSxFQUFxQixFQUFTLEdBRzVDLE1BQU8sd0JBRk0sRUFBcUIsRUFBUyxJQUFZLDhDQUlsQyxNQUV2QixZQUFhLEFBQUMsR0FHTCxBQUZxQixLQUFLLE1BQU0sR0FBSyxNQUU1QixJQUFvQixBQUFDLEdBQzVCLEVBQ0wsS0FBTSxFQUFLLElBQ1gsWUFBYSxFQUFLLElBQ2xCLFlBQWEsRUFBSyxLQUNsQixLQUFNLHdCQUF3QixnQkFLdEMsaUJBQWtCLENBQ2hCLE9BQVEsQUFBQyxHQUFZLENBQ25CLEdBQU0sR0FBUSxFQUFxQixFQUFTLEdBQ3RDLEVBQVUsRUFBcUIsRUFBUyxHQUc5QyxNQUFPLHdCQUZNLEVBQXFCLEVBQVMsSUFBWSxxQkFHN0IsOEJBQ0wsTUFFdkIsWUFBYSxBQUFDLEdBR0wsQUFGcUIsS0FBSyxNQUFNLEdBQUssYUFFaEMsSUFBb0Is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
