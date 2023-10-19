const log = require('./utils/logger');

// this session is just the browser session. Once the user opens the application, as long as the user is still on the application and signed in. That property will still be available in the session. But once they close the session, that property will be deleted.

// the type will be either get set or delete
// we will use this hook to either get/set or delete a value in session storage.
const useSessionStorage = (key, type) => {
  try {
    // @DESC GET
    if (type === 'get') {
      // if value doesn't exist it will return undefined.
      const item = window.sessionStorage.getItem(key);
      // return the item, and instead of returning undefined, it will return an empty string.
      return item ? JSON.parse(item) : '';
    }

    // @DESC SET
    if (type === 'set') {
      // we want to set an item into session storage
      const setValue = (newValue) => {
        // we pass the set value whatever we want to save to session storage
        window.sessionStorage.setItem(key, JSON.stringify(newValue));
      };
      return [setValue];
    }

    // @DESC DELETE
    if (type === 'delete') {
      const deleteValue = () => {
        window.sessionStorage.removeItem(key);
      };
      return deleteValue;
    }
    //
  } catch (error) {
    log('error', error, 'useSessionStorage');
  }
};

export default useSessionStorage;

// ** To use this:

// To get an Item
// TODO const username = useSessionStorage('username', 'get');

// To set an item
// **[setUsername] this will be a function and then we pass it any value we want to set as the username. you can name it anything.
// TODO const [setUsername] = useSessionStorage('username', 'set');
// TODO setUsername('Martin');

// To Delete an Item from session Storage
// **deleteUsername() will not take in any parameter
// TODO const [deleteUsername] = useSessionStorage('username', 'delete');
// TODO deleteUsername();
