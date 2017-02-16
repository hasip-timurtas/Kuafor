import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { AutoForm } from 'uniforms-unstyled'
import { HiddenField, TextField, SubmitField } from '/imports/ui/_components/uniforms'
import Alert from 'react-s-alert'
import { CreateNewNote } from '/imports/api/notes/methods'


export const noteSchema = new SimpleSchema({
  title: {
    type: String,
    max: 256
  },
  content: {
    type: String,
    max: 1024
  },
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  }
})

export class CreateNote extends Component {

  static propTypes = {
    notes: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  handleCreateNote (doc) {
    noteSchema.clean(doc)

    CreateNewNote.call(doc, (error, result) => {
      if (error) {
        Alert.error(`Hatay verdi.`)
      } else if (result === 'OK') {
        Alert.error(`Note başarıyla kaydedildi`)
      }
    })
  }

  render () {
    const { user, notes } = this.props
    return (
      <AutoForm className="new-note" schema={ noteSchema } onSubmit={ doc => this.handleCreateNote(doc) }>
                <div className="row">
                    <div className="=form-group">
                        <div className="col-md-6">
                              <TextField className="form-control" name="title" placeholder="Title" />
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="=form-group">
                        <div className="col-md-6">
                            <TextField className="form-control" name="content" placeholder="Content" />
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="=form-group">
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-default add-post">Submit</button>
                        </div>
                    </div>
                </div>
            </AutoForm>
      )
  }
}

export default connect(
  ({ globalData: { notes, currentUser: { user } } }) => ({
    notes,
    user
  })
)(CreateNote)
