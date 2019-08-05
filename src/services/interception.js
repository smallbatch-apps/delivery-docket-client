export const isHandlerEnabled = (config={}) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
    false : true
}

export const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
  }
  return request
}

export const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
  }

  return Promise.reject({ ...error })
}

export const successHandler = (response) => {

  if (isHandlerEnabled(response.config)) {

  }
  return response
}

export const collectionOptions = type => ({
  transformResponse: data => {
    data = JSON.parse(data);
    if(!data[type]){
      return data;
    }
    data[type] = data[type].map(item => dateClean(item));
    return data;
  }
});

export const singleOptions = type => ({
  transformResponse: data => {
    data = JSON.parse(data);
    data[type] = dateClean(data[type]);
    return data;
  }
});

export const dateClean = object => {
  const dateFields = ['created_at', 'lodgement_date', 'pickup_date', 'received_date', 'updated_at'];

  return Object.entries(object).reduce((newObject, [key, value]) => {
    newObject[key] = (value && dateFields.includes(key)) ? new Date(value) : value;
    return newObject;
  }, {});
}

export const API_LOCATION = process.env.NODE_ENV === 'development' ?
  'http://127.0.0.1:3333/api' :
  'https://api.capilano-demo.com/api';
