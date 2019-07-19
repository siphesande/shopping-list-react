import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import { _storeData, _removeData,_retrieveData } from './utils/localstorage'
import {Add, Edit} from './views/add-edit.js'

export default class App extends Component {
  state = {
    included_item: '',
    edited_list_value: '',
    index_to_edit:'',
    value:'bread',
    shopping:'shopping',
    item_list: [],
    show_add: false,
    show_delete: false,
    show_edit: false,
    loading: false
  }
  componentDidMount() {
    this.getShoppingList()
  }

  getShoppingList = async () => {
    this.setState({ loading: true })
    
    let shopping_list = await _retrieveData('shopping_list');
    if (shopping_list) {
      shopping_list = JSON.parse(shopping_list)
    }
    this.setState({ loading: false, item_list: shopping_list  })

  }
  removeItem = (index) => {
    this.state.item_list.splice(index, 1);
    this.setState(this.state)

    _removeData('shopping_list')
      .then(() => {
        console.log('Data removed from localStorage')
        _storeData('shopping_list', JSON.stringify(this.state.item_list))
      })
      .then(() => {
        this.getShoppingList()
    })
  }
  addingToTheList = () => {
    let new_list = [this.state.included_item, ...this.state.item_list];
    this.setState({item_list:new_list})
    _removeData('shopping_list')
      .then(() => {
        _storeData('shopping_list', JSON.stringify(this.state.item_list))
        
      })
      .then(() => {
        this.getShoppingList()
    })
  }
  editItem = () =>  {
    this.state.item_list[this.state.index_to_edit] = this.state.edited_list_value
    this.setState(this.state)
    _removeData('shopping_list')
    .then(() => {
      localStorage["shopping_list"] = JSON.stringify(this.state.item_list);
    })
    .then(() => {
      this.getShoppingList()
    })
  }
  includedItem = (e) => {
    this.setState({included_item: e.target.value})
  }
  editedListValue = (e) => {
    this.setState({ edited_list_value: e.target.value })
  }
  backToHome = () => {
    this.setState({show_add:false, show_edit: false})
  }
  render() {


  const deleteItem =  <div>
      <p>Delete item</p>
      <button onClick={() => this.setState({ show_delete: false })} type="button">Close</button>
    </div>
  return (
      <div>
        <h1>Shopping</h1>
        <button onClick={() => {
          this.setState({ show_add: true})
        }}>Add</button>
      
        {
          this.state.show_delete?
          deleteItem:
          this.state.show_add ?
          <Add 
            included_item = {this.state.included_item}
            addingToTheList = {this.addingToTheList}
            includedItem = {this.includedItem}
            backToHome = {this.backToHome}

          /> :
          this.state.show_edit ?
          <Edit
            editedListValue={this.editedListValue}
            editItem={this.editItem}
            edited_list_value={this.state.edited_list_value}
            backToHome={this.backToHome}
            />:
      <div>
             {this.state.item_list.map((item, index) => (
                <ul key={item}>{item} 
                    <button onClick={() => {
                      this.setState({index_to_edit:index, show_edit:true, edited_list_value: item})
                    }}>Edit</button>
                    <button onClick={() => {
                      this.removeItem(index)
                    }}>Delete</button>
                </ul>
              ))}
          </div>
        }
    </div>
    )
  }
}
