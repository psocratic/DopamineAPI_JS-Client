Dopamine
=========

Make your web app habit-forming using the Dopamine API.

Get your free API key at http://dev.usedopamine.com/signup.php.
Learn more at http://demo.usedopamine.com.


## Installation

  Copy DopamineLibrary.js into a directory, and include it in your project by pasting the line below into your html file.

  `<script type="text/javascript" src="./DopamineLibrary.js" ></script>`

## Usage

  This script connects your web app with the Dopamine API. Use it in conjunction with our step-by-step integration dashboard at http://dev.usedopamine.com.

  We've included a `demo/demo.js` file to show you how to get started quickly. Push the button and let Dopamine choose a feedback or reward function. You can copypasta that code directly into your app to get up and running immediately.

  The `Dopamine()` function returns an object that lets your app do 3 critical actions with the Dopamine API:

  1. Configure your app
  2. Send tracking calls about app behavior / user behavior to the API for analysis
  3. Reinforce your users with the API.

Here's a brief word about each:

####Configure your API calls:
First, make sure to inlcude the DopamineLibrary.js script using the following line in your html file:

`<script type="text/javascript" src="./DopamineLibrary.js" ></script>`

Then you can create a dopamine object using the function:

`var dopamine = Dopamine();`

Now your app needs to send some authentication and versioning info with each API call. We provide a really simple way to configure that info:

`dopamine.config(appID, productionSecret, developmentSecret, inProduction, versionID);`

Where to get these values:
* `appID (string)`: get this from your Developer Dashboard at http://dev.usedopamine.com
* `productionSecret / developmentSecret (string)` : get this from your Developer Dashboard. You'll receive your productionSecret as you progress through the integration process. While in development you can just pass `null` in here.
* `inProductionFlag (boolean)`: when you're happy with how you're integrating Dopamine and ready to launch set this argument to `true`. This will activate optimized reinforcement and start your billing cycle. While set to `false` your app will receive dummy reinforcement, new users will not be registered with our system, and no billing occurs.
* `versionID (string)`: this is a unique identifier that you choose that marks this implementation as unique in our system. This could be something like 'summer2015Implementation' or 'ClinicalTrial4' or 'version3_real_this_time_no_Im_serious'. Your `versionID` is what we use to keep track of what users are exposed to what reinforcement and how to best optimize that.

####Send tracking calls about app behavior / user behavior to the API for analysis

The Dopamine API learns how to reinforce your users faster when you use it to track their behavior. Use it just like you would MixPanel or any Google Analytics. Drop this code anywhere in your app where a user does something worth tracking:

`dopamine.track(actionID, primaryIdentity, metaData);`

Where:
* `actionID (string)`: A unique name for this action.
* `primaryIdentity (string)` : A unique identifier for this user. 
* `metaData (object)` : metadata about the event passed in as a key-value object.

The `primaryIdentity` should be formatted as a unique string. For example, some apps use things like randomly generated numbers like "1138", others use things like the user's device id "8483952fbb761c43", while many prefer to use email addresses like "user@host.com". Whatever you use, just put at least one user identity object in the array.


####Reinforce your users with the API.

When you call the API we determine whether or not a reward or neutral feedback would be the best way to reinforce this particular user. The API response will tell your app which Reinforcement Function to run. Sometimes it will return the name of a Reward Function, sometimes the name of a Feedback Function. Every time it will be optimized to exactly what that particular user needs. 

Use the `dopamine.reinforce( )` method in a switch statement as shown in `demo/demo.js`. The `case` values will match the names of the actions your paired using the `dopamine.pairReinforcement( )` method. For example:

`switch(dopamine.reinforce(actionID, primaryIdentity));`

Each `case( )` value should match a name of a Reinforcement Function (both Reward Functions and Feedback Functions) you specified on the dashboard. The content of each case should call the Reinforcement Function you wrote that will deliver the user a delightful reward or neutral feedback!


## Contributing

We like forks, pull requests, and IPAs. Wink.

Want to go down the Behavior Design rabbit hole with us? 
Email us at ramsay@usedopamine.com.

## Release History

* 2.0 release. 