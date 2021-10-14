import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, Tab } from '@mui/material';
import { fetchItems, fetchWaiters } from '../store/utils/thunkCreators';

function Navbar(props) {
  const [activeTab, setActiveTab] = useState('a');
  const { fetchItems, fetchWaiters } = props;
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetchWaiters();
    fetchItems();
    // toggle animation of active tab based on URL
    if (location.pathname === '/') setActiveTab('a');
    if (location.pathname === '/order') setActiveTab('b');
    if (location.pathname === '/menu') setActiveTab('c');
    if (location.pathname === '/analytics') setActiveTab('d');
    if (location.pathname === '/feedback') setActiveTab('e');
  }, [fetchItems, fetchWaiters, location]);

  function gotoPage(link) {
    history.push(link);
  }

  return (
    <Tabs
      variant='fullWidth'
      centered
      aria-label='navigation'
      value={activeTab}
    >
      <Tab value='a' label='CUSTOMER' onClick={() => gotoPage('/')} />
      <Tab value='b' label='ORDER' onClick={() => gotoPage('/order')} />
      <Tab value='c' label='Menu Items' onClick={() => gotoPage('/menu')} />
      <Tab value='d' label='ANALYTICS' onClick={() => gotoPage('/analytics')} />
      <Tab value='e' label='FEEDBACK' onClick={() => gotoPage('/feedback')} />
    </Tabs>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: () => {
      dispatch(fetchItems());
    },
    fetchWaiters: () => {
      dispatch(fetchWaiters());
    },
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
