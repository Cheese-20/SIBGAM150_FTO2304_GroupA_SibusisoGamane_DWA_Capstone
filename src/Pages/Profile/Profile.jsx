import {useState,useEffect} from 'react'

function Profile(){
    const [FetchError,setFetchError] = useState(null)
    const [data,setData] =useState(null);

    useEffect ( ()=>{
        const FetchData = async ()=>{}
        
    })

    return (
        <>
        <div>
            <span>Welcome back username</span>
        </div>

        <h1>favorite Episodes</h1>

        <h1>edit details</h1>


        </>
    )
}

export default Profile