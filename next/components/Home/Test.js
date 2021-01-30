import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import { List, CellMeasurer, CellMeasurerCache, AutoSizer } from 'react-virtualized';
import styles from './test.css';

export default class DynamicHeightList extends React.PureComponent {

  constructor(props, context) {
    super(props, context);

    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 50,
    });

    this._rowRenderer = this._rowRenderer.bind(this);
  }

  render() {
    const {width} = this.props;

    return (
      <List
        className={styles.BodyGrid}
        deferredMeasurementCache={this._cache}
        height={400}
        overscanRowCount={0}
        rowCount={1000}
        rowHeight={this._cache.rowHeight}
        rowRenderer={this._rowRenderer}
        width={375}
      />
    );
  }

  _rowRenderer({index, key, parent, style}) {
    const {getClassName, list} = this.props;

    const datum = index % list.length;

    const imageWidth = 300;
    const imageHeight = datum.size * (1 + (index % 3));

    const source = `https://discuz-service-test-1258344699.cos.ap-guangzhou.myqcloud.com/public/attachments/2021/01/29/3YRjsqL2eihQEB64kFmLOzY44IYyF01GRWnavWzP.jpg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDCJAnwjKjthEk6HBm6fwzhCLFRRBlsBxG%26q-sign-time%3D1611906020%3B1611992480%26q-key-time%3D1611906020%3B1611992480%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D5093e9083630409119e67cbdf50599e4a592b6a0&imageMogr2/thumbnail/500x500`;
    console.log(index)
    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}>
        {({measure, registerChild}) => (
          <div ref={registerChild} style={style}>
            <p>{list[index].text}</p>
          </div>
        )}
      </CellMeasurer>
    );
  }
}