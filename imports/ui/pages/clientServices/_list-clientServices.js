import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListClientServiceItem, AddNew } from '/imports/ui/pages/clientServices/'
import Portal from 'react-portal'

const AddButton = ({ customerId }) => {
  const addNewClientService = <a className="button">
    <i className="icon-add-circled left-side-icon"></i>
    Add new client service
  </a>

  return (
    <div className="utilities-button-wrapper">
      <Portal closeOnEsc openByClickOn={addNewClientService}>
         <AddNew customerId={customerId} />
      </Portal>
    </div>
  )
}

export class ListClientServices extends Component {

  static propTypes = {
    user: PropTypes.object
  }

  render () {
    const { user, clientServices, customers, customerId } = this.props
    const customerClientServices = clientServices.filter(cs => cs.customerId === customerId)
    const currentCustomer = customers.find(c => c._id === customerId)
    const thereAreNoClientServices = customerClientServices.length === 0

    return (
      <div>{thereAreNoClientServices ? (
        <div className="message-box message-box-customer">
          <div className="message-box-wrapper">
            <div className="message-box-content">
              <div className="message-box-block content">
                <h2>Create a new Client Service</h2>
                <p>After creating a customer, you’ll be able to create client service record.</p>
                <Portal openByClickOn={
                  <a className='button button-green'>
                    <i className='icon-add-circled left-side-icon'/>
                    Create your first client service record
                  </a>
                }>
                  <AddNew customerId={currentCustomer._id} />
                </Portal>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="content">
          <div className="section section-tabs">
            <div className="section-body">
              <div className="list-section">
              <AddButton customerId={currentCustomer._id} />
                    {customerClientServices ? customerClientServices.map((clientService, index) => (
                            <ListClientServiceItem
                              clientService={clientService}
                              key={clientService._id}
                              index={index}
                            />
                      )) : null}
                  </div>
              </div>
          </div>
        </div>
      )}
    </div>
    )
  }
}

export default connect(
  ({ globalData: { customers, clientServices, currentUser: { user } } }, ownProps) => ({
    clientServices,
    user,
    customers
  })
)(ListClientServices)
