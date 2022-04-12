const VIDEO_CALL_RESPONSE = {"result":{"accessToken":"dung-test-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzAxMDBlYjdlNDAzODZmMzdlNTcwYmJiYWUwZjU4YTk4LTE1ODk1MDM1NjYiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJNRjM2NDA5Ny1NTDEwMSIsInZpZGVvIjp7InJvb20iOiIzNjQwOTctMzg5NjUxIn0sImRhdGFfc3luYyI6eyJzZXJ2aWNlX3NpZCI6IklTNjg0NThhNTlkZTE0YTkzMDE4YzM4ZmE5OTM1MjEzYWQifX0sImlhdCI6MTU4OTUwMzU2NiwiZXhwIjoxNTg5NTE3OTY2LCJpc3MiOiJTSzAxMDBlYjdlNDAzODZmMzdlNTcwYmJiYWUwZjU4YTk4Iiwic3ViIjoiQUMyOTJjMzU0ZjY3YzhlNDRhYTczMTdmYjNiNWZkMGI3ZCJ9.KScZAbBw5QWhY5vwdoEs13ysHVu39flhaGGNu6dURpY","roomName":"364097-389651","participantId":19,"targetPaticipantId":20,"roomSid":"RM345e3f55e26f44b471d4b8be9edf0cb2"}}

module.exports = {
    genVideoCallResponse: (mockService) =>{
        mockService.mockHttpRequest({
            path: "/api/v1/video-call/initiateCall",
            response: VIDEO_CALL_RESPONSE,
            statusCode: 200,
            delay: 0
          });
    },
}

