// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const blogsSchema = {
  $id: 'Blogs',
  type: 'object',
  additionalProperties: false,
  required: ['_id'],
  properties: {
    _id: ObjectIdSchema(),
    title:{type:"string"},
    content:{type:"string"},
    author:{type:"string"},
    category:{type:"string"},
    creationTime:{type:"string"},
    isDeleted:{type:'boolean',default:'false'},
    deletedDateTime:{type:'string'}
  }
}
export const blogsValidator = getValidator(blogsSchema, dataValidator)
export const blogsResolver = resolve({})

export const blogsExternalResolver = resolve({})

// Schema for creating new data
export const blogsDataSchema = {
  $id: 'BlogsData',
  type: 'object',
  additionalProperties: false,
  required: ['title','content','category','author'],
  properties: {
    ...blogsSchema.properties
  }
}
export const blogsDataValidator = getValidator(blogsDataSchema, dataValidator)
export const blogsDataResolver = resolve({
  creationTime: async ()=>{
     return Date.now();
  }
})

// Schema for updating existing data
export const blogsPatchSchema = {
  $id: 'BlogsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...blogsSchema.properties
  }
}
export const blogsPatchValidator = getValidator(blogsPatchSchema, dataValidator)
export const blogsPatchResolver = resolve({})

// Schema for allowed query properties
export const blogsQuerySchema = {
  $id: 'BlogsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(blogsSchema.properties)
  }
}
export const blogsQueryValidator = getValidator(blogsQuerySchema, queryValidator)
export const blogsQueryResolver = resolve({})
