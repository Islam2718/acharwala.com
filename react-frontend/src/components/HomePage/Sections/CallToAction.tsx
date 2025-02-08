import React from 'react';
const App: React.FC = () => {
  return (
    <div className="App">
        {/* ----------Call To Action Start ----------*/}
        <section className="call-to-action mt-5 py-5">
            <div className="action">
            <div className="container">
                <div className="bg-image h-100">
                <div className="row">
                    <div className="col-md-8 action-left">
                    <h1><span>Fulfill</span> All Your <span>Needs !</span></h1>
                    <button><span>Best Deal </span> 20% <span>Off</span></button>
                    </div>
                    <div className="col-md-4 action-right d-flex align-items-center justify-content-center">
                    <img src="assets/img/call-to-action/action-image.png" alt="" />
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* ----------Call To Action End ---------- */}
    </div>
  );
}

export default App;