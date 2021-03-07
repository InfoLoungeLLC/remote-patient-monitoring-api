
export class SMSSender {
  endpoint: string
  loigninfo: {}
  constructor(endpoint: string, logininfo: any) {
    this.endpoint = endpoint
    this.loigninfo = logininfo
  }
  public sendSMS(to: string, text: string): boolean {
    if (this.endpoint == 'localhost') {
      console.log(`******** send SMS to ${to} ************`)
      console.log(text)
    }
    return true
  }
}