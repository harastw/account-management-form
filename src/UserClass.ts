export default class UserClass {
  tag: string = ''
  type: string = 'LDAP'
  login: string = ''
  password: string = ''
  constructor(tag: string = '', type: string = '', login: string = '', password: string = '') {
    this.tag = tag
    this.type = type
    this.login = login
    this.password = password
  }
}
