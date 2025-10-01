// 代码生成时间: 2025-10-01 22:22:39
// Ionic Modal Dialog Component
// This component creates a modal dialog in an Ionic application.

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-dialog',
  templateUrl: 'modal-dialog.html'
})
export class ModalDialogPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    // Constructor logic here
  }

  // Open a new modal instance
  openModal() {
    let myModal = this.modalCtrl.create(ModalContentPage, {
      'modalData': 'This is passed to the modal'
    });
    
    myModal.onDidDismiss(data => {
      if (data) {
        console.log('Modal dismissed with data:', data);
      } else {
        console.log('Modal dismissed');
      }
    });
    
    myModal.present();
  }
}

// This is the content page of the modal dialog
@Component({
  selector: 'page-modal-content',
  template: `<ion-header>
    <ion-navbar>
      <button ion-button menuToggle>
        <ion-icon name='menu'></ion-icon>
      </button>
      <ion-title>
        Modal Title
      </ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content padding>
    <p>
      This is a modal content page.
    </p>
    <button ion-button (click)="dismissModal('Data passed back from modal')">Close</button>
  </ion-content>
  `
})
export class ModalContentPage {
  modalData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Retrieve passed data
    this.modalData = this.navParams.get('modalData');
  }

  // Dismiss the modal and pass back data
  dismissModal(data) {
    this.navCtrl.dismiss(data);
  }
}
