import Image from 'next/image'
import avatar from '../temp/avatar.jpg'
import {BsPerson} from 'react-icons/bs'
import { useContext } from 'react'
import { stateContext } from '@/context/stateContext'

const style={
    wrapper: 'h=16 w-full bg-black text-white flex md:justify-around items-center px-60 fixed z-20',
    leftMenu:'flex gap-3',
    logo:'text-3x1 text-white flex cursor-pointer mr-16',
    menuItem:'text-lg text-white font-medium flex items-center mx-4 cursor-pointer',
    rightMenu:'flex gap-3 items-center',
    userImageContainer:'mr-2',
    userImage:'h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer',
    loginButton:'flex items-center cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1',
    loginText:'m1-2'
}

// Fetch Wallet id from Metamask
//const currentAccount = '0x8Cd390akgajha17689agal4934Dagalihg34567HGbh'
//const currentAccount=''  // this will give Login Button 
const Navbar = () => {

    const {currentAccount,connectWallet, currentUser, requestToGetCurrentUserInfo,userName} = useContext(stateContext)

    console.log(currentUser) 
    return <div className={style.wrapper}>
        <div className={style.leftMenu}>
            <div className={style.logo}>
                P2P Ride Sharing
            </div>
            <div className={style.menuItem}>Ride</div>
            <div className={style.menuItem}>Drive</div>
            <div className={style.menuItem}>More</div>
        </div>
        <div className={style.rightMenu}>
            <div className={style.menuItem}>Help</div>
            <div className={style.menuItem}>{userName}</div>
            <div className={style.userImageContainer}>
                <Image className={style.userImage} src={avatar} width={40} height={40} />
            </div>
            
            {/* this is a short hand if condition  */}
                {currentAccount ? (
                    <div>
                    {currentAccount.slice(0,6)}...{currentAccount.slice(39)}
                    </div>
                ):(
                    <div className={style.loginButton} onClick={() => connectWallet()}>
                        <BsPerson/>
                        <span className={style.loginText}>Log in</span>
                         </div>
                )}
                
        </div>
    </div>

}

export default Navbar