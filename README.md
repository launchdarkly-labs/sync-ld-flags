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
* Prerequisites
* Fallthrough rule

Quick setup
-----------

0. Install with `npm`

        npm install --save

1. Run the script, passing in the project key, source and destination environments, and API token:

        node index.js PROJECT_KEY SOURCE_ENVIRONMENT_KEY DEST_ENVIRONMENT_KEY API_TOKEN

