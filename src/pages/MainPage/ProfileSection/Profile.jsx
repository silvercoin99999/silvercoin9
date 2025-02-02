import React from "react";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineCake } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { PiFileHtmlDuotone } from "react-icons/pi";
import { PiFileCss } from "react-icons/pi";
import { FaSass } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { DiJqueryLogo } from "react-icons/di";
import { FaReact } from "react-icons/fa";
import { SiRedux } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { FaGitlab } from "react-icons/fa";
import { FaJira } from "react-icons/fa";
import { FaTrello } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

function Profile() {
  return (
    <div className="profile">
      <div className="profile__main">
        <p className="name">
          CHOI
          <br />
          EUNHWA
        </p>
        <div className="picture">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/silvercoin9.firebasestorage.app/o/profile.png?alt=media&token=c694efa1-5743-46eb-a422-29b14eb01b04"
            alt="프로필사진"
          />
        </div>
        <ul>
          <li>
            <IoMdPerson /> 최 은 화 <span>(실버코인)</span>
          </li>
          <li>
            <MdOutlineCake /> 1993/08/30
          </li>
          <li>
            <IoMailOutline /> silvercoin99.999@gmail.com
          </li>
        </ul>
      </div>
      <div className="profile__list">
        <div>
          <strong>qualifications</strong>
          <ul>
            <li>
              <p className="date">2020. 06</p>
              <p>정보처리기사</p>
            </li>
          </ul>
          <strong>EDUCATION</strong>
          <ul>
            <li>
              <p className="date">2018. 03 ~ 2021. 02</p>
              <p>한국방송통신대학교 컴퓨터공학과 졸업</p>
            </li>
            <li>
              <p className="date">2019. 03 ~ 2019. 07</p>
              <p>UI/UX 풀스택 과정</p>
            </li>
            <li>
              <p className="date">2016. 12 ~ 2017. 05</p>
              <p>UI/UX 프론트엔드 과정</p>
            </li>
            <li>
              <p className="date">2013. 02 ~ 2015. 02</p>
              <p>서울직업전문학교 시각디자인과 졸업</p>
            </li>
          </ul>
          <strong>SKILL·TOOL</strong>
          <div className="skill">
            <div>
              <FaHtml5 />
              <span>html5</span>
            </div>
            <div>
              <FaCss3Alt />
              <span>css3</span>
            </div>
            <div>
              <PiFileHtmlDuotone />
              <span>html</span>
            </div>
            <div>
              <PiFileCss />
              <span>css</span>
            </div>
            <div>
              <FaSass />
              <span>sass</span>
            </div>

            <div>
              <IoLogoJavascript />
              <span>javascript</span>
            </div>
            <div>
              <DiJqueryLogo />
              <span>Jquery</span>
            </div>
            <div>
              <FaReact />
              <span>react</span>
            </div>
            <div>
              <SiRedux />
              <span>redux</span>
            </div>
            <div>
              <IoLogoFirebase />
              <span>firebase</span>
            </div>

            <div>
              <VscVscode />
              <span>VScode</span>
            </div>
            <div>
              <FaGithub />
              <span>github</span>
            </div>
            <div>
              <FaGitlab />
              <span>gitlab</span>
            </div>
            <div>
              <FaJira />
              <span>jira</span>
            </div>
            <div>
              <FaTrello />
              <span>trello</span>
            </div>
          </div>
        </div>
        <div>
          <strong>PROJECT</strong>
          <ul>
            <li>
              <b>다한정보기술</b>
              <p>- 탄소중립 홍보 플랫폼 홈페이지 구축</p>
              <p>- 수문자료 정보 관리 시스템 구축</p>
              <p>- 냉매정보관리시스템 홈페이지 + CMS 구축</p>
              <p>- 환경사랑공모전 홈페이지 + CMS 구축 (WA)</p>
              <p>- 자사 홈페이지 + CMS 구축</p>
              <p>- 건설기계 조종사 안전 교육 통합 포털 홈페이지 구축</p>
              <p>- 비점오염원 관리 정보 시스템 사이트 구축</p>
              <p>- 성과공유제 아카데미 구축</p>
              <p>- 성과공유제 홈페이지 유지보수</p>
              <p>- 협력이익 종합 정보 시스템 유지보수</p>
              <p>- 기술보호 울타리 시스템 유지보수 (WA)</p>
              <p>- 한국정보통신기술협회(TTA) 홈페이지 유지보수</p>
              <p>- 한국환경공단 대표 홈페이지 유지보수</p>
            </li>
            <li>
              <b>모두스튜디오</b>
              <p>- 현대아산 홈페이지 구축</p>
              <p>- 호반재단 인트로 페이지 구축</p>
            </li>
            <li>
              <b>뱅크샐러드</b>
              <p>뱅크샐러드 웹·앱 QA</p>
            </li>
            <li>
              <b>피씨엔</b>
              <p>- 서울대학교병원 홈페이지 구축</p>
              <p>- 건국대학교병원 홈페이지 구축</p>
              <p>- R&D 전통문화 융복합 구축</p>
              <p>- 검빛경마 홈페이지 구축</p>
              <p>- 동원그룹 채용 사이트 구축</p>
              <p>- 동원팜스 홈페이지 구축</p>
            </li>
            <li>
              <b>케이원보안</b>
              <p>자사 홈페이지 디자인</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
