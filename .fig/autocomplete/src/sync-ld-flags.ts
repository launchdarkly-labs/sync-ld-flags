interface BaseObject {
  name: string,
  key: string
}

interface WithColor {
  color: string
}

interface Project extends BaseObject, WithColor {}
interface Environment extends BaseObject, WithColor {}
interface Flag extends BaseObject {
  description: string
}

const DEFAULT_HOST = 'https://app.launchdarkly.com';

// Brand colors
const LD_BLUE_HEX = '405BFF';
const LD_CYAN_HEX = '3DD6F5';
const LD_PINK_HEX = 'FF386B';
const LD_PURPLE_HEX = 'A34FDE';

const ICON_ENV = `fig://template?color=${LD_CYAN_HEX}&badge=E`;
const ICON_FLAG = `fig://template?color=${LD_PURPLE_HEX}&badge=⚑`;
const ICON_PROJECT = `fig://template?color=${LD_BLUE_HEX}&badge=P`;
const ICON_TAG = `fig://template?color=${LD_PINK_HEX}&badge=🏷`;

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

// Generators that query the API
const apiGenerators: Record<string, Fig.Generator> = {
  projects: {
    script: (context) => {
      const token = getOptionFromContext(context, tokenOpt);
      const host = getOptionFromContext(context, hostOpt) || DEFAULT_HOST;
  
      return `curl -s -X GET \
      ${host}/api/v2/projects \
      -H 'Authorization: ${token}'`;
    },
    postProcess: (out) => {
      const projects: Project[] = JSON.parse(out).items;
  
      return projects.map<Fig.Suggestion>((item) => {
        return {
          name: item.key,
          insertValue: item.key,
          description: item.name,
          icon: ICON_PROJECT,
        };
      });
    },
  },
  environments: {
    script: (context) => {
      const token = getOptionFromContext(context, tokenOpt);
      const project = getOptionFromContext(context, projectOpt);
      const host = getOptionFromContext(context, hostOpt) || DEFAULT_HOST;
      
      return `curl -s -X GET \
      ${host}/api/v2/projects/${project} \
      -H 'Authorization: ${token}'`;
    },
    postProcess: (out) => {
      const envs: Environment[] = JSON.parse(out).environments;
  
      return envs.map<Fig.Suggestion>((item) => {
        return {
          name: item.key,
          insertValue: item.key,
          description: item.name,
          icon: `fig://template?color=${item.color}&badge=E`,
        };
      });
    },
  },
  flags: {
    script: (context) => {
      const token = getOptionFromContext(context, tokenOpt);
      const project = getOptionFromContext(context, projectOpt);
      const env = getOptionFromContext(context, sourceOpt) || getOptionFromContext(context, destinationOpt);
      const host = getOptionFromContext(context, hostOpt) || DEFAULT_HOST;
  
      const params = env ? `env=${env}`: '';
      
      return `curl -s -X GET \
      ${host}/api/v2/flags/${project}?${params} \
      -H 'Authorization: ${token}'`;
    },
    postProcess: (out) => {
      const flags: Flag[] = JSON.parse(out).items;
  
      return flags.map<Fig.Suggestion>((item) => {
        return {
          name: item.key,
          insertValue: item.key,
          description: `${item.name} - ${item.description}`,
          icon: ICON_FLAG,
        };
      });
    },
  },
  flagTags: {
    script: (context) => {
      const token = getOptionFromContext(context, tokenOpt);
      const host = getOptionFromContext(context, hostOpt) || DEFAULT_HOST;

      // NOTE: API not fully released yet
      // However, if it is NOT enabled for the given application
      // it will just return no suggestions
      return `curl -s -X GET \
      ${host}/api/v2/tags?kind=flag \
      -H 'Authorization: ${token}'`;
    },
    postProcess: (out) => {
      const tags: string[] = JSON.parse(out).items;

      return tags.map<Fig.Suggestion>((tag) => {
        return {
          name: tag,
          icon: ICON_TAG,
        };
      });
    },
  },
};

const projectOpt: Fig.Option = {
  name: ["-p", "--project-key"],
  description: "Project key",
  icon: ICON_PROJECT,
  priority: 800,
  args: {
    name: "string",
    description: "Project key",
    debounce: true,
    generators: apiGenerators.listProjects,
  }
};

const tokenOpt: Fig.Option = {
  name: ["-t", "--api-token"],
  description: "LaunchDarkly personal access token with write-level access.",
  icon: `fig://icon?type=asterisk`,
  priority: 900,
  args: {
    name: "string",
    description: "API access token"
  }
};

const hostOpt: Fig.Option = {
  name: ["-H", "--host"],
  description: "Hostname override",
  icon: "fig://template?color=${}badge=🌐",
  args: {
    name: "URI",
    description: "LaunchDarkly URI"
  },
};

const sourceOpt: Fig.Option = {
  name: ["-s", "--source-env"],
  description: "Source environment",
  dependsOn: ["-p"],
  icon: ICON_ENV,
  priority: 700,
  args: {
    name: "string",
    description: "Environment key",
    debounce: true,
    generators: apiGenerators.listEnvironments,
  },
};

const destinationOpt: Fig.Option = {
  name: ["-d", "--destination-env"],
  description: "Destination environment",
  dependsOn: ["-p"],
  icon: ICON_ENV,
  priority: 700,
  args: {
    name: "string",
    description: "Environment key",
    debounce: true,
    generators: apiGenerators.listEnvironments,
  },
};

const completionSpec: Fig.Spec = {
  name: "sync-ld-flags",
  description: "Copy flag settings from one environment to another.",
  options: [
    {
      name: ["-h", "--help"],
      description: "Show help for sync-ld-flags",
    },
    projectOpt,
    sourceOpt,
    destinationOpt,
    tokenOpt,
    {
      name: ["-o", "--omit-segments"],
      description: "Omit segments when syncing",
    },
    {
      name: ["-f", "--flag"],
      description: "Sync only the specified flag",
      icon: ICON_FLAG,
      args: {
        name: "string",
        description: "Flag key",
        debounce: true,
        generators: apiGenerators.listFlags,
      },
    },
    {
      name: ["-T", "--tag"],
      description: "Sync flags with the specified tag(s). Only flags with all tags will sync.",
      icon: ICON_TAG,
      args: {
        name: "string",
        description: "Tag name",
        isVariadic: true,
        optionsCanBreakVariadicArg: true,
        debounce: true,
        generators: apiGenerators.listFlagTags,
      },
    },
    {
      name: ["--dry-run"],
      description: "Preview changes",
    },
    hostOpt,
    {
      name: ["-v", "--verbose"],
      description: "Enable verbose logging",
    },
    {
      name: ["-D", "--debug"],
      description: "Enable HTTP debugging",
    },
  ],
};
export default completionSpec;