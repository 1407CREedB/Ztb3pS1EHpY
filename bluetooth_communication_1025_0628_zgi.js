// 代码生成时间: 2025-10-25 06:28:48
import { Injectable } from '@angular/core';
import { Bluetooth } from '@ionic-native/bluetooth/ngx';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BluetoothCommunicationService {
  private device: BluetoothDevice;
  private server: BluetoothServer;
  private characteristic: BluetoothCharacteristic;
  private dataSubject = new Subject<string>();
  private isConnected = false;

  constructor(private bluetooth: Bluetooth) {}

  /*
   * Initialize Bluetooth and request permissions
   */
  public initializeBluetooth(): Promise<void> {
    return this.bluetooth.requestBluetoothPermission().then(() => {
      return this.bluetooth.enable();
    }).catch((error) => {
      console.error('Bluetooth permission error:', error);
      throw error;
    });
  }

  /*
   * Connect to a Bluetooth device
   * @param deviceId The ID of the device to connect to
   */
  public connectToDevice(deviceId: string): Promise<void> {
    return this.bluetooth.connect(deviceId).then((device: BluetoothDevice) => {
      this.device = device;
      this.device.subscribeToNotifications();
      this.isConnected = true;
    }).catch((error) => {
      console.error('Failed to connect to device:', error);
      throw error;
    });
  }

  /*
   * Disconnect from the current Bluetooth device
   */
  public disconnectDevice(): Promise<void> {
    if (this.device) {
      return this.device.disconnect();
    }
    return Promise.resolve();
  }

  /*
   * Send data to the connected Bluetooth device
   * @param data The data to be sent
   */
  public sendData(data: string): Promise<void> {
    if (!this.isConnected) {
      console.error('Not connected to any device.');
      throw new Error('Not connected to any device.');
    }
    return this.device.write(this.characteristic, data);
  }

  /*
   * Subscribe to data from the Bluetooth device
   */
  public subscribeToDeviceData(): void {
    if (!this.isConnected) {
      console.error('Not connected to any device.');
      return;
    }
    this.device.onRead(this.characteristic).subscribe((data) => {
      this.dataSubject.next(data);
    });
  }

  /*
   * Get the observable subject for device data
   */
  public getDeviceDataObservable(): Subject<string> {
    return this.dataSubject;
  }

  /*
   * Handle Bluetooth device discovery
   */
  public discoverDevices(): Promise<BluetoothDevice[]> {
    return this.bluetooth.list().then((devices: BluetoothDevice[]) => devices);
  }
}
