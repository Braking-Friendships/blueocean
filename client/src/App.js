import axios from 'axios';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    axios.get('/api/test')
      .then(result => console.log(result))

    axios.post('/api/test', {
        email: 'email',
        firebase_id: '',
        username: '',
        friends: [''],
        total_games: 4,
        total_wins: 4
      })
      .then(result => console.log(result))
  }, [])

  return (
    <>
      <div className="px-10 text-gray-500 font-bold mb-2">Hello world!</div>
    </>
  );
}

export default App;
