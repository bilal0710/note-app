import {Component, OnInit} from '@angular/core';
import {NoteService} from "../view-note/note.service";
import {INote} from "../types/inote.interface";
import {Platform} from "@ionic/angular";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    notes: INote[] = [];
    ios= false;

    constructor(private noteService: NoteService, private platform: Platform) {
    }

    ngOnInit(): void {
        this.ios = this.platform.is('ios');
        this.notes = this.noteService.notes;
    }


}
