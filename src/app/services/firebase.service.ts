import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Router, ActivatedRoute, Params} from '@angular/router';

import * as firebase from 'firebase';
@Injectable()
export class FirebaseService {
  clients: FirebaseListObservable<any[]>;
  client: FirebaseObjectObservable<any>;
  folder: any;

  constructor(
    private af: AngularFire,
    private router: Router,
    private route: ActivatedRoute) {
    
    this.folder = 'clientimages';
    this.clients = this.af.database.list('/clients', 
                  {query:{
                    orderByChild:'name'
                  }
                }) as FirebaseListObservable<Client[]>
    }
    

  getClients(){
    return this.clients;
  }

  getClientDetails(id){
    this.client = this.af.database.object('/clients/'+id) as FirebaseObjectObservable<Client>

    return this.client;
  }
  
  addClient(client){
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      if(selectedFile){
        //let path = `/${this.folder}/${selectedFile.name}`;
        let path = `/${this.folder}/${client.mail}`;
        let iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) => {
          client.image = client.mail;
          client.path = path;
          return this.clients.push(client);
        });
      }
      else{
        let path = `/${this.folder}/profile.png`;
        client.image = "profile.png";
        client.path = path;
        return this.clients.push(client);
      }
    }
  }
  
  updateClient(id, client){
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      if(selectedFile){
        //let path = `/${this.folder}/${selectedFile.name}`;
        let path = `/${this.folder}/${client.mail}`;
        let iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) => {
          client.image = client.mail;
          client.path = path;
          return this.clients.update(id,client);      
        });
      }
    }
    return this.clients.update(id,client);
  }

  deleteClient(id,path){
    let storageRef = firebase.storage().ref();
    console.log(path);
    if(path!="/clientimages/profile.png"){
      let iRef = storageRef.child(path);
      iRef.delete();
    }
    return this.clients.remove(id);
  }
}

interface Client{
  $key?:string;
  name?:string;
  city?:string;
  numbers?:number;
  mail?:string;
  company?:string;
  path?:string;
}