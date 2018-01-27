import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';

// all different page types for this single page application
export enum PageType {
  MAIN,
  HIR,
  LIR
}

export interface INavigationProps {
  selectedPage: PageType;
  onSelectPage: (pageType: PageType) => void;
}

export class Navigation extends React.Component<INavigationProps, {}> {
  render() {
    return (
      <div>
        <Button onClick={() => this.props.onSelectPage(PageType.MAIN)} ><Icon name='pie chart' size='big' title='show performance charts'/></Button>
        <Button onClick={() => this.props.onSelectPage(PageType.HIR)} ><Icon name='sitemap' size='big' title='show HIR'/></Button>
        <Button onClick={() => this.props.onSelectPage(PageType.LIR)}><Icon name='code' size='big' title='show LIR'/></Button>
      </div>
    );
  }
}