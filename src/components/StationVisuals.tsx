export function WorkflowVisual() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="bar">
        <i />
        <i />
        <i />
      </div>
      <div className="mock-body">
        <div className="kanban">
          <div className="kcol">
            <h5>Sourced</h5>
            <div className="kcard mover">
              <b>Priya S.</b>
              <span>React Dev</span>
            </div>
            <div className="kcard">
              <b>Aman K.</b>
              <span>QA Lead</span>
            </div>
          </div>
          <div className="kcol">
            <h5>Screened</h5>
            <div className="kcard">
              <b>Rohit M.</b>
              <span>Java Dev</span>
            </div>
          </div>
          <div className="kcol">
            <h5>Submitted</h5>
            <div className="kcard">
              <b>Neha T.</b>
              <span>BA</span>
            </div>
            <div className="kcard">
              <b>Farhan A.</b>
              <span>DevOps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TrackerVisual() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="bar">
        <i />
        <i />
        <i />
      </div>
      <div className="mock-body">
        <div className="trow">
          <div className="avatar">PS</div>
          <div className="who">
            <b>Priya Sharma</b>
            <span>Sr. React Developer · TechCorp</span>
          </div>
          <span className="status auto1">Interview Done</span>
        </div>
        <div className="trow">
          <div className="avatar">RM</div>
          <div className="who">
            <b>Rohit Mehra</b>
            <span>Java Developer · FinEdge</span>
          </div>
          <span className="status auto2">Feedback Awaited</span>
        </div>
        <div className="trow">
          <div className="avatar">NT</div>
          <div className="who">
            <b>Neha Tiwari</b>
            <span>Business Analyst · RetailX</span>
          </div>
          <span className="status auto3">Offer Rolled Out</span>
        </div>
      </div>
    </div>
  )
}

export function AiVisual() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="bar">
        <i />
        <i />
        <i />
      </div>
      <div className="mock-body">
        <div className="chat">
          <div className="bubble user">
            Show me React devs, 4+ yrs, Gurgaon, available in 30 days
          </div>
          <div className="bubble ai">
            Found 14 matches in your database. Top 3:
            <div className="cand">
              <b>Priya S.</b>
              <span> · 5 yrs · Gurgaon</span>
              <span className="match">96%</span>
            </div>
            <div className="cand">
              <b>Karan V.</b>
              <span> · 4 yrs · Noida</span>
              <span className="match">91%</span>
            </div>
            <div className="cand">
              <b>Divya R.</b>
              <span> · 6 yrs · Gurgaon</span>
              <span className="match">89%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SchedulerVisual() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="bar">
        <i />
        <i />
        <i />
      </div>
      <div className="mock-body">
        <div className="cal">
          <div className="day">
            Mon<b>12</b>
          </div>
          <div className="day busy">
            Tue<b>13</b>
          </div>
          <div className="day">
            Wed<b>14</b>
          </div>
          <div className="day busy">
            Thu<b>15</b>
          </div>
          <div className="day">
            Fri<b>16</b>
          </div>
        </div>
        <div className="wamsg">
          <div className="waicon">W</div>
          <p>
            Hi <b>Priya</b>, your interview with <b>TechCorp</b> is confirmed
            for <b>Tue, 13th · 11:00 AM</b>. Reply 1 to confirm, 2 to
            reschedule.
          </p>
        </div>
      </div>
    </div>
  )
}
