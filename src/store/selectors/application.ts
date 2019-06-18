import { RootReducer } from '../modules';

export const selectLoaderFlag = (state: RootReducer) => !!state.application.isShowLoader;
