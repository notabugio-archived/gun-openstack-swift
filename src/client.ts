import 'isomorphic-fetch'

const {
  OS_AUTH_URL,
  OS_USER_DOMAIN_NAME,
  OS_USERNAME,
  OS_PASSWORD,
  OS_PROJECT_DOMAIN_NAME,
  OS_PROJECT_NAME
} = process.env

export interface GunNode {
  _: {
    '#': string
    '>': {
      [key: string]: number
    }
    [key: string]: any
  }
  [key: string]: any
}

export interface GunPut {
  [soul: string]: GunNode
}

const DEFAULT_CONFIG = {
  url: 'https://orbit.brightbox.com/v1/acc-xxx',
  authInterval: 1000 * 60 * 60 * 4
}

export class GunOpenStackSwiftClient {
  Gun: any
  config: any
  token: string

  constructor(Gun: any, config = DEFAULT_CONFIG) {
    const { authInterval = DEFAULT_CONFIG.authInterval } = config || {}
    this.Gun = Gun
    this.config = config
    this.token = ''
    this.auth().catch(error => console.error(error.stack || error))
    setInterval(() => this.auth(), authInterval)
  }

  async get(soul: string) {
    if (!soul) return null
    const raw = await this.getRaw(soul)
    if (!raw) return null
    return this.deserialize(raw || '')
  }

  async getRaw(soul: string) {
    if (!soul) return null
    const response = await fetch(`${this.config.url}/gun/nodes/${escape(soul)}`)
    if (response.status === 404) return null
    if (response.status >= 400) throw new Error('Bad response from server')

    return response.text()
  }

  async read(soul: string) {
    const data = await this.get(soul)
    if (!data) return

    if (!this.Gun.SEA || soul.indexOf('~') === -1) return data

    for (let key in data) {
      if (key === '_') continue
      this.Gun.SEA.verify(
        this.Gun.SEA.opt.pack(data[key], key, data, soul),
        false,
        (res: GunNode) => (data[key] = this.Gun.SEA.opt.unpack(res, key, data))
      )
    }

    return data
  }

  serialize(node: GunNode) {
    return JSON.stringify(node)
  }

  deserialize(data: string) {
    try {
      return JSON.parse(data)
    } catch (e) {
      return null
    }
  }

  async writeNode(soul: string, nodeData: GunNode) {
    if (!soul) return
    const nodeDataMeta = (nodeData && nodeData['_']) || {}
    const nodeDataState = nodeDataMeta['>'] || {}

    const node = (await this.get(soul)) || {}
    const meta = (node['_'] = node['_'] || { '#': soul, '>': {} })
    const state = (meta['>'] = meta['>'] || {})

    for (let key in nodeData) {
      if (key === '_' || !(key in nodeDataState)) continue
      node[key] = nodeData[key]
      state[key] = nodeDataState[key]
    }

    const response = await fetch(
      new Request(`${this.config.url}/gun/nodes/${escape(soul)}`, {
        method: 'PUT',
        headers: new Headers({
          'X-Auth-Token': this.token,
          'Content-Type': 'application/json'
        }),
        body: this.serialize(node)
      })
    )

    if (response.status === 401) {
      // TODO: auth and retry
    }
  }

  async auth() {
    const request = new Request(`${OS_AUTH_URL}/auth/tokens?nocatalog`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        auth: {
          identity: {
            methods: ['password'],
            password: {
              user: {
                domain: {
                  name: OS_USER_DOMAIN_NAME
                },
                name: OS_USERNAME,
                password: OS_PASSWORD
              }
            }
          },
          scope: {
            project: {
              domain: {
                name: OS_PROJECT_DOMAIN_NAME
              },
              name: OS_PROJECT_NAME
            }
          }
        }
      })
    })
    const response = await fetch(request)
    if (response.status >= 400) throw new Error(`Unable to auth: ${response.status}`)
    this.token = response.headers.get('X-Subject-Token') || ''
    const data = await response.json()
    console.log('successful login', data)
    return data
  }

  async write(put: GunPut) {
    if (!put) return
    for (let soul in put) await this.writeNode(soul, put[soul])
  }

  // tslint:disable-next-line: no-empty
  close() {}
}

export function createClient(Gun: any, options: any) {
  return new GunOpenStackSwiftClient(Gun, options)
}
