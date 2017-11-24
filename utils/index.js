export const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject(new Error('promise canceled')) : resolve(val),
      error => hasCanceled_ ? reject(new Error('promise canceled')) : reject(error)
    );
  });

  return {
    cancel() {
      hasCanceled_ = true;
    },
    then(onFullfill, onReject) {
      return wrappedPromise.then(onFullfill, onReject)
    },
    catch(onReject){
      return wrappedPromise.catch(onReject)
    }
  };
};

export const wait = (promise, second) => new Promise((resolve, reject)=>{
  const timer = setTimeout(()=>reject(new Error('promise timeout')), second*1000)
  const handler = (callback, message) => (result) => {
    clearTimeout(timer)
    callback(result)
  }
  promise.then(handler(resolve), handler(reject))
})
