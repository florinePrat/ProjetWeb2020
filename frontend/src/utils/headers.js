export const basicHeaders = {'Content-Type': 'application/json'
};

export const tokenHeaders =
    {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
    };
