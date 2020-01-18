import Cookie from 'cookie'

export default function({ isServer, store, req }) {
  if (isServer || !req) {
    return
  }

  const cookieStr = req.headers.cookie

  const cookies = Cookie.parse(cookieStr || '') || []
  const token = cookies['auth-token']

  if (token) {
    return store
      .dispatch('auth/updateToken', token)
      .then(() => store.dispatch('auth/user'))
  }
}
