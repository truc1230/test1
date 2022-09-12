import { useRef } from 'react';

const useDerivedProps = <P>(cb: (prevProps: P | null, nextProps: P | null) => void, props: P) => {
  const prevPropsRef = useRef<P | null>(null);
  const prevPropsTarget = prevPropsRef.current;

  if (prevPropsTarget !== props) {
    cb(prevPropsTarget, props);
    prevPropsRef.current = props;
  }
};

export default useDerivedProps;
