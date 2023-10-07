import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import buildClient from '../api/build-client'; 
import Link from "next/link";
import { getError } from '../components/error';
import { StateContext } from './_app';
import { useContext, useEffect } from 'react';
import  Router  from 'next/router';
import { withFlashMessages } from 'next-flash-messages';
import s from '../styles/Screen.module.css';
// import { useAppContext } from '../context/state';

export default function Home(props) {
  const stateContext = useContext(StateContext);

  useEffect(() => {
    async function getUser(){
      try{
        const config={
          headers:{
              'Content-Type':'application/json'
          },
          withCredentials: true
      }
          
          const {data} = await axios.get("/api/users/currentUser",config);
          console.log("data in index.js " ,data.currentUser);
          if(!data.currentUser){
              stateContext.dispatch({
                  type:'unauthenticate',
                  payload:null
              });
          }else{
              stateContext.dispatch({
                  type:'authenticate',
                  payload:data.currentUser
              });
              if(data.currentUser.userRole == 1){
                Router.push("/doctor/dashboard");
              }
          }
          

      }catch(err){
          console.log(err);
      }
  }
  getUser();
  },[]);

  return (
    <div className={styles.container}>
      <div className={s.index}>
      {props.pageProps.data.map((d,i) => {
        return (
      <div className={s.div3}>
        <div className={s.appt}>
          <div className={s.overlap}>
            <img
              className={s.rectangle}
              alt="Rectangle"
              src="https://cdn.animaapp.com/projects/650eeed12e4e252d8d5cdd86/releases/650eef1c53064f584d318e63/img/rectangle-1.svg"
            />
            <img
              className={s.moreVertical}
              alt="More vertical"
              src="https://cdn.animaapp.com/projects/650eeed12e4e252d8d5cdd86/releases/650eef1c53064f584d318e63/img/more-vertical.svg"
            />
            <div className={s.group2}>
              <div className={s.frame}>
                <img
                  className={s.clock}
                  alt="Clock"
                  src="https://cdn.animaapp.com/projects/650eeed12e4e252d8d5cdd86/releases/650eef1c53064f584d318e63/img/clock.svg"
                />
                <div className={s.textWrapper2}>Wed Jun 20</div>
                <div className={s.ellipse} />
                <div className={s.textWrapper2}>8:00 - 8:30 AM</div>
              </div>
              <div className={s.textWrapper3}>Appointment date</div>
            </div>
            <div className={s.group3}>
              <div className={s.overlapGroup2}>
                <img
                  className={s.img}
                  alt="Intersect"
                  src="https://cdn.animaapp.com/projects/650eeed12e4e252d8d5cdd86/releases/650eef1c53064f584d318e63/img/intersect@2x.png"
                />
                <div className={s.videoWrapper}>
                  <img
                    className={s.video}
                    alt="Video"
                    src="https://cdn.animaapp.com/projects/650eeed12e4e252d8d5cdd86/releases/650eef1c53064f584d318e63/img/video.svg"
                  />
                </div>
              </div>
              <div className={s.group4}>
                <div className={s.textWrapper4}>Orthopedic</div>
                <div className={s.textWrapper5}>Dr. Padma Jignesh</div>
              </div>
            </div>
            <img
              className={s.line}
              alt="Line"
              src="https://cdn.animaapp.com/projects/650eeed12e4e252d8d5cdd86/releases/650eef1c53064f584d318e63/img/line-37.svg"
            />
          </div>
        </div>
      
      </div>
        )
      })}
    </div>
      <div className="divide-y divide-gray-100">
        <ul className="divide-y divide-gray-100">
          {props.pageProps.data.map((d,i) => {
            return (
              <article key={d._id} className="flex items-start space-x-2 p-1">
              {/* <img src='https://static.vecteezy.com/system/resources/thumbnails/001/511/502/small/male-doctor-icon-free-vector.jpg' alt="" width="60" height="88" className="flex-none rounded-md bg-gray-100" /> */}
              <div className="min-w-0 relative flex-auto">
                <h2 className="font-semibold text-gray-900 truncate pr-20">{d.name}</h2>
                <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                  <div className="absolute top-0 right-0 flex items-center space-x-1">
                    <dt className="text-sky-500">
                      <span className="sr-only">Star rating</span>
                      <svg width="16" height="20" fill="currentColor">
                        <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                      </svg>
                    </dt>
                    <dd>{d.speciality}</dd>
                  </div>
                  {d.chambers.map((c,i) => {
                          return (<div key={c._id} className="flex-none w-full mt-2 font-normal">
                          <dt className="sr-only">Cast</dt>
                          <dd className="text-gray-800">Chamber address :- {c.address}</dd>
                          <dd className="text-gray-500">Timing :- {c.timing}</dd> 
                          <dd className="text-gray-500">weekdays :- {c.weekdays.map((w) => {
                            return w + ",";
                          })}</dd>
                        </div>
                          )
                  })}
                  <Link href="/appointment/[id]" as={`/appointment/${d._id}`}>
                     <a className="text-1xl">Book Appointment</a>
                 </Link>
                </dl>
              </div>
            </article>
                  // <Link href="/appointment/[id]" as={`/appointment/${d._id}`}>
                  //   <a className="text-1xl underline">Book</a>
                  // </Link>
            )
          })}
          </ul>
        </div>


      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  console.log("executing on server");
  const { data } = await axios.get('http://localhost:3000/api/users/allDoctors');



//  console.log(data);

// const data=[];

  return {
    props: { data } ,// will be passed to the page component as props
    revalidate: 180
  }
}

