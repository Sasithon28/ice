import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataapiService {

  constructor(
    public http:HttpClient
  ) { }

  addproduct(formdata: any){
    console.log("ข้อมูลที่ส่งไปยัง api",formdata);
    return this.http.post('http://localhost/class2-4/crudapi/upload.php',formdata);
  }

  showproduct1(){
    return this.http.get('http://localhost/class2-4/crudapi/read.php');
  }

  deleteproduct(id:number){
    return this.http.delete('http://localhost/class2-4/crudapi/delete.php?id='+id);
  }

  editproduct(formdata: any){
    return this.http.post('http://localhost/class2-4/crudapi/edit.php', formdata);
  }
}
