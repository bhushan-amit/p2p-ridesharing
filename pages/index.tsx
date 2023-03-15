import Navbar from '../components/Navbar'
const style={
  wrapper: 'g-screen w-screen flex flex-col',
  rideRequestContainer:'',
  rideRequest:'',
  main:'',
}

export default function Home() {
  return (
    <div className={style.wrapper}>
      <Navbar/>
      <div className={style.main}>
        {/* map */}
      </div>
      <div className={style.rideRequestContainer}>
        <div className={style.rideRequest}>
          {/* location selector  */}
          {/* confirm ride  */}
        </div>
      </div>
    </div>
  )
}
