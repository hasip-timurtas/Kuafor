import { initialState } from './';

export const globalData = (state = initialState, {type, data}) => {

  switch (type) {

    case 'SET_GLOBAL_DATA':
      return {...state, ...data};

    case 'SET_REDIRECTING':
      return {...state, redirecting: data};

    default:
      return state;

  }

};
