import * as React from 'react';
import { OptimizedMethod, Pass } from '../data';
import { VictoryChart, VictoryAxis, VictoryTooltip, VictoryTheme, VictoryScatter } from 'victory';
import { Segment, Header, Table } from 'semantic-ui-react';

export interface IPassStatisticsProps {
  optimizedMethod: OptimizedMethod;
}

export class PassStatistics extends React.Component<IPassStatisticsProps, {}> {
  render() {
    const totalTime = this.props.optimizedMethod.passes.map(pass => pass.time).reduce((pv, cv) => pv + cv, 0);
    const returnType = this.getReturnType(this.props.optimizedMethod.desc);
    const parameterTypes = this.getParameterTypes(this.props.optimizedMethod.desc);

    return (
      <div style={{ height: '100vh', overflow: 'scroll' }}>
        <Segment.Group raised style={{ padding: 0, margin: 0 }}>
          <Segment raised>
            <Header as='h2'>
              {this.props.optimizedMethod.class}
            </Header>
            <Header as='h1'>
              {returnType} {this.props.optimizedMethod.method} ({parameterTypes});
          </Header>
          </Segment>
          <Segment className='scrolling content'>
            <Segment.Group horizontal raised style={{ padding: 0, margin: 0 }} compact>
              {this._createTable(totalTime)}
              {this._createChart(totalTime)}
            </Segment.Group>
          </Segment>
        </Segment.Group>
      </div>
    );
  }

  private _createTable(totalTime: number) {
    return <Segment floated='left'>
      <Table celled compact size='small' collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Index</Table.HeaderCell>
            <Table.HeaderCell>Pass</Table.HeaderCell>
            <Table.HeaderCell>time[ns]</Table.HeaderCell>
            <Table.HeaderCell>time[%]</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.optimizedMethod.passes.map((pass, index) => this._createPassEntry(pass, index, totalTime))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell textAlign='right'>{totalTime}</Table.HeaderCell>
            <Table.HeaderCell textAlign='right'>100.00</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Segment>;
  }

  private _createChart(totalTime: number) {
    let maxPercentage = 1;
    const chartData = this.props.optimizedMethod.passes.map((pass, index) => {
      let percentage = pass.time / totalTime * 100;
      if (maxPercentage < percentage) {
        maxPercentage = percentage;
      }
      return {
        x: index + 1,
        y: percentage,
        label: pass.name + '(' + pass.time + ' ns / ' + percentage.toFixed(1) + '%)'
      };
    });
    maxPercentage += 2;
    return <Segment>
      <VictoryChart height={400} width={400}
        theme={VictoryTheme.material}
        domain={{ x: [0, chartData.length], y: [0, maxPercentage] }}
        domainPadding={10}>
        <VictoryScatter data={chartData}
          bubbleProperty='y'
          minBubbleSize={3}
          maxBubbleSize={10}
          style={{ labels: { fill: 'black', fontSize: 12 } }}
          labels={(d) => d.x}
          labelComponent={<VictoryTooltip/>}
        />
        <VictoryAxis dependentAxis
          tickFormat={(tick) => `${tick}%`}
        />
        <VictoryAxis
          tickFormat={['compiler passes']}
        />
      </VictoryChart>
    </Segment>;
  }

  private getReturnType(signature: string): string {
    const index: number = signature.lastIndexOf(')') + 1;
    if (index == signature.length) {
      return 'void';
    }
    return this.getTypeDisplayName(signature.substring(index));
  }

  private getParameterTypes(signature: string): string {
    signature = signature.substring(signature.indexOf('(') + 1, signature.lastIndexOf(')'));

    let recognizedTypes: string = '';
    let nextParameterType = '';
    while (signature.length > 0) {
      const curChar = signature.charAt(0);
      signature = signature.substring(1);
      nextParameterType += curChar;

      if (curChar == '[') {
        continue;
      } else if (curChar == 'L') {
        // parse class name
        const index = signature.indexOf(';') + 1;
        nextParameterType += signature.substring(0, index);
        signature = signature.substring(index);
      }
      if (recognizedTypes.length > 0) {
        recognizedTypes += ', ';
      }
      recognizedTypes += this.getTypeDisplayName(nextParameterType);
      nextParameterType = '';
    }
    return recognizedTypes;
  }

  // https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html
  /*
  B	byte	signed byte
  C	char	Unicode character code point in the Basic Multilingual Plane, encoded with UTF-16
  D	double	double-precision floating-point value
  F	float	single-precision floating-point value
  I	int	integer
  J	long	long integer
  L ClassName ;	reference	an instance of class ClassName
  S	short	signed short
  Z	boolean	true or false
  [	reference	one array dimension
  */
  private getTypeDisplayName(typeString: string): string {
    switch (typeString) {
      case 'B': return 'byte';
      case 'C': return 'char';
      case 'D': return 'double';
      case 'F': return 'float';
      case 'I': return 'int';
      case 'J': return 'long';
      case 'S': return 'short';
      case 'Z': return 'boolean';
      case 'V': return 'void';
    }
    if (typeString.startsWith('L')) {
      return typeString.substring(1);
    }
    if (typeString.startsWith('[')) {
      return this.getTypeDisplayName(typeString.substring(1)) + '[]';
    }
    console.log('unsupported type string: ' + typeString);
    return typeString;
  }

  private _createPassEntry(pass: Pass, index: number, totalTime: number): any {
    let percentage = pass.time / totalTime * 100;
    let className = '';
    if (percentage > 5) {
      className = 'negative';
    }
    return (
      <Table.Row key={index} className={className} >
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{pass.name}</Table.Cell>
        <Table.Cell textAlign='right'>{pass.time}</Table.Cell>
        <Table.Cell textAlign='right'>{percentage.toFixed(1)}</Table.Cell>
      </Table.Row>
    );
  }
}