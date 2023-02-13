// the keys is
// the type will be either get set or delete
// we will use this hook to either get/set or delete a value in local storage.
const useLocalStorage = (key, type) => {
  try {
    // @DESC GET
    if (type === 'get') {
      // if value doesn't exist it will return undefined.
      const item = window.localStorage.getItem(key);
      // return the item, and instead of returning undefined, it will return an empty string.
      return item ? JSON.parse(item) : '';
    }

    // @DESC SET
    if (type === 'set') {
      // we want to set an item into local storage
      const setValue = (newValue) => {
        // we pass the set value whatever we want to save to local storage
        window.localStorage.setItem(key, JSON.stringify(newValue));
      };
      return [setValue];
    }

    // @DESC DELETE
    if (type === 'delete') {
      const deleteValue = () => {
        window.localStorage.removeItem(key);
      };
      return deleteValue;
    }
    //
  } catch (error) {
    console.log(error);
  }
};

export default useLocalStorage;

// ** To use this:

// To get an Item
// TODO const username = useLocalStorage('username', 'get');

// To set an item
// **[setUsername] this will be a function and then we pass it any value we want to set as the username. you can name it anything.
// TODO const [setUsername] = useLocalStorage('username', 'set');
// TODO setUsername('Martin');

// To Delete an Item from local Storage
// **deleteUsername() will not take in any parameter
// TODO const [deleteUsername] = useLocalStorage('username', 'delete');
// TODO deleteUsername();
