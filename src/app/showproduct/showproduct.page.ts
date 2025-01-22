import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonCard, IonCardHeader, IonLabel } from '@ionic/angular/standalone';
import { DataapiService } from '../dataapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.page.html',
  styleUrls: ['./showproduct.page.scss'],
  standalone: true,
  imports: [IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardSubtitle, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonLabel]
})
export class ShowproductPage implements OnInit {
  products: any = [];

  constructor(
    private dataapi: DataapiService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.showproduct();
  }

  showproduct(){
    this.dataapi.showproduct1().subscribe({
      next: (data:any)=> {
        this.products = data;
        console.log('products:',data);
      },
      error:(err) => {
        console.error('Error fetching products:',err);
      },
    });
  }

  addproduct(){
    this.route.navigateByUrl('/addproduct');
  }

  deletepro(id:any){
    if(confirm('Are you sure you want to delete this image?')){
      this.dataapi.deleteproduct(id).subscribe(
        (response: any)=>{
          if(response.status === 'success'){
            alert('Image deleted successfully');
            this.showproduct();
          } else{
            alert('Failed to delete image'+ response.message);
          }
        },
        (error)=>{
          console.error(error);
          alert('An error occurred while deleting the image');
        }
      );
    }
  }

}
