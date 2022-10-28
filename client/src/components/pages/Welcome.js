export default function Welcome() {
  return (
    <div style={{ paddingTop: "35vh" }}>
      <div
        className="ui segment"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "25vh",
        }}
      >
        <div className="ui header" style={{ textAlign: "center" }}>
          <h1>Welcome to the Berry Club 🍇</h1>
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="/auth/google">
            <button className="ui button red">
              <i className="icon google" />
              Sign in with Google
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
