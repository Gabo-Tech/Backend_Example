// httpException.ts
class HttpException extends Error {
    status: number;
    message: string;
  
    constructor(status: number, message: string) {
      super(message); // Call the Error class constructor
      this.status = status;
      this.message = message;
    }
  }
  
export default HttpException;
  