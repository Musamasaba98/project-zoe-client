import * as React from 'react';
import { useField } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { hasValue, IOption } from './inputHelpers';

interface IProps {
  label: string;
  name: string;
  options: IOption[];
  multiple?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  size?: 'small' | 'medium';
  margin?: 'none' | 'dense' | 'normal';
}

const XSelectInput = (props: IProps) => {
  const {
    name, options, variant, margin = 'normal', ...rest
  } = props;
  const [field, meta] = useField({ name });
  const error = hasValue(meta.error) ? meta.error : undefined;
  const showError = Boolean(error && meta.touched);
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  return <FormControl error={showError} fullWidth variant={variant} margin={margin} size={props.size}>
        <InputLabel htmlFor={name} ref={inputLabel}>{rest.label}</InputLabel>
        <Select
            {...rest}
            value={meta.value || (props.multiple ? [] : '')}
            onChange={field.onChange}
            onBlur={field.onBlur}
            fullWidth
            multiple={rest.multiple}
            inputProps={{ name }}
            labelWidth={labelWidth}
            autoComplete="off"
        >
            {
                options.map(
                  (it) => <MenuItem
                        value={it.id}
                        key={it.id}
                    >{it.name}</MenuItem>,
                )
            }
        </Select>
        {
            showError && <FormHelperText>{error}</FormHelperText>
        }
    </FormControl>;
};

export default XSelectInput;
