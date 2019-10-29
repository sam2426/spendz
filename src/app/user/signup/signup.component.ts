import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './../../services/app.service';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown'; //https://www.npmjs.com/package/ng-multiselect-dropdown


class ImageSnippet{
  constructor(
    public src:string,
    public file:File
  ){}
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName:string;
  public lastName:any;
  public mobile:any;
  public email:any;
  public password:any;
  public gender:any;
  public picUrl:any='';
  public showLoader:boolean=false;


  public countries:any[]; //it has the full array of the list of countries with countryCode
  public countryCodes:any[]; // it has the full array of the list of country phone code with countryCode
  public country:any; // one selected country from dropdown
  public countryCode:any; // that one selected country code to match between country and country phone code
  public countryPhoneCode:any; //that one selected country phone code to according to country selected.
  
  constructor(
    public cookieService: CookieService,
    public toastr:ToastrService,
    public appService:AppService,
    public router:Router,
  ) { }

  ngOnInit() {
    if (!(this.cookieService.get('authToken')=='')) {
      this.router.navigate(['/user-home/', this.cookieService.get('userId')]);
    }else{
      this.router.navigate(['/signup']);
    }
    this.getCountries();
    this.getCountryCodes();
  }

  public onCountrySelected(value){
    // this.countryCode=value;
    let CountryElement=this.countries.find(obj=>obj.countryCode===value);
    this.country=CountryElement.country;

    let CountryPhoneElement=this.countryCodes.find(obj=>obj.countryCode===value);
    this.countryPhoneCode=CountryPhoneElement.code;
    // console.log('value emmitted is ',value);
    // console.log('country:',this.country);
    // console.log('countryCode',this.countryCode);
    // console.log('countryPhoneCode',this.countryPhoneCode);
    
  }

  public getCountries() {
    let arr: any[] = [];
    this.appService.getCountries().subscribe(data => {
      for (const [key, value] of Object.entries(data)) {
        let cd = { 'countryCode': key, 'country': value }
        arr.push(cd);
      }
      this.countries=arr;
      // console.log(this.countries);
    })
  }

  public getCountryCodes() {
    let arr: any[] = [];
    this.appService.getCountryCodes().subscribe(data => {
      for (const [key, value] of Object.entries(data)) {
        let cd = { 'countryCode': key, 'code': value }
        arr.push(cd);
      }
      this.countryCodes=arr;
      // console.log(this.countryCodes);
    })
  }

  
  public imageTarget:String='';
  public selectedFile:ImageSnippet;// ImageSnippet-a custom class to store image data.

  public processFile(event){
    const file:File=event.target.files[0];
    const reader=new FileReader();

    reader.addEventListener('load',(event:any)=>{
      this.imageTarget=event.target.result;
      this.selectedFile=new ImageSnippet(event.target.result,file)
    });
    reader.readAsDataURL(file);
  }

  public goToSignIn(){
    this.router.navigate(['/login']);
  }

  public signUpFunction=()=>{
    this.showLoader=true;
     let uploadImage :any= () => {
       return new Promise((resolve, reject) => {
         if(this.imageTarget==null||this.imageTarget==''){
           resolve();
         }else{
           this.appService.uploadImage(this.selectedFile.file).subscribe((apiResponse) => {
             if(apiResponse.status===200){
             this.picUrl = apiResponse.data;
             console.log(apiResponse.data);
             resolve();
             }else{
               reject(apiResponse.message);
             }
           })
         }
       })
     }
 
    let signUp: any = () => {
      return new Promise((resolve, reject) => {
        let data = {
          firstName: this.firstName,
          lastName: this.lastName,
          mobile: this.countryPhoneCode + " " + this.mobile,
          email: this.email,
          password: this.password,
          gender: this.gender,
          profilePic: this.picUrl,
          country: this.country
        }
        console.log(data);

        this.appService.signupFunction(data).subscribe((apiResponse) => {
          console.log(apiResponse);

          if (apiResponse.status === 200) {
            resolve(apiResponse);
          }
          else {
            reject();
          }
        },
          (err) => {
            reject();
          });
      })
    }
     
     if(!this.firstName){
       this.toastr.warning('enter first name');
     }else if(!this.lastName){
       this.toastr.warning('enter last name');
     }else if(!this.mobile){
       this.toastr.warning('enter mobile number');
     }else if(!this.password){
       this.toastr.warning('enter password');
     }else if(!this.email){
       this.toastr.warning('enter email');
     }else if(!this.gender){
       this.toastr.warning('select gender');
      }else{
       uploadImage()
       .then(signUp)
       .then((resolve)=>{
         console.log(resolve);
         this.toastr.success('SignUp Successfully');
         this.showLoader=false;
         this.goToSignIn();  // after signup redirecting to signin, ngx toaster still shows after 
                            //refreshing so no need for timeout.
       })
       .catch(()=>{
         this.showLoader=false;
         this.toastr.error('Some error occured');
       })
      }
   }
}
