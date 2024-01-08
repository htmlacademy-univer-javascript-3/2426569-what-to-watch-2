import {FC, Fragment, memo, ReactNode} from 'react';
import './spinner.css';

interface SpinnerWrapperProps {
  isLoading: boolean;
  children: ReactNode;
}

interface SpinnerProps {
  isFullPage?: boolean;
}

function SpinnerComponent({isFullPage = false} : SpinnerProps) {
  return (
    <div className={`spinner-wrapper ${isFullPage ? 'spinner-wrapper__full' : ''}`}>
      <div className="spinner"></div>
    </div>
  );
}

const SpinnerWrapperComponent: FC<SpinnerWrapperProps> = ({isLoading, children}) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  isLoading ? <SpinnerComponent/> : <Fragment>{children}</Fragment>
);


export const SpinnerWrapper = memo(SpinnerWrapperComponent);
export const Spinner = memo(SpinnerComponent);
