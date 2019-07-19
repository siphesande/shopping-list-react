import React, { Component } from 'react'

export class Add extends Component {

    render() {
        return (
            <div>
                <div>
                    <p>Add item</p>
                        <input 
                            value={this.props.included_item} 
                            type='text' 
                            placeholder='add item'
                            onChange={(e) => {
                                this.props.includedItem(e);
                            }}
                        />
                    <button onClick={this.props.addingToTheList}>
                        Add new item
                    </button>
                    <button onClick={this.props.backToHome} type="button">Close</button>
                </div>
            </div>
        )
    }
}
export class Edit extends Component {

    render() {
        return (
            <div>
                <div>
                    <p>edit item</p>
                        <input 
                            value={this.props.edited_list_value} 
                            type='text' 
                            placeholder='update'
                            onChange={(e) => {
                                this.props.editedListValue(e);
                            }}
                        />
                    <button onClick={this.props.editItem}>
                        update
                    </button>
                    <button onClick={this.props.backToHome} type="button">Close</button>
            </div>
        </div>
        )
    }
}
// export {
//     Edit,
//   }

