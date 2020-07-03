import { Component } from "@angular/core";
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from "@ionic-native/barcode-scanner/ngx";
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastController } from '@ionic/angular'
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  scanData: any;
  options: BarcodeScannerOptions;
  constructor(private barcodeScanner: BarcodeScanner, private statusBar: StatusBar,public toastController: ToastController) {
    this.scanData = [];

    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();

    // set status bar to white

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'QR Texti Giriniz',
      duration: 2000
    });
    toast.present();
  }
  encodeData: string;
  encodedData: {};
  scan() {

    this.barcodeScanner.scan(this.options).then((barcodeData) => {

      this.scanData = barcodeData;
    }, (err) => {
      console.log("Hata : " + err);
    });
  }
  encodeText() {
    if (this.encodeData) {
      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then((encodedData) => {

        console.log(encodedData);
        this.encodedData = encodedData;

      }, (err) => {
        console.log("Hata : " + err);
      });
    } else     {this.presentToast()}       
}
}
