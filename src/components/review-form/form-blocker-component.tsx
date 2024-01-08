import {FC, KeyboardEvent, memo, PropsWithChildren} from 'react';
import './form-blocker.css';

const WrapperBlockerComponent: FC<PropsWithChildren<{ isBlock: boolean }>> = ({isBlock, children}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    isBlock ? <div onKeyDown={handleKeyDown} className={'blocked-wrapper'}>{children}</div> : <>{children}</>
  );
};

export const WrapperBlocker = memo(WrapperBlockerComponent);
