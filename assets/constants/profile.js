import ProfileIcon from "../svg/ProfileIcon"
import RewardIcon from "../svg/RewardIcon"
import UserPLus from "../svg/UserPlus"
import WalletIcon from "../svg/WalletIcon"
export const profileItems = [
    { id: 1, title: 'Refer and Earn', icon: <UserPLus />, screen: 'Profile' },
    { id: 2, title: 'My Profile', icon: <ProfileIcon width={40} height={25} style={{ marginLeft: -10 }} />, screen: 'Orders' },
    { id: 3, title: 'My Rewards', icon: <RewardIcon />, screen: 'Cart' },
    { id: 4, title: 'My Wallet', icon: <WalletIcon width={25} height={23} />, screen: 'Wishlist' },
    // { id: 5, title: 'My Statisticks', icon: 'heart', screen: 'Wishlist' },
]