import { LightningElement,api } from 'lwc';
import LWCFUN_RESOURCES from "@salesforce/resourceUrl/lwcfun_icons";
import incrementVictories from '@salesforce/apex/LWCFUN_MemoryGameController.incrementVictories';
const SALESFORCE_IMG_SRC= LWCFUN_RESOURCES+'/salesforce.png';
const TRUST_IMG_SRC= LWCFUN_RESOURCES+'/trust.png';
const DOLLAR_IMG_SRC= LWCFUN_RESOURCES+'/dollar.png';
const CRM_IMG_SRC= LWCFUN_RESOURCES+'/crm.png';
const ANALYTICS_IMG_SRC= LWCFUN_RESOURCES+'/analytics.png';
const BLACK_MAN_IMG_SRC= LWCFUN_RESOURCES+'/black-man.png';
const READING_IMG_SRC= LWCFUN_RESOURCES+'/reading.png';
const SALE_IMG_SRC= LWCFUN_RESOURCES+'/sale.png';
const DISCOUNT_MAN_IMG_SRC= LWCFUN_RESOURCES+'/discount.png';
const ORIGINAL_GAME_SET=[
    {
        index:1,
        iconSrc:SALESFORCE_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:2,
        iconSrc:TRUST_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:3,
        iconSrc:DOLLAR_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:4,
        iconSrc:CRM_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:5,
        iconSrc:ANALYTICS_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:6,
        iconSrc:BLACK_MAN_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:7,
        iconSrc:SALESFORCE_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:8,
        iconSrc:TRUST_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:9,
        iconSrc:DOLLAR_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:10,
        iconSrc:CRM_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:11,
        iconSrc:READING_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:12,
        iconSrc:ANALYTICS_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:13,
        iconSrc:BLACK_MAN_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:14,
        iconSrc:READING_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:15,
        iconSrc:SALE_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:16,
        iconSrc:DISCOUNT_MAN_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:17,
        iconSrc:SALE_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    },
    {
        index:18,
        iconSrc:DISCOUNT_MAN_IMG_SRC,
        hidden:true,
        imgClass:'img-hidden'
    }
];
export default class Lwcfun_memory_grid extends LightningElement {
    @api recordId;
    elementsList=[];
    totalNumPairs=9;
    numPairFound;
    toBeComparedElementIndex=-1;//-1 stands for a non-existent thing
    hasWon;
    
    checkVictory(){
        const hasWon=this.totalNumPairs == this.numPairFound;
        if(hasWon ){
            this.incrementVictoriesOnContact();
            this.hasWon=hasWon;
        }
    }

    async incrementVictoriesOnContact(){
        await incrementVictories({contactId:this.recordId})
    }

    /**
     * Since Math.random() returns a number between 0 and 1, Math.random()-0.5 will always return a number between -0.5 and 0.5
     * for a positive value, a permutation is made into the array
     * Using Math.random()-0.5, permutations will be made according to the random value returned
     * The array will be somehow shuffled 
     */
    connectedCallback(){
        this.init();
    }

    init(){
        this.elementsList= ORIGINAL_GAME_SET.sort(()=>Math.random()-0.5);
        this.numPairFound=0;
    }

    onUnhideElement(event){
        let elementsList=[...this.elementsList];
        const elementIndex=elementsList.findIndex(e=>e.index==event.currentTarget.dataset.id);
        if(elementsList[elementIndex].hidden){
            if(this.toBeComparedElementIndex>=0){
                if(elementsList[elementIndex].iconSrc==elementsList[this.toBeComparedElementIndex].iconSrc){
                    this.showElement(elementsList,elementIndex);
                    this.toBeComparedElementIndex=-1;//since the pair is found, it's no longer to be compared
                    this.numPairFound++;
                    this.checkVictory();
                }else{
                    this.showElement(elementsList,elementIndex);
                    setTimeout(()=>{
                        //we hide again the element after some times 
                        this.hideElement(elementsList,elementIndex);
                    },200)
                }
            }else{
                //no element is currently to be compared
                this.toBeComparedElementIndex=elementIndex;
                this.showElement(elementsList,elementIndex);
            }
        }
    }

    showElement(elementsList,elementIndex){
        elementsList[elementIndex]={...elementsList[elementIndex],hidden:false,imgClass:'img-not-hidden'};
        //to avoid reference issues if the same elementsList variable is reused(by example, in case of show-hide when elements don't match)
        this.elementsList=[...elementsList];
    }

    hideElement(elementsList,elementIndex){
        elementsList[elementIndex]={...elementsList[elementIndex],hidden:true,imgClass:'img-hidden'};
        this.elementsList=[...elementsList];
    }

    onReplay(){
        this.init();
    }
}