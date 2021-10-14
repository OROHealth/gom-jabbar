import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormControl, List, ListItemText, Box } from '@mui/material';

function MoiraMocktails(props) {
  const { feedback } = props;
  const [evolution, setEvolution] = useState([]);

  useEffect(() => {
    function getEvolution() {
      // filter by waiter
      const filter = feedback.filter((a) => a.waiter === 'Moira');
      // drinks evolution
      for (let i = 0; i < filter.length; i++) {
        setEvolution([
          ...evolution,
          { mocktail: filter[i].item, review: filter[i].rating },
        ]);
      }
    }
    feedback && getEvolution();
  }, [feedback, evolution]);

  return (
    <>
      <FormControl>
        <h1>Moira mocktails and ratings evolution</h1>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {evolution.map((a, index) => (
            <List key={index}>
              <ListItemText primary='Mocktail' secondary={a.mocktail} />
              <ListItemText primary='Rating' secondary={a.rating} />
            </List>
          ))}
        </Box>
      </FormControl>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    feedback: state.feedback,
  };
};

export default connect(mapStateToProps, null)(MoiraMocktails);
