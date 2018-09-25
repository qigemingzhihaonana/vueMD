const userMap = {
  admin: {
    token: 'admin',
    name: 'Super Admin',
    navList: []
  }
}

export default {
  fetch: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  logout: () => 'success'
}
