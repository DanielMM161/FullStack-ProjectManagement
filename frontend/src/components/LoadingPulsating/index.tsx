import { StyledLoadingPulsating } from './styled';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux.hook';
import { useAppDispatch } from './../../hooks/redux.hook';
import { closeLoading } from '../../redux/slice/loading.slice';

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
          <div className="pulsating-circle"></div>
          <span>{loading.title}</span>
        </StyledLoadingPulsating>
      ) : null}
    </>
  );
}

export default LoadingPulsating;
