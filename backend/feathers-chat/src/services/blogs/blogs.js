// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  blogsDataValidator,
  blogsPatchValidator,
  blogsQueryValidator,
  blogsResolver,
  blogsExternalResolver,
  blogsDataResolver,
  blogsPatchResolver,
  blogsQueryResolver
} from './blogs.schema.js'
import { BlogsService, getOptions } from './blogs.class.js'
import { blogsPath, blogsMethods } from './blogs.shared.js'
import { setCookie } from '../../hooks/set-cookie.js'
export * from './blogs.class.js'
export * from './blogs.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const blogs = (app) => {
  // Register our service on the Feathers application
  app.use(blogsPath, new BlogsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: blogsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(blogsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(blogsExternalResolver),
        schemaHooks.resolveResult(blogsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(blogsQueryValidator), schemaHooks.resolveQuery(blogsQueryResolver)],
      find: [],
      get: [],
      create: [authenticate('jwt'),schemaHooks.validateData(blogsDataValidator), schemaHooks.resolveData(blogsDataResolver)],
      patch: [authenticate('jwt'),schemaHooks.validateData(blogsPatchValidator), schemaHooks.resolveData(blogsPatchResolver)],
      remove: [authenticate('jwt')]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
