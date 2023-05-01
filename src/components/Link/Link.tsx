import {
  LinkProps as RouterLinkProps,
  useHref,
  useLinkClickHandler,
} from 'react-router-dom';
import { Typography } from 'antd';
import React from 'react';
import { LinkProps as AntdLinkProps } from 'antd/lib/typography/Link';

const Link = React.forwardRef<
  HTMLAnchorElement,
  AntdLinkProps & RouterLinkProps
>(({ onClick, replace = false, state, target, to, ...rest }, ref) => {
  const href = useHref(to);
  const handleClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
  });

  return (
    <Typography.Link
      {...rest}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          handleClick(event);
        }
      }}
      ref={ref}
      target={target}
    />
  );
});

export default Link;
