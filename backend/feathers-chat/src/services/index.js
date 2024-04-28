import { blogs } from './blogs/blogs.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(blogs)

  app.configure(user)

  // All services will be registered here
}
