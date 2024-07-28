import { useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { Button, Progress, useMantineTheme, rgba } from '@mantine/core';
import classes from './ButtonProgress.module.css';

const  ButtonProgress = ({defaultText, loadingText, completeText, formId, onButtonComplete}) => {
  const theme = useMantineTheme();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleButtonClick = () => {
    loaded ? setLoaded(false) : !interval.active && interval.start()
  }
  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 3;
        }
        interval.stop();
        setLoaded(true);
        setTimeout(()=> {
          setLoaded(false)
          onButtonComplete()
        }, 700)
        return 0;
      }), 20 );

  return (
    <Button type='submit' form={formId}
      className={classes.button}
      onClick={handleButtonClick}
      color={loaded ? 'teal' : theme.primaryColor}
    >
      <div className={classes.label}>
        {progress !== 0 ? loadingText : loaded ? completeText : defaultText}
      </div>
      {progress !== 0 && (
        <Progress
          value={progress}
          className={classes.progress}
          color={rgba(theme.colors.blue[2], 0.35)}
          radius="sm"
        />
      )}
    </Button>
  );
}

export default ButtonProgress