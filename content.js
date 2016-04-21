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

  var notify = function(service){
    /* Alert's colors inspired by Ghostery's alert */
    var node = document.getElementsByTagName("body");
    var el = document.createElement("div");
    el.style.position = 'absolute';
    el.style.font = '13px Arial, Helvetica;';
    el.style.top = '10px';
    el.style.right = '10px';
    el.style.color = '#ffffff';
    el.style.zIndex = '5';
    el.style.padding = "5px 20px";
    el.style.borderRadius = "5px";
    el.style.textDecoration = "line-through";
    el.style.boxShadow = "0px 0px 20px #000";
    el.style.border = "2px solid #ffffff";
    el.style.transition = "opacity 1s linear";
    el.style.backgroundColor = "rgb(51, 0, 51)";
    el.innerHTML = service;

    setTimeout(function(){
      el.remove();
    }, 2000);
    node[0].appendChild(el);
  };

  /*
   * Listen to blocking messages
   * and notify the user
   */
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message && message.event && message.event=='blockTracking'){
      notify(message.name);
    }
  });

}());
