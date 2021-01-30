import Head from 'next/head'
import { Component } from 'react';
import Parser from "react-html-parser";
import s9e from './s9e';

import mock from './mock';
import router from 'next/router';
import './index.scss';
import Link from 'next/link'
import Item from './item';
import Header from './Header';
import Nav from './Nav';
import TopInfo from './TopInfo';


import { List, CellMeasurer, CellMeasurerCache, AutoSizer, InfiniteLoader } from 'react-virtualized';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this._cache = new CellMeasurerCache({
            fixedWidth: true,
            minHeight: 50,
          });
        this.state = {
            list: [{type: 'header'}, {type: 'nav'},{type: 'top'}, ...this.initData(mock.slice(0,10)),{type: 'loading'}],
            page: 1,
            maxPage: 16
        };

        this.rowRenderer = this.rowRenderer.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this._isRowLoaded = this._isRowLoaded.bind(this);
        this._loadMoreRows = this._loadMoreRows.bind(this);
    }

    loadData = false

    componentDidMount() {
        console.log(this.state.list);
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
            if ( this.state.page >= this.state.maxPage ) {
                return true;
            }
            this.loadData = true;
            return false;
        }else {
            return true;
        }
    }

    _loadMoreRows({startIndex, stopIndex}) {
        // console.log('_loadMoreRows', startIndex, stopIndex)
        let promiseResolver;
        console.log('_loadMoreRows')
        setTimeout(() => {
            const start = this.state.page * 10 + 1;
            const end = start + 9;
            const newPage = this.state.page + 1;
            const newList = [...this.state.list.slice(0, this.state.list.length - 2), ...this.initData(mock.slice(start, end))];
            if ( newPage < this.state.maxPage ) {
                newList.push({type: "loading"});
            } else {
                newList.push({type: "no_more"});
            }
            this.setState({
                list: newList,
                page: this.state.page + 1
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