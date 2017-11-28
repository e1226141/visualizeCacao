import * as React from 'react';
import { Search } from './search';

export interface INodeSearchProps {
  graph: any;
  valueSelectedHandler: any;
}

export class NodeSearch extends React.Component<INodeSearchProps, {}> {

  private _getDisplayValue = (node: any) => {
    if (node == undefined) {
      return '';
    }
    return node.label;
  }

  private _renderSuggestion = (suggestion: any): any => (
    <div>
      {suggestion.label}
    </div>
  )

  private _getValues = (inputText: string) => {
    if (this.props.graph == undefined) {
      return [];
    }
    const searchText = inputText.toLowerCase();
    const nodes = this.props.graph.nodes;
    return nodes.filter((node: any) => node.label.toLowerCase().includes(searchText));
  }

  private _renderInputComponent = (inputProps: any) => {
    const disabled = this.props.graph == undefined || this.props.graph.nodes == undefined
      || this.props.graph.nodes.length == 0;
    return (<input {...inputProps} disabled={disabled} />);
  }

  render() {
    return (
      <Search
        getDisplayValue={this._getDisplayValue}
        getValues={this._getValues}
        onRenderSuggestion={this._renderSuggestion}
        onRenderInputComponent={this._renderInputComponent}
        onValueSelected={this.props.valueSelectedHandler} />
    );
  }
}