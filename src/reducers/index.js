import { combineReducers } from 'redux';

import selectStore from './SelectStore';
import findStore from './FindStore';
import testStore from './TestStore';

export default combineReducers({
  selectStore,
  findStore,
  testStore
})
