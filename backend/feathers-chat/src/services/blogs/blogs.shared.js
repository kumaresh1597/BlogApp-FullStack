export const blogsPath = 'blogs'

export const blogsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const blogsClient = (client) => {
  const connection = client.get('connection')

  client.use(blogsPath, connection.service(blogsPath), {
    methods: blogsMethods
  })
}
