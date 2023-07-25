import {Injectable} from '@angular/core';
import {INote} from "../types/inote.interface";

@Injectable({
    providedIn: 'root'
})
export class NoteService {

    notes = [
        {
            id: '1',
            title: 'Note 1',
            content: 'This is the first note',
        },
        {
            id: '2',
            title: 'Note 2',
            content: 'This is the second note',
        },
        {
            id: '3',
            title: 'Note 3',
            content: 'This is the third note',
        },
        {
            id: '4',
            title: 'Note 4',
            content: 'This is the fourth note',
        },
    ];

    constructor() {
    }

    addNewNoteToNotes(newNote: INote) {
        const index = this.notes.findIndex(note => newNote.id === note.id);
        if (index > -1) {
            console.log('in', this.notes);
            this.notes[index] = newNote;
            return;
        }
        this.notes.push(newNote);
        console.log('after', this.notes);
    }
}
