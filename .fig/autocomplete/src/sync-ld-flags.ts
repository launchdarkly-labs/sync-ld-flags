type Project = {
  name: string,
  key: string
}

type Environment = {
  name: string,
  key: string
}

const projectGenerator: Fig.Generator = {
  script(context) {
    const token = context[context.indexOf("-t")+1];
    
    // to do change url base
    return `curl -s -X GET \
    https://app.ld.catamorphic.com/api/v2/projects \
    -H 'Authorization: ${token}'`;
  },
  postProcess(out) {
    const projects: Project[] = JSON.parse(out).items;

    return projects.map<Fig.Suggestion>((item) => {
      return {
        name: item.key,
        insertValue: item.key,
        description: item.name,
      };
    });
  },
};

const environmentGenerator: Fig.Generator = {
  script(context) {
    const project = context[context.indexOf("-p")+1];
    const token = context[context.indexOf("-t")+1];
    
    // to do change url base
    return `curl -s -X GET \
    https://app.ld.catamorphic.com/api/v2/projects/${project} \
    -H 'Authorization: ${token}'`;
  },
  postProcess(out) {
    const envs: Environment[] = JSON.parse(out).environments;

    return envs.map<Fig.Suggestion>((item) => {
      return {
        name: item.key,
        insertValue: item.key,
        description: item.name,
      };
    });
  },
}; 

const completionSpec: Fig.Spec = {
  name: "sync-ld-flags",
  description: "LaunchDarkly Environment Synchronizer",
  // subcommands: [
  //   {
  //     name: "my_subcommand",
  //     description: "Example subcommand",
  //     subcommands: [{
  //       name: "my_nested_subcommand",
  //       description: "Nested subcommand, example usage: 'sync-ld-flags my_subcommand my_nested_subcommand'"
  //     }],
  //   },
  // ],
  options: [
    {
      name: ["--help", "-h"],
      description: "Show help for sync-ld-flags",
    },
    {
      name: ["--project-key", "-p"],
      description: "Project key",
      args: {
        name: "project-key",
        debounce: true,
        generators: projectGenerator,
      }
    },
    {
      name: ["--source-env", "-s"],
      description: "Source environment",
      dependsOn: ["-p"],
      args: {
        name: "source-env",
        debounce: true,
        generators: environmentGenerator,
      },
    },
    {
      name: ["--destination-env", "-d"],
      description: "Destination environment",
      dependsOn: ["-p"],
      args: {
        name: "source-env",
        debounce: true,
        generators: environmentGenerator,
      },
    },
    {
      name: ["--api-token", "-t"],
      description: "API token",
      args: {
        name: "api-token"
      }
    },
    {
      name: ["--omit-segments", "-o"],
      description: "Omit segments when syncing",
    },
    {
      name: ["--host", "-H"],
      description: "Hostname override",
    },
    {
      name: ["--debug", "-D"],
      description: "Enables HTTP debugging",
    },
  ],
  // Only uncomment if sync-ld-flags takes an argument
  // args: {}
};
export default completionSpec;