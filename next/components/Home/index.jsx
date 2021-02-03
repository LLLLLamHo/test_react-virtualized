import Head from 'next/head'
import { Component } from 'react';
import Parser from "react-html-parser";
import s9e from './s9e';
import mock from './mock';
import './index.scss';
import Item from './item';
import Header from './Header';
import Nav from './Nav';
import TopInfo from './TopInfo';

// for ( let i = 0; i < mock.length; i++ ) {
//     if (mock[i].user.avatarUrl) {
//         mock[i].user.avatarUrl = mock[i].user.avatarUrl.replace(/\?sign\=.*/, '');
//     }
//     if (mock[i].firstPost.images && mock[i].firstPost.images.length > 0) {
//         for ( let n = 0; n < mock[i].firstPost.images.length; n++ ) {
//             mock[i].firstPost.images[n].url = mock[i].firstPost.images[n].url.replace(/\?sign\=.*/, '');
//             mock[i].firstPost.images[n].thumbUrl = mock[i].firstPost.images[n].thumbUrl.replace(/\?sign\=.*/, '');
//         }
//     }
// }

import { List, CellMeasurer, CellMeasurerCache, AutoSizer, InfiniteLoader } from 'react-virtualized';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this._cache = new CellMeasurerCache({
            fixedWidth: true,
            minHeight: 50,
            show: false,
          });
        this.state = {
            list: [{type: 'header'}, {type: 'nav'},{type: 'top'}, ...this.initData(mock.slice(0,10)),{type: 'loading'}],
            performance: {
                first: null,
                dom: null,
                onLoad: null,
                render: null
            }
        };

        this.rowRenderer = this.rowRenderer.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this._isRowLoaded = this._isRowLoaded.bind(this);
        this._loadMoreRows = this._loadMoreRows.bind(this);
    }

    loadData = false

    componentDidMount() {
        const timing = window.performance.timing;
        this.setState({
            show: true,
            performance: {
                first: (timing.responseStart - timing.domainLookupStart) + '毫秒',
                dom: (timing.domContentLoadedEventEnd - timing.fetchStart) + '毫秒',
                render: (Date.now() - timing.responseStart) + '毫秒'
            }
        })
    
        window.addEventListener('load', () => {
            this.setState({
                show: true,
                performance: {
                    onLoad:  (timing.loadEventStart - timing.fetchStart)  + '毫秒'
                }
            })
        });
    }

    initData(data) {

        data.map((item) => {
            if (item.firstPost.summary) {
                item.firstPost.summary_component = Parser(s9e.parse(item.firstPost.summary));
            }
        });

        return data;
    }

    

    renderListItem(type, data, measure) {
        switch(type) {
            case 'header': return <Header measure={measure}/>;
            break;
            case 'nav': return <Nav/>;
            break;
            case 'top': return <TopInfo/>;
            break;
            case 'no_more':
            case 'loading': return <div className='tips'>{type == 'no_more' ? '没有更多' : '加载中....'}</div>
            default: return  <Item data={data} measure={measure}/>;
        }
    }

    rowRenderer({index, key, parent, style}) {
        const { list } = this.state;
        const data = list[index];
        return (
            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={key}
                rowIndex={index}
                parent={parent}>
                {({measure, registerChild}) => (
                <div ref={registerChild} style={style}>
                    {
                        this.renderListItem(data.type, data, measure)
                    }
                </div>
                )}
            </CellMeasurer>
        );
       
    }

    onScroll({ clientHeight, scrollHeight, scrollTop }) {
        // console.log(clientHeight, scrollHeight, scrollTop)
    }

    _isRowLoaded({index}) {
        // console.log('_isRowLoaded', this.state.list.length - index <= 5);
        if (!this.loadData && this.state.list.length - index <= 5) {
            this.loadData = true;
            return false;
        }else {
            return true;
        }
    }

    _loadMoreRows({startIndex, stopIndex}) {
        let promiseResolver;
        setTimeout(() => {
            const newList = [...this.state.list.slice(0, this.state.list.length - 2), ...this.initData(mock)];
            newList.push({type: "loading"});
            this.setState({
                list: newList,
            }, () => {
                this.loadData = false;
                promiseResolver();
            })
        }, 500);

        return new Promise((res) => {
            promiseResolver = res;
        })
    }
    

    render () {
        return (
            <div className='page'>
                <Head>
                    <title>Discuz!Q</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>


                <div className='performance'>
                    <p>首字节： {this.state.performance.first || '计算中...'}</p>
                    <p>domReady: {this.state.performance.dom || '计算中...'}</p>
                    <p>render: {this.state.performance.render || '计算中...'}</p>
                    <p>onLoad: {this.state.performance.onLoad || '计算中...'}</p>
                </div>

                <InfiniteLoader
                    isRowLoaded={this._isRowLoaded}
                    loadMoreRows={this._loadMoreRows}
                    rowCount={this.state.list.length}
                >
                    {
                        ({onRowsRendered, registerChild}) => {
                            return (
                                <AutoSizer className='list'>
                                    {({height, width}) => <List
                                        ref={registerChild}
                                        onScroll={this.onScroll}
                                        deferredMeasurementCache={this._cache}
                                        height={height}
                                        overscanRowCount={0}
                                        onRowsRendered={onRowsRendered}
                                        rowCount={this.state.list.length}
                                        rowHeight={this._cache.rowHeight}
                                        rowRenderer={this.rowRenderer}
                                        width={width}
                                    />}
                                </AutoSizer> 
                            )
                        }
                    }
                       
                </InfiniteLoader>
            </div>
        );
    }
}