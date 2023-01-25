import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'reproduce-sanity-subscription-delay',

  projectId: 'rq9tvm6g',
  dataset: 'test',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
