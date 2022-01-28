import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { 
  Header,
  Banner,
  NFTs
} from '../../components';
import { RootState } from '../../utils/types';
import '../../style.css';

const HomePage = () => {
  const [isConnected, setIsConnected] = useState(false)
  const walletConnected = useSelector<RootState, boolean>((state) => state.user.walletConnected)

  useEffect(() => {
    if(walletConnected) {
      setIsConnected(true)
    } else {
      setIsConnected(false)
    }
  }, [walletConnected])

  return (
    <div className="wrapper">
      <div className="inner-wrapper">
        <Header isConnected={isConnected} />
        <Banner isConnected={isConnected} />
        <NFTs isConnected={isConnected} />
      </div>
    </div>
  );
}

export default HomePage