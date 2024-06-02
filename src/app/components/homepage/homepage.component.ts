import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PartyserviceService } from 'src/app/services/partyservice.service';
import { PartydialogComponent } from '../partydialog/partydialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  name: any = sessionStorage.getItem('username')
  parties: any[] = []
 
  @ViewChild('partyFormTemplate') partyFormTemplate !: TemplateRef<any>;
  
  constructor(private fb: FormBuilder,private toasterservice:ToastrService, private authservice: AuthenticationService, private router: Router, private partyservice: PartyserviceService, private dialog: MatDialog) {
    this.getallparties()

   
  }


  getallparties() {
    this.partyservice.getparties().subscribe((res) => {
      console.log(res)
      this.parties = res
      if(res.detail=="Invalid token."){
        
        this.logout()
      }
    })
  }

  openparty(party:any,type:string) {
    

    const dialogRef = this.dialog.open(PartydialogComponent, {
      width: '600px',
      maxHeight:'90vh',
      minHeight:'20vh',
      autoFocus:false,
      data: { partyid: party?.id, actiontype: type }
    });

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        
        this.getallparties()
      }
    })
  }

  deleteParty(partyid: any): void {
    this.partyservice.deletepartyapi(partyid).subscribe(res=>{
      if(res.success){
        this.toasterservice.success(res.msg,"Success !")
        this.getallparties()
      }
      else{
        this.toasterservice.error(res.msg,"Woops !")
        console.log(res)
      }

    })
  }


  
  logout() {
    this.authservice.logoutapi().subscribe(res => {
      console.log(res)
      if (res) {
        sessionStorage.clear();
        this.toasterservice.success(res.status)
        this.router.navigate(['/login'])
        // window.alert(res.status)
      }
    })
  }

}
