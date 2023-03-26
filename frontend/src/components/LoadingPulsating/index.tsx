import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { closeLoading } from '../../redux/slice/loading';
import StyledLoadingPulsating from './styled';

function LoadingPulsating() {
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector((state) => state.loading);
  const { loading } = loadingState;

  useEffect(() => {
    const debounceLoading = setTimeout(() => {
      dispatch(closeLoading());
    }, 600);

    return () => clearTimeout(debounceLoading);
  }, [dispatch, loading]);

  return (
    <>
      {loading.show ? (
        <StyledLoadingPulsating>
          <div className="pulsating-circle" />
          <span>{loading.title}</span>
        </StyledLoadingPulsating>
      ) : null}
    </>
  );
}

export default LoadingPulsating;
