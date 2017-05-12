import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../services/firebase.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import * as firebase from 'firebase';
@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css'],
  inputs:['activeColor','baseColor','overlayColor']
})
export class EditclientComponent implements OnInit {
  id;
  company;
  name;
  numbers;
  mail;
  city;
  image:any;
  mail_duplicate:boolean;
  mail_before;
  mails:Array<string>;
  imageUrl: any;
  //image box
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';
  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  constructor(
    private FirebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    public flashMessage:FlashMessagesService
  ) { }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.FirebaseService.getClientDetails(this.id).subscribe(client => {
      this.name = client.name;
      this.company = client.company;
      this.numbers = client.numbers;
      this.mail = client.mail;
      this.city = client.city;
      this.mail_before=client.mail;
      let storageRef=firebase.storage().ref();
      let spaceRef=storageRef.child(client.path);
      storageRef.child(client.path).getDownloadURL().then((url)=>{
          //set image url
        this.imageSrc = url;
      }).catch((error)=>{
        console.log(error);
      });
      //console.log(storageRef.child(client.path).getDownloadURL());
    });
    this.mail_duplicate=false;
    this.FirebaseService.getClients().subscribe(clients => {
      this.mails=[];
      clients.forEach(element=>{
        this.mails.push(element.mail);  
      });
    });
    console.log(this.id);
  }
  mailDuplicate(){
    this.mail_duplicate=false;
    for(var i=0; i<this.mails.length; i++){
      if(this.mails[i]==this.mail && this.mails[i]!=this.mail_before){
        this.mail_duplicate=true;
        break;
      }
    }
  }
  onEditSubmit(){
    if(this.mail_duplicate==false){
      let client = {
        name:this.name,
        company:this.company,
        city:this.city,
        numbers:this.numbers,
        mail:this.mail
      }
      this.FirebaseService.updateClient(this.id, client);
      this.flashMessage.show('Client '+this.name+' has been updated successfully.', 
      {cssClass: 'alert-success',timeout:2000});
      setTimeout(() => { this.router.navigate(['/client/'+this.id]);},2000);
    }
    else
      this.flashMessage.show('This email address has already been registered.', 
      {cssClass: 'alert-warning',timeout:5000});
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
