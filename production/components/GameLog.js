
export default function BootstrapComponent(props) {
    return (
      <>
        <div className="card">
            <div className="card-header">
                Log
            </div>
            <div className="card-body">
                <p id="log_message">
                    {props.children.logMessage}
                </p>
            </div>
            {/* <div id="log_amount" className="bg-opacity-50 card-footer text-body-secondary">
                {props.children.logAmount}
            </div> */}
        </div>
      </>
    )
  }
  