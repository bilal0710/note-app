import {Injectable} from '@angular/core';
import {INote} from "../types/inote.interface";
import {DatabaseService} from "../database.service";
import {map, of, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NoteService {

    private notes: INote[] = [];
    updateNote= new Subject<INote[]>();

    constructor(private dataBaseService: DatabaseService) {
    }

    getNotes() {
        return this.dataBaseService.getNotes().pipe(
            map((notes: INote[]) => {
                this.notes = notes;
                return notes;
            })
        );
    }

    addNewNoteToNotes(newNote: INote) {
        console.log('Service newNote', newNote);
        console.log('service notes', this.notes);

        const index = this.notes.findIndex(note => newNote.id === note.id);
        if (index > -1) {
            console.log('in', this.notes);
            this.notes[index] = newNote;
            return of(newNote);
        }
        this.notes.push(newNote);
        console.log('after', this.notes);
        return this.dataBaseService.createNotes(newNote).pipe(
            map((note: INote) => {
                this.updateNote.next(this.notes);
                return note;
            })
        );
    }

    deleteNoteFromNotes(noteId: string) {
        const index = this.notes.findIndex(note => noteId === note.id);
        if (index > -1) {
            this.notes.splice(index, 1);
        }
    }
}
