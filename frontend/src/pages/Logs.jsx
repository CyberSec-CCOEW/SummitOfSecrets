import { useState } from "react";
import { logs } from "../data/logsData";
import "../styles/logs.css";

export default function Logs() {
  const [search, setSearch] = useState("");

  const filteredLogs = logs.filter((log) =>
    JSON.stringify(log)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="console-wrapper">

      {/* Top Header */}
      <div className="console-header">
        <div className="console-title">
          <span className="status-dot"></span>
          NovaNest Internal Monitoring Console
          <span className="version">v4.3</span>
        </div>

        <div className="console-actions">
          <button className="admin-btn">Admin</button>
          <button className="logout-btn">Log Out</button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-card">

        <input
          type="text"
          placeholder="Keyword Search..."
          className="filter-input"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="reset-btn">Reset Filters</button>
      </div>

      {/* Table Card */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>TIMESTAMP</th>
              <th>EVENT ID</th>
              <th>TYPE</th>
              <th>USER</th>
              <th>DETAILS</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map((log, index) => (
              <tr key={index}>
                <td className="mono">{log.timestamp}</td>

                <td className="event-id">{log.eventId}</td>

                <td>
                  <span className="type-badge">
                    {log.type}
                  </span>
                </td>

                <td className="mono">{log.user}</td>

                <td>{log.details}</td>

                <td>
                  <span
                    className={`status-badge ${
                      log.status.toLowerCase()
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}