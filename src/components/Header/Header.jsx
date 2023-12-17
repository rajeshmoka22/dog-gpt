import DogLogo from '../../assets/dog-logo.svg';
export const Header = () => {
  return (
    <div id="Header" className='fixed flex m-4 w-full' style={{backgroundColor: '#1f2937'}}>
      <img src={DogLogo} className="w-10 h-10 bg-white p-2 rounded" />
      <h1 className='h-10 font-bold p-2'>Dog GPT</h1>
    </div>
  )
}