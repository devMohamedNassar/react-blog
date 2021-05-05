import { connect } from 'react-redux';

const showIfAuth = props => {
    let cond = (props.isAuth && !props.hideIfAuth) || (!props.isAuth && props.hideIfAuth);
    if(props.showIfAuthor) cond = props.isAuth && (props.showIfAuthor === props.currentUserId);
    return cond ? props.children : null;
}

const mapStateToProps = state => {
    return {
        isAuth: !!state.auth.token,
        currentUserId: state.auth.userId
    }
};

export default connect(mapStateToProps)(showIfAuth);