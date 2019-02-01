/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");


//The app title, visible e.g. in the browser window
exports.title = "FARTcoin Block Explorer";

//The url it will be accessed from
exports.address = "www.fartcoin-project.com:11337";

// logo
exports.logo = "/images/logo.png";


//The app favicon fully specified url, visible e.g. in the browser window
exports.favicon = "favicon.ico";

//Theme
exports.theme = "Spacelab";

//The Port ep-lite should listen to
exports.port = process.env.PORT || 11337;


//coin symbol, visible e.g. MAX, LTC, HVC
exports.symbol = "FART";


//coin name, visible e.g. in the browser window
exports.coin = "Fartcoin";


//This setting is passed to MongoDB to set up the database
exports.dbsettings = {
  "user": "FART",
  "password": "F4r1C0!n",
  "database": "explorerdb",
  "address" : "localhost",
  "port" : 27017
};


//This setting is passed to the wallet
exports.wallet = { "host" : "127.0.0.1",
  "port" : 9338,
  "user" : "DatJeTFfWeet",
  "pass" : "8adf38f2f2264c9af76b60dd4b1c4de6"
};


//Locale file
exports.locale = "locale/en.json",


//Menu items to display
exports.display = {
  "api": true,
  "market": false,
  "twitter": false,
  "facebook": true,
  "googleplus": false,
  "youtube": true,
  "search": true,
  "richlist": true,
  "movement": true,
  "network": true
};


//API view
exports.api = {
  "blockindex": 809,
  "blockhash": "87a54b76880c9a2a16e4878139f8cded0f97fe6a4565a616b3a347e4907df5ee",
  "txhash": "3193e9e1a64dcb792ecfc2d6d8f78dedeed80c0e8a7582f523f8b860d54aa675",
  "address": "FEeMCm2925dbdAsn1FBRZUFtr8yhijfC5o",
};

// markets
exports.markets = {
  "coin": "JBS",
  "exchange": "BTC",
  "enabled": ['bittrex'],
  "default": "bittrex"
};

// richlist/top100 settings
exports.richlist = {
  "distribution": true,
  "received": true,
  "balance": true
};

exports.movement = {
  "min_amount": 10000,
  "low_flag": 100000,
  "high_flag": 10000000
},

//index
exports.index = {
  "show_hashrate": true,
  "difficulty": "POW",
  "last_txs": 100
};

// twitter
exports.twitter = "Fartcoin";
exports.facebook = "Fartcoin-Project";
exports.googleplus = "yourgooglepluspage";
exports.youtube = "BitcoinDaytrader";

exports.confirmations = 6;

//timeouts
exports.update_timeout = 125;
exports.check_timeout = 250;


//genesis
exports.genesis_tx = "12078fb53a2b671d420729221dfb16e561774f1dc5633f83ddae3b4f9a164352";
exports.genesis_block = "30ab0676db11ce93d84e1ed42699cda2f8c118146e1eb42e51acc1f822f09da5";

exports.heavy = false;
exports.txcount = 100;
exports.show_sent_received = true;
exports.supply = "COINBASE";
exports.nethash = "getnetworkhashps";
exports.nethash_units = "G";

exports.labels = {};

exports.reloadSettings = function reloadSettings() {
  // Discover where the settings file lives
  var settingsFilename = "settings.json";
  settingsFilename = "./" + settingsFilename;

  var settingsStr;
  try{
    //read the settings sync
    settingsStr = fs.readFileSync(settingsFilename).toString();
  } catch(e){
    console.warn('No settings file found. Continuing using defaults!');
  }

  // try to parse the settings
  var settings;
  try {
    if(settingsStr) {
      settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
      settings = JSON.parse(settingsStr);
    }
  }catch(e){
    console.error('There was an error processing your settings.json file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in settings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low character: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = settings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }

};

// initially load settings
exports.reloadSettings();
