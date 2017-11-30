import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';

export interface ISearchProps {
    getDisplayValue: (suggestion: any) => string;
    getValues: (data: any) => any;
    onRenderSuggestion: (data: any) => any;
    onRenderInputComponent: (inputProps: any) => any;    
    onValueSelected: (selection: any) => void;
    style?: React.CSSProperties;
}

export interface ISearchState {
  value: any;
  suggestions: any;
}

export class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  onChange = (event: any, { newValue }: any) => {
    this.setState((prevState) => ({ ...prevState, value: newValue }));
  }

  onSuggestionsFetchRequested = ({ value }: any) => {
    this.setState((prevState) => ({ ...prevState, suggestions: this.props.getValues(value) }));
  }

  onSuggestionsClearRequested = () => {
    this.setState((prevState) => ({ ...prevState, suggestions: [] }));
  }

  onSuggestionSelected = (event: any, { suggestion }: any) => {
    this.props.onValueSelected(suggestion);
  }

  render() {
    let { value, suggestions }  = this.state;

    const inputProps = {
      placeholder: 'search',
      value,
      onChange: this.onChange.bind(this)
    };
    return (
      <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.props.getDisplayValue}
          renderSuggestion={this.props.onRenderSuggestion}
          inputProps={inputProps}
          renderInputComponent={this.props.onRenderInputComponent}
          onSuggestionSelected={this.onSuggestionSelected}
          style={this.props.style}
        />
    );
  }
}