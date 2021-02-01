import Head from 'next/head'
import { Component } from 'react';
import Parser from "react-html-parser";
import s9e from './s9e';

import mock from './mock';
import router from 'next/router';
import './index.scss';
import Link from 'next/link'
import Item from './item';

import { List, CellMeasurer, CellMeasurerCache, AutoSizer } from 'react-virtualized';


const cache = new CellMeasurerCache({
    defaultHeight: 120,
    fixedWidth: true
  });

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: mock,
            show: false
        };
        this.jump = this.jump.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
    }

    componentDidMount() {
        // for ( let i = 0; i < this.state.length; i++ ) {

        // }
        this.setState({
            show: true
        })
    }

    initData(data) {

        data.map((item) => {
            if (item.firstPost.summary) {
                item.firstPost.summary_component = Parser(s9e.parse(item.firstPost.summary));
            }
        });

        return data;
    }

    jump(id) {
        router.push({
            pathname: "/thread",
            query: {id: id}
        },
        `thread/${id}`);
    }

    rowRenderer({ index, isScrolling, key, parent, style }) {
        const { list } = this.state;

        return list.map((item,key) => {
            return (
                <CellMeasurer
                    cache={cache}
                    columnIndex={0}
                    key={key}
                    parent={parent}
                    rowIndex={index}
                >
                {({ measure, registerChild }) => (
                    <Link href={`/thread/${item.id}`}>
                        <Item ref={registerChild} index={key} data={item} measure={measure}/>
                    </Link>
                )}
                </CellMeasurer>
            );
        })
       
    }

    render () {
        return (
            <div>
                <Head>
                    <title>Discuz!Q</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className='top-box'>
                    <img src='/admin-logo-x2.png'/>
                </div>
                <div className='top-box-info'>
                    <div className='top-box-info-box'>
                        <div className='content'>
                            <p className='title'>成员</p>
                            <p className='text'>23812</p>
                        </div>
                        <div className='content'>
                            <p className='title'>内容</p>
                            <p className='text'>23812</p>
                        </div>
                        <div className='content'>
                            <p className='title qui-icon icon-share1'></p>
                            <p className='text'>分享</p>
                        </div>
                    </div>
                </div>

                <div className='nav'>

                    <div className='nav-content'>
                        <div className='nav-item'>
                            <p className='nav-text'>所有</p>
                        </div>
                        <div className='nav-item'>
                            <p className='nav-text'>所有</p>
                        </div>
                        <div className='nav-item'>
                            <p className='nav-text'>所有</p>
                        </div>
                        <div className='nav-item'>
                            <p className='nav-text'>所有</p>
                        </div>
                        <div className='nav-item'>
                            <p className='nav-text'>所有</p>
                        </div>
                        <div className='nav-item'>
                            <p className='nav-text'>所有</p>
                        </div>
                        <div className='nav-item'>
                            <p className='nav-text'>所有</p>
                        </div>
                    </div>
                    <div className='sort-box'>
                        <div className='qui-icon icon-screen'/>
                    </div>

                </div>

                <div className='top-info'>

                    <div className='top-info-item'>
                        <div className='icon'>置顶</div>
                        <div className='text'>测试</div>
                    </div>
                    <div className='top-info-item'>
                        <div className='icon'>置顶</div>
                        <div className='text'>测试</div>
                    </div>
                    <div className='top-info-item'>
                        <div className='icon'>置顶</div>
                        <div className='text'>测试</div>
                    </div>
                    <div className='top-info-item'>
                        <div className='icon'>置顶</div>
                        <div className='text'>测试</div>
                    </div>
                
                </div>
                <div className='list'>
                    {this.state.show && <AutoSizer>
                        {({height, width}) => (
                        <List
                            deferredMeasurementCache={cache}
                            rowHeight={cache.rowHeight}
                            height={height}
                            rowCount={this.state.list.length}
                            width={width}
                            rowRenderer={this.rowRenderer}
                        />
                        )}
                    </AutoSizer>}
                </div>
                {false && <div className='list' style={{height: '500px'}}>
                    {this.rowRenderer()}
                </div>}
                <div className='bottom-nav'>
                
                    <div className='item'>
                        <p className='qui-icon icon-home'></p>
                        <p>首页</p>
                    </div>

                    <div className='item'>
                        <p className='qui-icon icon-faxian'></p>
                        <p>发现</p>
                    </div>

                    <div className='add'>
                        <img src='/published.svg'/>
                    </div>

                    <div className='item'>
                        <p className='qui-icon icon-message'></p>
                        <p>消息</p>
                    </div>

                    <div className='item'>
                        <p className='qui-icon icon-mine'></p>
                        <p>我</p>
                    </div>
                
                </div>
            </div>
        );
    }
}