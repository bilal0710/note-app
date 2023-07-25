import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {INote} from "../../types/inote.interface";
import {NoteService} from "../../view-note/note.service";

@Component({
    selector: 'app-create-note',
    templateUrl: './create-note.component.html',
    styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {

    debounce: number = 400;
    title!: FormControl;
    content!: FormControl;
    newNote!: INote;
    @Input() note!: INote;


    constructor(private noteService: NoteService) {
    }

    ngOnInit() {
        if (this.note) {
            this.title = new FormControl(this.note.title);
            this.content = new FormControl(this.note.content);
            this.newNote = this.note;
            console.log(this.note);
        } else {
            this.title = new FormControl('');
            this.content = new FormControl('');
        }

        this.title.valueChanges
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe(query => {
                this.newNote = {
                    id: this.newNote?.id ? this.newNote.id : (Math.random() + 1).toString(36).substring(7),
                    title: query,
                    content: this.newNote?.content ? this.newNote.content : '',
                }
                console.log(this.newNote);
                this.noteService.addNewNoteToNotes(this.newNote);
            });
        this.content.valueChanges
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe(query => {
                this.newNote = {
                    id: !this.newNote?.id ? (Math.random() + 1).toString(36).substring(7) : this.newNote.id,
                    title: this.newNote?.title ? this.newNote.title : '',
                    content: query,
                }
                console.log(this.newNote);
                this.noteService.addNewNoteToNotes(this.newNote);
            });
    }
}
