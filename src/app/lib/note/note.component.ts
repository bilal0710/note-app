import {Component, Input, OnInit} from '@angular/core';
import {INote} from "../../types/inote.interface";

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

    @Input() note!: INote;
    @Input() viewList = false;

    constructor() {
    }

    ngOnInit() {
    }

}
