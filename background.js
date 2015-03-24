/*
 * This file is part of 'Track Me Not',
 * Copyright (C) 2015-Today Aman Kumar Jain
 *
 * 'Track Me Not' is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * 'Track Me Not' is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with 'Track Me Not'.  If not, see <http://www.gnu.org/licenses/>.
 */

(function(){
  'use strict';


  /*
   * List of trackers, must have name, url and trackingPattern
   * IMPROVEMENT: Need to keep tracker's definations externally.
   */
  var trackers = [{
    'name': 'Amazon\'s Tracking Pixel',
    'url': 'http://amazon.com/',
    'trackingPattern': /www\.amazon\.(in|com)\/gp\/r\.html\?R\=.*transp\.gif/
  }, {
    'name': 'bananatag',
    'url': 'http://bananatag.com/',
    'trackingPattern': /bl\-1\.com\//
  }, {
    'name': 'ContactMonkey',
    'url': 'https://contactmonkey.com/',
    'trackingPattern': /contactmonkey\.com\/api\/v1\/tracker/
  }, {
    'name': 'Dyn',
    'url': 'https://dyn.com/',
    'trackingPattern': /trk\.email\.dynect\.net\/trk.php/
  }, {
    'name': 'Flipkart\'s Tracking Pixel',
    'url': 'https://flipkart.com/',
    'trackingPattern': /www\.flipkart\.com\/ch.php.*=openImg/
  }, {
    'name': 'MailChimp',
    'url': 'http://www.mailchimp.com/',
    'trackingPattern': /list\-manage\.com\/track\//
  }, {
    'name': 'MANDRILL',
    'url': 'https://mandrillapp.com/',
    'trackingPattern': /mandrillapp\.com\/track\//
  }, {
    'name': 'NewRelic\'s Tracking Pixel',
    'url': 'http://newrelic.com/',
    'trackingPattern': /rpm\.newrelic\.com\/tracking\//
  }, {
    'name': 'Sidekick',
    'url': 'http://www.getsidekick.com/',
    'trackingPattern': /\:\/\/t\.signalequattro\.com\//
  }, {
    'name': 'Streak',
    'url': 'https://www.streak.com/',
    'trackingPattern': /mailfoogae\.appspot\.com\//
  }, {
    'name': 'Uber\'s Tracking Pixel',
    'url': 'https://www.uber.com/',
    'trackingPattern': /click\.et\.uber\.com\/open\.aspx/
  }, {
    'name': 'Yesware',
    'url': 'http://www.yesware.com/',
    'trackingPattern': /t\.yesware\.com\//
  }];


  /*
   * List of mail service, must have name and proxyPath
   * proxyPath will be required by chrome.webRequest.onBeforeRequest
   */
  var mails = [{
    'name': 'Gmail',
    'proxyPath': '*://*.googleusercontent.com/proxy/*'
  }];


  /*
   * Creating a list of all paths to monitor, required by chrome.webRequest.onBeforeRequest
   */
  var allProxyPath = mails.map(function(mail) { return mail.proxyPath; });

  chrome.webRequest.onBeforeRequest.addListener(function(details){

    /*
     * Block the request if it is to the tracker
     * Send message to content script to display blocking alert
     */
    var cancel = trackers.reduce(function(previousValue, currentValue, index, array){
      var hasTracker = (currentValue.trackingPattern && details.url && details.url.match(currentValue.trackingPattern))?true:false;
      if(hasTracker){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {
	    'event': 'blockTracking',
	    'name': currentValue.name
	  });
	});
      }
      return previousValue || hasTracker;
    }, false);

    return {
      cancel: cancel
    };

  }, {urls: allProxyPath}, ["blocking"]);


}());
