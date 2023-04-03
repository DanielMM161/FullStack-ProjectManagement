import { Loading } from './loading';

interface Actions {
  loading: Loading;
  showSideBar: boolean;
}

export const initialLoadingState: Loading = {
  title: '',
  show: false,
};

export const initialActionsState: Actions = {
  loading: initialLoadingState,
  showSideBar: false,
};
