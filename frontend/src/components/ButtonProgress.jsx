import { useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { Button, Progress, useMantineTheme, rgba } from '@mantine/core';
import classes from './ButtonProgress.module.css';

const  ButtonProgress = ({defaultText, loadingText, completeText, formId, onButtonComplete, emailFailed}) => {
  const theme = useMantineTheme();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleButtonClick = () => {
    loaded ? setLoaded(false) : !interval.active && interval.start()
  }
  const interval = useInterval(
    () =>
      {
        if(emailFailed) {
          interval.stop()
          setProgress(0)
          return
        }

        setProgress((current) => {
        if (current < 100) {
          return current + 2;
        }
        //Done sending
        interval.stop();
        setLoaded(true);
        setTimeout(()=> {
          setLoaded(false)
          onButtonComplete()
        }, 1500)
        return 0;
      })
    }, 10 );

  if (emailFailed) {
    return (
    <Button
    className={classes.button}
    onClick={handleButtonClick}
    color='red' 
    >
      <div className={classes.label}>
      Failed to send
      </div>
    </Button>
    )
  }
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