import React, { useState, useEffect } from 'react'
import { NFTdata } from '../../pages/home/NFTdata'
import { NFTtype } from '../../utils/types'
import './style.scss'
import NFT from './nft'
import limitLogo from '../../assets/mint_limit_logo.png'
import MintImg from '../../assets/1.png'
import BaseModal from '../modal/baseModal'
import { NFTContent } from '../modal/nftContent'
import { mintNFT, validateMinter } from '../../utils/useWeb3'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isConnected: boolean;
}

const NFTs = (props: Props) => {
  toast.configure();
  const {isConnected} = props
  const nfts: Array<NFTtype> = NFTdata;
  const [show, setShow] = useState(false)
  const [canMint, setCanMint] = useState(true)

  const closeModal = () => {
    setShow(false)
  }

  useEffect(() => {
    async function checkMintable() {
      if(isConnected) {
        const minted: boolean = await validateMinter();
        if( minted ) {
          setCanMint(false);
          toast.info('Since you have already minted one NFT, you can no longer mint another NFT.', { autoClose: 7000 })
        }
      }
    }
    checkMintable()
  }, [isConnected])

  const minting = async() => {
    let transaction: any = await mintNFT();
    if( typeof transaction.events !== 'undefined' ) {
      if(transaction.events.MintNFT.returnValues.id) {
        toast.success('You have minted a NFT successfully')
        console.log('mint successful!')
        setShow(true)
      }
    } else {
      toast.error('It seems an error to be caused on performing the minting');
    }
  }

  return (
    <div className="contents">
      <div className="container">
        {isConnected ? 
          <div className="mint-nft">
            <div className="nft-list-title">
              <h3 className="white">Eligible</h3>
              <h5 className="white">You can mint NFT’s that in this section</h5>
            </div>
            <div className="nft">
              <div className="nft-image">
                <img src={MintImg} alt='Circle Henchman' />
              </div>
              <div className="nft-info">
                <div className="nft-limit">
                  <img src={limitLogo} alt="" />
                  <span>Limited quantity of 666</span>
                </div>
                <div className="nft-title">Circle Henchman</div>
                <div className="nft-desc">Holding this NFT will grant you early access beta launch permissions to upcoming Squid Moon games.</div>
              </div>
              <div className="mint-button">
                <button 
                  className={`connBtn ${canMint ? '' : 'disable'}`} 
                  onClick={minting} 
                  disabled={!canMint}
                  data-title={`${!canMint ? 'Since you have already minted one NFT, you can no longer mint another NFT.' : ''}`}
                >
                  Mint NFT
                </button>
              </div>
              
            </div>
          </div> : <></>
        }
        <div className="all-nfts">
          <div className="nft-list-title">
            <h3 className="white">All</h3>
            <h3 className="yellow">NFT's</h3>
          </div>
          {nfts.map((nftData: NFTtype) => (
            <NFT nftData={nftData} num={nftData.id} key={nftData.id} />
          ))}
        </div>
      </div>
      <BaseModal show={show} closeModal={closeModal}>
        <NFTContent closeModal={closeModal} />
      </BaseModal>
    </div>
  )
}

export default NFTs