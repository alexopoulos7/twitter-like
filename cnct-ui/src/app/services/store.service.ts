import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Http, Headers, RequestOptions } from "@angular/http";
import { StorageService } from "./storage.service";
import { HttpClient } from "./http.service";
import 'rxjs/add/operator/map';

@Injectable()
/**
 * Service to communicate with APIs
 */
export class StoreService {

    constructor(private http: Http, private storage: StorageService) {
    }

    /**
     * Builds base URIs for using the API
     * @param route
     * @param secure boolean to select secure uri
     * @returns {string}
     */
    url(route, secure = true) {
        return secure ? `${environment.uri}${route}` : `${environment.unsecureUri}${route}`;
    }
    /**
     * Send request to the login router for basic authentication
     * @param username Users email
     * @param password Users plain text password
     * @returns {Promise<User>}
     */
    login(username, password) {
        let base64Credentials = window.btoa(`${username}:${password}`);
        let headers = new Headers();
        headers.append('Authorization', `Basic ${base64Credentials}`);
        return new Promise((resolve, reject) => {
            return this.http.post(this.url('/login', false), { email: username, password: password }, { headers: headers }).map(r => r.json())
                .subscribe(
                (r) => {
                    this.storage.save('user_token', base64Credentials);
                    this.storage.save('user', r);
                    return resolve(r)
                },
                reject
                )
        });
    }

    /**
     * Registers a new user
     * @param email 
     * @param password
     * @param name
     * @returns {Promise<User>}
     */
    registerUser(email, password, name, sex) {
        return new Promise((resolve, reject) => {
            return this.http.post(this.url('/register', false), { name: name, email: email, password: password, sex: sex }).map(r => r.json())
                .subscribe(
                (r) => {
                    if (r) {
                        this.storage.save('user_token', window.btoa(`${r.email}:${r.password}`));
                        this.storage.save('user', r);
                        return resolve(r);
                    }
                    else {
                        reject('User was not created ');
                    }
                },
                reject
                )
        });
    }

    /**
   * Creates a message
   * @param message
   * @returns {Promise<T>}
   */
    createPost(post) {
        return new Promise((resolve, reject) => {
            let user_token = this.storage.getItem('user_token');
            if (user_token) {
                let headers = new Headers();
                headers.append('Authorization', `Basic ${user_token}`);
                let newPost = { message: { text: post.message.text } };
                this.http.post(this.url('/messages'), post, { headers: headers }).map(r => r.json())
                    .subscribe(
                    (r) => {
                        if (r) {
                            let newUserMessage = { usermessage: { author: post.message.author, message: r.messages.id } };
                            console.log('New User message created ' + JSON.stringify(newUserMessage));
                            return this.http.post(this.url('/usermessages'), newUserMessage, { headers: headers }).map(nr => nr.json())
                                .subscribe(resolve, reject);
                        }
                        else {
                            reject('New Post was not created');
                        }
                    },
                    reject
                    )
            }
            else {
                reject('No authentication headers');
            }
        });
    }

    /**
     * Gets a message story by the id
     * @param id
     * @returns {Promise<Story>}
     */
    getMessageStoryById(id) {
        return new Promise((resolve, reject) => {
            let user_token = this.storage.getItem('user_token');
            if (user_token) {
                let headers = new Headers();
                headers.append('Authorization', `Basic ${user_token}`);
                this.http.get(this.url('/messages/' + id), { headers: headers }).map(r => r.json()).subscribe(
                    resolve,
                    reject
                );
            } else {
                reject('User is not logged in');
            }

        });
    }
    getMessageRepliesByParentId(id) {
        return new Promise((resolve, reject) => {
            let user_token = this.storage.getItem('user_token');
            if (user_token) {
                let headers = new Headers();
                headers.append('Authorization', `Basic ${user_token}`);
                let params = '?params=' + JSON.stringify({ where: { parent: id } });
                this.http.get(this.url('/messages') + params, { headers: headers }).map(r => r.json()).subscribe(
                    resolve,
                    reject
                );
            } else {
                reject('User is not logged in');
            }

        });

    }
    /**
     * Get All messages with Pagination
     */
    getAllMessages(params) {
        return new Promise((resolve, reject) => {
            let user_token = this.storage.getItem('user_token');
            if (user_token) {
                let headers = new Headers();
                headers.append('Authorization', `Basic ${user_token}`);
                let queryParams = '';
                if (params) {
                    queryParams = '?' + params;
                }
                this.http.get(this.url('/messages') + queryParams, { headers: headers }).map(r => r.json()).subscribe(
                    resolve,
                    reject
                );
            } else {
                reject('User is not logged in');
            }

        });
    }

    /**
     * Gets all Information for a user with Id
     */
    getAllUserInformationById(id) {
        return new Promise((resolve, reject) => {
            let user_token = this.storage.getItem('user_token');
            if (user_token) {
                let headers = new Headers();
                headers.append('Authorization', `Basic ${user_token}`);

                this.http.get(this.url('/users/' + id), { headers: headers }).map(r => r.json()).subscribe(
                    resolve,
                    reject
                );
            } else {
                reject('User is not logged in');
            }
        });
    }

    /**
     * Like a Message
     */
    likeMessage(params) {
        return new Promise((resolve, reject) => {
            let user_token = this.storage.getItem('user_token');
            if (user_token) {
                let headers = new Headers();
                headers.append('Authorization', `Basic ${user_token}`);
                let newLike = { like: params };
                this.http.post(this.url('/likes'), newLike, { headers: headers }).map(r => r.json())
                    .subscribe(
                    resolve,
                    reject
                    )
            }
            else {
                reject('No authentication headers');
            }
        });
    }

    sendNotificationEmail(params) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url('/send-email', false), params).map(r => r.json())
                .subscribe(
                resolve, reject
                )
        });
    }

    removeLikeMessage(id) {
        return new Promise((resolve, reject) => {
            let user_token = this.storage.getItem('user_token');
            if (user_token) {
                let headers = new Headers();
                headers.append('Authorization', `Basic ${user_token}`);
                this.http.delete(this.url('/likes/') + id, { headers: headers }).map(r => r.json())
                    .subscribe(
                    resolve,
                    reject
                    )
            }
            else {
                reject('No authentication headers');
            }
        });
    }
}