export default class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}
