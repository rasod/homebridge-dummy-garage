# homebridge-deconz-garage
[Homebridge](https://github.com/nfarina/homebridge) plugin to create a HomeKit Garage Door accessory which interacts with Deconz registered Zigbee devices. 

# Installation
1. Install [Homebridge](https://github.com/nfarina/homebridge#installation)
2. Install this plugin using `npm install -g homebridge-deconz-garage`
3. Edit your configuration file like the example below and restart Homebridge

# Configuration Example
```
{
	"bridge": {
		"name": "Homebridge",
		"username":"CE:CE:CE:CE:CE:CE",
		"port": 51826,
		"pin": "131-25-154"
	},
	"accessories": [{
		"accessory": "DummyGarage",
		"name": "Dummy Garage"
	}]
}
```

# Configuration Parameters 

* ```name``` __(required)__ Name of Garage to appear in Home app

# Credits

This plugin is a fork of [homebridge-dummy-garage](https://github.com/rasod/homebridge-dummy-garage)
which is a fork of:[Homebridge-Controls-Your-Garage-Door-Remote](https://github.com/kropatschek/Homebridge-Controls-Your-Garage-Door-Remote)

