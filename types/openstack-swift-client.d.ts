export = index
declare class index {
  constructor(authenticator: any)
  container(name: any): any
  create(name: any, publicRead: any, meta: any, extra: any): any
  headers(meta: any, extra: any, token: any): any
  info(): any
  list(extra: any, query: any): any
  meta(name: any): any
  update(name: any, meta: any, extra: any): any
}
declare namespace index {
  class KeystoneV3Authenticator {
    static defaultMaxListeners: any
    static init(): void
    static listenerCount(emitter: any, type: any): any
    static usingDomains: boolean
    constructor(credentials: any)
    credentials: any
    currentToken: any
    addListener(type: any, listener: any): any
    authenticate(): any
    emit(type: any, args: any): any
    eventNames(): any
    getMaxListeners(): any
    getToken(): any
    listenerCount(type: any): any
    listeners(type: any): any
    off(type: any, listener: any): any
    on(type: any, listener: any): any
    once(type: any, listener: any): any
    prependListener(type: any, listener: any): any
    prependOnceListener(type: any, listener: any): any
    rawListeners(type: any): any
    removeAllListeners(type: any, ...args: any[]): any
    removeListener(type: any, listener: any): any
    setMaxListeners(n: any): any
    tryFindEndpointUrl(catalog: any, service: any, iface: any): any
  }
  namespace KeystoneV3Authenticator {
    class EventEmitter {
      // Circular reference from index.KeystoneV3Authenticator.EventEmitter
      static EventEmitter: any
      static defaultMaxListeners: any
      static init(): void
      static listenerCount(emitter: any, type: any): any
      static usingDomains: boolean
      addListener(type: any, listener: any): any
      emit(type: any, args: any): any
      eventNames(): any
      getMaxListeners(): any
      listenerCount(type: any): any
      listeners(type: any): any
      off(type: any, listener: any): any
      on(type: any, listener: any): any
      once(type: any, listener: any): any
      prependListener(type: any, listener: any): any
      prependOnceListener(type: any, listener: any): any
      rawListeners(type: any): any
      removeAllListeners(type: any, ...args: any[]): any
      removeListener(type: any, listener: any): any
      setMaxListeners(n: any): any
    }
  }
  class SwiftAuthenticator {
    static defaultMaxListeners: any
    static init(): void
    static listenerCount(emitter: any, type: any): any
    static usingDomains: boolean
    constructor(authUrl: any, username: any, password: any)
    addListener(type: any, listener: any): any
    authenticate(): any
    emit(type: any, args: any): any
    eventNames(): any
    getMaxListeners(): any
    listenerCount(type: any): any
    listeners(type: any): any
    off(type: any, listener: any): any
    on(type: any, listener: any): any
    once(type: any, listener: any): any
    prependListener(type: any, listener: any): any
    prependOnceListener(type: any, listener: any): any
    rawListeners(type: any): any
    removeAllListeners(type: any, ...args: any[]): any
    removeListener(type: any, listener: any): any
    setMaxListeners(n: any): any
  }
  namespace SwiftAuthenticator {
    class EventEmitter {
      // Circular reference from index.SwiftAuthenticator.EventEmitter
      static EventEmitter: any
      static defaultMaxListeners: any
      static init(): void
      static listenerCount(emitter: any, type: any): any
      static usingDomains: boolean
      addListener(type: any, listener: any): any
      emit(type: any, args: any): any
      eventNames(): any
      getMaxListeners(): any
      listenerCount(type: any): any
      listeners(type: any): any
      off(type: any, listener: any): any
      on(type: any, listener: any): any
      once(type: any, listener: any): any
      prependListener(type: any, listener: any): any
      prependOnceListener(type: any, listener: any): any
      rawListeners(type: any): any
      removeAllListeners(type: any, ...args: any[]): any
      removeListener(type: any, listener: any): any
      setMaxListeners(n: any): any
    }
  }
}
