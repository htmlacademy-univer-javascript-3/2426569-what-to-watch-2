import {FC, Fragment, memo, ReactNode} from 'react';
import './spinner.css';

interface SpinnerWrapperProps {
  isLoading: boolean;
  children: ReactNode;
}

const SpinnerWrapperComponent: FC<SpinnerWrapperProps> = ({isLoading, children}) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  isLoading ? <div className='spinner-wrapper'><div className='spinner'></div></div> : <Fragment>{children}</Fragment>
);


export const SpinnerWrapper = memo(SpinnerWrapperComponent);
