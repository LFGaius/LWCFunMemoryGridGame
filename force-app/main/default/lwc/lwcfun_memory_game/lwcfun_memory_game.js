import { LightningElement,api } from 'lwc';

export default class Lwcfun_memory_game extends LightningElement {
    @api recordId;
    playingScreenDisplayed;
    
    onStart(){
        this.playingScreenDisplayed=true;
    }
}