import React from "react";

export default function Reports() {
  const [loading, setLoading] = React.useState(false);

  const handleDownload = async (url) => {
    setLoading(true);
    // Simulate download delay
    setTimeout(() => {
      window.location.href = url;
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="mt-5">
      <div className="container_r">
        <div>
          <h2>Download Devices Reports</h2>

          {loading ? (
            <div className="mt-3">Downloading report, please wait...</div>
          ) : (
            <>
              <button
                className="btn btn-primary mr-2"
                disabled={loading}
                onClick={() =>
                  handleDownload("http://localhost:8000/download/device/csv")
                }
              >
                Download CSV Report
              </button>
              <button
                className="btn btn-danger m-2"
                disabled={loading}
                onClick={() =>
                  handleDownload("http://localhost:8000/download/device/pdf")
                }
              >
                Download PDF Report
              </button>
            </>
          )}
        </div>

        <div className="mt-5">
          <h2>Download Traffic Reports</h2>

          {loading ? (
            <div className="mt-3">Downloading report, please wait...</div>
          ) : (
            <>
              <button
                className="btn btn-primary mr-2"
                disabled={loading}
                onClick={() =>
                  handleDownload("http://localhost:8000/download/traffic/csv")
                }
              >
                Download CSV Report
              </button>
              <button
                className="btn btn-danger m-2"
                disabled={loading}
                onClick={() =>
                  handleDownload("http://localhost:8000/download/traffic/pdf")
                }
              >
                Download PDF Report
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
