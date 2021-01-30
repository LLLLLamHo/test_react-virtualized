import Head from 'next/head'
import { Component } from 'react';
import router from 'next/router';
import Parser from "react-html-parser";
import s9e from '../Home/s9e';
import './index.scss';

export default class Thread extends Component {
    constructor(props) {
        super(props);
        this.state ={
            contentHtml: `<p><img src="https://discuz-service-test-1258344699.cos.ap-guangzhou.myqcloud.com/public/attachments/2021/01/26/NOl8oIP2JVfpv68KjCa6euBnRaWtuCefz0xpmn8R.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDCJAnwjKjthEk6HBm6fwzhCLFRRBlsBxG%26q-sign-time%3D1611752150%3B1611838610%26q-key-time%3D1611752150%3B1611838610%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D01da3a078f6ff7062aac57e1d0b5ea246ec48705&amp;imageMogr2/thumbnail/500x500" alt="%E5%A4%9A%E7%B3%BB%E5%88%97%E6%9F%B1%E5%9B%BE.png" title="603"><span id="member" value="58">@LamHo</span></p><p><span id="topic" value="2">#WY测试#</span></p><p><img style="display:inline-block;vertical-align:top" src="https://discuz.dnspod.dev/emoji/qq/ku.gif" alt="ku" class="qq-emotion"><img style="display:inline-block;vertical-align:top" src="https://discuz.dnspod.dev/emoji/qq/se.gif" alt="se" class="qq-emotion"></p><h1>h1</h1><h2>h2</h2><h3>h3</h3><h4>h4</h4><h5>h5</h5><p>h6</p><p><strong>asdasdasdasd</strong></p><p><em>asdsdasdasdads</em></p><p><strong><em>asdasdadas</em></strong></p><p><del>asdasdas</del></p><p><a href="">www.baidu.com</a></p><ul><li><p>1</p></li><li><p>2</p></li><li><p>3</p></li><li><p>3</p></li><li><p>3</p></li><li><p>3</p></li><li><p><input data-task-id="600fd4d69837c" type="checkbox" checked disabled> 123</p></li><li><p><input data-task-id="600fd4d6983d3" type="checkbox" disabled> 222</p></li></ul><blockquote><p>安盛打算大所多多</p><p>asdads</p></blockquote><hr><p>安盛打算大所多</p><pre><code>少算上大所多</code></pre><p><code>安盛打算大多</code></p><table><thead><tr><th>1</th><th>co2l22</th><th>col3</th></tr></thead><tbody><tr><td>3</td><td>32</td><td></td></tr><tr><td>3</td><td>23</td><td>2</td></tr></tbody></table><p>&lt;div&gt;123&lt;/div&gt;</p>`
        }
    }
    render() {
        return (
            <div className='page'>
                <Head>
                    <title>Discuz!Q</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className='header'>
                    <div className='goback' onClick={() => {router.back()}}>
                        <p className='qui-icon icon-back'></p>
                        <p className='test'>返回</p>
                    </div>
                </div>
                <div className='thread-content'>

                    <div className='info-box'>
                        <div className='img'>
                            {
                                // item.user.avatarUrl && item.user.avatarUrl !== '' ? 
                                true ?
                                <img src={"https://discuz-service-test-1258344699.cos.ap-guangzhou.myqcloud.com/public/avatar/000/00/00/58.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDCJAnwjKjthEk6HBm6fwzhCLFRRBlsBxG%26q-sign-time%3D1611749995%3B1611836455%26q-key-time%3D1611749995%3B1611836455%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Daf2af15023944fac360bd9cf4b918a6b76181a3b"}/> :
                                <div className='default-avatar'>{(item.user.username[0].toUpperCase())}</div>
                        }
                        </div>
                        <div className='info'>
                            <p className='name'>LamHo</p>
                            <div className='sub-box'>
                                <p className='date'>2021-01-23 13:22:22</p>
                            </div>

                            
                            
                        </div>
                    </div>

                    <div className='thread-body'>
                        <p className='title'>测试请勿删除</p>
                        <div className='content-html'>
                            {Parser(s9e.parse(this.state.contentHtml))}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}