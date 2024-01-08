import {FC, Fragment, KeyboardEvent, memo, PropsWithChildren} from 'react';
import './form-blocker.css';

const WrapperBlockerComponent: FC<PropsWithChildren<{ isBlock: boolean }>> = ({isBlock, children}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    isBlock ? (
      <div onKeyDown={handleKeyDown} data-testid="blocked-wrapper" className={'blocked-wrapper'}>{children}</div>
      // eslint-disable-next-line react/jsx-no-useless-fragment
    ) : <Fragment>{children}</Fragment>
  );
};

export const WrapperBlocker = memo(WrapperBlockerComponent);
