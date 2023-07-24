import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "./note.service";
import {INote} from "../types/inote.interface";

@Component({
    selector: 'app-view-note',
    templateUrl: './view-note.page.html',
    styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {

    noteData!: INote;
    createNote = false;

    constructor(private noteService: NoteService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(paramMap => {
            const noteId = paramMap.get('id') as string;
            this.createNote = noteId === 'create';
            console.log('noteId', noteId);
            if (noteId && noteId !== 'create') {
                this.noteData = this.noteService.notes.find((note: INote) => note.id === noteId) as INote;
            }
        });
    }

    // setBackButtonText() {
    // return this.platform.is('ios') ? 'Back' : '' ;
    // }
}
