/**
 * Choose settings for local computer
 *
 * The `settingsPath` should be a directory with settings module files.
 *
 * Chooses settings module form (priority order):
 * {confPath}/{userName}.{domainName}
 * {confPath}/{userName}
 * {confPath}/common
 *
 * @author Maxim Korshunov <korshunov.m.e@gmail.com>
 * @type {{}}
 */

/* */
var os  = require('os');
var fs  = require('fs');
var path  = require('path');

var systemInfo  = require('system-info');

module.exports = function (settingsPath) {
    settingsPath = path.normalize(settingsPath + '/');

    var hostName = os.hostname();
    var username = systemInfo.currentUser.getName();

    var settingsModule = settingsPath + 'common';

    try {
        fs.accessSync(settingsPath + username + '.js', fs.R_OK);
        settingsModule = settingsPath + username;
    } catch (e) {}

    try {
        fs.accessSync(settingsPath + username + '.' + hostName + '.js', fs.R_OK);
        settingsModule = settingsPath + username + '.' + hostName;
    } catch (e) {}

    var settings = require(settingsModule);

    settings.settingsPath = settingsPath;
    settings.settingsModule = settingsModule;

    return settings;
};
