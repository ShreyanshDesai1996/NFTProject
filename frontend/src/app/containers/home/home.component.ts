import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ethers } from 'ethers';
import { Subject } from 'rxjs';
import { Card } from 'src/app/models/cards';
import { setWalletAddressSuccess } from 'src/app/store/actions/user/user.actions';
import { addressData } from 'src/app/store/reducers/user/user.selector';
import Web3 from 'web3';
const Address ='0x784fd18fbb268151c3a13cb0e408c6f6fc2ae471'
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "",
        }
      ],
      "name": "Token",
      "type": "event"
    },
]
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
    cards: Card[] = [
        { text: 'All Users', route: 'all-users' },
        { text: 'Create Template', route: 'all-users' },
        { text: 'Manage Template', route: 'all-users' },
        { text: 'Create Broadcast List', route: 'all-users' },
        { text: 'Manage Broadcast List', route: 'all-users' },
        { text: 'Send Broadcast', route: 'all-users' },
        { text: 'Platform Variables', route: 'all-users' },
        { text: 'Broadcast History', route: 'all-users' },
    ];
    address?:string;
    contractText?:string;
    
    private web3js: any;
  private provider: any;
  private accounts: any;
  private accountStatusSource = new Subject<any>();

   web3Modal: any;
    constructor(public router: Router,    private store: Store,
        ) {}

    async ngOnInit(): Promise<void> {
        this.store.select(addressData).subscribe(data => {
            if(data)
            this.address = data;
        });
    }

    navigateToPage(route: string): void {
        this.router.navigateByUrl('/' + route);
    }

    onClickButton():void{
        if(!(window as any).ethereum)
        alert("Install metamask")
        else{
            (window as any).ethereum.request({method:'eth_requestAccounts'}).then((result: any)=>{
                this.store.dispatch(setWalletAddressSuccess({address:result}));
            })
        }
        

    }

    

    async updateContract():Promise<void>{


       let tempProvider=  new ethers.providers.Web3Provider((window as any).ethereum);
       console.log(tempProvider)
        let web3=new Web3((window as any).ethereum)
        console.log("web3=",web3)
       web3.setProvider(tempProvider as any);

       let tempSigner = tempProvider.getSigner();
       
       let tempContract = new ethers.Contract(Address,abi,tempSigner);
        const create = tempContract.methods.createOrganization(Address).send();
       this.provider = await this.web3Modal.connect(); // set provider

       this.web3js = new Web3(this.provider); // create web3 instance
       this.accounts = await this.web3js.eth.getAccounts(); 
       this.accountStatusSource.next(this.accounts)

        
    // (window as any).web3 = new Web3((window as any).ethereum);
    // console.log((window as any).web3.eth)
    //     try {
    //             const contract = new (window as any).web3.eth.Contract(
    //                 abi,
    //                 Address,
    //             );
    //             const token = await contract.methods
    //             console.log("token",token)
    //             return token
            
    //     }
    //     catch (error:any) {
    //         const errorMessage = error.message;
    //         console.log(errorMessage)
       
    //     }
        }
}

