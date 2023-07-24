import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteComponent} from "./note/note.component";
import {IonicModule} from "@ionic/angular";
import {CreateNoteComponent} from "./create-note/create-note.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [NoteComponent, CreateNoteComponent],
    exports: [
        NoteComponent,
        CreateNoteComponent
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ]
})
export class LibModule {
}
