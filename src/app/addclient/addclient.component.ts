import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../services/firebase.service';
import { Router} from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import * as firebase from 'firebase';
@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  company: any;
  name: any;
  numbers: any;
  mail: any;
  city: any;
  image: any;
  mails:Array<string>;
  mail_duplicate:boolean;
  //image box
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';
  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  constructor(
    private FirebaseService:FirebaseService,
    private router:Router,
    public flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    this.mail_duplicate=false;
    this.FirebaseService.getClients().subscribe(clients => {
      this.mails=[];
      clients.forEach(element=>{
        this.mails.push(element.mail);  
      });
    });
    let storageRef=firebase.storage().ref();
    let spaceRef=storageRef.child("/clientimages/profile.png");
      storageRef.child("/clientimages/profile.png").getDownloadURL().then((url)=>{
        //set image url
        this.imageSrc = url;
      }).catch((error)=>{
        console.log(error);
      });
  }
  mailDuplicate(){
    this.mail_duplicate=false;
    for(var i=0; i<this.mails.length; i++){
      if(this.mails[i]==this.mail){
        this.mail_duplicate=true;
        break;
      }
    }
  }

  onAddSubmit(){
    if(this.mail_duplicate==false){
      this.name=this.name.toUpperCase();
      let client = {
        name: this.name,
        city: this.city,
        company: this.company,
        numbers: this.numbers,
        mail: this.mail
      }
      this.FirebaseService.addClient(client);
      this.router.navigate(['clients']);
    }
    else
      this.flashMessage.show('This email address has already been registered.', 
      {cssClass: 'alert-warning',timeout:3000});
  }
  //ImageBox 
  handleDragEnter() {
    this.dragging = true;
  }
  handleDragLeave() {
    this.dragging = false;
  } 
  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }
  handleImageLoad() {
    this.imageLoaded = true;
  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.loaded = false;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  } 
  _handleReaderLoaded(e) {
    var reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
  }
}
