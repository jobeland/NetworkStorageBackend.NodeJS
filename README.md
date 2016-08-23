# NetworkStorageBackend.NodeJS
NodeJS web api for storing the top neural network performers of the distributed training sessions

The server can be launched with default values with just the following:
```
npm install
node app.js
```
Alternatively, you can supply your own API Key and Mongoose connection string:
```
Set API_KEY=<Insert your API key here>
Set CON_STR=<Insert Mongoose connection string>
```
If the API key is not set, the default API key is `123456789` and the default mongoose connection string is `mongodb://localhost/test` 
