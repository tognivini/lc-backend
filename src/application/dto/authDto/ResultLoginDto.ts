export class ResultLoginDto {
  constructor(
    userId: string,
    name: string,
    email: string,
    token: string,
    // refreshToken: string
  ) {
    this.userId = userId || null
    this.name = name || null
    this.email = email || null
    this.token = token || null
    // this.refreshToken = refreshToken || null
  }

  userId: string
  name: string
  email: string
  userName: string
  token: string
  // refreshToken: string
}
