/**
 * These are the default config settings.
 * To override them with your own, create a config.js file in your htpc folder
 *
 * ex.
 *
 * const config = require('./src/ts/Config').newConfig();
 * config.localSyncFolder = "./somePath";
 */
class Config {
    seedboxFtp: SeedboxFtpConfig;

    /**
     * Where you are syncing to on the local machine.
     * This is a default used when there is no path mappings set
     *
     * @type {string}
     */
    localSyncRoot = "seedbox-sync";

    /**
     * Used to map different remote paths to separate local paths instead of the localSyncRoot
     * Example:
            config.pathMappings =
            [
                {
                    remotePath: "/seedbox-sync-test/toUpload/tv",
                    localPath: "c:/media/tv",
                    type: "shows"
                },
                {
                    remotePath: "movies",
                    localPath: "d:/movies",
                    type: "movies"
                }
            ];
    */
    pathMappings: PathMapping[];



    /**
     * Download config
     *
     * @type {{countMax: number, speedMax: number}}
     */
    downloads = {
        countMax: 2,
        speedMax: 300000
    };

    /**
     * The port that this server will listen to for the seedbox callback.
     * Also used for viewing the status page
     *
     * @type {number}
     */
    port = 45532;

    /**
     * The seedbox script creates symlinks. This deletes those symlinks.
     *
     * You'll normally want to keep this to true, this is for setup & testing purposes only.
     *
     * @type {boolean}
     */
    deleteRemoteFiles = true;

    networkTimeoutInSeconds = 60;
}

/**
 * This is the FTP on your seedbox to connect to.
 *
 * TODO: Allow multiple FTPs to connect to.
 *
 * @type {{host: string, user: string, password: string, syncRoot: string, port: number}}
 */
class SeedboxFtpConfig {
    host: "localhost";
    user: "[Default]";
    password: "[Somepassword]";
    syncRoot: "/baseMediaFolder";
    port: 21;
    pollingIntervalInSeconds: 60;
}

class PathMapping {
    remotePath: string;
    localPath: string;
    type: string;
}

const fs = require('fs');
//Make sure that all our config values are good to use and cleaned up.
// Do this before any other processing.
let configValidator = require('./libs/ConfigValidator');

const config = new Config();

configValidator.loadConfig(config);

module.exports = config;
module.exports.defaultConfig = new Config();