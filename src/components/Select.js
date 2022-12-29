import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { CircularProgress, Typography } from '@mui/material';
import TurnedInIcon from '@mui/icons-material/TurnedIn';

const Select = ({
    title = 'teste',
    helper,
    options = [
        { label: 'alo', value: 'alo' },
        { label: '41234', value: '12' },
    ],
    onSubmit = () => { },
    onError = () => { },
    textSize = '12px'
}) => {

    const [value, setValue] = useState('');
    const [helperText, setHelperText] = useState(helper);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleRadioChange = ({ target }) => {
        setValue(target.value);
        setHelperText('');
    };

    const handleSubmit = () => {
        if (isSubmitting) return;
        try {
            onSubmit(value)
        } catch (err) {
            onError(err)
        }
    }

    return (
        <>
            <FormLabel id="demo-error-radios">
                <Typography color="primary" fontSize={textSize}>
                    {title}
                </Typography>
            </FormLabel>
            <RadioGroup
                aria-labelledby="demo-error-radios"
                name="quiz"
                value={value}
                onChange={handleRadioChange}
            >
                {
                    options?.map((option, key) =>
                        <FormControlLabel key={key} value={option?.value} control={<Radio sx={{ color: '#6fffa9' }} />} label={
                            <Typography color="primary" fontSize={textSize}>
                                {option?.label}
                            </Typography>
                        } />
                    )
                }
            </RadioGroup>
            {
                helperText ?
                    <FormHelperText>
                        <Typography color="primary" fontSize={textSize}>
                            {helperText}
                        </Typography>
                    </FormHelperText>
                    :
                    <></>
            }
            <Button startIcon={<TurnedInIcon sx={{ width: textSize }} />} color="primary" onClick={handleSubmit} sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                {
                    isSubmitting ?
                        <>
                            <CircularProgress size="1rem" style={{ marginRight: '5px' }} color="primary" />
                            Enviando
                        </>
                        :
                        <Typography color="primary" fontSize={textSize}>
                            Enviar
                        </Typography>
                }
            </Button>
        </>
    )

}

export default Select;