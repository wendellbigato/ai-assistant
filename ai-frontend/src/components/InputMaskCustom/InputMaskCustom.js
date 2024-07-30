import React from 'react';
import InputMask from 'react-input-mask';

// eslint-disable-next-line react/display-name
const InputMaskCustom = React.forwardRef((props, ref) => (
  <InputMask {...props} inputRef={ref} />
));

export default InputMaskCustom;
