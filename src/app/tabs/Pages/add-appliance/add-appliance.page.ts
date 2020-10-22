import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { AppRoutes } from "src/app/constants/constant";
import { Appliance } from "src/app/interface/appliance";
import { ApplianceClass } from "src/app/interface/ApplianceData";
import { ApplianceService } from "src/app/services/appliance/appliance.service";
import { FirebaseService } from "src/app/services/firebase/firebase.service";
import { AddApplianceService } from "src/app/services/storage/add-appliance.service";

@Component({
  selector: "app-add-appliance",
  templateUrl: "./add-appliance.page.html",
  styleUrls: ["./add-appliance.page.scss"],
})
export class AddAppliancePage implements OnInit {
  @Input() applianceName: string;
  @Input() unit: number;
  @Input() unitPrice: number;

  appliance: any;
  showUpdateButton: boolean = false;
  applianceId: string;
  buttonName: string = "Add";

  alertMes: string = "";
  appliances = ["AC", "TV", "Fan", "Washing Machine", "Cooler", "Lights"];

  addApplianceForm = new FormGroup({
    applianceName: new FormControl("", Validators.required),
    unit: new FormControl("", Validators.required),
    unitPrice: new FormControl("", Validators.required),
  });

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private addApplianceService: AddApplianceService,
    private router: Router,
    private route: ActivatedRoute,
    private applianceService: ApplianceService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const applianceId = params.get("appliance");
      console.log("applianceId==!!!!>", applianceId);
      if (applianceId) {
        this.getAppliance(applianceId);
      }
    });
  }

  getAppliance(applianceId: string) {
    this.firebaseService.getApplianceById(applianceId).subscribe((doc) => {
      console.log("getAppliance======>>>>>", doc.data().applianceName);
      this.showUpdateButton = true;
      this.buttonName = "Update";
      console.log(this.showUpdateButton);
      this.appliance = doc.data();
      console.log(this.appliance);
      this.applianceId = applianceId;
      this.editAppliance(this.appliance);
    });
  }
  editAppliance(appliance: Appliance) {
    this.addApplianceForm.patchValue({
      applianceName: appliance.applianceName,
      unit: appliance.unit,
      unitPrice: appliance.unitPrice,
    });
  }

  updateAppliance() {
    this.firebaseService
      .updateAppliance(this.applianceId, this.addApplianceForm.value)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl(AppRoutes.APPLIANCE);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  initCreateAppliance() {
    const appliance: ApplianceClass = this.addApplianceForm.value;
    appliance.unit = Number(appliance.unit.toFixed(2));
    appliance.unitPrice = Number(appliance.unitPrice.toFixed(2));
    console.log(appliance);

    if (!this.addApplianceForm.valid) {
      return false;
    } else {
      this.firebaseService
        .createAppliance(appliance)
        .then((res) => {
          console.log("Appliance saved successfully!!!!!", res);
          this.addApplianceForm.reset();
          this.router.navigateByUrl(AppRoutes.APPLIANCE);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  customPopoverOptions: any = {
    header: "Appliances",
    subHeader: "Select your appliance",
    // message: 'Only select your dominant hair color'
  };

  dismissModal(): void {
    this.modalController.dismiss(null, "cancel");
  }

  showInformation(msg: string) {
    console.log("clicked");
    if (msg === "appliance") {
      this.alertMes = "Select your appliances";
    }
    if (msg === "kg/wt") {
      this.alertMes = "add your Kg/wt";
    }
    if (msg === "unit") {
      this.alertMes = "per unit price";
    }
    this.presentAlert(this.alertMes);
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
