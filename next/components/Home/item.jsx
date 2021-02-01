import React from 'react'
import Link from 'next/link'

export default class Item extends React.Component {

    constructor(props) {
        super(props);
        this._measure = this._measure.bind(this);
    }

    componentDidMount() {
        this.props.measure();
    }

    _measure() {
        this.props.measure();
    }

    render() {

        const { data: item } = this.props;
        return (
            <Link href={`/thread/${item.id}`}>
                <div className='list-item'>
                        <div className='list-item-h'>
                            <div className='img'>
                                {
                                    item.user.avatarUrl && item.user.avatarUrl !== '' ? 
                                    <img src={
                                        item.type === 5 &&
                                        item.question &&
                                        item.question.is_answer === 1 &&
                                        item.question.beUser? 
                                        item.question.beUser.avatarUrl
                                        : item.user.avatarUrl}/> :
                                    <div className='default-avatar'>{(item.user.username[0].toUpperCase())}</div>
                            }
                            </div>
                            <div className='info'>
                                <p className='name'>{
                                    item.type === 5 &&
                                    item.question &&
                                    item.question.is_answer === 1 &&
                                    item.question.beUser ?
                                    item.question.beUser.username :
                                    item.user.username
                                }</p>
                                <div className='sub-box'>
                                    <p className='date'>2021-11-11 14:22:22</p>
                                    {
                                        item.type == '5' && <div className='question-box'>
                                            {
                                                item.question && item.question.is_answer === 0 && <div className='question-box-content'>
                                                    向<span>@{item.question?.beUser?.username || '匿名用户'}</span>提问：
                                                </div>
                                            }
                                            {
                                                item.question && item.question.is_answer === 1 && <div className='question-box-content'>
                                                    回答了<span>@{item.user?.username || '匿名用户'}</span>的提问：
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                
                            </div>
                        </div>

                        <div className='list-item-content'>
                            
                            {
                                item.type == 1 ? 
                                <div className='title'>发布了：<span>{item.title}</span></div> :
                                <div className='body'>
                                    {item.firstPost.summary_component}
                                </div>
                            }
                            {
                                item.firstPost.images && item.firstPost.images.length > 0 && <div className='image-list'>
                                    {
                                        item.firstPost.images.slice(0, 9).map((data, key) => {
                                            return (
                                                <div className={`image-item image-count-${item.firstPost.images.length >= 3 ? 3 : item.firstPost.images.length}`} style={{backgroundImage: `url(${data.thumbUrl})`}} key={key}>
                                                    <img onLoad={() => {
                                                        item.firstPost.images.length == 1 && this._measure();
                                                    }} src={data.thumbUrl}/>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            }

                            {
                                item.type === 2 && item.threadVideo && <div className='video-main'>
                                    <img className='play' src='/video.svg'/>
                                    <div className='bgimg' style={{backgroundImage: `url(${item.threadVideo.cover_url})`}}/>
                                </div>
                            }
                            
                        </div>

                        <div className='list-item-f'>
                            <div className='item'>
                                <p className='qui-icon icon-like'></p>
                                <p>赞{item.firstPost.likeCount || ''}</p>
                            </div>
                            <div className='item'>
                                <p>评论</p>
                            </div>
                            <div className='item'>
                                <p className='qui-icon icon-share'></p>
                                <p>分享</p>
                            </div>
                        </div>
                    </div>
            </Link>
            
        );
    }

}