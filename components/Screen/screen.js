import React from "react";
// import { Tab } from "../../components/Tab";
import s from '../../styles/Screen.module.css';
// import "./Screen.module.css";

export const Screen = () => {
  return (
    <div className={s.index}>
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
    </div>
  );
};
