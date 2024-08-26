import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import axios from 'axios';
import { useDispatch } from 'react-redux';

import Loader from './components/Spinner.jsx';
import { setUser } from './features/authFeatures.js';
import { userBaseUrl } from './utils/constants.jsx';
const CreateCompany = lazy(() => import('./components/amdinPages/CreateCompany.jsx'));
const EditCompnay = lazy(() => import('./components/amdinPages/EditCompnay.jsx'));
const AdminJobs = lazy(() => import('./components/amdinPages/AdminJobs.jsx'));
const CreateJobs = lazy(() => import('./components/amdinPages/CreateJobs.jsx'));
const Applicants = lazy(() => import('./components/amdinPages/Applicants.jsx'));
const JobDescription = lazy(() => import('./components/JobDescription.jsx'))
const AdminCompanies=lazy(()=>import("./components/amdinPages/AdminCompanies.jsx"))
const Browse = lazy(() => import('./components/Browse.jsx'))
const Jobs = lazy(() => import('./components/Jobs.jsx'))
const Home = lazy(() => import('./components/Home.jsx'))
const Login = lazy(() => import('./components/auth/Login.jsx'))
const Signup = lazy(() => import('./components/auth/Signup.jsx'))
const Profile = lazy(() => import("./components/Profile.jsx"))
axios.defaults.withCredentials = true;
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/job/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // for admin
  {
    path: "/admin/companies",
    element: <AdminCompanies />
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompany />
  },
  {
    path: "/admin/companies/:id",
    element: <EditCompnay />
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />
  },
  {
    path: "/admin/jobs/create",
    element: <CreateJobs />
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants />

  }
])
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${userBaseUrl}/loign/verifylogin`)
        if (res) {

          // console.log(res.data);
          dispatch(setUser(res.data.data.foundUser))
        }
      } catch (error) {
        console.log(error);

        throw new Error(error)
      }

    })();

  }, [])
  return <>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={Router} />
    </Suspense>
  </>
}

export default App
