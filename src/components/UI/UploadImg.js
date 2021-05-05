import React from 'react';
import axios from 'axios';

class UploadImg extends React.Component {

    state = {
        loading: false,
        imgSrc: '',
        imgData: '',
        error: null,
        uploaded: false,
        previewMode: false,
        stopPreviewMode: false
    }

    componentDidMount(){
        if(this.props.src) this.setState({previewMode: true})
    }

    componentDidUpdate(){
        if(this.props.src && !this.state.previewMode && !this.state.stopPreviewMode){
            this.setState({previewMode: true})
        }
    }

    previewImgLoaded(){
        this.setState({uploaded: true, loading: false});
    }

    changed(e){
        const fileData = e.target.files[0];
        if(!fileData) return;
        const fileSize = fileData.size / 1024 / 1024;
        if(fileSize > 10){
            alert('File size must under 10MB!, your file size is ' + Math.round(fileSize) + 'MB');
            return;
        }

        this.setState({loading: true, previewMode: false, stopPreviewMode: true});

        const reader = new FileReader();
        reader.readAsDataURL(fileData);
        reader.onload = e => {
            this.setState({imgData: e.target.result}, () => {
                if(this.state.imgSrc){
                    this.setState({uploaded: true, loading: false});
                }
            })
        }

		const formData = new FormData();
		formData.append("image", fileData);
        
        axios.post(
            'https://api.imgur.com/3/image', formData,
            {headers: {"Authorization": "Client-ID d0e29a776afc4a4"}}
        ).then(res => {
            if(res.data.data && res.data.data.link){
                this.setState({imgSrc: res.data.data.link});
                if(this.state.imgData){
                    this.setState({uploaded: true, loading: false});
                }
                this.props.getLink(res.data.data.link);
            }
        })
        .catch(error => {
            this.setState({loading: false, error})
        })

    }

    render(){
        const imgStyle = {
            objectFit: 'cover',
            height: '100%',
            width: '100%'
        }
        return (
            <div className="upload">
                <label htmlFor="file-upload" className="d-block">
                    <div className="upload__img-wrap mx-auto" style={{width: this.props.width, height: this.props.height}}>
                        <img 
                            className={`upload__img ${this.state.uploaded ? 'd-none' : ''}`} 
                            src="/assets/images/upload.jpg" 
                            alt='icon' />
                        {
                            !this.state.previewMode ?
                            <img 
                                style={this.props.width ? imgStyle : null}
                                className={`upload__img ${!this.state.uploaded ? 'd-none' : ''}`} 
                                src={this.state.imgData || ''} 
                                alt={this.props.children || 'upload profile image'} />  
                            :
                            <img 
                                onLoad={()=>this.previewImgLoaded()}
                                style={this.props.width ? imgStyle : null}
                                className={`upload__img ${!this.state.uploaded ? 'd-none' : ''}`} 
                                src={this.props.src} 
                                alt={this.props.children || 'upload profile image'} />                         
                        }

                        {
                            this.state.loading ? 
                                <div className="upload__img-overlay">
                                    <span className="spinner-border spinner-border text-primary"></span>
                                </div>
                            : null
                        }
                    </div>
                    {
                        !this.state.loading && !this.state.uploaded ? 
                        <span className="upload__img-btn btn btn-block btn-outline-dark mt-2">
                            {
                                this.props.children ? 
                                this.props.children : 
                                'upload profile image'
                            }
                        </span>
                        : null
                    }
                    {
                       !this.state.loading && this.state.uploaded ?  
                       <span className="upload__img-btn btn btn-block btn-outline-dark mt-2">upload another image</span>
                       : null
                    }
                </label>
                <input 
                    id="file-upload" 
                    className="d-none" 
                    type="file" 
                    onChange={e=>this.changed(e)} accept="image/*" />
            </div>
        );            
    }


};

export default UploadImg;