/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config({
  baseUrl: 'js',

  // Path mappings for the logical module names
  // DO NOT alter these
  paths:
  {
    'knockout': 'libs/knockout/knockout-3.4.0.debug',
    'jquery': 'libs/jquery/jquery-3.1.0',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
    'promise': 'libs/es6-promise/es6-promise',
    'hammerjs': 'libs/hammer/hammer-2.0.8',
    'ojs': 'libs/oj/v2.2.0/min',
    'ojL10n': 'libs/oj/v2.2.0/ojL10n',
    'ojtranslations': 'libs/oj/v2.2.0/resources',
    'text': 'libs/require/text',
    'signals': 'libs/js-signals/signals'
  },
  // Shim configurations for modules that do not expose AMD
  shim: {
    'jquery': {
      exports: ['jQuery', '$']
    }
  }
  //endinjector
});

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojtoolbar', 'ojs/ojmenu', 'ojs/ojinputtext'],
  function(oj, ko) { // this callback gets executed when all required modules are loaded

    /* OBE Developer - modify and/or add your bindings here */
    function viewModel() {
      var self = this;
      /* You should have one self.<binding> for each input field in your OBE. 
         username and password used here are just samples. */
      self.user_number = ko.observable("");
      self.user_name_prefix = ko.observable("OICTraining1ic");

      self.userName = ko.observable("");
      
      class OICEnvironment {
        constructor(name, url, usernamePrefix) {
          this.name = name;
          this.url = url;
          this.usernamePrefix = usernamePrefix;
        }
      }
      self.availableOICEnvironments = ko.observableArray([
        new OICEnvironment("Training 1", "https://oictraining1-oicpm.integration.ocp.oraclecloud.com/ic/home/", "OICTraining1ic"),
        new OICEnvironment("Training 2", "https://oictraining2-oicpm.integration.ocp.oraclecloud.com/ic/home/", "OICTraining2ic"),
        new OICEnvironment("Training 3", "https://oictraining3-oicpm.integration.ocp.oraclecloud.com/ic/home/", "OICTraining3ic"),
        new OICEnvironment("SC Training 1", "https://oicsctraining1-oicpm.integration.ocp.oraclecloud.com/ic/home/", "oicuserscA"),
        new OICEnvironment("SC Training 2", "https://oicsctraining2-oicpm.integration.ocp.oraclecloud.com/ic/home/", "oicuserscB")
      ]),
      self.selectedOICEnvironment = ko.observable()

      class AppEnvironment {
        constructor(name, url, usernamePrefix) {
          this.name = name;
          this.url = url;
          this.usernamePrefix = usernamePrefix;
        }
      }      
      self.availableAppEnvironments = ko.observableArray([
        new AppEnvironment("HCM Cloud - zgms", "https://ucf6-zgms-login.oracledemos.com/oam/server/obrareq.cgi?encquery%3DTzDjgDD%2Breh7Kh2XwHtIPXzSJm0MU3vevUL3vpH2ImqlGegbNvNw9i2xDc84tfUZPF0z5BxcaGs7G5Oc3n48%2BAu8%2BEFP9rw%2B%2BuZ8EVoTE4DW1AYm9DMRgBEvtXilLyee3LDpUMhZgqXTMFuPyuB60bCJ8t%2FYL7D3jiHGOqRXzpi7fgfisrdB6uitj9gT0eaIJfObwegvxHNGa%2BDS49mcwmXbJ7bYDrTAU0a7Mq%2FYTJUMeStaRNnOjKDZXhRhiqH%2FJi5gIeISKLQFk6iOb%2FRe78IhO520g6nttGtsrFbqMy0dMrpRFYSrzUqtWNW%2B%2F9Yp7SWWoGhveKwifnSWgtZAHvOSP4KRY%2FVP05OAZpGUVCC8HB1i%2Fp1YH9pNmkfUWKZPeLxHeeQmduAbGNY2THI0ipYUDJogPwnYsXZlOrsyqHyTvkSPfmLg25HmGMEhCOEUT3oUwcQ9bLci106Dl%2FzW3ff%2Fq4ZbEHHRrKYUFvmG9qOrLN0czdPeO%2FlmeI0zPRG%2B%20agentid%3DOraFusionApp_11AG%20ver%3D1%20crmethod%3D2%26cksum%3D07c58bc78d83822b2b1a5a2ebea4dc04e51c5071&ECID-Context=1.005aVptlj9r7Y7tpGcDCif0000mN0002Cr%3BkXjE", "bala.gupta"),
      ]),
      self.selectedAppEnvironment = ko.observable()

      class FTPEnvironment {
        constructor(name, url, usernamePrefix) {
          this.name = name;
          this.url = url;
          this.usernamePrefix = usernamePrefix;
        }
      }      
      self.availableFTPEnvironments = ko.observableArray([
        new FTPEnvironment("Drive HQ", "https://www.drivehq.com", "oichcmcloud"),
      ]),
      self.selectedFTPEnvironment = ko.observable()
    }


    $(function() {
      function init() {
        // Bind your ViewModel for the content of the whole page body. 

        ko.applyBindings(new viewModel());
      }

      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.
      if ($(document.body).hasClass('oj-hybrid')) {
        document.addEventListener("deviceready", init);
      } else {
        init();
      }

    });

  }
);