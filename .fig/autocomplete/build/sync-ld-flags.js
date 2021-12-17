var g="https://app.launchdarkly.com",F="405BFF",E="3DD6F5",j="A34FDE",u="fig://template?badge=\u{1F511}",m=`fig://template?color=${E}&badge=E`,f=`fig://template?color=${j}&badge=\u2691`,O=`fig://template?color=${F}&badge=P`,h="fig://template?badge=\u{1F3F7}",b="fig://template?badge=\u{1F310}",s=(e,t)=>{let n=R(e,t);return n>-1?e[n+1]:""},R=(e,t)=>{for(let n of t.name){let o=e.indexOf(n);if(o>-1)return o}return-1},v=(e,t)=>n=>{let o=JSON.parse(n),p=[];for(let i in o)for(let d in o[i])d.toLowerCase()===e&&p.push({name:o[i][d],description:i,icon:t});return p},r={projects:{script:e=>{let t=s(e,a);return`curl -s -X GET       ${s(e,c)||g}/api/v2/projects       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).items.map(n=>({name:n.key,insertValue:n.key,description:n.name,icon:O}))},environments:{script:e=>{let t=s(e,a),n=s(e,l);return`curl -s -X GET       ${s(e,c)||g}/api/v2/projects/${n}       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).environments.map(n=>({name:n.key,insertValue:n.key,description:n.name,icon:`fig://template?color=${n.color}&badge=E`}))},flags:{script:e=>{let t=s(e,a),n=s(e,l),o=s(e,y)||s(e,k),p=s(e,c)||g,i=o?`env=${o}`:"";return`curl -s -X GET       ${p}/api/v2/flags/${n}?${i}       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).items.map(n=>({name:n.key,insertValue:n.key,description:`${n.name} - ${n.description}`,icon:f}))},flagTags:{script:e=>{let t=s(e,a);return`curl -s -X GET       ${s(e,c)||g}/api/v2/tags?kind=flag       -H 'Authorization: ${t}'`},postProcess:e=>JSON.parse(e).items.map(n=>({name:n,icon:h}))}},l={name:["-p","--project-key"],description:"Project key",isRepeatable:!1,isRequired:!0,icon:O,priority:800,args:{name:"string",description:"Project key",debounce:!0,generators:r.projects}},a={name:["-t","--api-token"],description:"LaunchDarkly personal access token with write-level access.",isRepeatable:!1,isRequired:!0,icon:u,priority:1e3,args:{name:"string",description:"API access token",generators:{script:"cat ~/.config/ldc.json",postProcess:v("apitoken",u)}}},c={name:["-H","--host"],description:"Hostname override",isRepeatable:!1,icon:b,args:{name:"URI",description:"LaunchDarkly URI",generators:{script:"cat ~/.config/ldc.json",postProcess:v("server",b)}}},y={name:["-s","--source-env"],description:"Source environment",dependsOn:["-p"],isRepeatable:!1,isRequired:!0,icon:m,priority:700,args:{name:"string",description:"Environment key",debounce:!0,generators:r.environments}},k={name:["-d","--destination-env"],description:"Destination environment",dependsOn:["-p"],isRepeatable:!1,isRequired:!0,icon:m,priority:600,args:{name:"string",description:"Environment key",debounce:!0,generators:r.environments}},P={name:"sync-ld-flags",description:"Copy flag settings from one environment to another.",options:[{name:["-h","--help"],description:"Show help for sync-ld-flags"},l,y,k,a,{name:["-o","--omit-segments"],description:"Omit segments when syncing",isRepeatable:!1},{name:["-f","--flag"],description:"Sync only the specified flag",isRepeatable:!1,icon:f,exclusiveOn:["-T","--tag"],args:{name:"string",description:"Flag key",debounce:!0,generators:r.flags}},{name:["-T","--tag"],description:"Sync flags with the specified tag(s). Only flags with all tags will sync.",icon:h,exclusiveOn:["-f","--flag"],args:{name:"string",description:"Tag name",isVariadic:!0,debounce:!0,generators:r.flagTags}},{name:["--dry-run"],description:"Preview changes",isRepeatable:!1},c,{name:["-v","--verbose"],description:"Enable verbose logging",isRepeatable:!1},{name:["-D","--debug"],description:"Enable HTTP debugging",isRepeatable:!1}]},S=P;export{S as default};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3N5bmMtbGQtZmxhZ3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImludGVyZmFjZSBCYXNlT2JqZWN0IHtcbiAgbmFtZTogc3RyaW5nLFxuICBrZXk6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgV2l0aENvbG9yIHtcbiAgY29sb3I6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgUHJvamVjdCBleHRlbmRzIEJhc2VPYmplY3QsIFdpdGhDb2xvciB7fVxuaW50ZXJmYWNlIEVudmlyb25tZW50IGV4dGVuZHMgQmFzZU9iamVjdCwgV2l0aENvbG9yIHt9XG5pbnRlcmZhY2UgRmxhZyBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBkZXNjcmlwdGlvbjogc3RyaW5nXG59XG5cbmNvbnN0IERFRkFVTFRfSE9TVCA9ICdodHRwczovL2FwcC5sYXVuY2hkYXJrbHkuY29tJztcblxuLy8gQnJhbmQgY29sb3JzXG5jb25zdCBMRF9CTFVFX0hFWCA9ICc0MDVCRkYnO1xuY29uc3QgTERfQ1lBTl9IRVggPSAnM0RENkY1JztcbmNvbnN0IExEX1BVUlBMRV9IRVggPSAnQTM0RkRFJztcblxuY29uc3QgSUNPTl9BUElfVE9LRU4gPSBgZmlnOi8vdGVtcGxhdGU/YmFkZ2U9XHVEODNEXHVERDExYDtcbmNvbnN0IElDT05fRU5WID0gYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7TERfQ1lBTl9IRVh9JmJhZGdlPUVgO1xuY29uc3QgSUNPTl9GTEFHID0gYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7TERfUFVSUExFX0hFWH0mYmFkZ2U9XHUyNjkxYDtcbmNvbnN0IElDT05fUFJPSkVDVCA9IGBmaWc6Ly90ZW1wbGF0ZT9jb2xvcj0ke0xEX0JMVUVfSEVYfSZiYWRnZT1QYDtcbmNvbnN0IElDT05fVEFHID0gYGZpZzovL3RlbXBsYXRlP2JhZGdlPVx1RDgzQ1x1REZGN2A7XG5jb25zdCBJQ09OX1VSSSA9IFwiZmlnOi8vdGVtcGxhdGU/YmFkZ2U9XHVEODNDXHVERjEwXCI7XG5cbmNvbnN0IGdldE9wdGlvbkZyb21Db250ZXh0ID0gKGNvbnRleHQsIG9wdGlvbjogRmlnLk9wdGlvbikgPT4ge1xuICBjb25zdCBpbmRleCA9IGdldE9wdGlvbkluZGV4RnJvbUNvbnRleHQoY29udGV4dCwgb3B0aW9uKTtcbiAgY29uc3QgdmFsdWUgPSBpbmRleCA+IC0xID8gY29udGV4dFtpbmRleCsxXSA6ICcnO1xuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuY29uc3QgZ2V0T3B0aW9uSW5kZXhGcm9tQ29udGV4dCA9IChjb250ZXh0LCBvcHRpb246IEZpZy5PcHRpb24pID0+IHtcbiAgZm9yIChjb25zdCBuYW1lIG9mIG9wdGlvbi5uYW1lKSB7XG4gICAgY29uc3QgaWR4ID0gY29udGV4dC5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbmNvbnN0IGdldFN1Z2dlc3Rpb25zRnJvbUNvbmZpZyA9IChrZXlOYW1lLCBpY29uKSA9PiB7XG4gIHJldHVybiAob3V0KSA9PiB7XG4gICAgY29uc3QgY29uZmlnID0gSlNPTi5wYXJzZShvdXQpO1xuXG4gICAgY29uc3Qgc3VnZ2VzdGlvbnM6IEZpZy5TdWdnZXN0aW9uW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbmZpZ1tuYW1lXSkge1xuICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09IGtleU5hbWUpIHtcbiAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGNvbmZpZ1tuYW1lXVtrZXldLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IG5hbWUsXG4gICAgICAgICAgICBpY29uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1Z2dlc3Rpb25zO1xuICB9XG59O1xuXG4vLyBHZW5lcmF0b3JzIHRoYXQgcXVlcnkgdGhlIEFQSVxuY29uc3QgYXBpR2VuZXJhdG9yczogUmVjb3JkPHN0cmluZywgRmlnLkdlbmVyYXRvcj4gPSB7XG4gIHByb2plY3RzOiB7XG4gICAgc2NyaXB0OiAoY29udGV4dCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW4gPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCB0b2tlbk9wdCk7XG4gICAgICBjb25zdCBob3N0ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgaG9zdE9wdCkgfHwgREVGQVVMVF9IT1NUO1xuICBcbiAgICAgIHJldHVybiBgY3VybCAtcyAtWCBHRVQgXFxcbiAgICAgICR7aG9zdH0vYXBpL3YyL3Byb2plY3RzIFxcXG4gICAgICAtSCAnQXV0aG9yaXphdGlvbjogJHt0b2tlbn0nYDtcbiAgICB9LFxuICAgIHBvc3RQcm9jZXNzOiAob3V0KSA9PiB7XG4gICAgICBjb25zdCBwcm9qZWN0czogUHJvamVjdFtdID0gSlNPTi5wYXJzZShvdXQpLml0ZW1zO1xuICBcbiAgICAgIHJldHVybiBwcm9qZWN0cy5tYXA8RmlnLlN1Z2dlc3Rpb24+KChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogaXRlbS5rZXksXG4gICAgICAgICAgaW5zZXJ0VmFsdWU6IGl0ZW0ua2V5LFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLm5hbWUsXG4gICAgICAgICAgaWNvbjogSUNPTl9QUk9KRUNULFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgZW52aXJvbm1lbnRzOiB7XG4gICAgc2NyaXB0OiAoY29udGV4dCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW4gPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCB0b2tlbk9wdCk7XG4gICAgICBjb25zdCBwcm9qZWN0ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgcHJvamVjdE9wdCk7XG4gICAgICBjb25zdCBob3N0ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgaG9zdE9wdCkgfHwgREVGQVVMVF9IT1NUO1xuICAgICAgXG4gICAgICByZXR1cm4gYGN1cmwgLXMgLVggR0VUIFxcXG4gICAgICAke2hvc3R9L2FwaS92Mi9wcm9qZWN0cy8ke3Byb2plY3R9IFxcXG4gICAgICAtSCAnQXV0aG9yaXphdGlvbjogJHt0b2tlbn0nYDtcbiAgICB9LFxuICAgIHBvc3RQcm9jZXNzOiAob3V0KSA9PiB7XG4gICAgICBjb25zdCBlbnZzOiBFbnZpcm9ubWVudFtdID0gSlNPTi5wYXJzZShvdXQpLmVudmlyb25tZW50cztcbiAgXG4gICAgICByZXR1cm4gZW52cy5tYXA8RmlnLlN1Z2dlc3Rpb24+KChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogaXRlbS5rZXksXG4gICAgICAgICAgaW5zZXJ0VmFsdWU6IGl0ZW0ua2V5LFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLm5hbWUsXG4gICAgICAgICAgaWNvbjogYGZpZzovL3RlbXBsYXRlP2NvbG9yPSR7aXRlbS5jb2xvcn0mYmFkZ2U9RWAsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBmbGFnczoge1xuICAgIHNjcmlwdDogKGNvbnRleHQpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgdG9rZW5PcHQpO1xuICAgICAgY29uc3QgcHJvamVjdCA9IGdldE9wdGlvbkZyb21Db250ZXh0KGNvbnRleHQsIHByb2plY3RPcHQpO1xuICAgICAgY29uc3QgZW52ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgc291cmNlT3B0KSB8fCBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCBkZXN0aW5hdGlvbk9wdCk7XG4gICAgICBjb25zdCBob3N0ID0gZ2V0T3B0aW9uRnJvbUNvbnRleHQoY29udGV4dCwgaG9zdE9wdCkgfHwgREVGQVVMVF9IT1NUO1xuICBcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGVudiA/IGBlbnY9JHtlbnZ9YDogJyc7XG4gICAgICBcbiAgICAgIHJldHVybiBgY3VybCAtcyAtWCBHRVQgXFxcbiAgICAgICR7aG9zdH0vYXBpL3YyL2ZsYWdzLyR7cHJvamVjdH0/JHtwYXJhbXN9IFxcXG4gICAgICAtSCAnQXV0aG9yaXphdGlvbjogJHt0b2tlbn0nYDtcbiAgICB9LFxuICAgIHBvc3RQcm9jZXNzOiAob3V0KSA9PiB7XG4gICAgICBjb25zdCBmbGFnczogRmxhZ1tdID0gSlNPTi5wYXJzZShvdXQpLml0ZW1zO1xuICBcbiAgICAgIHJldHVybiBmbGFncy5tYXA8RmlnLlN1Z2dlc3Rpb24+KChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogaXRlbS5rZXksXG4gICAgICAgICAgaW5zZXJ0VmFsdWU6IGl0ZW0ua2V5LFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgJHtpdGVtLm5hbWV9IC0gJHtpdGVtLmRlc2NyaXB0aW9ufWAsXG4gICAgICAgICAgaWNvbjogSUNPTl9GTEFHLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgZmxhZ1RhZ3M6IHtcbiAgICBzY3JpcHQ6IChjb250ZXh0KSA9PiB7XG4gICAgICBjb25zdCB0b2tlbiA9IGdldE9wdGlvbkZyb21Db250ZXh0KGNvbnRleHQsIHRva2VuT3B0KTtcbiAgICAgIGNvbnN0IGhvc3QgPSBnZXRPcHRpb25Gcm9tQ29udGV4dChjb250ZXh0LCBob3N0T3B0KSB8fCBERUZBVUxUX0hPU1Q7XG5cbiAgICAgIC8vIE5PVEU6IEFQSSBub3QgZnVsbHkgcmVsZWFzZWQgeWV0XG4gICAgICAvLyBIb3dldmVyLCBpZiBpdCBpcyBOT1QgZW5hYmxlZCBmb3IgdGhlIGdpdmVuIGFwcGxpY2F0aW9uXG4gICAgICAvLyBpdCB3aWxsIGp1c3QgcmV0dXJuIG5vIHN1Z2dlc3Rpb25zXG4gICAgICByZXR1cm4gYGN1cmwgLXMgLVggR0VUIFxcXG4gICAgICAke2hvc3R9L2FwaS92Mi90YWdzP2tpbmQ9ZmxhZyBcXFxuICAgICAgLUggJ0F1dGhvcml6YXRpb246ICR7dG9rZW59J2A7XG4gICAgfSxcbiAgICBwb3N0UHJvY2VzczogKG91dCkgPT4ge1xuICAgICAgY29uc3QgdGFnczogc3RyaW5nW10gPSBKU09OLnBhcnNlKG91dCkuaXRlbXM7XG5cbiAgICAgIHJldHVybiB0YWdzLm1hcDxGaWcuU3VnZ2VzdGlvbj4oKHRhZykgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IHRhZyxcbiAgICAgICAgICBpY29uOiBJQ09OX1RBRyxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBwcm9qZWN0T3B0OiBGaWcuT3B0aW9uID0ge1xuICBuYW1lOiBbXCItcFwiLCBcIi0tcHJvamVjdC1rZXlcIl0sXG4gIGRlc2NyaXB0aW9uOiBcIlByb2plY3Qga2V5XCIsXG4gIGlzUmVwZWF0YWJsZTogZmFsc2UsXG4gIGlzUmVxdWlyZWQ6IHRydWUsXG4gIGljb246IElDT05fUFJPSkVDVCxcbiAgcHJpb3JpdHk6IDgwMCxcbiAgYXJnczoge1xuICAgIG5hbWU6IFwic3RyaW5nXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUHJvamVjdCBrZXlcIixcbiAgICBkZWJvdW5jZTogdHJ1ZSxcbiAgICBnZW5lcmF0b3JzOiBhcGlHZW5lcmF0b3JzLnByb2plY3RzLFxuICB9LFxufTtcblxuY29uc3QgdG9rZW5PcHQ6IEZpZy5PcHRpb24gPSB7XG4gIG5hbWU6IFtcIi10XCIsIFwiLS1hcGktdG9rZW5cIl0sXG4gIGRlc2NyaXB0aW9uOiBcIkxhdW5jaERhcmtseSBwZXJzb25hbCBhY2Nlc3MgdG9rZW4gd2l0aCB3cml0ZS1sZXZlbCBhY2Nlc3MuXCIsXG4gIGlzUmVwZWF0YWJsZTogZmFsc2UsXG4gIGlzUmVxdWlyZWQ6IHRydWUsXG4gIGljb246IElDT05fQVBJX1RPS0VOLFxuICBwcmlvcml0eTogMTAwMCxcbiAgYXJnczoge1xuICAgIG5hbWU6IFwic3RyaW5nXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQVBJIGFjY2VzcyB0b2tlblwiLFxuICAgIGdlbmVyYXRvcnM6IHtcbiAgICAgIHNjcmlwdDogYGNhdCB+Ly5jb25maWcvbGRjLmpzb25gLFxuICAgICAgcG9zdFByb2Nlc3M6IGdldFN1Z2dlc3Rpb25zRnJvbUNvbmZpZygnYXBpdG9rZW4nLCBJQ09OX0FQSV9UT0tFTiksXG4gICAgfVxuICB9LFxufTtcblxuY29uc3QgaG9zdE9wdDogRmlnLk9wdGlvbiA9IHtcbiAgbmFtZTogW1wiLUhcIiwgXCItLWhvc3RcIl0sXG4gIGRlc2NyaXB0aW9uOiBcIkhvc3RuYW1lIG92ZXJyaWRlXCIsXG4gIGlzUmVwZWF0YWJsZTogZmFsc2UsXG4gIGljb246IElDT05fVVJJLFxuICBhcmdzOiB7XG4gICAgbmFtZTogXCJVUklcIixcbiAgICBkZXNjcmlwdGlvbjogXCJMYXVuY2hEYXJrbHkgVVJJXCIsXG4gICAgZ2VuZXJhdG9yczoge1xuICAgICAgc2NyaXB0OiBgY2F0IH4vLmNvbmZpZy9sZGMuanNvbmAsXG4gICAgICBwb3N0UHJvY2VzczogZ2V0U3VnZ2VzdGlvbnNGcm9tQ29uZmlnKCdzZXJ2ZXInLCBJQ09OX1VSSSksXG4gICAgfVxuICB9LFxufTtcblxuY29uc3Qgc291cmNlT3B0OiBGaWcuT3B0aW9uID0ge1xuICBuYW1lOiBbXCItc1wiLCBcIi0tc291cmNlLWVudlwiXSxcbiAgZGVzY3JpcHRpb246IFwiU291cmNlIGVudmlyb25tZW50XCIsXG4gIGRlcGVuZHNPbjogW1wiLXBcIl0sXG4gIGlzUmVwZWF0YWJsZTogZmFsc2UsXG4gIGlzUmVxdWlyZWQ6IHRydWUsXG4gIGljb246IElDT05fRU5WLFxuICBwcmlvcml0eTogNzAwLFxuICBhcmdzOiB7XG4gICAgbmFtZTogXCJzdHJpbmdcIixcbiAgICBkZXNjcmlwdGlvbjogXCJFbnZpcm9ubWVudCBrZXlcIixcbiAgICBkZWJvdW5jZTogdHJ1ZSxcbiAgICBnZW5lcmF0b3JzOiBhcGlHZW5lcmF0b3JzLmVudmlyb25tZW50cyxcbiAgfSxcbn07XG5cbmNvbnN0IGRlc3RpbmF0aW9uT3B0OiBGaWcuT3B0aW9uID0ge1xuICBuYW1lOiBbXCItZFwiLCBcIi0tZGVzdGluYXRpb24tZW52XCJdLFxuICBkZXNjcmlwdGlvbjogXCJEZXN0aW5hdGlvbiBlbnZpcm9ubWVudFwiLFxuICBkZXBlbmRzT246IFtcIi1wXCJdLFxuICBpc1JlcGVhdGFibGU6IGZhbHNlLFxuICBpc1JlcXVpcmVkOiB0cnVlLFxuICBpY29uOiBJQ09OX0VOVixcbiAgcHJpb3JpdHk6IDYwMCxcbiAgYXJnczoge1xuICAgIG5hbWU6IFwic3RyaW5nXCIsXG4gICAgZGVzY3JpcHRpb246IFwiRW52aXJvbm1lbnQga2V5XCIsXG4gICAgZGVib3VuY2U6IHRydWUsXG4gICAgZ2VuZXJhdG9yczogYXBpR2VuZXJhdG9ycy5lbnZpcm9ubWVudHMsXG4gIH0sXG59O1xuXG5jb25zdCBjb21wbGV0aW9uU3BlYzogRmlnLlNwZWMgPSB7XG4gIG5hbWU6IFwic3luYy1sZC1mbGFnc1wiLFxuICBkZXNjcmlwdGlvbjogXCJDb3B5IGZsYWcgc2V0dGluZ3MgZnJvbSBvbmUgZW52aXJvbm1lbnQgdG8gYW5vdGhlci5cIixcbiAgb3B0aW9uczogW1xuICAgIHtcbiAgICAgIG5hbWU6IFtcIi1oXCIsIFwiLS1oZWxwXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiU2hvdyBoZWxwIGZvciBzeW5jLWxkLWZsYWdzXCIsXG4gICAgfSxcbiAgICBwcm9qZWN0T3B0LFxuICAgIHNvdXJjZU9wdCxcbiAgICBkZXN0aW5hdGlvbk9wdCxcbiAgICB0b2tlbk9wdCxcbiAgICB7XG4gICAgICBuYW1lOiBbXCItb1wiLCBcIi0tb21pdC1zZWdtZW50c1wiXSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIk9taXQgc2VnbWVudHMgd2hlbiBzeW5jaW5nXCIsXG4gICAgICBpc1JlcGVhdGFibGU6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogW1wiLWZcIiwgXCItLWZsYWdcIl0sXG4gICAgICBkZXNjcmlwdGlvbjogXCJTeW5jIG9ubHkgdGhlIHNwZWNpZmllZCBmbGFnXCIsXG4gICAgICBpc1JlcGVhdGFibGU6IGZhbHNlLFxuICAgICAgaWNvbjogSUNPTl9GTEFHLFxuICAgICAgZXhjbHVzaXZlT246IFtcIi1UXCIsIFwiLS10YWdcIl0sXG4gICAgICBhcmdzOiB7XG4gICAgICAgIG5hbWU6IFwic3RyaW5nXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkZsYWcga2V5XCIsXG4gICAgICAgIGRlYm91bmNlOiB0cnVlLFxuICAgICAgICBnZW5lcmF0b3JzOiBhcGlHZW5lcmF0b3JzLmZsYWdzLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFtcIi1UXCIsIFwiLS10YWdcIl0sXG4gICAgICBkZXNjcmlwdGlvbjogXCJTeW5jIGZsYWdzIHdpdGggdGhlIHNwZWNpZmllZCB0YWcocykuIE9ubHkgZmxhZ3Mgd2l0aCBhbGwgdGFncyB3aWxsIHN5bmMuXCIsXG4gICAgICBpY29uOiBJQ09OX1RBRyxcbiAgICAgIGV4Y2x1c2l2ZU9uOiBbXCItZlwiLCBcIi0tZmxhZ1wiXSxcbiAgICAgIGFyZ3M6IHtcbiAgICAgICAgbmFtZTogXCJzdHJpbmdcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGFnIG5hbWVcIixcbiAgICAgICAgaXNWYXJpYWRpYzogdHJ1ZSxcbiAgICAgICAgZGVib3VuY2U6IHRydWUsXG4gICAgICAgIGdlbmVyYXRvcnM6IGFwaUdlbmVyYXRvcnMuZmxhZ1RhZ3MsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogW1wiLS1kcnktcnVuXCJdLFxuICAgICAgZGVzY3JpcHRpb246IFwiUHJldmlldyBjaGFuZ2VzXCIsXG4gICAgICBpc1JlcGVhdGFibGU6IGZhbHNlLFxuICAgIH0sXG4gICAgaG9zdE9wdCxcbiAgICB7XG4gICAgICBuYW1lOiBbXCItdlwiLCBcIi0tdmVyYm9zZVwiXSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkVuYWJsZSB2ZXJib3NlIGxvZ2dpbmdcIixcbiAgICAgIGlzUmVwZWF0YWJsZTogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBbXCItRFwiLCBcIi0tZGVidWdcIl0sXG4gICAgICBkZXNjcmlwdGlvbjogXCJFbmFibGUgSFRUUCBkZWJ1Z2dpbmdcIixcbiAgICAgIGlzUmVwZWF0YWJsZTogZmFsc2UsXG4gICAgfSxcbiAgXSxcbn07XG5leHBvcnQgZGVmYXVsdCBjb21wbGV0aW9uU3BlYzsiXSwKICAibWFwcGluZ3MiOiAiQUFlQSxHQUFNLEdBQWUsK0JBR2YsRUFBYyxTQUNkLEVBQWMsU0FDZCxFQUFnQixTQUVoQixFQUFpQixpQ0FDakIsRUFBVyx3QkFBd0IsWUFDbkMsRUFBWSx3QkFBd0IsaUJBQ3BDLEVBQWUsd0JBQXdCLFlBQ3ZDLEVBQVcsaUNBQ1gsRUFBVyxpQ0FFWCxFQUF1QixDQUFDLEVBQVMsSUFBdUIsQ0FDNUQsR0FBTSxHQUFRLEVBQTBCLEVBQVMsR0FHakQsTUFGYyxHQUFRLEdBQUssRUFBUSxFQUFNLEdBQUssSUFLMUMsRUFBNEIsQ0FBQyxFQUFTLElBQXVCLENBQ2pFLE9BQVcsS0FBUSxHQUFPLEtBQU0sQ0FDOUIsR0FBTSxHQUFNLEVBQVEsUUFBUSxHQUM1QixHQUFJLEVBQU0sR0FDUixNQUFPLEdBSVgsTUFBTyxJQUdILEVBQTJCLENBQUMsRUFBUyxJQUNsQyxBQUFDLEdBQVEsQ0FDZCxHQUFNLEdBQVMsS0FBSyxNQUFNLEdBRXBCLEVBQWdDLEdBRXRDLE9BQVcsS0FBUSxHQUNqQixPQUFXLEtBQU8sR0FBTyxHQUN2QixBQUFJLEVBQUksZ0JBQWtCLEdBQ3hCLEVBQVksS0FBSyxDQUNmLEtBQU0sRUFBTyxHQUFNLEdBQ25CLFlBQWEsRUFDYixTQUtSLE1BQU8sSUFLTCxFQUErQyxDQUNuRCxTQUFVLENBQ1IsT0FBUSxB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
