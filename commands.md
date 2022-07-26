## Comands to run process

### Forever

*1:* forever start ./dist/server.js -e:dev -p:8080 -m:fork
*2:* forever list
*3:* forever stop

#### Notes:

Forever did not work on my system, documentations says that it might be a problem with the libraries.


### PM2

*1:* pm2 start ./dist/server.js -e:dev -p=8080 -m=fork
*2:* pm2 list

id  │ name       │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 1   │ server     │ default     │ 1.0.0   │ fork    │ 15555    │ 1s     │ 96   │ online    │ 0%       │ 0b       │ jorgem   │ disabled │
│ 0   │ ts-node    │ default     │ 0.39.1  │ fork    │ 10765    │ 22m    │ 0    │ online    │ 0%       │ 85.3mb   │ jorgem   │ disabled │

*3:* forever stop server

[PM2] Applying action stopProcessId on app [server](ids: [ 1 ])
[PM2] [server](1) ✓
┌─────┬────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name       │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 1   │ server     │ default     │ 1.0.0   │ fork    │ 0        │ 0      │ 157  │ stopped   │ 0%       │ 0b       │ jorgem   │ disabled │
│ 0   │ ts-node    │ default     │ 0.39.1  │ fork    │ 10765    │ 24m    │ 0    │ online    │ 0%       │ 85.1mb   │ jorgem   │ disabled │
└─────┴────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘




