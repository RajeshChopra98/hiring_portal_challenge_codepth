import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

export default function JobPost() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  // const [Skills, setSkills] = useState("");

  
  const [jobCriteria, setJobCriteria] = useState({
    title: "",
    company: "",
    location: "",
    experience: "",
    type: "",
    job_link: "",
    postedOn: "",
    skills: [],
  });

  const handleChange = (e) => {
    if (e.target.name === "skills") {
      const skillArray = e.target.value.split(",").map((skill) => skill.trim());
      setJobCriteria((prevState) => ({
        ...prevState,
        skills: skillArray,
      }));
    } else {
      setJobCriteria((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        postedOn: startDate,
      }));
    }
  };
  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Add a new document to the "jobs" collection with a unique ID
      await addDoc(collection(db, "jobs"), {
      title: jobCriteria.title,
      company: jobCriteria.company,
      location: jobCriteria.location,
      experience: jobCriteria.experience,
      type: jobCriteria.type,
      skills: jobCriteria.skills,
      job_link: jobCriteria.job_link,
      postedOn: jobCriteria.postedOn,
    });


      toast.success("Job created successfully")
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-3xl font-bold leading-9 tracking-tight text-white">
            Post A Job.
          </h2>
        </div>

        <div className="mt-3 px-6 py-4  sm:mx-auto sm:w-full sm:max-w-sm md:min-w-[500px] bg-slate-500">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div className="flex flex-col flex-wrap gap-4 my-10 justify-center px-10">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Company
                </label>
                <div className="mt-2">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={jobCriteria.company}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pick a Date
                </label>
                <div className="mt-2">
                  <DatePicker
                    id="date"
                    name="postedOn"
                    value={jobCriteria.postedOn}
                    dateFormat="dd-MM-yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="job_link"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Job-Link
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="job_link"
                    name="job_link"
                    type="text"
                    value={jobCriteria.job_link}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 my-5 justify-center">
              <div className="flex flex-col gap-4 my-3 justify-center ">
                <select
                  onChange={handleChange}
                  name="title"
                  value={jobCriteria.title}
                  className="w-[190px] py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
                >
                  <option value="" disabled hidden>
                    Job Role
                  </option>
                  <option value="iOS Developer">iOS Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Android Developer">Android Developer</option>
                  <option value="Developer Advocate">Developer Advocate</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="MERN Stack Developer">MERN Stack Developer</option>
                </select>

                <select
                  onChange={handleChange}
                  name="type"
                  value={jobCriteria.type}
                  className="w-[190px] py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
                >
                  <option value="" disabled hidden>
                    Job Type
                  </option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="flex flex-col gap-4 my-3 justify-center ">
                <select
                  onChange={handleChange}
                  name="location"
                  value={jobCriteria.location}
                  className="w-[190px] py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
                >
                  <option value="" disabled hidden>
                    Location
                  </option>
                  <option value="Remote">Remote</option>
                  <option value="In-Office">In-Office</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <select
                  onChange={handleChange}
                  name="experience"
                  value={jobCriteria.experience}
                  className="w-[190px] py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
                >
                  <option value="" disabled hidden>
                    Experience
                  </option>
                  <option value="Fresher">Fresher</option>
                  <option value="Junior Level">Junior Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Add Skills
              </label>
              <div className="mt-2">
                <input
                  id="skills"
                  type="text"
                  name="skills"
                  value={jobCriteria.skills}
                  onChange={handleChange}
                  placeholder="Enter skills separated by commas"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button className="flex justify-center mx-auto items-center w-44 bg-blue-500 text-white font-bold py-3 rounded-md">
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
