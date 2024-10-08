import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllJobs from '../hooks/useGetAllJobs.jsx'
import Footer from './Footer'
import Herosection from './Herosection'
import LatestJobs from './LatestJobs'
import Navbar from './Navbar'
import { setSerachQuery } from '../features/JobSlice.js'

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  useGetAllJobs();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies")
    }
  }, [])
  return (
    <>
      <Navbar />
      <Herosection />
      {/* <CategoryCarauosel/> */}
      <LatestJobs />
      <Footer />
    </>
  )
}

export default Home