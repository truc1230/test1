/* eslint-disable no-promise-executor-return */
export class CancelablePromise {
  static cancelErrorSymbol = Symbol('CancelError');

  abortSymbol: symbol;

  abortPromise: Promise<unknown>;

  reject!: <T>(reason?: T) => void;

  complete: boolean;

  constructor() {
    this.abortSymbol = Symbol('cancelled');
    this.abortPromise = new Promise((_, reject) => {
      this.reject = reject;
      return this.reject;
    });
    this.complete = false;
  }

  static CancelError() {
    return this.cancelErrorSymbol;
  }

  static isCancelError(error: unknown) {
    return error === this.cancelErrorSymbol;
  }

  wrap<P>(promise: Promise<P>) {
    return Promise.race([promise, this.abortPromise])
      .then(res => {
        this.complete = true;

        return res as P;
      })
      .catch(error => {
        this.complete = true;

        if (error === this.abortSymbol) return error;
        return Promise.reject(error);
      });
  }

  async cancel() {
    if (this.complete) return;
    this.reject(this.abortSymbol);
  }
}

export const takeLastestPromise = <P, A extends unknown[]>(asyncFunction: (...args: A) => Promise<P>) => {
  let cancelSubject: CancelablePromise;

  return (...args: Parameters<typeof asyncFunction>) => {
    if (cancelSubject) cancelSubject.cancel();
    cancelSubject = new CancelablePromise();

    return cancelSubject.wrap(asyncFunction(...args));
  };
};
