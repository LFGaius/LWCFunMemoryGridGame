import { LightningElement } from 'lwc';

export default class Lwcfun_memory_game extends LightningElement {
    playingScreenDisplayed;
    
    onStart(){
        this.playingScreenDisplayed=true;
    }
}