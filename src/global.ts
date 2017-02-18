import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Http,HttpModule, Response, Headers, RequestOptions } from '@angular/http';
// import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

'use strict';

export var mainUrl = 'http://183.82.1.143:4123/';
// export var mainUrl = 'http://localhost:4123/';
export var  headers: Headers;
export var  headersReg: Headers;
export var login : any;
export var loginDetails = {
  email : localStorage.getItem('username'),
  password : localStorage.getItem('password')
};
export var isCheck = localStorage.getItem('isCheckUser');

