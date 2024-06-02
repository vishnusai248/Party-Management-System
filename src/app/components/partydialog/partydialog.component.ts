import { Component, Inject, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PartyserviceService } from 'src/app/services/partyservice.service';

@Component({
  selector: 'app-partydialog',
  templateUrl: './partydialog.component.html',
  styleUrls: ['./partydialog.component.scss']
})
export class PartydialogComponent {
  partyid:any;
  actiontype:any;
  party:any;
  partyForm: FormGroup;
  bindingimage:any;
  // editingParty: boolean = false;
  selectedimagefile:any=null
  editing:boolean=false
  viewing:boolean=false

  constructor(private fb:FormBuilder,private toastr:ToastrService, private partyservice:PartyserviceService,@Inject(MAT_DIALOG_DATA) public data:any,private dailogref :MatDialogRef<PartydialogComponent>){
    this.partyForm = this.fb.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_no: ['', Validators.required],
      telephone_no: [''],
      whatsapp_no: [''],
      gstin: ['', Validators.required],
      pan_no: ['', Validators.required],
      remark: [''],
      credit_limit: [0],
      date_of_birth: ['', Validators.required],
      anniversary_date: [''],
      address: this.fb.array([this.createAddressGroup()]),
      bank: this.fb.array([this.createBankGroup()]),
      image: [''],
      login_access: [true],
      apply_tds: [false],
      is_active: [true],
    });
    if(data){
      this.partyid=data.partyid,
      this.actiontype=data.actiontype

      if (this.partyid) {
        this.getparty(this.partyid)
        if(this.actiontype=='view'){
          this.viewing=true
          // this.bindingimage=
          this.partyForm.disable()
        }
        else if(this.actiontype=='edit'){
          this.editing=true
        }
        else{
          this.partyForm.reset();
        }
        // this.partyForm.patchValue({ is_active: true, apply_tds: false, login_access:true });
      }
    }
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      address_line_1: ['',Validators.required],
      address_line_2: [''],
      state: [''],
      country: [''],
      city:[''],
      pincode: ['',Validators.required]
    });

  }

  createBankGroup(): FormGroup {
    return this.fb.group({
      bank_ifsc_code: ['', Validators.required],
      bank_name: [''],
      branch_name: [''],
      account_no: ['', Validators.required],
      account_holder_name: ['']
    });
  }
  
  get addressarray(){
    return this.partyForm.get('address') as FormArray
  }
  get bankarray(){
    return this.partyForm.get('bank') as FormArray
  }

  addaddress(){
    if(this.addressarray.invalid){
      
      // this.partyForm.controls['address'].markAsTouched()
      this.addressarray.markAllAsTouched()
      
      return
    }
    const addressgroup=this.createAddressGroup()
    this.addressarray.push(addressgroup)
  }
  addbankdetails(){
    
    if(this.bankarray.invalid){
      // this.partyForm.controls['address'].markAsTouched()
      this.bankarray.markAllAsTouched()
      
      return
    }
    const bankgroup=this.createBankGroup()
    this.bankarray.push(bankgroup)
  }

  removeaddress(i: number){
    this.addressarray.removeAt(i)
  }

  removebank(i:number){
    this.bankarray.removeAt(i)
  }

  getparty(partyid:any){
    this.partyservice.getpartyapi(partyid).subscribe((res)=>{
      if(res){
        const { bank_id: bank, ...rest } = res; 
        const updatedres = { bank, ...rest };
        this.partyForm.patchValue(updatedres);
        this.bindingimage=res.image
        console.log(this.bindingimage)
        console.log(typeof(this.bindingimage))
      }
      // else{
      //   this.toastr.error(res.message)
      // }
      })
  }

  saveParty(editing:boolean) {
    
    if(this.partyForm.invalid){
      this.partyForm.markAllAsTouched()
      return;
    }
    
    let formData = new FormData();
      Object.keys(this.partyForm.value).forEach(key => {
        // check if null values are present and replace it with ""
        if(this.partyForm.value[key]==null){
          this.partyForm.value[key]=""
        }
        if(key!='image'){
          if(key =="address" || key == "bank"){
            formData.append(key, JSON.stringify(this.partyForm.value[key]));
          }
          else{
            formData.append(key, this.partyForm.value[key]);

          }

        }
      });
      if (this.selectedimagefile) {
        formData.append('image', this.selectedimagefile, this.selectedimagefile.name);
      }
      if(editing){

        this.partyservice.editpartyapi(this.partyid,formData).subscribe(res=>{
          console.log(res)
          if(res.success){
            this.toastr.success(res.msg,"Success")
          this.dailogref.close(true)
          }
          else{
            this.toastr.error(res.msg)
          }
        })
      }
      else{
        this.partyservice.addpartyapi(formData).subscribe(res=>{
          console.log(res)
          if(res.success){
            this.toastr.success(res.msg,"Success")
          this.dailogref.close(true)
          }
          else{
            this.toastr.error(res.msg)
          }
        })

      }
  }


  onFileSelect(event: any){
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, JPEG, and PNG files are allowed.');
        this.selectedimagefile = null;
        this.partyForm.patchValue({
          image: null
        });
        return;
      }

      this.selectedimagefile = file;
    }
    
  }

  numsonly(event: KeyboardEvent) {
    const charCode = event.keyCode;
    if ((charCode > 57 || charCode < 48) && charCode !=8) {
      event.preventDefault();
    }
  }
}
