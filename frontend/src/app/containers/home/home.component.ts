import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfuraProvider } from '@ethersproject/providers';
import { Store } from '@ngrx/store';
import { ethers, Wallet } from 'ethers';
import { Subject } from 'rxjs';
import { Card } from 'src/app/models/cards';
import { setWalletAddressSuccess } from 'src/app/store/actions/user/user.actions';
import { addressData } from 'src/app/store/reducers/user/user.selector';
import Web3 from 'web3';
const Address ='0x784FD18FBB268151c3a13Cb0e408c6F6FC2ae471'
const abi =[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"_metadataUpdatable","type":"bool"},{"internalType":"bool","name":"_tokensBurnable","type":"bool"},{"internalType":"bool","name":"_tokensTransferable","type":"bool"},{"internalType":"string","name":"_initBaseURI","type":"string"},{"internalType":"address","name":"_royaltiesAddress","type":"address"},{"internalType":"uint96","name":"_royaltiesBasisPoints","type":"uint96"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_value","type":"string"},{"indexed":true,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"PermanentURI","type":"event"},{"anonymous":false,"inputs":[],"name":"PermanentURIGlobal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"freezeTokenUris","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metadataUpdatable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"caller","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintToCaller","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"royaltiesAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"royaltiesBasisPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensBurnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensTransferable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferByOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"},{"internalType":"bool","name":"_tokensTransferable","type":"bool"},{"internalType":"bool","name":"_freezeUpdates","type":"bool"},{"internalType":"address","name":"_royaltiesAddress","type":"address"},{"internalType":"uint96","name":"_royaltiesBasisPoints","type":"uint96"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"string","name":"_tokenUri","type":"string"},{"internalType":"bool","name":"_isFreezeTokenUri","type":"bool"}],"name":"updateTokenUri","outputs":[],"stateMutability":"nonpayable","type":"function"},{
      "name" : "transfer",
      "type" : "function",
      "inputs" : [
         {
            "name" : "_to",
            "type" : "address"
         },
         {
            "type" : "uint256",
            "name" : "_tokens"
         }
      ],
      "constant" : false,
      "outputs" : [],
      "payable" : false
   }]
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
    contractText?:string;
    
     web3=new Web3((window as any).ethereum);
     walletAddress?:string;
//   private provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/7d8daf65b1ba492ea8fd1d1d4673bf23');

provider = new InfuraProvider("rinkeby", "7d8daf65b1ba492ea8fd1d1d4673bf23");



   web3Modal: any;
    constructor(public router: Router,    private store: Store,
        ) {}

    async ngOnInit(): Promise<void> {
        this.store.select(addressData).subscribe(data => {
            if(data)
            this.walletAddress = data;
        });
    }

    navigateToPage(route: string): void {
        this.router.navigateByUrl('/' + route);
    }

    async onClickButton():Promise<void>{
        if(!(window as any).ethereum)
        alert("Install metamask")
        else{
            (window as any).ethereum.request({method:'eth_requestAccounts'}).then((result: any)=>{
                this.store.dispatch(setWalletAddressSuccess({address:result}));
            })
        }

        const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/7d8daf65b1ba492ea8fd1d1d4673bf23');
        const balance = await this.web3.eth.getBalance('0x784FD18FBB268151c3a13Cb0e408c6F6FC2ae471');
        console.log("Balance = ",ethers.utils.formatEther(balance)," ETH" );

    }

    async readContract():Promise<void>{
        const address = '0xaB89B57182a9aCe60A446238806b7614621c18f6';

        const contract = new ethers.Contract(address,abi,this.provider);
        console.log("Contract = ",contract);
        const balance = await contract.balanceOf('0xaB89B57182a9aCe60A446238806b7614621c18f6');
        console.log("Name = ",await contract.name() );
        console.log("Symbol = ",await contract.symbol() );
        console.log("Total Supply = ",await contract.totalSupply() );
        console.log("Balance of contract= ",ethers.utils.formatEther(balance)," ETH" );

    }

    async createTransaction():Promise<void>{
        const account1 = '0x784FD18FBB268151c3a13Cb0e408c6F6FC2ae471';
        const account2 = '0xf921a19f1Bfb6ed05fd0762f5e9fd1881C4fA41a';
        
        const privateKey="8350f309928c9466814d3a71ff8dc28fe6135ed02e9ee7e6ce409a08cb3960df";

        const wallet = new ethers.Wallet(privateKey,this.provider);

        console.log("Sender Balance before tx= ",ethers.utils.formatEther(await this.web3.eth.getBalance(account1))," ETH");
        console.log("Receiver Balance before tx= ",ethers.utils.formatEther(await this.web3.eth.getBalance(account2))," ETH");
        // let gasPrice = await this.provider.getGasPrice();

        // console.log("getETHGasFee...gasPrice: ", gasPrice.toString());
        // let gasLimit = 21000;
        // let gas = gasPrice.mul(gasLimit);
        // console.log("wallet getETHGasFee...gas: ", gas.toString());
        //  console.log("wallet after format getETHGasFee...gas: ", ethers.utils.formatEther(gas));
       const tx = await wallet.sendTransaction({to:account1,value:ethers.utils.parseEther("0.01"),from:account2});

       await tx.wait();
       console.log("Transaction = ",tx);

       console.log("Sender Balance after tx= ",ethers.utils.formatEther(await this.web3.eth.getBalance(account1))," ETH");
        console.log("Receiver Balance after tx= ",ethers.utils.formatEther(await this.web3.eth.getBalance(account2))," ETH");


    }

    async sendToken():Promise<void>{
        const address = '0x01be23585060835e02b77ef475b0cc51aa1e0709';
        
        // const address='0xb3368484A3431E118DCaCE501D0c8D67ef657490';

        const contract = new ethers.Contract(address,abi,this.provider);

        const account1 = '0x784FD18FBB268151c3a13Cb0e408c6F6FC2ae471';
        const account2 = '0xf921a19f1Bfb6ed05fd0762f5e9fd1881C4fA41a';
        

        const privateKey="153a385d56bbc4ab89b2089bf2bf959f539d3eccfa547f2a55bbc89e3a5ce2e9";

        const wallet = new ethers.Wallet(privateKey,this.provider);
        const balance = await contract.balanceOf(account1);
        console.log("Sender Balance before tx= ",ethers.utils.formatEther(await contract.balanceOf(account1)));
        console.log("Receiver Balance before tx= ",ethers.utils.formatEther(await contract.balanceOf(account2)));
        let gasPrice = await this.provider.getGasPrice();
        console.log("Gas price = ", gasPrice.toString())
        // const gasLimit = await contract.connect(wallet).estimateGas["safeTransferFrom(address,address,uint256)"](account1, account2, 1,{gasLimit:gasPrice,
        // });
        // console.log("Gas limit = ",gasLimit.toString());

        const tx = await contract.connect(wallet).transfer(account2,ethers.utils.parseUnits('1'));
        // const tx = await contract.connect(wallet)["safeTransferFrom(address,address,uint256)"](account1, account2, 1,{ gasLimit:1000000});



        await tx.wait();
       console.log("Transaction = ",tx);


       console.log("Sender Balance after tx= ",ethers.utils.formatEther(await contract.balanceOf(account1)));
        console.log("Receiver Balance after tx= ",ethers.utils.formatEther(await contract.balanceOf(account2)));

    }

    async mintNFT():Promise<void>{
        // const address = '0x01be23585060835e02b77ef475b0cc51aa1e0709';
        
        const address='0x93C30C60488bC8240334A0f35227d4F325daa526';
     
        const mintAbi = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "approved",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "ApprovalForAll",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "getApproved",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "tokenURI",
                        "type": "string"
                    }
                ],
                "name": "mintNFT",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ownerOf",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_data",
                        "type": "bytes"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes4",
                        "name": "interfaceId",
                        "type": "bytes4"
                    }
                ],
                "name": "supportsInterface",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "tokenURI",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];

        const contract = new ethers.Contract(address,mintAbi,this.provider);
        const tokenURI= await contract.tokenURI(1);

        const account1 = '0x784FD18FBB268151c3a13Cb0e408c6F6FC2ae471';
        const account2 = '0xf921a19f1Bfb6ed05fd0762f5e9fd1881C4fA41a';

        const account3='0x39f4057eE6d062c5b86C7Aa1b6482Ca0cEe0b366';
        

        const privateKey="153a385d56bbc4ab89b2089bf2bf959f539d3eccfa547f2a55bbc89e3a5ce2e9";
        const wallet = new ethers.Wallet(privateKey,this.provider);


        const tx= await contract.connect(wallet).mintNFT(account1,tokenURI.toString(),{
            gasLimit:200000,
        });



       console.log("Transaction = ",tx);

    }



    
}

