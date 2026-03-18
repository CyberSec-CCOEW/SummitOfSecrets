export default function LogTable({ logs }) {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-gray-900 text-white">
        <thead>
          <tr>
            {Object.keys(logs[0]).map((key) => (
              <th key={key} className="border px-4 py-2">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              {Object.values(log).map((value, i) => (
                <td key={i} className="border px-4 py-2">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}