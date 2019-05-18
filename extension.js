
const NM = imports.gi.NM;
const Network = imports.ui.status.network;

let origDeviceAdded;

function enable() {
    origDeviceAdded = Network.NMApplet.prototype._deviceAdded;

    let f = function (client, device, skipSyncDeviceNames) {
        if (device.state === NM.DeviceState.UNMANAGED) {
            return;
        }

        origDeviceAdded.call(this, client, device, skipSyncDeviceNames);
    };

    Network.NMApplet.prototype._deviceAdded = Network.NMApplet.wrapFunction('_deviceAdded', f);
}

function disable() {
    if (origDeviceAdded) {
        Network.NMApplet.prototype._deviceAdded = origDeviceAdded;
    }
}
