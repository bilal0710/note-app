import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
    selector: 'app-create-note',
    templateUrl: './create-note.component.html',
    styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {

    public title!: FormControl;
    public content!: FormControl;
    public debounce: number = 400;

    constructor() {
    }

    // ToDO: Add a save button to the create note page or add logic to save the note when the user navigates away from the page.
    ngOnInit() {
        this.title = new FormControl('');
        this.title.valueChanges
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe(query => {
                console.log(query);
            });
        this.content = new FormControl('');
        this.content.valueChanges
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe(query => {
                console.log(query);
            });
    }
}
