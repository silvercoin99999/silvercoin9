import React, { useRef, useState } from "react";
import { GiShipWheel } from "react-icons/gi";

function BoardingPass() {
  const [ticket, setTicket] = useState(false);
  const boardingPassRef = useRef(null);

  const ticketing = () => {
    if (ticket) {
      return;
    }

    setTicket(true);
    setTimeout(() => {
      alert("🎟️티켓 발권이 완료되었습니다.");
      if (boardingPassRef.current) {
        boardingPassRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
  };

  return (
    <div className="boarding-pass">
      <h2>Boarding Pass</h2>
      <GiShipWheel />
      <div className="text">
        안녕하세요. 저는 이 배의 선장입니다. <br />
        지금 가고 있는 목적지가 정확히 어디인지 모를지라도, &quot;앞으로&ldquo;
        나아가야 한다는 것만은 분명히 알고 있습니다. 매번 새로운 문제의 파도가
        다가오더라도, 계속해서 코드를 작성하고, 문제를 풀며, 해결책을 찾아낼
        것입니다. 파도를 이겨내고 가는 과정에서 얻는 경험과 배움이 저를 더 넓은
        바다로 인도할 것이라 굳게 믿고 있습니다.
        <p>이 여정을 함께 하시겠습니까?</p>
        .<br />
        .<br />
        <br />
        <div className="ticketing">
          <div>
            <button type="button" onClick={ticketing}>
              YES
            </button>
            /
            <button type="button" disabled>
              NO
            </button>
          </div>
          <hr />
          <div
            className={ticket ? "printer ing" : "printer"}
            ref={boardingPassRef}
          >
            <img src="/boarding-pass.png" alt="탑승권" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardingPass;
