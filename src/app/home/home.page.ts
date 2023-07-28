import {Component, OnInit} from '@angular/core';
import {NoteService} from "../view-note/note.service";
import {INote} from "../types/inote.interface";
import {AlertController, Platform, ToastController} from "@ionic/angular";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    notes: INote[] = [];
    ios = false;

    constructor(private noteService: NoteService,
                private platform: Platform,
                private alertController: AlertController,
                private toastController: ToastController) {
    }

    ngOnInit(): void {
        this.ios = this.platform.is('ios');
        this.noteService.getNotes().subscribe(notes => {
            console.log('notes', notes);
            if (notes.length > 0 && this.notes.length === 0) {
                this.notes = notes;
            }
        });
        this.noteService.updateNote.subscribe(notes => {
            console.log('notes subject= ', notes);
            if (notes.length > 0) {
                this.notes = notes;
            }
        });
    }

    async deleteNoteFromNotes(noteId: string) {
        const alert = await this.alertController.create({
            header: 'Delete Note',
            message: 'Do you want to delete this note?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        console.log('OK clicked');
                        this.noteService.deleteNoteFromNotes(noteId);
                        this.presentToast('Note deleted successfully');
                    },
                },
            ],
        });

        await alert.present();
    }

    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 1500,
            position: 'bottom',
        });

        await toast.present();
    }


}
