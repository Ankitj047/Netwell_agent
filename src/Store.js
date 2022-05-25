import {createStore} from 'redux';
import Reducer from './Components/Reducers/Reducer';

const Store = createStore(Reducer);

export default Store;