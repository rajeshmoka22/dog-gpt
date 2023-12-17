import {useState, useRef} from 'react';
import DOGLogo from '../../assets/dog-logo.svg';
import UserLogo from '../../assets/user-logo.svg';
import SendIcon from '../../assets/send-icon.svg';
import { Typewriter } from 'typewriting-react';

export const Chat = () => {
  const [chatHistory, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const scrollDiv = useRef(null);
  const handleSubmit = (e) => {
    e?.preventDefault();
    setLoading(true);
    setHistory([...chatHistory, {message: message, image: ''}]);
    scrollDiv.current?.scrollIntoView()
    setMessage('');
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((resp) =>  resp.json())
      .then(resp => {
        setHistory(history => [...history, {message: getDogMessage(), image: resp.message}]);
      })
      .catch(() => {
        setHistory(history => [...history, {message: getDogMessage(), image: ''}]);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => scrollDiv.current?.scrollIntoView(), 500);
      })
  }

  const handleChange = ({target}) => {
    const {value} = target;
    setMessage(value);
  }

  const getDogMessage = () => {
    const woof = 'woof ';
    return (woof.repeat(Math.round(Math.random()*20)+5))
  }
  return (
    <>
      <div style={{maxHeight: '75vh', top: '90px'}} className="overflow-hidden overflow-y-auto relative">
        <div className='flex justify-center'>
          <div className="md:w-2/3 md:m-10 mb-28">
            {
              chatHistory.map(({message, image}, index) => (
                <div key={message} className=" p-2 m-2">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={(index%2 === 0) ? UserLogo : DOGLogo} className="w-8 h-8 bg-white rounded-full text-black p-2" />
                    <strong>{(index%2 === 0) ? 'You': 'Doggo'}</strong>
                  </div>
                  <p className='ml-10'>{(index%2 === 0 && index !== chatHistory.length-1) ? message : <Typewriter words={[message]} loop={true} typingSpeed={20} erasingSpeed={2000000000} />}</p>
                  {!!image && (
                    <img src={image} className='ml-10 my-4 h-80' />
                  )}
                </div>
              ))
            }
            {!chatHistory.length && (
              <p className='flex items-center'>Try asking &quot;Woof woof&quot;</p>
            )}
            <div ref={scrollDiv} id="scrollDiv"></div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <div className="fixed bottom-4 flex" style={{width: '90%'}}>
          <input className="m-4 h-12 font-base p-2 dark:text-white dark:bg-gray-700 rounded-md"
            style={{width: '90%'}}
            onChange={handleChange}
            value={message}
            disabled={isLoading}
          />
          <button onClick={handleSubmit} disabled={isLoading}>
            <img className="h-10 w-10 bg-green-900 p-2 rounded" src={SendIcon} />
          </button>
        </div>
      </form>
    </>
  )
}