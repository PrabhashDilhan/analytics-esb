/*
 * Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This Javascript module groups utility methods that are being used by all the gadgets in the ESB analytics dashboard
 */

var CONTEXT = "/portal/apis/esbanalytics";
var BASE_URL = "/portal/dashboards/esb-analytics/";

var TYPE_PROXY = "proxy";
var TYPE_API = "api";
var TYPE_SEQUENCE = "sequence";
var TYPE_ENDPOINT = "endpoint";
var TYPE_INBOUND_ENDPOINT = "inbound";
var TYPE_MEDIATOR = "mediator";
var TYPE_MESSAGE = "message";

var PARAM_ID = "id";

var PROXY_PAGE_URL = BASE_URL + TYPE_PROXY;
var API_PAGE_URL = BASE_URL + TYPE_API;
var SEQUENCE_PAGE_URL = BASE_URL + TYPE_SEQUENCE;
var ENDPOINT_PAGE_URL = BASE_URL + TYPE_ENDPOINT;
var INBOUND_ENDPOINT_PAGE_URL = BASE_URL + TYPE_INBOUND_ENDPOINT;
var MEDIATOR_PAGE_URL = BASE_URL + TYPE_MEDIATOR;
var MESSAGE_PAGE_URL = BASE_URL + TYPE_MESSAGE;

function GadgetUtil() {
    var DEFAULT_START_TIME = new Date(moment().subtract(29, 'days')).getTime();
    var DEFAULT_END_TIME = new Date(moment()).getTime();

    this.getQueryString = function() {
        var queryStringKeyValue = window.parent.location.search.replace('?', '').split('&');
        var qsJsonObject = {};
        if (queryStringKeyValue != '') {
            for (i = 0; i < queryStringKeyValue.length; i++) {
                qsJsonObject[queryStringKeyValue[i].split('=')[0]] = queryStringKeyValue[i].split('=')[1];
            }
        }
        return qsJsonObject;
    };

    this.getCurrentPage = function() {
        var page, pageName;
        var href = parent.window.location.href;
        var lastSegment = href.substr(href.lastIndexOf('/') + 1);
        if (lastSegment.indexOf('?') == -1) {
            pageName = lastSegment;
        } else {
            pageName = lastSegment.substr(0, lastSegment.indexOf('?'));
        }
        pages.forEach(function(item, i) {
            if (item.name === pageName) {
                page = item;
            }
        });
        return page;
    };

    this.timeFrom = function() {
        var timeFrom = DEFAULT_START_TIME;
        var qs = this.getQueryString();
        if (qs.timeFrom != null) {
            timeFrom = qs.timeFrom;
        }
        return timeFrom;
    };

    this.timeTo = function() {
        var timeTo = DEFAULT_END_TIME;
        var qs = this.getQueryString();
        if (qs.timeTo != null) {
            timeTo = qs.timeTo;
        }
        return timeTo;
    };

    this.fetchData = function(context, params, callback, error) {
        var url = "?";
        for(var param in params) {
            url = url + param + "=" + params[param] + "&";
        }
        console.log("++ AJAX TO: " + context + url);
        $.ajax({
            url: context + url,
            type: "GET",
            success: function(data) {
                callback(data);
            },
            error: function(msg) {
                error(msg);
            }
        });
    };

    this.getDefaultText = function() {
        return '<div align="center" style="margin-top:20px"><h4>No content to display.</h4></div>';
    };

    this.getEmptyRecordsText = function() {
        return '<div align="center" style="margin-top:20px"><h4>No records found.</h4></div>';
    }

    this.getErrorText = function(msg) {
        return '<div align="center" style="margin-top:20px"><h4>An error occured while attempting to display this gadget. Error message is: ' 
        + msg + '</h4></div>';
    }

}

var gadgetUtil = new GadgetUtil();