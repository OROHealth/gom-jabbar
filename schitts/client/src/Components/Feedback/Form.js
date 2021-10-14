import {
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Rating,
} from '@mui/material';

function Form(props) {
  const {
    waiters,
    items,
    item,
    setItem,
    waiter,
    setWaiter,
    rating,
    setRating,
    nameRef,
    feedbackRef,
  } = props;

  const handleChange = (event, type) => {
    if (type === 'item') setItem(event.target.value);
    if (type === 'waiter') setWaiter(event.target.value);
  };

  return (
    <>
      <FormControl>
        <InputLabel htmlFor='Name'>Name</InputLabel>
        <Input id='Name' aria-describedby='my-helper-text' ref={nameRef} />
      </FormControl>
      <FormControl sx={{ width: 500, marginTop: 2 }}>
        <InputLabel id='Waiter'>Waiter</InputLabel>
        <Select
          labelId='Waiter'
          id='Waiter'
          value={waiter}
          label='Waiter'
          onChange={(event) => handleChange(event, 'waiter')}
        >
          {waiters &&
            waiters.map((waiter) => (
              <MenuItem value={waiter.name} key={waiter.name}>
                {waiter.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 500, marginBottom: 2 }}>
        <InputLabel id='Item'>Item</InputLabel>
        <Select
          labelId='Item'
          id='Item'
          value={item}
          label='Item'
          onChange={(event) => handleChange(event, 'item')}
        >
          {items &&
            items.map((items) => (
              <MenuItem value={items.name} key={items.name}>
                {items.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Rating
        name='simple-controlled'
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <FormControl sx={{ width: 500 }}>
        <InputLabel htmlFor='Price'>Feedback</InputLabel>
        <Input
          multiline
          rows={2}
          id='Price'
          aria-describedby='my-helper-text'
          ref={feedbackRef}
        />
      </FormControl>
    </>
  );
}

export default Form;
