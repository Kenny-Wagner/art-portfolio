import { useState} from 'react'
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Container, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import ButtonProgress from '../components/ButtonProgress'

const Contact = () => {
  const [emailFailed, setEmailFailed] = useState(false);

  const accessKey = import.meta.env.VITE_WEB3_KEY //access key from web3forms

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = form.getValues()

    Object.assign(formData, {access_key: '8c42e866-4b13-41bc-9ac7-40ba7889673f'});

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.log('error is', error.message)
      setEmailFailed(true)
      
      setTimeout(()=> {
        setEmailFailed(false)
        form.reset()
      }, 1500)
    }
  };

  const onButtonComplete = () => {
    form.reset()
  }

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  const formId = 'contact-form'
  return (
    <Container style={{ maxWidth: '1000px' }}>
      <form id = {formId} onSubmit={(event) => onSubmit(event)}>
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
          fw={900}
          ta="center"
        >
          Contact Me!
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <TextInput
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            {...form.getInputProps('email')}
          />
        </SimpleGrid>

        <TextInput
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
          {...form.getInputProps('subject')}
        />
        <Textarea
          mt="md"
          label="Message"
          placeholder="Your message"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          {...form.getInputProps('message')}
        />

        <Group justify="center" mt="xl">
        <ButtonProgress
        defaultText="Send Message" 
        loadingText="Sending..." 
        completeText="Message sent!"
        formId = {formId}
        onButtonComplete={onButtonComplete}
        emailFailed={emailFailed}

        />
        </Group>
      </form>
    </Container>
  );
}

export default Contact;
