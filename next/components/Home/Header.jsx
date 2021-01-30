import React from 'react';

export default class Header extends React.Component {

    render() {
        return(
            <div className='header-box'>
                <div className='top-box'>
                    <img src='/admin-logo-x2.png' onLoad={this.props.measure}/>
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
            </div>
        );
    }
}