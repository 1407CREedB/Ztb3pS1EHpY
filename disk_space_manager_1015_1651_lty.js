// 代码生成时间: 2025-10-15 16:51:10
// Import necessary Ionic modules
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ToastController } from '@ionic/angular';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiskSpaceManagerService {

  constructor(private platform: Platform, private file: File, private transfer: FileTransferObject, private toastCtrl: ToastController) {
    this.platform.ready().then(() => {
      // Initialize the File plugin on platform ready
      this.file.checkDir(this.file.dataDirectory, 'DiskSpaceManager', false)
        .then(() => console.log('Directory created or already exists.'))
        .catch(() => console.error('Error creating directory.'));
    });
  }

  /**
   * Get the total and free disk space
   *
   * @returns {Promise<{total: number, free: number}>}
   */
  getDiskSpaceInfo() {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        this.file.getFreeDiskSpace().then((freeSpace) => {
          this.file.getFreeDiskSpace().then((totalSpace) => {
            resolve({ total: totalSpace, free: freeSpace });
          }).catch((error) => {
            reject('Error getting total disk space: ' + error.message);
          });
        }).catch((error) => {
          reject('Error getting free disk space: ' + error.message);
        });
      });
    });
  }

  /**
   * Clear cache to free up disk space
   *
   * @returns {Promise<void>}
   */
  clearCache() {
    return this.platform.ready().then(() => {
      return this.file.clearCache().then(() => {
        this.presentToast('Cache cleared successfully');
      }).catch((error) => {
        this.presentToast('Error clearing cache: ' + error.message);
      });
    });
  }

  /**
   * Delete a file from the disk
   *
   * @param {string} filePath - Path of the file to be deleted
   * @returns {Promise<void>}
   */
  deleteFile(filePath) {
    return this.platform.ready().then(() => {
      return this.file.removeFile(this.file.dataDirectory, filePath).then(() => {
        this.presentToast('File deleted successfully');
      }).catch((error) => {
        this.presentToast('Error deleting file: ' + error.message);
      });
    });
  }

  /**
   * Present a toast message to the user
   *
   * @param {string} message - The message to be displayed
   */
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}

// Ionic component to display disk space information
import { Component } from '@angular/core';
import { DiskSpaceManagerService } from './disk_space_manager';

@Component({
  selector: 'app-disk-space-manager',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Disk Space Manager</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button (click)="getDiskSpaceInfo()" expand="block">Get Disk Space Info</ion-button>
      <ion-button (click)="clearCache()" expand="block">Clear Cache</ion-button>
      <p *ngIf="diskInfo">{{ diskInfo.total }} bytes total | {{ diskInfo.free }} bytes free</p>
    </ion-content>
  `,
  styles: [
    'ion-content {
      --background: linear-gradient(0, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(\'./assets/img/disk-space-bg.jpg\') no-repeat center center;
      --background-size: cover;
    }'
  ]
})
export class DiskSpaceManagerComponent {
  diskInfo: { total: number, free: number } = null;

  constructor(private diskSpaceManager: DiskSpaceManagerService) {
  }

  getDiskSpaceInfo() {
    this.diskSpaceManager.getDiskSpaceInfo().then(info => {
      this.diskInfo = info;
    }).catch(error => {
      console.error('Error getting disk space info:', error);
    });
  }

  clearCache() {
    this.diskSpaceManager.clearCache();
  }
}
