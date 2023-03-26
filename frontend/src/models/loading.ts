export interface Loading {
  title: string;
  show: boolean;
}

interface LoadingSlice {
  loading: Loading;
}

export const initialLoadingState: LoadingSlice = {
  loading: {
    title: '',
    show: false,
  },
};
