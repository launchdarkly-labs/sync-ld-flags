interface BaseObject {
  name: string,
  key: string
}

interface Project extends BaseObject {}
interface Environment extends BaseObject {}
interface Flag extends BaseObject {
  description: string
}

const DEFAULT_HOST = 'https://app.launchdarkly.com';

const getOptionFromContext = (context, option: Fig.Option) => {
  const index = getOptionIndexFromContext(context, option);
  const value = index > -1 ? context[index+1] : '';

  return value;
}

const getOptionIndexFromContext = (context, option: Fig.Option) => {
  for (const name of option.name) {
    const idx = context.indexOf(name);
    if (idx > -1) {
      return idx;
    }
  }

  return -1;
}

const projectGenerator: Fig.Generator = {
  script(context) {
    const token = getOptionFromContext(context, tokenOpt);
    const host = getOptionFromContext(context, hostOpt) || DEFAULT_HOST;

    return `curl -s -X GET \
    ${host}/api/v2/projects \
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
    const token = getOptionFromContext(context, tokenOpt);
    const project = getOptionFromContext(context, projectOpt);
    const host = getOptionFromContext(context, hostOpt) || DEFAULT_HOST;
    
    return `curl -s -X GET \
    ${host}/api/v2/projects/${project} \
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

const flagGenerator: Fig.Generator = {
  script(context) {
    const token = getOptionFromContext(context, tokenOpt);
    const project = getOptionFromContext(context, projectOpt);
    const env = getOptionFromContext(context, sourceOpt) || getOptionFromContext(context, destinationOpt);
    const host = getOptionFromContext(context, hostOpt) || DEFAULT_HOST;

    const params = env ? `env=${env}`: '';
    
    return `curl -s -X GET \
    ${host}/api/v2/flags/${project}?${params} \
    -H 'Authorization: ${token}'`;
  },
  postProcess(out) {
    const flags: Flag[] = JSON.parse(out).items;

    return flags.map<Fig.Suggestion>((item) => {
      return {
        name: item.key,
        insertValue: item.key,
        description: `${item.name} - ${item.description}`,
      };
    });
  },
};

const projectOpt: Fig.Option = {
  name: ["--project-key", "-p"],
      description: "Project key",
      args: {
        name: "project-key",
        debounce: true,
        generators: projectGenerator,
      }
};

const tokenOpt: Fig.Option = {
  name: ["--api-token", "-t"],
  description: "API token",
  args: {
    name: "api-token"
  }
};

const hostOpt: Fig.Option = {
  name: ["--host", "-H"],
  description: "Hostname override",
  args: {
    name: "host",
  },
};

const sourceOpt: Fig.Option = {
  name: ["--source-env", "-s"],
  description: "Source environment",
  dependsOn: ["-p"],
  args: {
    name: "source-env",
    debounce: true,
    generators: environmentGenerator,
  },
};

const destinationOpt: Fig.Option = {
  name: ["--destination-env", "-d"],
  description: "Destination environment",
  dependsOn: ["-p"],
  args: {
    name: "source-env",
    debounce: true,
    generators: environmentGenerator,
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
    projectOpt,
    sourceOpt,
    destinationOpt,
    tokenOpt,
    {
      name: ["--omit-segments", "-o"],
      description: "Omit segments when syncing",
    },
    {
      name: ["--flag", "-f"],
      description: "Only sync the given flag",
      dependsOn: ["-p"],
      args: {
        name: "flag",
        debounce: true,
        generators: flagGenerator,
      },
    },
    {
      // No API for grabbing these, at the moment
      name: ["--tag", "-T"],
      description: "Only sync flags with the given tag(s)",
      args: {
        name: "tag",
      },
    },
    {
      name: ["--dry-run"],
      description: "Preview syncing changes",
    },
    hostOpt,
    {
      name: ["--debug", "-D"],
      description: "Enables HTTP debugging",
    },
  ],
  // Only uncomment if sync-ld-flags takes an argument
  // args: {}
};
export default completionSpec;