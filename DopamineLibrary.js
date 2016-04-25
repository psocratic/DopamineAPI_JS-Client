(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Dopamine = factory());
}(this, function () {
  'use strict';

  function Dopamine () {
    var self = this;
  
    self.credentials = {
      appID: "",
      secret: {
        production: "",
        development: "",
        inProduction: false
      },
      versionID: "",
    };
  
    self.config = function(appID, productionSecret, developmentSecret, inProduction, versionID) {
      self.credentials.appID = appID;
      self.credentials.secret.production = productionSecret;
      self.credentials.secret.development = developmentSecret;
      self.credentials.secret.inProduction = inProduction;
      self.credentials.versionID = versionID;
    };
  
    self.reinforce = function(actionID, identity, metaData, options, callback)
    {
      var options = options || { useAsync: false };

      var wrappedCallback = function (err, result) {
        var callback = callback || function (err, result) {};
        if(result.status === 200)
        {
          // Good status
          callback(null, result.reinforcementDecision);
        }
        else{
          // Bad status
          callback(result.error);
        }
      }

      var response = sendCall(buildPayload('reinforce', actionID, identity, metaData),
                              'reinforce', options, wrappedCallback);

      if (!options.useAsync) {
        if(response.status === 200)
        {
          // Good status
          return response.reinforcementDecision;
        }
        else{
          // Bad status
          return response.error;
        }
      }
    }
  
    self.track = function(actionID, identity, metaData, options, callback)
    {
      sendCall(buildPayload('track', actionID, identity, metaData), 'track', options, callback);
    }
  
    function buildPayload(type, actionID, identity, metaData)
    {
  
      var payload = {
        'appID' : self.credentials.appID,
        'secret' : (self.credentials.secret.inProduction ? self.credentials.secret.production : self.credentials.secret.development),
        'versionID': self.credentials.versionID,
        'primaryIdentity':identity,
        'UTC': Date.now(),
        'localTime': Date.now(),
        'actionID': actionID,
        'clientOS':'Node',
        'clientOSVersion': '1',
        'clientSDKVersion' : '2.0.0',
        'metaData' : metaData
      };
  
      return payload;
    }
  
    function sendCall(data, type, options, callback)
    {
      var callback = callback || function (err, result) {};
      var options = options || { useAsync: false };
      var xhttp = new XMLHttpRequest();
      if (options.useAsync) {
        xhttp.onload = function (e) {
          callback(null, JSON.parse(xhttp.responseText));
        }
      }

      xhttp.open("POST", 'https://staging-api.usedopamine.com/v3/app/' + type + '/', options.useAsync);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(data));
  
      // return response string as JSON object
      if (!options.useAsync) {
        return JSON.parse(xhttp.responseText);
      }
    }
  }

  return Dopamine;
}));
