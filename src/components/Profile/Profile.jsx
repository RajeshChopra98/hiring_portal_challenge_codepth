import { useSelector } from "react-redux"

const Profile = () => {
    const {currentUser} = useSelector(state=> state.user);

  return (
    <>
        <div className="flex items-center justify-center mx-auto mt-[80px] w-[700px] h-[500px] bg-black">
            <div className="flex items-center justify-center">
                <p className="text-[30px] text-white">{currentUser.email}</p>
            </div>
        </div>
    </>
  )
}

export default Profile