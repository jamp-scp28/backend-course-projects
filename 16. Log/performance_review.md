> # NODEJS SERVER PERFORMANCE REVIEW

> ## 1. PROFILER ON API ENDPOINT: API/INFO

![profiler](file:///home/jorgem/Pictures/profiler.png)

> ## 1.1. ARTILLERY RESULTS

Running scenarios...

Phase started: unnamed (index: 0, duration: 1s) 15:30:45(-0500)

Phase completed: unnamed (index: 0, duration: 1s) 15:30:46(-0500)

All VUs finished. Total time: 5 seconds

--------------------------------
Summary report @ 15:30:49(-0500)
--------------------------------

http.codes.200: ................................................................ 1000

http.request_rate: ............................................................. 339/sec

http.requests: ................................................................. 1000

http.response_time:

  min: ......................................................................... 1

  max: ......................................................................... 33

  median: ...................................................................... 10.9

  p95: ......................................................................... 19.1

  p99: ......................................................................... 22.9

http.responses: ................................................................ 1000

vusers.completed: .............................................................. 20

vusers.created: ................................................................ 20

vusers.created_by_name.0: ...................................................... 20

vusers.failed: ................................................................. 0

vusers.session_length:

  min: ......................................................................... 271.7

  max: ......................................................................... 752.6

  median: ...................................................................... 620.3

  p95: ......................................................................... 742.6

  p99: ......................................................................... 742.6

## 1.2. AUTOCANNON RESULTS

![profiler](file:///home/jorgem/Pictures/profiler.png)

## 2. PROFILER WITH INSPECT

![profiler](file:///home/jorgem/Pictures/profiler.png)

## 3. 0X DIAGRAM

![profiler](file:///home/jorgem/Pictures/profiler.png)


________________________

# SUMMARY

## CONCLUSION

Review alternatives for authentication and session methods to improve server performance.

## COMMENTS
First, reviewing the results from the node profiler we can see that the most ticks are being taken by javascript processes for compiling purposes mainly consumed by cjs/loader, it might be due to the use of typescript in the project. In the file we  cannot see what process or endpoints are consuming ticks or resources so the use of another tools are required.

Regarding artillery load test on endpoint /api/info, we got that the mean for the response time was 10.2, and each user requesting the endpoint 50 times took 620.3.

The results from autocannon show an average of 630.53 ms, with an approximately transfer bytes/sec of 129 kb.

With the chrome inspector we got that the authenticator middleware is taking 777.5 ms being the second process with the worst performance, following by other process but the most relevants are the process preparing the response such as jsonparser and the res method of express.

Regarding 0x graphflames we can see that the process blocking the overall process are the routes method maybe due to requests of autocannon and again the authentication and session methods of the application.