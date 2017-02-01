import React from 'react'
import { mount } from 'react-mounter'

import { MainLayout } from './layouts/MainLayout'
import App from './App/App'
import NewNote from './App/Components/New-Note'

FlowRouter.route('/', {
  action () {
    mount(MainLayout, {
      content: (<App />)
    })
  }
})

FlowRouter.route('/new-note', {
  action () {
    mount(MainLayout, {
      content: (<NewNote />)
    })
  }
})
