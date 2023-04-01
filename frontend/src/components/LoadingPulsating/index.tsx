import { useAppSelector } from '../../hooks/redux.hook';
import StyledLoadingPulsating from './styled';

function LoadingPulsating() {
  const actionsState = useAppSelector((state) => state.actions);
  const { loading } = actionsState;

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
