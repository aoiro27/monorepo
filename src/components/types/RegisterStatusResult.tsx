export type RegisterStatusResult = {
  registerdMail: string
  oneUid: string
  isPaidUser: boolean
  registerItems: RegisterItem[]
}

export type RegisterItem = {
  tagName: string
  deliveryMail: string
  isAuthenticated: boolean
}
