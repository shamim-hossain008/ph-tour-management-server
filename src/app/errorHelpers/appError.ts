class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = "") {
    super(message); // throw new Error("Something went wrong")
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;

// class AppError extends Error {
//   public statusCode: number;
//   public isOperational: boolean;

//   constructor(statusCode: number, message: string) {
//     super(message);

//     this.statusCode = statusCode;
//     this.isOperational = true;
//     this.name = this.constructor.name;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// export default AppError;
