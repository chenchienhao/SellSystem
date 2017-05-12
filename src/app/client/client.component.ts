import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  id: any;
  client: any;
  imageUrl: any;
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getClientDetails(this.id).subscribe(client => {
      this.client = client;

      let storageRef=firebase.storage().ref();
      let spaceRef=storageRef.child(this.client.path);
      storageRef.child(this.client.path).getDownloadURL().then((url)=>{
          //set image url
        this.imageUrl = url;
      }).catch((error)=>{
        console.log(error);
      });
    });
  }
  onDeleteClick(){
    
    this.firebaseService.deleteClient(this.id,this.client.path);
    this.router.navigate(['/clients']);
  }
}
