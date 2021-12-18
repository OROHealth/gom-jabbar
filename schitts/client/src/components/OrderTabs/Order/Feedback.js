import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default function CustomizedRating(props) {
  const { setFeedback } = props;

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  return (
    <Box
      sx={{
        margin: '10px auto 20px',
      }}
    >
      <StyledRating
        name='customized-color'
        defaultValue={2}
        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
        onChange={handleChange}
        precision={0.5}
        icon={<FavoriteIcon fontSize='inherit' />}
        emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
      />
    </Box>
  );
}
