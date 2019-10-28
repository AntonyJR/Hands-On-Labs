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
        new OICEnvironment("Training1", "https://oictraining1-oicpm.integration.ocp.oraclecloud.com/ic/home/", "OICTraining1ic"),
        new OICEnvironment("Training2", "https://oictraining2-oicpm.integration.ocp.oraclecloud.com/ic/home/", "OICTraining2ic"),
        new OICEnvironment("Training3", "https://oictraining3-oicpm.integration.ocp.oraclecloud.com/ic/home/", "OICTraining3ic")
      ]),
      self.selectedOICEnvironment = ko.observable()

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