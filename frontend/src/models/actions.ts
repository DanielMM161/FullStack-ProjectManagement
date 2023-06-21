import { Loading } from './loading';

export interface ActionsSliceState {
  loading: Loading;
  showSideBar: boolean;
}

export const initialLoadingState: Loading = {
  title: '',
  show: false,
};

export const initialActionsState: ActionsSliceState = {
  loading: initialLoadingState,
  showSideBar: false,
};
