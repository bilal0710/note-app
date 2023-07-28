import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {INote} from "../../types/inote.interface";
import {NoteService} from "../../view-note/note.service";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
    selector: 'app-create-note',
    templateUrl: './create-note.component.html',
    styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit, OnDestroy {

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
            console.log('no note');
            this.title = new FormControl('');
            this.content = new FormControl('');
        }

        this.title.valueChanges
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe(query => {
                this.newNote = {
                    id: this.newNote?.id ,
                    title: query,
                    content: this.newNote?.content ? this.newNote.content : '',
                }
                console.log(this.newNote);
            });
        this.content.valueChanges
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe(query => {
                this.newNote = {
                    id: this.newNote?.id ,
                    title: this.newNote?.title ? this.newNote.title : '',
                    content: query,
                }
                console.log(this.newNote);
            });
    }

    ngOnDestroy(): void {
        console.log('destroyed');
        this.noteService.addNewNoteToNotes(this.newNote).subscribe((note) => console.log('added new note', note));
    }
}
