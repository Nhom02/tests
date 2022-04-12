function MockService(browser) {
    // start Mockserver client listen on port and host was stated in browser.config.js
    const mockServerClient = require("mockserver-client").mockServerClient(
      'localhost',
      '58082'
    );
  
    const mockHttpRequest = async props => {
      request = {path: props.path};
      if(props.method){
        request.method = props.method
      }
      try {
        await mockServerClient.mockAnyResponse({
          httpRequest: request,
          httpResponse: {
            "headers": {
              "Content-Type": ["application/json"],
              "Access-Control-Allow-Origin": ["*"],
              "Access-Control-Allow-Methods" : ["GET, HEAD, OPTIONS, POST, PUT, PATCH"],
              "Access-Control-Allow-Headers" : ["Access-Control-Allow-Origin, Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Allow-Methods, Access-Control-Request-Method, Access-Control-Request-Headers"],
              "Access-Control-Expose-Headers": ["Access-Control-Allow-Origin, Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Allow-Methods, Access-Control-Request-Method, Access-Control-Request-Headers"],
              "Access-Control-Max-Age": ["300"],
              "connection": ["keep-alive"]
            },
            statusCode: props.statusCode || 200,
            body: props.response,
            delay: {
              timeUnit: "SECONDS",
              value: props.delay || 0
            }        
          }
        });
      } catch (error) {
        console.log(
          `Catched an error when connecting to the mock server: ${error}`
        );
      }
    };
  
    /* API */
    this.mockHttpRequest = mockHttpRequest;
  }
  
  module.exports = MockService;