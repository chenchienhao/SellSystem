import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  clients:any;
  Searchclients:any;
  searching:boolean;
  name;

  constructor(
    private FirebaseService:FirebaseService) { }

  ngOnInit() {
    this.searching = false;
    this.FirebaseService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  onSearchSubmit(){
    if(this.name){
      this.name=this.name.toUpperCase();
      this.searching = true;
      this.FirebaseService.getClients().subscribe(clients => {
        this.clients = clients;
        this.Searchclients=[];
        this.clients.forEach(element=>{
          var name=element.name.toUpperCase();
          if(name.substring(0,this.name.length)==this.name)
            this.Searchclients.push(element);
        });
      });
    }
    else{
      this.searching = false;
    }
    
  }
  
}
