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
const LD_PURPLE_HEX = 'A34FDE';
const LD_PINK_HEX = 'FF386B';
const LD_CYAN_HEX = '3DD6F5';

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
        icon: `fig://template?color=${LD_BLUE_HEX}&badge=P`
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
        icon: `fig://template?color=${item.color}&badge=E`
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
        icon: `fig://template?color=${LD_PURPLE_HEX}&badge=⚑`
      };
    });
  },
};

// NOTE: API not fully released yet
const tagGenerator: Fig.Generator = {
  script(context) {
    const token = getOptionFromContext(context, tokenOpt);
    const host = getOptionFromContext(context, hostOpt) || DEFAULT_HOST;

    return `curl -s -X GET \
    ${host}/api/v2/tags?kind=flag \
    -H 'Authorization: ${token}'`;
  },
  postProcess(out) {
    const tags: string[] = JSON.parse(out).items;

    return tags.map<Fig.Suggestion>((tag) => {
      return {
        name: tag,
        icon: ICON_TAG,
      };
    });
  },
};


const projectOpt: Fig.Option = {
  name: ["--project-key", "-p"],
  description: "Project key",
  icon: `fig://template?color=${LD_BLUE_HEX}&badge=P`,
  priority: 800,
  args: {
    name: "string",
    description: "Project key",
    debounce: true,
    generators: projectGenerator,
  }
};

const tokenOpt: Fig.Option = {
  name: ["--api-token", "-t"],
  description: "API token",
  icon: `fig://icon?type=asterisk`,
  priority: 900,
  args: {
    name: "string",
    description: "API token"
  }
};

const hostOpt: Fig.Option = {
  name: ["--host", "-H"],
  description: "Hostname override",
  icon: "fig://template?color=${}badge=🌐",
  args: {
    name: "URI",
    description: "LaunchDarkly URI"
  },
};

const sourceOpt: Fig.Option = {
  name: ["--source-env", "-s"],
  description: "Source environment",
  dependsOn: ["-p"],
  icon: `fig://template?color=${LD_CYAN_HEX}&badge=E`,
  priority: 700,
  args: {
    name: "string",
    description: "Environment key",
    debounce: true,
    generators: environmentGenerator,
  },
};

const destinationOpt: Fig.Option = {
  name: ["--destination-env", "-d"],
  description: "Destination environment",
  dependsOn: ["-p"],
  icon: `fig://template?color=${LD_CYAN_HEX}&badge=E`,
  priority: 700,
  args: {
    name: "string",
    description: "Environment key",
    debounce: true,
    generators: environmentGenerator,
  },
};

const completionSpec: Fig.Spec = {
  name: "sync-ld-flags",
  description: "LaunchDarkly Environment Synchronizer",
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
      description: "Sync only the specified flag",
      icon: `fig://template?color=${LD_PURPLE_HEX}&badge=⚑`,
      dependsOn: ["-p"],
      args: {
        name: "string",
        description: "Flag key",
        debounce: true,
        generators: flagGenerator,
      },
    },
    {
      // No API for grabbing these, at the moment
      name: ["--tag", "-T"],
      description: "Sync flags with the specified tag(s). Only flags with all tags will sync.",
      icon: `fig://template?color=${LD_PINK_HEX}&badge=🏷`,
      args: {
        name: "string",
        description: "Tag name",
        isVariadic: true,
        optionsCanBreakVariadicArg: true,
        debounce: true,
        generators: tagGenerator,
      },
    },
    {
      name: ["--dry-run"],
      description: "Preview changes",
    },
    hostOpt,
    {
      name: ["--verbose", "-v"],
      description: "Enable verbose logging",
    },
    {
      name: ["--debug", "-D"],
      description: "Enable HTTP debugging",
    },
  ],
};
export default completionSpec;