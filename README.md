# homebridge-dummy-garage
[Homebridge](https://github.com/nfarina/homebridge) plugin to create a dummy HomeKit Garage Door accessory. Why? iOS 13 Carplay allows you to easily access your Garage when arriving and leaving your house. This plug-in allows to to create a dummy Garage door which you can use as an automation trigger. Pull up to your house open the "Garage" on your dash which will unlock your front door turn lights on etc.

# Installation
1. Install [Homebridge](https://github.com/nfarina/homebridge#installation)
2. Install this plugin using `npm install -g homebridge-dummy-garage`
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
