var Service, Characteristic;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	homebridge.registerAccessory('homebridge-dummy-garage', 'DummyGarage', DummyGarage);
}

class DummyGarage {
	constructor (log, config) {

		//get config values
		this.name = config['name'] || "Dummy Garage";
		this.autoCloseDelay = config["autoCloseDelay"] === undefined ? 0 : Number(config["autoCloseDelay"]);

		//initial setup
		this.log = log;
		this.lastOpened = new Date();
		this.service = new Service.GarageDoorOpener(this.name, this.name);
		this.setupGarageDoorOpenerService(this.service);
		
		this.informationService = new Service.AccessoryInformation();
		this.informationService
			.setCharacteristic(Characteristic.Manufacturer, 'rasod')
			.setCharacteristic(Characteristic.Model, 'Dummy Garage')
			.setCharacteristic(Characteristic.FirmwareRevision, '1.1')
			.setCharacteristic(Characteristic.SerialNumber, this.name.replace(/\s/g, '').toUpperCase());

	}

	getServices () {
		return [this.informationService, this.service];
	}

	setupGarageDoorOpenerService (service) {
		this.service.setCharacteristic(Characteristic.TargetDoorState, Characteristic.TargetDoorState.CLOSED);
		this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.CLOSED);

		service.getCharacteristic(Characteristic.TargetDoorState)
			.on('get', (callback) => {
				var targetDoorState = service.getCharacteristic(Characteristic.TargetDoorState).value;
				callback(null, targetDoorState);
			})
			.on('set', (value, callback) => {
				if (value === Characteristic.TargetDoorState.OPEN) {
					this.log("Opening: " + this.name)
					this.lastOpened = new Date();
					this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.OPEN);
					this.log.debug("autoCloseDelay = " + this.autoCloseDelay);
					if (this.autoCloseDelay > 0) {
						this.log("Closing in " + this.autoCloseDelay + " seconds.");
						setTimeout(() => {
							this.log("Auto Closing");
							this.service.setCharacteristic(Characteristic.TargetDoorState, Characteristic.TargetDoorState.CLOSED);
							this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.CLOSED);
						}, this.autoCloseDelay * 1000);
					}
					
					callback();
					
				} else if (value === Characteristic.TargetDoorState.CLOSED)  {
					this.log("Closing: " + this.name)
					this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.CLOSED);
					callback();
				} else {
					callback();
				}
			});
	}
}