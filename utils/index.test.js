import { makeCancelable, wait } from './index'

describe('wait', ()=>{
  test('resolve before timeout', ()=>{
    expect.assertions(1)
    let p = new Promise((resolve)=>{
      setTimeout(resolve, 1000)
    })
    return expect(wait(p, 2)).resolves.toBeUndefined()
  })
  test('reject before timeout', ()=>{
    expect.assertions(1)
    let p = new Promise((resolve, reject)=>{
      setTimeout(reject, 1000)
    })
    return expect(wait(p, 2)).rejects.toBeUndefined()
  })
  test('reject after timeout', ()=>{
    expect.assertions(1)
    let p = new Promise(function(resolve, reject) {
      setTimeout(resolve, 2000)
    });
    return expect(wait(p, 1)).rejects.toEqual(new Error('promise timeout'))
  })
})

describe('makeCancelable', ()=>{
  test('resolve & reject normally', async ()=>{
    expect.assertions(2)
    let resolvedPromise = makeCancelable(new Promise(function(resolve, reject) {
      setTimeout(()=>resolve('resolved'))
    }))
    await expect(resolvedPromise).resolves.toBe('resolved')
    let rejectedPromise = makeCancelable(new Promise(function(resolve, reject) {
      setTimeout(()=>reject('rejected'))
    }))
    await expect(rejectedPromise).rejects.toBe('rejected')
  })
  test('cancel rejects a promise', async ()=>{
    expect.assertions(1)
    let p = makeCancelable(new Promise(function(resolve, reject) {
      setTimeout(resolve)
    }))
    p.cancel()
    await expect(p).rejects.toEqual(new Error('promise canceled'))
  })
})
