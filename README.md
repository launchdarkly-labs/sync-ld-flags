> This script is unsupported. 
>
> To sync individual flags, please use the in-application Compare and Copy functionality instead:
> https://launchdarkly.com/blog/launched-compare-and-copy-flag-settings-across-environments/

LaunchDarkly Environment Synchronizer
=====================================

This Node script simplifies the task of synchronizing flag rollout rules between two different environments. 
It assumes that both environments are in the same project and account, and takes as input the API keys for 
the two environments you're syncing.

The following properties will be synchronized:

* If the evaluation rules are enabled
* The archived bit
* User target rules
* Attribute targeting rules
  * To omit segment rules, which may not be valid across environments, use the `--omit-segments` flag
* Prerequisites
* Fallthrough rule

Quick setup
-----------

1. Install with `npm`

        npm install --save

2. Run the script, passing in the project key, source and destination environments, and API token:

        node index.js --project-key PROJECT_KEY --source-env SOURCE_ENVIRONMENT_KEY --destination-env DEST_ENVIRONMENT_KEY --api-token API_TOKEN

   Optionally pass a host override:

        node index.js -p PROJECT_KEY -s SOURCE_ENVIRONMENT_KEY -d DEST_ENVIRONMENT_KEY -t API_TOKEN -H https://your-launch-darkly-deploy.com

   Use `-D` to enable HTTP debugging if needed.
