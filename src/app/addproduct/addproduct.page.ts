import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataapiService } from '../dataapi.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddproductPage implements OnInit {

  txtname:string = '';
  txtprice:string = '';
  selectFile:File | null=null; 

  constructor(
    private route: Router,
    private dataapi: DataapiService
  ) { }

  onFileChange(event:any){
    const file = event.target.files[0];
    if(file){
      this.selectFile = file;
    }
  }

  ngOnInit() {
  }

  addproduct(){
    const formData = new FormData();
    formData.append('name', this.txtname);
    formData.append('price', this.txtprice);
    if(this.selectFile){
      formData.append('image', this.selectFile, this.selectFile.name);
    }
    this.dataapi.addproduct(formData).subscribe({
      next: (res:any) => {
        console.log("บันทึกข้อมูลสำเร็จ",res);
        this.txtname = '';
        this.txtprice = '';
        this.selectFile = null;
        this.route.navigateByUrl('/addproduct');
      },
      error: (err) => {
        console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล',err);
        if(err.error instanceof ProgressEvent){
          console.error('เกิดข้อผิดพลาดในการเชื่อต่อเซิฟเวอร์');
        } else{
          console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล', err.error);
        }
      }
    });
  }

}
