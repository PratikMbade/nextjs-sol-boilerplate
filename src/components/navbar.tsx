'use client'
import React from 'react'
import WalletConnect from './walletadpater/wallet-connect'


type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='w-full flex items-center justify-between mx-36 mt-3 mb-2'>
        <div>
            <p className='font-semibold text-2xl'>StartUp</p>
        </div>
        <div>
            <ul className='flex flex-row items-center justify-between gap-x-5 font-medium text-lg'>
                <li>Product</li>
                <li>Fetaures</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
        <div>
            <WalletConnect/>
        </div>
    </div>
  )
}

export default Navbar