LaunchDarkly Environment Synchronizer
=====================================

This Node script simplifies the task of synchronizing flag rollout rules between two different environments. It assumes that both environments are in the same project and account, and takes as input the API keys for the two environments you're syncing.

The following properties will be synchronized:

* User target rules
* Percentage rollout
* Include in snippet setting

Quick setup
-----------

0. Install with `npm`

        npm install --save

1. Run the script, passing in the API keys for the source and destination environments:

        node index.js SOURCE_API_KEY DESTINATION_API_KEY

