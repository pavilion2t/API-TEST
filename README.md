# Bindo API Client

Use Bindo API without Bindo API knowledge

Table of Contents
=================

* [Get Started](#get-started)
    * [Installing](#installing)
    * [Example](#example)
* [Available Clients](#available-clients)
* [Interceptors](#interceptors)
    * [onRequest](#onrequest)
    * [onSuccess](#onsuccess)
    * [onError](#onerror)
* [JSDoc](#jsdoc)

Created by [gh-md-toc](https://github.com/ekalinin/github-markdown-toc)

## Get Started

### Installing

```
yarn add git+ssh://git@bitbucket.org:bindolabs/bindo-api-client.git
```

### Example

``` javascript
import Client from 'bindo-api-client'

const env = 'staging';
const onRequest = (url, options) => {
  // Do somethings
  return { url, options };
};
const onSuccess = (response) => {
  // Do somethings
};
const onError = (error) => {
  // Do somethings
  throw error;
};
const client = new Client({
  onRequest, onSuccess, onError, camelize: false,
}, env)

client.main().login({
  username: 'username',
  password: 'password',
})
```

## Available Clients

- main for https://trybindo.com/api/v2

## Interceptors

### onRequest

onRequest interceptor allows us add custom HTTP headers

``` javascript
const onRequest = (url, options)=>{
  options.headers['X-USER-ACCESS-TOKEN'] = 'your_access_token_here'
  return {
    url,
    options
  }
}

let client = new Client({onRequest})

// or set all apis use new onRequest interceptor

client.setOnRequest(onRequest)

// or set a single api use new onRequest interceptor

client.main().setOnRequest(onRequest)
```

We can set onRequest interceptor via constructor or setOnRequest method. The code above adds a custom HTTP header 'X-USER-ACCESS-TOKEN'.

### onSuccess

onSuccess interceptor allows us inspect on success responses

``` javascript
const onSuccess = (response) => console.log(response)

let client = new Client({onSuccess})
```

the argument response schema:

``` javascript
{
  data: {...},        // API response data
  status: number,     // HTTP status code
  statusText: string, // HTTP status text
  headers: {...}      // object of response headers
}
```

### onError

onError interceptor allows us set a default error handling callback

``` javascript
const onError = (error) => {
  if (error.response.status === 401){
    // invalid token, handle
  } else {
    throw error
  }
}

let client = new Client({onError})
```

the argument error schema:

``` javascript
{
  response: {...} // HTTP response, same as onSuccess argument
  message: string // error message, parsed from response body
  config: {
    url: string   // request URL
  }
}
```

## JSDoc

To generate documentation

```
$ yarn build:docs
```
