import { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import {db} from "../../firebase.config";
import JobCard from './JobCard';
import Header from '../Header';

const Home = () => {

    const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  const fetchJobs = async() => {
   try {
    setCustomSearch(false);
    const tempJobs = []
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, orderBy("postedOn", "desc"));
    const req = await getDocs(q);

    req.forEach((job) => {
      // console.log(doc.id, " => ", doc.data());
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate()
      })
    });
    setJobs(tempJobs);
   } catch (error) {
    console.log(error.message);
   }
  }



  const fetchJobsCustom = async (jobCriteria) => {
    try {
      setCustomSearch(true);
      const tempJobs = [];
      const jobsRef = query(collection(db, "jobs"));
  
      let q = query(jobsRef, orderBy("postedOn", "desc"));
  
      // Add where clauses only if the corresponding value in jobCriteria is defined
      if (jobCriteria.type) q = query(jobsRef, where("type", "==", jobCriteria.type));
      if (jobCriteria.title) q = query(jobsRef, where("title", "==", jobCriteria.title));
      if (jobCriteria.experience) q = query(jobsRef, where("experience", "==", jobCriteria.experience));
      if (jobCriteria.location) q = query(jobsRef, where("location", "==", jobCriteria.location));
  
      const req = await getDocs(q);
  
      req.forEach((job) => {
        tempJobs.push({
          ...job.data(),
          id: job.id,
          postedOn: job.data().postedOn.toDate(),
        });
      });
      setJobs(tempJobs);
    } catch (error) {
      console.log(error.message);
    }
  };
  


  useEffect(() => {
    fetchJobs()
  },[])


  return (
    <>
    <Header />

        <SearchBar fetchJobsCustom={fetchJobsCustom}/>
      {customSearch && 
        <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
          <p className="bg-blue-500 px-10 py-2 rounded-md text-white">Clear Filters</p>
        </button>
      }
      {jobs.map((job)=> (
        <JobCard key={job.id} {...job}/>
      ))}
    </>
  )
}

export default Home