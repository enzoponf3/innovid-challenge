import * as React from "react";

import serverOn from "~/assets/pc-on.gif";
import serverOff from "~/assets/pc-off.png";

interface Props {
  id: number;
}

const Server: React.FC<Props> = ({id}) => {
  const [status, setStatus] = React.useState<"disconnected" | "connecting" | "connected">(
    "disconnected",
  );
  const [cpuUsage, setCpuUsage] = React.useState<number>(0);

  const timer = React.useRef<number | undefined>();

  const connectServer = () => {
    setStatus("connecting");
    timer.current = setInterval(() => {
      fetch(`http://localhost:8000/status/${id}`)
        .then((r) => r.json())
        .then((response) => {
          setStatus("connected");
          setCpuUsage(response.load);
        });
    }, 5000);
  };

  const disconnectServer = () => {
    clearInterval(timer.current);
    setStatus("disconnected");
    setCpuUsage(0);
  };

  return (
    <div className="window" style={{width: 320, margin: 10}}>
      <div className="title-bar">
        <div className="title-bar-text">Server #{id}</div>
      </div>
      <div className="window-body">
        <img
          alt="old pc"
          src={status === "connected" ? serverOn : serverOff}
          style={{height: 160}}
        />
      </div>
      <div className="status-bar">
        <p className="status-bar-field">Status: {status === "connected" ? "ON" : "OFF"}</p>
        {status === "connected" && (
          <p
            className="status-bar-field"
            style={{cursor: "pointer", color: "green"}}
            onClick={disconnectServer}
          >
            shut down
          </p>
        )}
        {status === "connecting" && (
          <p className="status-bar-field" style={{color: "blue"}}>
            connecting. . .{" "}
          </p>
        )}
        {status === "disconnected" && (
          <p
            className="status-bar-field"
            style={{cursor: "pointer", color: "red"}}
            onClick={connectServer}
          >
            turn on
          </p>
        )}

        <p className="status-bar-field"> CPU Usage: {cpuUsage}% </p>
      </div>
    </div>
  );
};

export default Server;
