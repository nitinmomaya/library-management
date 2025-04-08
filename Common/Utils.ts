
export const isLoggedIn = () : boolean => {
    const loggedIn: string | null = localStorage.getItem('LoggeIn');
    if(loggedIn !== null && loggedIn === 'true' ){
        return true;
    }
    return false;
}

