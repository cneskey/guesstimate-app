'use strict'

import Reflux from 'reflux'
import React from 'react'
import _ from 'lodash'
import Button from 'react-bootstrap/Button'
import fermLocationStore from '../stores/locationstore'
import NodeForm from './node_form.jsx'

const EditorPane = React.createClass({

  mixins: [
    Reflux.connect(fermLocationStore, "nodeLocations")
  ],

  findHoverPosition () {
    var node = this.props.node
    if (node){
      var nodePosition = _.where(this.state.nodeLocations, {'id':node.id})
      if (nodePosition.length > 0){
        var renderedPosition = nodePosition[0].renderedPosition
        var hoverPosition = {left: renderedPosition.x - 85, top: renderedPosition.y + 20};
        return hoverPosition
      }
    }
  },

  render () {
    var node = this.props.node
    if (this.props.node){
      var hover_form = <div className="hover" style={this.findHoverPosition()}> <NodeForm graph={this.props.graph} node={this.props.node} formSize="small" /> </div>
    }
    else {
      var hover_form = ''
    }
    return (
      <div className="editorpane">
        {hover_form}
        <NewButtonPane addNode={this.props.addNode} saveGraph={this.props.saveGraph} unsavedChanges={this.props.graph.unsavedChanges}/>
      </div>
    )
  }
});

var NewButtonPane = React.createClass({

  newEstimate () {
    this.props.addNode('estimate')
  },

  newFunction () {
    this.props.addNode('function')
  },

  render () {
    if (this.props.unsavedChanges) {
      var saver = <Button bsStyle='primary' onClick={this.props.saveGraph} > Save </Button>
    }
    else {
      var saver = <Button disabled> Save </Button>
    }
    return (
      <div className="newButtons">
        <Button onClick={this.newEstimate}> New Estimate </Button>
        <Button onClick={this.newFunction}> New Function </Button>
        {saver}
      </div>
    )
  }
});

module.exports = EditorPane