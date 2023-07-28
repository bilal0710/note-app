import {Injectable} from '@angular/core';
import {Client, Databases, ID} from 'appwrite';
import {from} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    client = new Client();
    databases;

    //account ;

    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('64c3bf12d2f9907189c4');
        this.databases = new Databases(this.client);
        /*       this.account = new Account(this.client);

               const promise = this.account.createEmailSession('bilal.alnaani@gmail.com', 'bilalbmn');

               promise.then(function (response) {
                   console.log('account= ', response); // Success
               }, function (error) {
                   console.log(error); // Failure
               });*/
    }

    createNotes(note: { title: string, content: string }) {
        console.log('note', note);
        return from(this.databases.createDocument(
            "64c3c0146439b9dff05e",
            "64c3c05863351e4108bb",
            ID.unique(),
            note
        ).then((response) => {
            return {
                id: response['$id'],
                title: response['title'],
                content: response['content']
            };
        }));
    }

    getNotes() {
        return from(this.databases.listDocuments(
            "64c3c0146439b9dff05e",
            "64c3c05863351e4108bb",
            []
        ).then((response) => {
            return response.documents.map((note) => {
                return {
                    id: note['$id'],
                    title: note['title'],
                    content: note['content']
                }
            });
        }));
    }
}
