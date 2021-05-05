const errorMsg = (errorResponse) => {

    if(errorResponse.includes(':')) errorResponse = errorResponse.slice(0, errorResponse.indexOf(':'));

    switch(errorResponse.trim()){
        case 'EMAIL_NOT_FOUND': return 'Email not found';
        case 'INVALID_PASSWORD': return 'Invalid password';
        case 'WEAK_PASSWORD': return 'Password must be 6 characters long or more';
        case 'USER_DISABLED': return 'User account has been disabled';
        case 'EMAIL_EXISTS': return 'The email address is already in use by another account';
        case 'INVALID_EMAIL': return 'Please enter valid email';
        case 'INVALID_ID_TOKEN': return 'Please login again';
        default: return '';
    }
}

export default errorMsg;